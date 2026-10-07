import type { ImageAsset } from "./media";

export const CATALOG_CATEGORIES = [
  "tops",
  "skirts",
  "dresses",
  "outerwear",
  "accessories",
  "swimwear",
  "other",
] as const;

export type CatalogCategory = (typeof CATALOG_CATEGORIES)[number];
export type CatalogCurrency = "ILS";

export type NormalizedCatalogValue = {
  readonly raw: string;
  readonly normalized: string;
};

export type CatalogVariant = {
  readonly id: string;
  readonly externalId: string;
  readonly title: string;
  readonly price?: number;
  readonly compareAtPrice?: number;
  readonly sku?: string;
  readonly size?: NormalizedCatalogValue;
  readonly color?: NormalizedCatalogValue;
  readonly available: boolean;
  readonly image?: ImageAsset;
};

export type CatalogProduct = {
  readonly id: string;
  readonly externalId: string;
  readonly sourceId: string;
  readonly brand: string;
  readonly title: string;
  readonly description?: string;
  readonly category: CatalogCategory;
  readonly price?: number;
  readonly compareAtPrice?: number;
  readonly currency: CatalogCurrency;
  readonly productUrl: string;
  readonly images: readonly ImageAsset[];
  readonly variants: readonly CatalogVariant[];
  readonly sizes: readonly NormalizedCatalogValue[];
  readonly colors: readonly NormalizedCatalogValue[];
  readonly available?: boolean;
  readonly tags: readonly string[];
  readonly lastSyncedAt: string;
};

export type CatalogProductReference = {
  readonly sourceId: string;
  readonly productId: string;
};

export type CatalogSource = {
  readonly id: string;
  readonly name: string;
  readonly brandName: string;
  readonly baseUrl: string;
  readonly type: "shopify-public-storefront" | "firestore-public-rest";
};

