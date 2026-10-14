import type { CatalogProduct, CatalogSource } from "@/domain/catalog";

export interface CatalogProvider {
  readonly source: CatalogSource;
  getProducts(): Promise<readonly CatalogProduct[]>;
  getProductById(externalId: string): Promise<CatalogProduct | undefined>;
  getProductByHandle(handle: string): Promise<CatalogProduct | undefined>;
  normalizeProduct(input: unknown, syncedAt?: string): CatalogProduct | undefined;
}
