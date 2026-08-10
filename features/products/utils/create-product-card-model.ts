import type { Product, PurchaseProduct, RentalProduct } from "@/domain/product";

import type { ProductCardModel, PurchaseProductCard, RentalProductCard } from "../types/product-card";

export function createProductCardModel(product: PurchaseProduct, sellerName: string): PurchaseProductCard;
export function createProductCardModel(product: RentalProduct, sellerName: string): RentalProductCard;
export function createProductCardModel(product: Product, sellerName: string): ProductCardModel;

export function createProductCardModel(product: Product, sellerName: string): ProductCardModel {
  const image = product.images[0];

  if (!image) {
    throw new Error(`Product ${product.id} has no presentation image.`);
  }

  if (product.type === "purchase") {
    return {
      id: product.id,
      slug: product.slug,
      type: product.type,
      name: product.name,
      image,
      sellerName,
      featured: product.featured,
      price: product.price,
      currency: product.currency,
      actionLabel: "לפרטי הפריט",
    };
  }

  return {
    id: product.id,
    slug: product.slug,
    type: product.type,
    name: product.name,
    image,
    sellerName,
    featured: product.featured,
    rentalPrice: product.rentalPrice,
    currency: product.currency,
    city: product.city,
    actionLabel: "לפרטי הפריט",
  };
}
