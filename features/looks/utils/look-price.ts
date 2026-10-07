import type { CatalogProduct } from "@/domain/catalog";

export function formatLookStartingPrice(products: readonly CatalogProduct[]): string | undefined {
  const pricedProducts = products.filter((product): product is CatalogProduct & { readonly price: number } => product.price !== undefined);
  if (pricedProducts.length !== products.length || pricedProducts.length === 0) return undefined;
  const total = pricedProducts.reduce((sum, product) => sum + product.price, 0);
  return new Intl.NumberFormat("he-IL", {
    style: "currency",
    currency: pricedProducts[0].currency,
    maximumFractionDigits: total % 1 === 0 ? 0 : 2,
  }).format(total);
}
