import type { CatalogSource } from "@/domain/catalog";

export const MINI_ALLENBY_SOURCE = {
  id: "mini-allenby",
  name: "Mini Allenby",
  brandName: "Mini Allenby",
  baseUrl: "https://miniallenby.co.il",
  type: "shopify-public-storefront",
} as const satisfies CatalogSource;

export const catalogSources = {
  MINI_ALLENBY: MINI_ALLENBY_SOURCE,
} as const;

const sourcesById = new Map<string, CatalogSource>(
  Object.values(catalogSources).map((source) => [source.id, source]),
);

export function getCatalogSourceById(id: string): CatalogSource | undefined {
  return sourcesById.get(id);
}

