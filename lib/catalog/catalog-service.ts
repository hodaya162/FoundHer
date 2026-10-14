import ayalaSnapshotJson from "@/data/catalog-snapshots/ayala.json";
import miniAllenbySnapshotJson from "@/data/catalog-snapshots/mini-allenby.json";
import type { CatalogProduct, CatalogSnapshot } from "@/domain/catalog";

import type { CatalogProvider } from "./catalog-provider";
import { AyalaFirestoreProvider } from "./providers/ayala-firestore-provider";
import { MiniAllenbyShopifyProvider } from "./providers/mini-allenby-shopify-provider";

const providers: ReadonlyMap<string, CatalogProvider> = new Map<string, CatalogProvider>([
  ["ayala", new AyalaFirestoreProvider()],
  ["mini-allenby", new MiniAllenbyShopifyProvider()],
]);

const snapshots = new Map<string, CatalogSnapshot>([
  ["ayala", ayalaSnapshotJson as CatalogSnapshot],
  ["mini-allenby", miniAllenbySnapshotJson as CatalogSnapshot],
]);

const remoteRefreshEnabled = process.env.CATALOG_REMOTE_REFRESH_ENABLED === "true";

export function getCatalogProvider(sourceId: string): CatalogProvider | undefined {
  return providers.get(sourceId);
}

export function getCatalogSnapshot(sourceId: string): readonly CatalogProduct[] {
  return snapshots.get(sourceId)?.products ?? [];
}

export async function getCatalogProducts(sourceId: string): Promise<readonly CatalogProduct[]> {
  const snapshot = getCatalogSnapshot(sourceId);
  if (!remoteRefreshEnabled) return snapshot;
  const provider = providers.get(sourceId);
  if (!provider) return snapshot;
  try {
    const products = await provider.getProducts();
    return products.length ? products : snapshot;
  } catch (error) {
    console.error(`Catalog refresh failed for ${sourceId}; serving the last successful snapshot.`, error);
    return snapshot;
  }
}

export async function getAllCatalogProducts(): Promise<readonly CatalogProduct[]> {
  const [miniAllenby, ayala] = await Promise.all([
    getCatalogProducts("mini-allenby"),
    getCatalogProducts("ayala"),
  ]);
  return [...miniAllenby, ...ayala];
}

export async function getCatalogProductById(id: string): Promise<CatalogProduct | undefined> {
  return (await getAllCatalogProducts()).find((product) => product.id === id);
}
