import type { CatalogProduct, CatalogProductReference } from "@/domain/catalog";

import type { CatalogProvider } from "./catalog-provider";
import { AyalaFirestoreProvider } from "./providers/ayala-firestore-provider";
import { MiniAllenbyShopifyProvider } from "./providers/mini-allenby-shopify-provider";

const providers: ReadonlyMap<string, CatalogProvider> = new Map<string, CatalogProvider>([
  ["ayala", new AyalaFirestoreProvider()],
  ["mini-allenby", new MiniAllenbyShopifyProvider()],
]);

export function getCatalogProvider(sourceId: string): CatalogProvider | undefined {
  return providers.get(sourceId);
}

export type CatalogResult = {
  readonly products: readonly CatalogProduct[];
  readonly unavailableSourceIds: readonly string[];
};

export async function getCatalogProducts(sourceId: string): Promise<readonly CatalogProduct[]> {
  const provider = providers.get(sourceId);
  if (!provider) return [];
  return provider.getProducts();
}

export async function getCatalogProductsSafe(sourceId: string): Promise<readonly CatalogProduct[]> {
  try {
    return await getCatalogProducts(sourceId);
  } catch (error) {
    console.error(`Catalog source ${sourceId} is temporarily unavailable.`, error);
    return [];
  }
}

export async function resolveCatalogProductReferences(
  references: readonly CatalogProductReference[],
  options: { readonly availableOnly?: boolean } = {},
): Promise<CatalogResult> {
  const sourceIds = [...new Set(references.map(({ sourceId }) => sourceId))];
  const unavailableSourceIds: string[] = [];
  const productsBySource = new Map<string, readonly CatalogProduct[]>();

  await Promise.all(sourceIds.map(async (sourceId) => {
    const provider = providers.get(sourceId);
    if (!provider) {
      unavailableSourceIds.push(sourceId);
      productsBySource.set(sourceId, []);
      return;
    }
    try {
      productsBySource.set(sourceId, await provider.getProducts());
    } catch (error) {
      console.error(`Catalog source ${sourceId} is temporarily unavailable.`, error);
      unavailableSourceIds.push(sourceId);
      productsBySource.set(sourceId, []);
    }
  }));

  const products = references.flatMap((reference) => {
    const product = productsBySource.get(reference.sourceId)?.find(
      (candidate) => candidate.externalId === reference.productId || candidate.id === reference.productId,
    );
    if (!product || (options.availableOnly && !product.available)) return [];
    return [product];
  });

  return { products, unavailableSourceIds };
}

