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
  const items: LookProductItem[] = products.map((product) => {
    if (product.type === "purchase") {
      const brand = getBrandById(product.brandId);
      return {
        product,
        sellerName: brand ? (brand.isDemo ? `${brand.name} · תוכן לדוגמה` : brand.name) : null,
      };
    }

    const business = getRentalBusinessById(product.rentalBusinessId);
    return {
      product,
      sellerName: business ? (business.isDemo ? `${business.name} · תוכן לדוגמה` : business.name) : null,
    };
  });

  return {
    look,
    products: items,
    unresolvedProductIds: look.productIds.filter((id) => !resolvedIds.has(id)),
    similarLooks: getSimilarLooks(look, 3),
  };
}
