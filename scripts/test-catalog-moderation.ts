import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import ayalaSnapshot from "../data/catalog-snapshots/ayala.json";
import miniAllenbySnapshot from "../data/catalog-snapshots/mini-allenby.json";
import type { CatalogProduct } from "../domain/catalog";
import { applyCatalogModeration, createCatalogModerationSyncPayload } from "../lib/catalog/moderation-policy";

const products = [...miniAllenbySnapshot.products, ...ayalaSnapshot.products] as CatalogProduct[];
const product = products.find(({ images }) => images.length >= 2);
assert(product, "A catalog product with multiple images is required");
const [approvedImage, hiddenImage] = product.images;
assert(approvedImage && hiddenImage);

assert.deepEqual(applyCatalogModeration(products, [], []), [], "missing moderation rows deny every product by default");
assert.deepEqual(applyCatalogModeration(products, [{ sourceId: product.sourceId, externalProductId: product.externalId, status: "pending" }], []), [], "pending products stay private");
assert.deepEqual(applyCatalogModeration(products, [{ sourceId: product.sourceId, externalProductId: product.externalId, status: "hidden" }], []), [], "hidden products stay private");
assert.deepEqual(applyCatalogModeration(products, [{ sourceId: product.sourceId, externalProductId: product.externalId, status: "approved" }], []), [], "an approved product without an approved image stays private");

const published = applyCatalogModeration(
  products,
  [{ sourceId: product.sourceId, externalProductId: product.externalId, status: "approved" }],
  [
    { sourceId: product.sourceId, externalProductId: product.externalId, imageId: approvedImage.id, status: "approved" },
    { sourceId: product.sourceId, externalProductId: product.externalId, imageId: hiddenImage.id, status: "hidden" },
  ],
);
assert.equal(published.length, 1);
assert.deepEqual(published[0]?.images.map(({ id }) => id), [approvedImage.id], "hidden and pending images never reach public output");

const payload = createCatalogModerationSyncPayload(products);
assert.equal(payload.products.length, 54, "all 54 current products enter the moderation queue");
assert.equal(new Set(payload.products.map(({ source_id, external_product_id }) => `${source_id}:${external_product_id}`)).size, 54, "product moderation identity is stable and source-aware");
assert(payload.images.length > 54, "all source images enter the image moderation queue");
assert(payload.images.every(({ image_id }) => image_id.length > 0), "every image uses a stable source image ID");

const migration = readFileSync(new URL("../supabase/migrations/20261014160000_catalog_moderation.sql", import.meta.url), "utf8");
assert.match(migration, /default 'pending'/, "new moderation rows default to pending");
assert.match(migration, /enable row level security/g, "moderation tables enable RLS");
assert.match(migration, /grant execute on function public\.sync_catalog_moderation\(jsonb, jsonb\) to service_role/, "catalog ingestion is server-only");

console.log("Catalog moderation tests passed: fail-closed publishing, stable identities, pending defaults, image controls, and RLS migration.");

