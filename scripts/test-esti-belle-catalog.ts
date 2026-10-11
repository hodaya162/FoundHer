import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";

import { ESTI_BELLE_CONTACT, ESTI_BELLE_SOURCE, getCatalogSourceById } from "../config/catalog-sources";
import { estiBelleManualCatalog } from "../data/catalog/manual/esti-belle";
import { looks } from "../data/fixtures/looks";
import { getCatalogProvider, resolveCatalogProductReferences } from "../lib/catalog/catalog-service";
import { ManualCatalogProvider } from "../lib/catalog/providers/manual-catalog-provider";

const expected = [
  ["esti-belle-01", "IMG-20261006-WA0038.jpg", "esti-belle-modest-evening-dress-01.jpg", 800],
  ["esti-belle-02", "IMG-20261006-WA0042.jpg", "esti-belle-modest-evening-dress-02.jpg", 800],
  ["esti-belle-03", "IMG-20261006-WA0035.jpg", "esti-belle-modest-evening-dress-03.jpg", 650],
  ["esti-belle-04", "IMG-20261006-WA0036.jpg", "esti-belle-modest-evening-dress-04.jpg", 749],
  ["esti-belle-05", "IMG-20261006-WA0040.jpg", "esti-belle-modest-evening-dress-05.jpg", 749],
  ["esti-belle-06", "IMG-20261006-WA0044.jpg", "esti-belle-modest-evening-dress-06.jpg", 850],
  ["esti-belle-07", "IMG-20261006-WA0037.jpg", "esti-belle-modest-evening-dress-07.jpg", 800],
  ["esti-belle-08", "IMG-20261006-WA0039.jpg", "esti-belle-modest-evening-dress-08.jpg", 749],
  ["esti-belle-09", "IMG-20261006-WA0041.jpg", "esti-belle-modest-evening-dress-09.jpg", 849],
  ["esti-belle-10", "IMG-20261006-WA0043.jpg", "esti-belle-modest-evening-dress-10.jpg", 849],
] as const;

assert.equal(estiBelleManualCatalog.length, 10, "exactly ten authorized Esti Belle records are present");
assert.equal(getCatalogSourceById("esti-belle")?.type, "manual");
assert.equal(getCatalogProvider("esti-belle")?.source.id, "esti-belle");
assert.equal(ESTI_BELLE_CONTACT.whatsappUrl, undefined, "no WhatsApp destination is invented");

const provider = new ManualCatalogProvider(ESTI_BELLE_SOURCE, estiBelleManualCatalog);
const products = await provider.getProducts();
assert.equal(products.length, 10);

expected.forEach(([externalId, originalFilename, assetFilename, price], index) => {
  const source = estiBelleManualCatalog[index];
  const product = products[index];
  assert(source && product);
  assert.equal(source.externalId, externalId);
  assert.equal(source.originalSourceFilename, originalFilename);
  assert.equal(source.assetFilename, assetFilename);
  assert.equal(source.price, price);
  assert.equal(product.id, `esti-belle:${externalId}`);
  assert.equal(product.externalId, externalId);
  assert.equal(product.price, price);
  assert.equal(product.sourceId, "esti-belle");
  assert.equal(product.brand, "Esti Belle");
  assert.equal(product.category, "dresses");
  assert.equal(product.available, undefined, "stock remains explicitly unknown");
  assert.equal(product.purchaseType, "contact");
  assert.equal(product.contactChannel, "instagram");
  assert.match(product.title, /^שמלת ערב Esti Belle \d{2}$/);
  assert.equal(product.images[0]?.url, `/images/catalog/esti-belle/${assetFilename}`);
  assert(existsSync(join(process.cwd(), "public", "images", "catalog", "esti-belle", assetFilename)));
});

assert.equal(provider.normalizeProduct({ ...estiBelleManualCatalog[0], images: [] }), undefined, "manual records without images are rejected");
assert.equal(provider.normalizeProduct({ ...estiBelleManualCatalog[0], price: 0 }), undefined, "invalid prices are rejected");

const estiLooks = looks.filter(({ productRefs }) => productRefs.some(({ sourceId }) => sourceId === "esti-belle"));
assert.equal(estiLooks.length, 3, "only a small curated Esti Belle review set is created");
for (const look of estiLooks) {
  assert.equal(look.productRefs.length, 1);
  assert.equal(look.composition.heroProductId, `esti-belle:${look.productRefs[0]?.productId}`);
}

const resolved = await resolveCatalogProductReferences(estiLooks.flatMap(({ productRefs }) => productRefs), { availableOnly: true });
assert.equal(resolved.products.length, 3, "unknown stock does not falsely mark contact-required products unavailable");
assert.equal(resolved.unavailableSourceIds.length, 0);

console.log("Esti Belle manual catalog tests passed.");
