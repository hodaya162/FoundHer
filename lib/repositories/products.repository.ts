import type {
  Product,
  ProductType,
  PurchaseProduct,
  RentalProduct,
} from "@/domain/product";
import { products } from "@/data/fixtures/products";

const allProducts: readonly Product[] = products;

function isPurchaseProduct(product: Product): product is PurchaseProduct {
  return product.type === "purchase";
}

function isRentalProduct(product: Product): product is RentalProduct {
  return product.type === "rental_evening" || product.type === "rental_bridal";
}

export function getAllProducts(): readonly Product[] {
  return allProducts;
}

export function getFeaturedProducts(): readonly Product[] {
  return allProducts.filter(({ featured }) => featured);
}

export function getPurchaseProducts(): readonly PurchaseProduct[] {
  return allProducts.filter(isPurchaseProduct);
}

export function getRentalProducts(): readonly RentalProduct[] {
  return allProducts.filter(isRentalProduct);
}

export function getProductsByType(type: ProductType): readonly Product[] {
  return allProducts.filter((product) => product.type === type);
}

export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find((product) => product.slug === slug);
}

export function getProductsByBrandId(brandId: string): readonly PurchaseProduct[] {
  return getPurchaseProducts().filter((product) => product.brandId === brandId);
}

export function getProductsByRentalBusinessId(rentalBusinessId: string): readonly RentalProduct[] {
  return getRentalProducts().filter((product) => product.rentalBusinessId === rentalBusinessId);
}
