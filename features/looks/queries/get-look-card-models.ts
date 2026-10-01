import type { LookOccasion } from "@/domain/look";
import type { Product } from "@/domain/product";
import { getAllLooks } from "@/lib/repositories/looks.repository";
import { getProductsByIds } from "@/lib/repositories/products.repository";

import type { LookCardModel } from "../types/look-card-model";

export type LookOccasionFilter = "all" | "everyday" | "work" | "shabbat" | "event" | "vacation";

const filterOccasions: Record<Exclude<LookOccasionFilter, "all">, readonly LookOccasion[]> = {
  everyday: ["everyday"],
  work: ["work"],
  shabbat: ["shabbat"],
  event: ["evening_event", "wedding_guest"],
  vacation: ["vacation"],
};

function productPrice(product: Product): number {
  return product.type === "purchase" ? product.price : product.rentalPrice;
}

export function getLookCardModels(filter: LookOccasionFilter = "all"): readonly LookCardModel[] {
  return getAllLooks()
    .filter((look) => filter === "all" || look.occasions.some((occasion) => filterOccasions[filter].includes(occasion)))
    .map((look) => {
      const products = getProductsByIds(look.productIds);
      return {
        look,
        products,
        startingPrice: products.length > 0 ? Math.min(...products.map(productPrice)) : null,
      };
    });
}
