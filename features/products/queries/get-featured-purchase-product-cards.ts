import { getBrandById } from "@/lib/repositories/brands.repository";
import { getFeaturedProducts } from "@/lib/repositories/products.repository";

import type { PurchaseProductCard } from "../types/product-card";
import { createProductCardModel } from "../utils/create-product-card-model";

export function getFeaturedPurchaseProductCards(): readonly PurchaseProductCard[] {
  return getFeaturedProducts().flatMap((product) => {
    if (product.type !== "purchase") {
      return [];
    }

    const brand = getBrandById(product.brandId);

    if (!brand) {
      return [];
    }

    return [createProductCardModel(product, brand.name)];
  });
}
