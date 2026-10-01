import type { Product, PurchaseProduct, RentalProduct } from "@/domain/product";
import type { RentalItem } from "@/domain/rental-item";

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
      href: `/products/${product.slug}`,
      sourceType: "product",
      transactionType: "purchase",
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
    href: `/products/${product.slug}`,
    sourceType: "product",
    transactionType: "rental",
  };
}

export function createRentalDiscoveryCardModel(rental: RentalItem): RentalProductCard {
  const image = rental.images[0];

  if (!image) {
    throw new Error(`Rental ${rental.id} has no presentation image.`);
  }

  return {
    id: rental.id,
    slug: rental.slug,
    type: rental.type === "bridal" ? "rental_bridal" : "rental_evening",
    name: rental.title,
    image,
    sellerName: rental.businessName,
    featured: false,
    rentalPrice: rental.price ?? rental.priceRange?.min ?? 0,
    priceRange: rental.priceRange,
    currency: rental.currency,
    city: rental.location,
    actionLabel: "לפרטי הפריט",
    href: `/rentals/${rental.slug}`,
    sourceType: "rental",
    transactionType: "rental",
  };
}
