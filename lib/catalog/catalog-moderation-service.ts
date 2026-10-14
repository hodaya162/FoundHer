import "server-only";

import type { CatalogProduct } from "@/domain/catalog";
import type {
  CatalogImageModerationDecision,
  CatalogModerationProduct,
  CatalogModerationStatus,
  CatalogProductModerationDecision,
} from "@/domain/catalog-moderation";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

import { applyCatalogModeration, createCatalogModerationSyncPayload } from "./moderation-policy";

type ProductRow = {
  source_id: string;
  external_product_id: string;
  status: CatalogModerationStatus;
};

type ImageRow = ProductRow & { image_id: string };

function mapProductRow(row: ProductRow): CatalogProductModerationDecision {
  return { sourceId: row.source_id, externalProductId: row.external_product_id, status: row.status };
}

function mapImageRow(row: ImageRow): CatalogImageModerationDecision {
  return { ...mapProductRow(row), imageId: row.image_id };
}

async function readModerationDecisions() {
  const client = createSupabaseAdminClient();
  if (!client) return undefined;
  const [productsResult, imagesResult] = await Promise.all([
    client.from("catalog_product_moderation").select("source_id,external_product_id,status"),
    client.from("catalog_image_moderation").select("source_id,external_product_id,image_id,status"),
  ]);
  if (productsResult.error || imagesResult.error) {
    console.error("Catalog moderation decisions are unavailable; denying public catalog output.");
    return undefined;
  }
  return {
    products: (productsResult.data as ProductRow[]).map(mapProductRow),
    images: (imagesResult.data as ImageRow[]).map(mapImageRow),
  };
}

export async function getPublishedCatalogProducts(rawProducts: readonly CatalogProduct[]) {
  try {
    const decisions = await readModerationDecisions();
    if (!decisions) return [];
    return applyCatalogModeration(rawProducts, decisions.products, decisions.images);
  } catch {
    console.error("Catalog moderation failed closed; no unapproved catalog products were returned.");
    return [];
  }
}

export async function syncCatalogModerationQueue(rawProducts: readonly CatalogProduct[]) {
  const client = createSupabaseAdminClient();
  if (!client) throw new Error("Supabase server configuration is unavailable.");
  const payload = createCatalogModerationSyncPayload(rawProducts);
  const { error } = await client.rpc("sync_catalog_moderation", {
    products_payload: payload.products,
    images_payload: payload.images,
  });
  if (error) throw new Error("Catalog moderation schema is not ready in the Preview database.");
}

export async function getCatalogModerationProducts(rawProducts: readonly CatalogProduct[]): Promise<readonly CatalogModerationProduct[]> {
  const decisions = await readModerationDecisions();
  if (!decisions) throw new Error("Catalog moderation decisions are unavailable.");
  const productStatuses = new Map(decisions.products.map((decision) => [
    `${decision.sourceId}\u0000${decision.externalProductId}`,
    decision.status,
  ]));
  const imageStatuses = new Map(decisions.images.map((decision) => [
    `${decision.sourceId}\u0000${decision.externalProductId}\u0000${decision.imageId}`,
    decision.status,
  ]));
  return rawProducts.map((product) => ({
    product,
    status: productStatuses.get(`${product.sourceId}\u0000${product.externalId}`) ?? "pending",
    images: product.images.map((image) => ({
      id: image.id,
      status: imageStatuses.get(`${product.sourceId}\u0000${product.externalId}\u0000${image.id}`) ?? "pending",
    })),
  }));
}

export async function updateProductModeration(input: {
  sourceId: string;
  externalProductId: string;
  status: CatalogModerationStatus;
  reviewedBy: string;
}) {
  const client = createSupabaseAdminClient();
  if (!client) throw new Error("Supabase server configuration is unavailable.");
  const { error } = await client.from("catalog_product_moderation").update({
    status: input.status,
    reviewed_at: new Date().toISOString(),
    reviewed_by: input.reviewedBy,
  }).eq("source_id", input.sourceId).eq("external_product_id", input.externalProductId);
  if (error) throw new Error("Product moderation update failed.");
}

export async function updateImageModeration(input: {
  sourceId: string;
  externalProductId: string;
  imageId: string;
  status: CatalogModerationStatus;
  reviewedBy: string;
}) {
  const client = createSupabaseAdminClient();
  if (!client) throw new Error("Supabase server configuration is unavailable.");
  const { error } = await client.from("catalog_image_moderation").update({
    status: input.status,
    reviewed_at: new Date().toISOString(),
    reviewed_by: input.reviewedBy,
  }).eq("source_id", input.sourceId).eq("external_product_id", input.externalProductId).eq("image_id", input.imageId);
  if (error) throw new Error("Image moderation update failed.");
}

