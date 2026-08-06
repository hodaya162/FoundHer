import { getBrandById } from "@/lib/repositories/brands.repository";
import { getAllProducts } from "@/lib/repositories/products.repository";
import { getRentalBusinessById } from "@/lib/repositories/rental-businesses.repository";

import type { ProductCardModel } from "../types/product-card";
import { createProductCardModel } from "../utils/create-product-card-model";

export function getDiscoverProductCards(): readonly ProductCardModel[] {
  return getAllProducts().map((product) => {
    if (product.type === "purchase") {
      const brand = getBrandById(product.brandId);

      if (!brand) {
        throw new Error(`Product ${product.id} references missing brand ${product.brandId}.`);
      }

      return createProductCardModel(product, brand.name);
    }

    const rentalBusiness = getRentalBusinessById(product.rentalBusinessId);

    if (!rentalBusiness) {
      throw new Error(
        `Product ${product.id} references missing rental business ${product.rentalBusinessId}.`,
      );
    }

    return createProductCardModel(product, rentalBusiness.name);
  });
}
