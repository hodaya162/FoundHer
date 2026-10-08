import type { CatalogProduct } from "@/domain/catalog";
import type { Look } from "@/domain/look";
import type { EditorialLookPresentation } from "./editorial-look-presentation";

export type LookCardModel = {
  readonly look: Look;
  readonly products: readonly CatalogProduct[];
  readonly unresolvedProductCount: number;
  readonly editorialPresentation?: EditorialLookPresentation;
};
