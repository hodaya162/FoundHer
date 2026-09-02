import type { Look } from "@/domain/look";
import type { Product } from "@/domain/product";
import { getBrandById } from "@/lib/repositories/brands.repository";
import { getProductById } from "@/lib/repositories/products.repository";
import { getRentalBusinessById } from "@/lib/repositories/rental-businesses.repository";

import type { LookCardModel, LookProductItem } from "../types/look-details";

function getSellerName(product: Product): string | null {
  if (product.type === "purchase") {
    const brand = getBrandById(product.brandId);
    return brand ? `${brand.name}${brand.isDemo ? " · תוכן לדוגמה" : ""}` : null;
  }

  const business = getRentalBusinessById(product.rentalBusinessId);
  return business ? `${business.name}${business.isDemo ? " · תוכן לדוגמה" : ""}` : null;
}

export function getLookProductItems(look: Look): readonly LookProductItem[] {
  return look.items.flatMap(({ imageId, productId }) => {
    const product = getProductById(productId);
    if (!product) return [];

    const image = (imageId ? product.images.find(({ id }) => id === imageId) : undefined) ?? product.images[0];
    if (!image) return [];

    return [{ product, image, sellerName: getSellerName(product), href: `/products/${product.slug}` as const }];
  });
}

export function getLookCardModels(looks: readonly Look[]): readonly LookCardModel[] {
  return looks.map((look) => ({ look, products: getLookProductItems(look) }));
}
