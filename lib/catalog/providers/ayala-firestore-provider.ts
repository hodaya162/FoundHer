import { AYALA_SOURCE } from "@/config/catalog-sources";
import type { CatalogProduct, CatalogVariant } from "@/domain/catalog";
import type { ImageAsset } from "@/domain/media";
import { normalizeCatalogValue, uniqueNormalizedValues } from "@/lib/catalog/normalization";

import type { CatalogProvider } from "../catalog-provider";

type CatalogFetchInit = RequestInit & { readonly next?: { readonly revalidate: number } };
type CatalogFetcher = (input: string, init?: CatalogFetchInit) => Promise<Response>;
type UnknownRecord = Record<string, unknown>;

const AYALA_PROJECT_ID = "ayala-dresses";
const AYALA_COLLECTION = "dresses";
const REVALIDATE_SECONDS = 3 * 60 * 60;
const PUBLIC_CATALOG_ENDPOINT = `https://firestore.googleapis.com/v1/projects/${AYALA_PROJECT_ID}/databases/(default)/documents/${AYALA_COLLECTION}?pageSize=100`;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stringValue(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function firestoreString(value: unknown): string | undefined {
  return isRecord(value) ? stringValue(value.stringValue) : undefined;
}

function firestoreNumber(value: unknown): number | undefined {
  if (!isRecord(value)) return undefined;
  const raw = value.integerValue ?? value.doubleValue;
  if (typeof raw !== "string" && typeof raw !== "number") return undefined;
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
}

function documentId(input: UnknownRecord): string | undefined {
  const name = stringValue(input.name);
  const fields = isRecord(input.fields) ? input.fields : undefined;
  const explicitId = fields ? firestoreString(fields.id) : undefined;
  const pathId = name?.split("/").filter(Boolean).at(-1);
  const id = explicitId ?? pathId;
  return id && /^[a-z0-9][a-z0-9-]*$/i.test(id) ? id : undefined;
}

function safeImageUrl(value: unknown): string | undefined {
  const source = firestoreString(value) ?? stringValue(value);
  if (!source) return undefined;
  try {
    const url = new URL(source, AYALA_SOURCE.baseUrl);
    if (url.protocol !== "https:" || url.hostname !== "ayala-dresses.web.app" || !url.pathname.startsWith("/images/")) return undefined;
    return url.toString();
  } catch {
    return undefined;
  }
}

function createImages(fields: UnknownRecord, title: string, productId: string): readonly ImageAsset[] {
  const imagesField = isRecord(fields.images) ? fields.images : undefined;
  const arrayValue = imagesField && isRecord(imagesField.arrayValue) ? imagesField.arrayValue : undefined;
  const values = arrayValue && Array.isArray(arrayValue.values) ? arrayValue.values : [];
  const candidates = values.length > 0 ? values : [fields.image];
  const seen = new Set<string>();

  return candidates.flatMap((value, index) => {
    const url = safeImageUrl(value);
    if (!url || seen.has(url)) return [];
    seen.add(url);
    return [{
      id: `ayala:${productId}:image:${index + 1}`,
      url,
      alt: index === 0 ? `${title} של אילה שמלות` : `${title} — תמונה ${index + 1}`,
    }];
  });
}

function stockEntries(fields: UnknownRecord): readonly { readonly size: string; readonly quantity: number }[] {
  const stock = isRecord(fields.stock) && isRecord(fields.stock.mapValue) && isRecord(fields.stock.mapValue.fields)
    ? fields.stock.mapValue.fields
    : undefined;
  if (!stock) return [];

  return Object.entries(stock).flatMap(([size, value]) => {
    const quantity = firestoreNumber(value);
    return quantity === undefined ? [] : [{ size, quantity }];
  });
}

function createVariants(productId: string, entries: readonly { readonly size: string; readonly quantity: number }[], price?: number): readonly CatalogVariant[] {
  return entries.map(({ quantity, size }) => ({
    id: `ayala:${productId}:variant:${encodeURIComponent(size)}`,
    externalId: size,
    title: size,
    ...(price === undefined ? {} : { price }),
    size: normalizeCatalogValue(size),
    available: quantity > 0,
  }));
}

export class AyalaFirestoreProvider implements CatalogProvider {
  readonly source = AYALA_SOURCE;

  constructor(private readonly fetcher: CatalogFetcher = (input, init) => fetch(input, init)) {}

  normalizeProduct(input: unknown, syncedAt = new Date().toISOString()): CatalogProduct | undefined {
    if (!isRecord(input) || !isRecord(input.fields)) return undefined;
    const fields = input.fields;
    const id = documentId(input);
    const title = firestoreString(fields.name);
    if (!id || !title) return undefined;

    const images = createImages(fields, title, id);
    if (images.length === 0) return undefined;

    const regularPrice = firestoreNumber(fields.price);
    const salePrice = firestoreNumber(fields.salePrice);
    const price = salePrice ?? regularPrice;
    const compareAtPrice = salePrice !== undefined && regularPrice !== undefined && salePrice < regularPrice
      ? regularPrice
      : undefined;
    const sourceCategory = firestoreString(fields.category);
    const stock = stockEntries(fields);
    const variants = createVariants(id, stock, price);
    const description = firestoreString(fields.description);

    return {
      id: `${this.source.id}:${id}`,
      externalId: id,
      sourceId: this.source.id,
      brand: this.source.brandName,
      title,
      ...(description ? { description } : {}),
      category: sourceCategory === "swim" ? "swimwear" : "dresses",
      ...(price === undefined ? {} : { price }),
      ...(compareAtPrice === undefined ? {} : { compareAtPrice }),
      currency: "ILS",
      productUrl: new URL(`/dress/${id}`, this.source.baseUrl).toString(),
      images,
      variants,
      sizes: uniqueNormalizedValues(stock.map(({ size }) => size)),
      colors: [],
      ...(stock.length > 0 ? { available: variants.some((variant) => variant.available) } : {}),
      tags: sourceCategory ? [sourceCategory] : [],
      lastSyncedAt: syncedAt,
    };
  }

  async getProducts(): Promise<readonly CatalogProduct[]> {
    const response = await this.fetcher(PUBLIC_CATALOG_ENDPOINT, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(8_000),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!response.ok) throw new Error(`Ayala catalog responded with HTTP ${response.status}.`);
    const payload: unknown = await response.json();
    if (!isRecord(payload) || !Array.isArray(payload.documents)) {
      throw new Error("Ayala catalog response is malformed.");
    }

    const syncedAt = new Date().toISOString();
    return payload.documents.flatMap((document) => {
      const normalized = this.normalizeProduct(document, syncedAt);
      return normalized ? [normalized] : [];
    });
  }

  async getProductById(id: string): Promise<CatalogProduct | undefined> {
    return (await this.getProducts()).find((product) => product.externalId === id || product.id === id);
  }

  async getProductByHandle(handle: string): Promise<CatalogProduct | undefined> {
    return this.getProductById(handle);
  }
}

export const ayalaPublicCatalogEndpoint = PUBLIC_CATALOG_ENDPOINT;
