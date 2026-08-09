import type { Product } from "@/domain/product";

export type FavoriteProductCategory = "product" | "rental";

export function getFavoriteProductCategory(product: Pick<Product, "type">): FavoriteProductCategory {
  return product.type === "purchase" ? "product" : "rental";
}
