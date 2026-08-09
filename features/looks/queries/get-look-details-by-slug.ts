import { getBrandById } from "@/lib/repositories/brands.repository";
import { getLookBySlug, getSimilarLooks } from "@/lib/repositories/looks.repository";
import { getProductsByIds } from "@/lib/repositories/products.repository";
import { getRentalBusinessById } from "@/lib/repositories/rental-businesses.repository";

import type { LookDetailsModel, LookProductItem } from "../types/look-details";

export function getLookDetailsBySlug(slug: string): LookDetailsModel | undefined {
  const look = getLookBySlug(slug);
  if (!look) return undefined;

  const products = getProductsByIds(look.productIds);
  const resolvedIds = new Set(products.map(({ id }) => id));
  const items: LookProductItem[] = products.map((product) => product.type === "purchase"
    ? { product, sellerName: getBrandById(product.brandId)?.name ?? null }
    : { product, sellerName: getRentalBusinessById(product.rentalBusinessId)?.name ?? null });

  return {
    look,
    products: items,
    unresolvedProductIds: look.productIds.filter((id) => !resolvedIds.has(id)),
    similarLooks: getSimilarLooks(look, 3),
  };
}
