import type { Look } from "@/domain/look";
import type { CatalogProduct, CatalogProductReference } from "@/domain/catalog";
import type { LookCardModel } from "./look-card";
import type { EditorialLookPresentation } from "./editorial-look-presentation";

export type LookProductItem = { readonly product: CatalogProduct };

export type LookDetailsModel = {
  readonly look: Look;
  readonly products: readonly LookProductItem[];
  readonly unresolvedProductRefs: readonly CatalogProductReference[];
  readonly catalogUnavailable: boolean;
  readonly similarLooks: readonly LookCardModel[];
  readonly editorialPresentation?: EditorialLookPresentation;
};
