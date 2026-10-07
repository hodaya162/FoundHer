import assert from "node:assert/strict";

import { MINI_ALLENBY_SOURCE } from "../config/catalog-sources";
import { looks } from "../data/fixtures/looks";
import { mapCatalogCategory, normalizeCatalogValue } from "../lib/catalog/normalization";
import { MiniAllenbyShopifyProvider } from "../lib/catalog/providers/mini-allenby-shopify-provider";

const product = {
  id: 12345,
  title: "חצאית ג'ינס מקסי",
  handle: "maxi-denim-skirt",
  body_html: "<p>חצאית <strong>ארוכה</strong></p><script>alert(1)</script>",
  product_type: "Skirts",
  tags: ["maxi", "denim"],
  options: [
    { name: "Color", position: 1, values: ["BLACK", "black", "grey", "gary"] },
    { name: "Size", position: 2, values: ["S", "s", "M"] },
  ],
  images: [
    { id: 91, src: "https://cdn.shopify.com/s/files/1/test/skirt.jpg", width: 800, height: 1200 },
  ],
  variants: [
    { id: 1, title: "Black / S", price: "79.90", compare_at_price: "99.90", sku: "SK-1", available: true, option1: "BLACK", option2: "s", image_id: 91 },
    { id: 2, title: "Gray / M", price: "89.90", compare_at_price: null, sku: "SK-2", available: false, option1: "gary", option2: "M", image_id: null },
  ],
};

const provider = new MiniAllenbyShopifyProvider(async () => new Response(JSON.stringify({ products: [product] }), {
  status: 200,
  headers: { "Content-Type": "application/json" },
}));

const products = await provider.getProducts();
const normalized = products[0];
assert(normalized, "a valid Shopify product is normalized");
assert.equal(normalized.id, "mini-allenby:12345", "stable IDs combine source and external ID");
assert.equal(normalized.sourceId, MINI_ALLENBY_SOURCE.id);
assert.equal(normalized.brand, "Mini Allenby");
assert.equal(normalized.price, 79.9, "price strings convert to numeric ILS values");
assert.equal(normalized.compareAtPrice, 99.9);
assert.equal(normalized.category, "skirts");
assert.equal(normalized.available, true, "availability is derived from variants");
assert.equal(normalized.variants[1]?.available, false, "variant availability is preserved");
assert.deepEqual(normalized.colors.map(({ normalized: value }) => value), ["black", "gray"]);
assert.deepEqual(normalized.sizes.map(({ normalized: value }) => value), ["S", "M"]);
assert.equal(normalized.colors[0]?.raw, "BLACK", "raw option values are retained");
assert.equal(normalized.variants[0]?.size?.raw, "s");
assert(!normalized.description?.includes("script"), "HTML is converted to safe plain text");
assert.equal(normalized.productUrl, "https://miniallenby.co.il/products/maxi-denim-skirt");
assert.equal((await provider.getProductByHandle("maxi-denim-skirt"))?.id, normalized.id, "handles resolve through the provider abstraction");

const soldOut = provider.normalizeProduct({
  ...product,
  id: 222,
  variants: product.variants.map((variant) => ({ ...variant, available: false })),
});
assert.equal(soldOut?.available, false, "sold-out products remain importable but are marked unavailable");

assert.equal(provider.normalizeProduct({ ...product, id: 333, images: [] }), undefined, "products without usable images are ignored");
assert.equal(provider.normalizeProduct({ ...product, id: 444, variants: [] }), undefined, "products without valid variants are ignored");
assert.equal(provider.normalizeProduct({ ...product, id: 555, title: "Gift Card", handle: "gift-card" }), undefined, "gift cards are ignored");
assert.equal(provider.normalizeProduct({ ...product, id: 666, images: [{ src: "http://example.com/image.jpg" }] }), undefined, "untrusted image hosts are ignored");

assert.equal(normalizeCatalogValue("Black").normalized, "black");
assert.equal(normalizeCatalogValue("gary").normalized, "gray");
assert.equal(normalizeCatalogValue("m").normalized, "M");
assert.equal(mapCatalogCategory({ title: "גקט בלון" }), "outerwear");
assert.equal(mapCatalogCategory({ title: "חולצה קלאסית" }), "tops");
assert.equal(mapCatalogCategory({ title: "פריט לא מסווג" }), "other");

const malformedProvider = new MiniAllenbyShopifyProvider(async () => new Response("{}", { status: 200 }));
await assert.rejects(() => malformedProvider.getProducts(), /malformed/, "malformed payloads fail safely");
const failedProvider = new MiniAllenbyShopifyProvider(async () => new Response("unavailable", { status: 503 }));
await assert.rejects(() => failedProvider.getProducts(), /HTTP 503/, "provider failures are surfaced to the safe service boundary");

assert(looks.every((look) => look.productRefs.every(({ sourceId }) => sourceId === "mini-allenby")), "live Look slots reference the real catalog source only");
assert(looks.every((look) => look.productRefs.every(({ productId }) => /^\d+$/.test(productId))), "Look product refs use stable Shopify IDs rather than embedded product objects");
assert.equal(looks.length, 20, "the visual curation set contains twenty real candidate Looks");
assert(looks.filter(({ productRefs }) => productRefs.length > 1).length >= 15, "the candidate set prioritizes separates over single dresses");
assert(looks.every((look) => look.productRefs.some(({ productId, sourceId }) => `${sourceId}:${productId}` === look.composition.heroProductId)), "every Look hero is one of its real catalog references");
assert(looks.every((look) => !Object.hasOwn(look, "coverImage")), "Looks do not store unrelated or generated cover images");
const prototypeLooks = looks.filter(({ composition }) => composition.prototype);
assert.deepEqual(prototypeLooks.map(({ id }) => id), ["look-candidate-01", "look-candidate-02", "look-candidate-04"], "only candidates #01, #02 and #04 use the visual prototype");
assert(prototypeLooks.every((look) => {
  const refs = new Set(look.productRefs.map(({ productId, sourceId }) => `${sourceId}:${productId}`));
  const prototype = look.composition.prototype;
  return prototype && refs.has(prototype.dominant.productId) && refs.has(prototype.supporting.productId);
}), "prototype imagery resolves only from products that compose the Look");
assert.equal(looks.filter(({ composition }) => !composition.prototype).length, 17, "the other seventeen candidates retain their existing renderer");

console.log("Catalog tests passed: normalization, categories, stable IDs, availability, malformed data, and provider failure.");
