import { MINI_ALLENBY_SOURCE } from "@/config/catalog-sources";
import type {
  CatalogProduct,
  CatalogVariant,
  NormalizedCatalogValue,
} from "@/domain/catalog";
import type { ImageAsset } from "@/domain/media";
import { mapCatalogCategory, normalizeCatalogValue, uniqueNormalizedValues } from "@/lib/catalog/normalization";

import type { CatalogProvider } from "../catalog-provider";

type CatalogFetchInit = RequestInit & { readonly next?: { readonly revalidate: number } };
type CatalogFetcher = (input: string, init?: CatalogFetchInit) => Promise<Response>;

type UnknownRecord = Record<string, unknown>;

const PRODUCTS_ENDPOINT = `${MINI_ALLENBY_SOURCE.baseUrl}/products.json?limit=250`;
const REVALIDATE_SECONDS = 3 * 60 * 60;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stringValue(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function numericString(value: unknown): number | undefined {
  if (typeof value !== "string" && typeof value !== "number") return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function externalId(value: unknown): string | undefined {
  if (typeof value !== "string" && typeof value !== "number") return undefined;
  const id = String(value);
  return /^\d+$/.test(id) ? id : undefined;
}

function safeShopifyImageUrl(value: unknown): string | undefined {
  const source = stringValue(value);
  if (!source) return undefined;

  try {
    const url = new URL(source);
    if (url.protocol !== "https:" || url.hostname !== "cdn.shopify.com") return undefined;
    return url.toString();
  } catch {
    return undefined;
  }
}

function stripHtml(value: unknown): string | undefined {
  const html = stringValue(value);
  if (!html) return undefined;
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
  return text || undefined;
}

function optionKind(name: string): "color" | "size" | undefined {
  const normalized = name.trim().toLocaleLowerCase("en-US");
  if (["color", "colour", "צבע", "צבעים"].includes(normalized)) return "color";
  if (["size", "zise", "מידה", "מידות"].includes(normalized)) return "size";
  return undefined;
}

function getOptionPositions(input: UnknownRecord): { readonly color?: number; readonly size?: number } {
  if (!Array.isArray(input.options)) return {};
  const result: { color?: number; size?: number } = {};

  for (const option of input.options) {
    if (!isRecord(option)) continue;
    const name = stringValue(option.name);
    const position = numericString(option.position);
    const kind = name ? optionKind(name) : undefined;
    if (kind && position && position >= 1 && position <= 3) result[kind] = position;
  }
  return result;
}

function variantOption(input: UnknownRecord, position?: number): NormalizedCatalogValue | undefined {
  if (!position) return undefined;
  const raw = stringValue(input[`option${position}`]);
  return raw ? normalizeCatalogValue(raw) : undefined;
}

function createImages(input: UnknownRecord, title: string, productId: string): readonly ImageAsset[] {
  if (!Array.isArray(input.images)) return [];

  return input.images.flatMap((image, index) => {
    if (!isRecord(image)) return [];
    const url = safeShopifyImageUrl(image.src);
    if (!url) return [];
    const width = numericString(image.width);
    const height = numericString(image.height);
    return [{
      id: `mini-allenby:${productId}:image:${externalId(image.id) ?? index}`,
      url,
      alt: index === 0 ? `${title} של Mini Allenby` : `${title} — תמונה ${index + 1}`,
      ...(width ? { width } : {}),
      ...(height ? { height } : {}),
    }];
  });
}

function createVariants(
  input: UnknownRecord,
  productId: string,
  imagesByExternalId: ReadonlyMap<string, ImageAsset>,
): readonly CatalogVariant[] {
  if (!Array.isArray(input.variants)) return [];
  const positions = getOptionPositions(input);

  return input.variants.flatMap((variant) => {
    if (!isRecord(variant)) return [];
    const id = externalId(variant.id);
    const price = numericString(variant.price);
    if (!id || price === undefined) return [];
    const compareAtPrice = numericString(variant.compare_at_price);
    const imageId = externalId(variant.image_id);
    const title = stringValue(variant.title) ?? "אפשרות ברירת מחדל";
    const sku = stringValue(variant.sku);

    return [{
      id: `mini-allenby:${productId}:variant:${id}`,
      externalId: id,
      title,
      price,
      ...(compareAtPrice !== undefined ? { compareAtPrice } : {}),
      ...(sku ? { sku } : {}),
      ...(variantOption(variant, positions.size) ? { size: variantOption(variant, positions.size) } : {}),
      ...(variantOption(variant, positions.color) ? { color: variantOption(variant, positions.color) } : {}),
      available: variant.available === true,
      ...(imageId && imagesByExternalId.get(imageId) ? { image: imagesByExternalId.get(imageId) } : {}),
    }];
  });
}

function collectOptionValues(input: UnknownRecord, kind: "color" | "size"): readonly NormalizedCatalogValue[] {
  if (!Array.isArray(input.options)) return [];
  const values: string[] = [];

  for (const option of input.options) {
    if (!isRecord(option) || optionKind(stringValue(option.name) ?? "") !== kind || !Array.isArray(option.values)) continue;
    for (const value of option.values) {
      const raw = stringValue(value);
      if (raw) values.push(raw);
    }
  }
  return uniqueNormalizedValues(values);
}

function createVariantImageMap(input: UnknownRecord, images: readonly ImageAsset[]): ReadonlyMap<string, ImageAsset> {
  const map = new Map<string, ImageAsset>();
  if (!Array.isArray(input.images)) return map;
  input.images.forEach((image, index) => {
    if (!isRecord(image)) return;
    const id = externalId(image.id);
    const normalized = images[index];
    if (id && normalized) map.set(id, normalized);
  });
  return map;
}

export class MiniAllenbyShopifyProvider implements CatalogProvider {
  readonly source = MINI_ALLENBY_SOURCE;

  constructor(private readonly fetcher: CatalogFetcher = (input, init) => fetch(input, init)) {}

  normalizeProduct(input: unknown, syncedAt = new Date().toISOString()): CatalogProduct | undefined {
    if (!isRecord(input)) return undefined;
    const id = externalId(input.id);
    const title = stringValue(input.title);
    const handle = stringValue(input.handle);
    if (!id || !title || !handle || /gift|גיפט/i.test(`${title} ${handle}`)) return undefined;

    const images = createImages(input, title, id);
    if (images.length === 0) return undefined;
    const variants = createVariants(input, id, createVariantImageMap(input, images));
    if (variants.length === 0) return undefined;
    const price = Math.min(...variants.map((variant) => variant.price));
    const compareAtPrices = variants.flatMap((variant) => variant.compareAtPrice === undefined ? [] : [variant.compareAtPrice]);
    const productType = stringValue(input.product_type);
    const tags = Array.isArray(input.tags) ? input.tags.flatMap((tag) => stringValue(tag) ?? []) : [];

    return {
      id: `${this.source.id}:${id}`,
      externalId: id,
      sourceId: this.source.id,
      brand: this.source.brandName,
      title,
      ...(stripHtml(input.body_html) ? { description: stripHtml(input.body_html) } : {}),
      category: mapCatalogCategory({ title, productType }),
      price,
      ...(compareAtPrices.length > 0 ? { compareAtPrice: Math.min(...compareAtPrices) } : {}),
      currency: "ILS",
      productUrl: new URL(`/products/${handle}`, this.source.baseUrl).toString(),
      images,
      variants,
      sizes: collectOptionValues(input, "size"),
      colors: collectOptionValues(input, "color"),
      available: variants.some((variant) => variant.available),
      tags,
      lastSyncedAt: syncedAt,
    };
  }

  async getProducts(): Promise<readonly CatalogProduct[]> {
    const response = await this.fetcher(PRODUCTS_ENDPOINT, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(8_000),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!response.ok) throw new Error(`Mini Allenby catalog responded with HTTP ${response.status}.`);
    const payload: unknown = await response.json();
    if (!isRecord(payload) || !Array.isArray(payload.products)) {
      throw new Error("Mini Allenby catalog response is malformed.");
    }

    const syncedAt = new Date().toISOString();
    return payload.products.flatMap((product) => {
      const normalized = this.normalizeProduct(product, syncedAt);
      return normalized ? [normalized] : [];
    });
  }

  async getProductById(id: string): Promise<CatalogProduct | undefined> {
    return (await this.getProducts()).find((product) => product.externalId === id || product.id === id);
  }

  async getProductByHandle(handle: string): Promise<CatalogProduct | undefined> {
    return (await this.getProducts()).find((product) => {
      const productHandle = decodeURIComponent(new URL(product.productUrl).pathname).split("/").filter(Boolean).at(-1);
      return productHandle === handle;
    });
  }
}

export const miniAllenbyPublicProductsEndpoint = PRODUCTS_ENDPOINT;
