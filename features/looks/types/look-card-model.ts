import type { Look } from "@/domain/look";
import type { Product } from "@/domain/product";

export type LookCardModel = {
  readonly look: Look;
  readonly products: readonly Product[];
  readonly startingPrice: number | null;
};
