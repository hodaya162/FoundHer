import { CATALOG_CATEGORIES } from "@/domain/catalog";
import type {
  CatalogCategory,
  CatalogCurrency,
  CatalogProduct,
  CatalogSource,
} from "@/domain/catalog";
import type { ImageAsset } from "@/domain/media";

import type { CatalogProvider } from "../catalog-provider";

export type ManualCatalogRecord = {
  readonly externalId: string;
  readonly title: string;
  readonly category: CatalogCategory;
  readonly price?: number;
  readonly currency: CatalogCurrency;
  readonly productUrl: string;
  readonly purchaseType?: "external" | "contact";
  readonly contactChannel?: "instagram" | "whatsapp";
  readonly images: readonly ImageAsset[];
  readonly available?: boolean;
  readonly tags?: readonly string[];
};

function isManualRecord(value: unknown): value is ManualCatalogRecord {
  if (!value || typeof value !== "object") return false;
  const record = value as Partial<ManualCatalogRecord>;
  return typeof record.externalId === "string"
    && record.externalId.trim().length > 0
    && typeof record.title === "string"
    && record.title.trim().length > 0
    && CATALOG_CATEGORIES.includes(record.category as CatalogCategory)
    && record.currency === "ILS"
    && typeof record.productUrl === "string"
    && record.productUrl.startsWith("https://")
    && Array.isArray(record.images)
    && record.images.length > 0
    && record.images.every((image) => (
      image
      && typeof image.id === "string"
      && typeof image.url === "string"
      && image.url.startsWith("/")
      && typeof image.alt === "string"
    ))
    && (record.price === undefined || (Number.isFinite(record.price) && record.price > 0));
}

export class ManualCatalogProvider implements CatalogProvider {
  constructor(
    readonly source: CatalogSource,
    private readonly records: readonly ManualCatalogRecord[],
  ) {}

  normalizeProduct(input: unknown, syncedAt = new Date().toISOString()): CatalogProduct | undefined {
    if (!isManualRecord(input)) return undefined;

    return {
      id: `${this.source.id}:${input.externalId}`,
      externalId: input.externalId,
      sourceId: this.source.id,
      brand: this.source.brandName,
      title: input.title,
      category: input.category,
      price: input.price,
      currency: input.currency,
      productUrl: input.productUrl,
      purchaseType: input.purchaseType ?? "external",
      contactChannel: input.contactChannel,
      images: input.images,
      variants: [],
      sizes: [],
      colors: [],
      available: input.available,
      tags: [...(input.tags ?? [])],
      lastSyncedAt: syncedAt,
    };
  }

  async getProducts(): Promise<readonly CatalogProduct[]> {
    const syncedAt = new Date().toISOString();
    return this.records.flatMap((record) => {
      const product = this.normalizeProduct(record, syncedAt);
      return product ? [product] : [];
    });
  }

  async getProductById(externalId: string): Promise<CatalogProduct | undefined> {
    return (await this.getProducts()).find((product) => (
      product.externalId === externalId || product.id === externalId
    ));
  }

  async getProductByHandle(handle: string): Promise<CatalogProduct | undefined> {
    return this.getProductById(handle);
  }
}
