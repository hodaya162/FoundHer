import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

import type { CatalogProduct, CatalogSnapshot } from "../domain/catalog";
import { AyalaFirestoreProvider } from "../lib/catalog/providers/ayala-firestore-provider";
import { MiniAllenbyShopifyProvider } from "../lib/catalog/providers/mini-allenby-shopify-provider";

if (!process.argv.includes("--authorized")) {
  throw new Error("Catalog synchronization requires the explicit --authorized flag.");
}

async function save(sourceId: string, products: readonly CatalogProduct[]) {
  const syncedAt = products[0]?.lastSyncedAt ?? new Date().toISOString();
  const snapshot: CatalogSnapshot = { sourceId, syncedAt, products };
  const path = resolve(process.cwd(), "data", "catalog-snapshots", `${sourceId}.json`);
  await writeFile(path, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");
  return { sourceId, count: products.length, syncedAt };
}

const [miniAllenby, ayala] = await Promise.all([
  new MiniAllenbyShopifyProvider().getProducts(),
  new AyalaFirestoreProvider().getProducts(),
]);

const result = await Promise.all([
  save("mini-allenby", miniAllenby),
  save("ayala", ayala),
]);

console.log(JSON.stringify({ total: miniAllenby.length + ayala.length, sources: result }, null, 2));
