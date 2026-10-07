import assert from "node:assert/strict";

import { AYALA_SOURCE, getCatalogSourceById } from "../config/catalog-sources";
import { looks } from "../data/fixtures/looks";
import { getCatalogProvider } from "../lib/catalog/catalog-service";
import { AyalaFirestoreProvider, ayalaPublicCatalogEndpoint } from "../lib/catalog/providers/ayala-firestore-provider";

const firestoreDocument = {
  name: "projects/ayala-dresses/databases/(default)/documents/dresses/aviv-pink",
  fields: {
    id: { stringValue: "aviv-pink" },
    name: { stringValue: "שִׂמְלַת אָבִיב אָרוֹךְ וָרוֹד" },
    description: { stringValue: "שמלת מקסי נסיכותית" },
    category: { stringValue: "aviv" },
    price: { integerValue: "480" },
    salePrice: { integerValue: "408" },
    image: { stringValue: "/images/aviv-pink.jpg" },
    images: {
      arrayValue: {
        values: [
          { stringValue: "/images/aviv-pink.jpg" },
          { stringValue: "/images/aviv-pink-2.jpg" },
        ],
      },
    },
    stock: {
      mapValue: {
        fields: {
          "S-M": { integerValue: "5" },
          "M-L": { integerValue: "0" },
        },
      },
    },
  },
};

const provider = new AyalaFirestoreProvider(async () => new Response(JSON.stringify({ documents: [firestoreDocument] }), {
  status: 200,
  headers: { "Content-Type": "application/json" },
}));

const products = await provider.getProducts();
const normalized = products[0];
assert(normalized, "a valid public Firestore dress is normalized");
assert.equal(normalized.id, "ayala:aviv-pink", "stable IDs combine the source and Firestore document ID");
assert.equal(normalized.externalId, "aviv-pink");
assert.equal(normalized.sourceId, AYALA_SOURCE.id);
assert.equal(normalized.brand, "אילה שמלות");
assert.equal(normalized.title, "שִׂמְלַת אָבִיב אָרוֹךְ וָרוֹד", "Hebrew product names remain unchanged");
assert.equal(normalized.price, 408, "the real sale price is the current price");
assert.equal(normalized.compareAtPrice, 480, "the source regular price is retained");
assert.equal(normalized.category, "dresses");
assert.equal(normalized.productUrl, "https://ayala-dresses.web.app/dress/aviv-pink");
assert.equal(normalized.images.length, 2);
assert(normalized.images.every(({ url }) => url.startsWith("https://ayala-dresses.web.app/images/")), "only approved Ayala image URLs are accepted");
assert.deepEqual(normalized.sizes.map(({ normalized: size }) => size), ["S-M", "M-L"]);
assert.deepEqual(normalized.colors, [], "colors are not inferred when the source has no color field");
assert.equal(normalized.available, true, "availability is derived from public stock quantities");
assert.equal(normalized.variants[0]?.available, true);
assert.equal(normalized.variants[1]?.available, false);
assert.equal((await provider.getProductById("aviv-pink"))?.id, normalized.id);
assert.equal((await provider.getProductByHandle("aviv-pink"))?.id, normalized.id);
assert.equal(await provider.getProductById("deleted-dress"), undefined, "missing/deleted products resolve safely");

const noPrice = provider.normalizeProduct({
  ...firestoreDocument,
  fields: { ...firestoreDocument.fields, price: undefined, salePrice: undefined },
});
assert(noPrice, "a product without price remains discoverable when all required identity and image fields exist");
assert.equal(noPrice.price, undefined, "missing prices are not replaced with zero");
assert(noPrice.variants.every(({ price }) => price === undefined), "missing prices are not invented on variants");

const noStock = provider.normalizeProduct({
  ...firestoreDocument,
  fields: { ...firestoreDocument.fields, stock: undefined },
});
assert.equal(noStock?.available, undefined, "missing stock is represented as unknown rather than invented availability");

const swimwear = provider.normalizeProduct({
  ...firestoreDocument,
  name: "projects/ayala-dresses/databases/(default)/documents/dresses/swim-bordeaux",
  fields: {
    ...firestoreDocument.fields,
    id: { stringValue: "swim-bordeaux" },
    name: { stringValue: "בֶּגֶד יָם בּוֹרְדּוֹ" },
    category: { stringValue: "swim" },
  },
});
assert.equal(swimwear?.category, "swimwear", "Ayala swim products map to the explicit FoundHer swimwear category");

assert.equal(provider.normalizeProduct({ ...firestoreDocument, fields: { ...firestoreDocument.fields, images: { arrayValue: { values: [] } }, image: undefined } }), undefined, "products without usable images are skipped");
assert.equal(provider.normalizeProduct({ ...firestoreDocument, fields: { ...firestoreDocument.fields, name: { stringValue: "" } } }), undefined, "malformed required fields are skipped");
assert.equal(provider.normalizeProduct({ ...firestoreDocument, fields: { ...firestoreDocument.fields, images: { arrayValue: { values: [{ stringValue: "https://example.com/dress.jpg" }] } } } }), undefined, "untrusted image hosts are rejected");

const malformedProvider = new AyalaFirestoreProvider(async () => new Response("{}", { status: 200 }));
await assert.rejects(() => malformedProvider.getProducts(), /malformed/, "malformed Firestore payloads fail safely");
const failedProvider = new AyalaFirestoreProvider(async () => new Response("unavailable", { status: 503 }));
await assert.rejects(() => failedProvider.getProducts(), /HTTP 503/, "provider/network failures are surfaced to the safe catalog boundary");

assert.equal(getCatalogSourceById("ayala")?.brandName, "אילה שמלות", "Ayala is registered under its exact public brand name");
assert.equal(getCatalogProvider("ayala")?.source.id, "ayala", "the shared catalog service registers the Ayala provider");
assert.equal(getCatalogProvider("mini-allenby")?.source.id, "mini-allenby", "the existing Mini Allenby provider remains registered");
assert.match(ayalaPublicCatalogEndpoint, /firestore\.googleapis\.com\/v1\/projects\/ayala-dresses/, "only the approved public Firestore catalog endpoint is used");

const ayalaLooks = looks.filter(({ productRefs }) => productRefs.every(({ sourceId }) => sourceId === "ayala"));
assert.equal(ayalaLooks.length, 9, "the review set contains nine Ayala candidates including the available swimwear product");
assert(ayalaLooks.every(({ productRefs }) => productRefs.length === 1), "Ayala candidates remain truthful single-dress Looks");
assert(ayalaLooks.every(({ composition, productRefs }) => composition.heroProductId === `ayala:${productRefs[0]?.productId}`), "each Ayala Look resolves its hero from its real product reference");
assert(looks.filter(({ productRefs }) => productRefs.every(({ sourceId }) => sourceId === "mini-allenby")).length === 20, "all twenty Mini Allenby candidates remain intact");

console.log("Ayala catalog tests passed: Firestore normalization, source integrity, optional price, availability, stable references, and provider coexistence.");
