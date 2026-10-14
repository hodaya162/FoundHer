import assert from "node:assert/strict";

import ayalaSnapshot from "../data/catalog-snapshots/ayala.json";
import miniAllenbySnapshot from "../data/catalog-snapshots/mini-allenby.json";
import { mapCatalogCategory, normalizeCatalogValue } from "../lib/catalog/normalization";
import { AyalaFirestoreProvider } from "../lib/catalog/providers/ayala-firestore-provider";
import { MiniAllenbyShopifyProvider } from "../lib/catalog/providers/mini-allenby-shopify-provider";

assert.equal(miniAllenbySnapshot.products.length, 32, "Mini Allenby snapshot contains all 32 fashion products and excludes the gift card");
assert.equal(ayalaSnapshot.products.length, 22, "Ayala snapshot contains all 22 public catalog products");
assert.equal(miniAllenbySnapshot.products.length + ayalaSnapshot.products.length, 54);
assert.equal(ayalaSnapshot.products.filter(({ category }) => category === "swimwear").length, 3, "Ayala swimwear remains a separate category");
assert(miniAllenbySnapshot.products.every(({ id, productUrl }) => id.startsWith("mini-allenby:") && productUrl.startsWith("https://miniallenby.co.il/products/")));
assert(ayalaSnapshot.products.every(({ id, productUrl }) => id.startsWith("ayala:") && productUrl.startsWith("https://ayala-dresses.web.app/dress/")));
assert.equal(ayalaSnapshot.products.filter(({ available }) => available === true).length, 16, "Ayala availability is derived only from explicit public size stock");
assert.equal(ayalaSnapshot.products.filter(({ available }) => available === false).length, 6, "Ayala sold-out products remain visible and accurately marked");
assert(miniAllenbySnapshot.products.some(({ available }) => available === false), "sold-out Mini Allenby products remain represented accurately");
assert.equal(normalizeCatalogValue("balck").normalized, "black");
assert.equal(normalizeCatalogValue("S-M").normalized, "S-M");
assert.equal(mapCatalogCategory({ title: "בגד ים צנוע" }), "swimwear");

const miniProvider = new MiniAllenbyShopifyProvider(async () => new Response("{}", { status: 200 }));
await assert.rejects(() => miniProvider.getProducts(), /malformed/);
const ayalaProvider = new AyalaFirestoreProvider(async () => new Response("unavailable", { status: 503 }));
await assert.rejects(() => ayalaProvider.getProducts(), /HTTP 503/);

console.log("Real catalog tests passed: 54 products, stable source-aware IDs, swimwear, availability, links, and failure handling.");
