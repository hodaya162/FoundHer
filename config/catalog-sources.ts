import type { CatalogSource } from "@/domain/catalog";

export const MINI_ALLENBY_SOURCE = {
  id: "mini-allenby",
  name: "Mini Allenby",
  brandName: "Mini Allenby",
  baseUrl: "https://miniallenby.co.il",
  type: "shopify-public-storefront",
} as const satisfies CatalogSource;

export const AYALA_SOURCE = {
  id: "ayala",
  name: "אילה שמלות",
  brandName: "אילה שמלות",
  baseUrl: "https://ayala-dresses.web.app",
  type: "firestore-public-rest",
} as const satisfies CatalogSource;

export const catalogSources = [MINI_ALLENBY_SOURCE, AYALA_SOURCE] as const;

export function getCatalogSourceById(id: string): CatalogSource | undefined {
  return catalogSources.find((source) => source.id === id);
}
