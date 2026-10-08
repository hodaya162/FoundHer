import assert from "node:assert/strict";

import { looks } from "../data/fixtures/looks";
import {
  getEditorialLookPresentation,
  getEditorialPrototypeSlugs,
} from "../features/looks/data/editorial-look-presentations";

const slugs = getEditorialPrototypeSlugs();
assert.deepEqual(slugs, [
  "denim-white-everyday",
  "navy-collar-work",
  "ayala-tevel-wine-event",
]);

const prototypes = slugs.map((slug) => {
  const look = looks.find((candidate) => candidate.slug === slug);
  const presentation = getEditorialLookPresentation(slug);
  assert.ok(look, `Missing prototype Look ${slug}.`);
  assert.ok(presentation, `Missing editorial presentation for ${slug}.`);

  const productIds = new Set(look.productRefs.map(({ productId, sourceId }) => `${sourceId}:${productId}`));
  assert.ok(productIds.has(presentation.dominant.productId), `${slug} dominant image must reference a real Look product.`);
  if (presentation.supporting) {
    assert.ok(productIds.has(presentation.supporting.productId), `${slug} supporting image must reference a real Look product.`);
  }
  return { look, presentation };
});

assert.equal(prototypes[0].look.productRefs.length, 2);
assert.equal(prototypes[1].look.productRefs.length, 2);
assert.equal(prototypes[2].look.productRefs.length, 1);
assert.equal(prototypes[2].presentation.singleProductConcept, true);
assert.equal(new Set(prototypes.map(({ presentation }) => presentation.variant)).size, 3);

console.log("Editorial Looks prototype tests passed.");
