import { getAllCatalogProducts } from "@/lib/catalog/catalog-service";
import type { CatalogProduct } from "@/domain/catalog";

import type { ProductCardModel } from "../types/product-card";

type ProductFilters = { readonly brand?: string; readonly category?: string };

function createCatalogCard(product: CatalogProduct): ProductCardModel | undefined {
  const image = product.images[0];
  if (!image) return undefined;
  return {
    id: product.id,
    slug: product.externalId,
    href: product.productUrl,
    external: true,
    type: "purchase",
    name: product.title,
    image,
    sellerName: product.brand,
    featured: false,
    ...(product.price === undefined ? {} : { price: product.price }),
    ...(product.compareAtPrice === undefined ? {} : { compareAtPrice: product.compareAtPrice }),
    currency: product.currency,
    sourceId: product.sourceId,
    category: product.category,
    available: product.available,
    actionLabel: "לפרטי הפריט",
  };
}

export async function getDiscoverProductCards(filters: ProductFilters = {}): Promise<readonly ProductCardModel[]> {
  const catalog = (await getAllCatalogProducts())
    .filter((product) => !filters.brand || product.sourceId === filters.brand)
    .filter((product) => !filters.category || product.category === filters.category)
    .flatMap((product) => createCatalogCard(product) ?? []);

  return catalog;
}
