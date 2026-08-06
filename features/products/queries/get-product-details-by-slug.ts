import { getBrandById } from "@/lib/repositories/brands.repository";
import { getProductBySlug } from "@/lib/repositories/products.repository";
import { getRentalBusinessById } from "@/lib/repositories/rental-businesses.repository";

import type { ProductDetails } from "../types/product-details";

export function getProductDetailsBySlug(slug: string): ProductDetails | undefined {
  const product = getProductBySlug(slug);

  if (!product) {
    return undefined;
  }

  if (product.type === "purchase") {
    return {
      ...product,
      brand: getBrandById(product.brandId) ?? null,
    };
  }

  return {
    ...product,
    rentalBusiness: getRentalBusinessById(product.rentalBusinessId) ?? null,
  };
}
