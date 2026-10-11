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

export const ESTI_BELLE_SOURCE = {
  id: "esti-belle",
  name: "Esti Belle",
  brandName: "Esti Belle",
  baseUrl: "https://www.instagram.com/esti_belle",
  type: "manual",
} as const satisfies CatalogSource;

export const ESTI_BELLE_CONTACT = {
  instagramUrl: "https://www.instagram.com/esti_belle",
  whatsappUrl: undefined,
} as const;

export const catalogSources = {
  AYALA: AYALA_SOURCE,
  ESTI_BELLE: ESTI_BELLE_SOURCE,
  MINI_ALLENBY: MINI_ALLENBY_SOURCE,
} as const;

const sourcesById = new Map<string, CatalogSource>(
  Object.values(catalogSources).map((source) => [source.id, source]),
);

export function getCatalogSourceById(id: string): CatalogSource | undefined {
  return sourcesById.get(id);
}

