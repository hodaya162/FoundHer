import type { CatalogProduct } from "@/domain/catalog";

export function formatLookStartingPrice(products: readonly CatalogProduct[]): string | undefined {
  if (products.length === 0) return undefined;
  const total = products.reduce((sum, product) => sum + product.price, 0);
  return new Intl.NumberFormat("he-IL", {
    style: "currency",
    currency: products[0].currency,
    maximumFractionDigits: total % 1 === 0 ? 0 : 2,
  }).format(total);
}
