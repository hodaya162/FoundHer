import type { CatalogProduct } from "@/domain/catalog";
import type { Look } from "@/domain/look";

export type LookCardModel = {
  readonly look: Look;
  readonly products: readonly CatalogProduct[];
  readonly unresolvedProductCount: number;
};
