import type { CatalogProduct } from "./catalog";

export const CATALOG_MODERATION_STATUSES = ["pending", "approved", "hidden"] as const;
export type CatalogModerationStatus = (typeof CATALOG_MODERATION_STATUSES)[number];

export type CatalogProductModerationDecision = {
  readonly sourceId: string;
  readonly externalProductId: string;
  readonly status: CatalogModerationStatus;
};

export type CatalogImageModerationDecision = CatalogProductModerationDecision & {
  readonly imageId: string;
};

export type CatalogModerationProduct = {
  readonly product: CatalogProduct;
  readonly status: CatalogModerationStatus;
  readonly images: readonly {
    readonly id: string;
    readonly status: CatalogModerationStatus;
  }[];
};

