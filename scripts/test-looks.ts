import assert from "node:assert/strict";

import { getLookCardModels } from "../features/looks/queries/get-look-card-models";

const looks = getLookCardModels();

assert(looks.length >= 6 && looks.length <= 8, "the demo exposes 6–8 curated Looks");

for (const { look, products, startingPrice } of looks) {
  assert(products.length >= 2 && products.length <= 5, `${look.id} resolves 2–5 catalog products`);
  assert.equal(products.length, look.productIds.length, `${look.id} has no unresolved product references`);
  assert(!look.heroProductId || look.productIds.includes(look.heroProductId), `${look.id} hero belongs to the Look`);
  assert(look.editorialHeroImage.url.includes("/images/generated/looks/editorial-flatlays/"), `${look.id} uses a separate editorial demo hero`);
  assert(startingPrice !== null && startingPrice > 0, `${look.id} derives a valid starting price`);
  for (const product of products) {
    assert(product.images[0]?.url, `${look.id} uses a source image from product ${product.id}`);
  }
}

assert(getLookCardModels("everyday").every(({ look }) => look.occasions.includes("everyday")), "everyday filter is exact");
assert(getLookCardModels("work").every(({ look }) => look.occasions.includes("work")), "work filter is exact");
assert(getLookCardModels("shabbat").every(({ look }) => look.occasions.includes("shabbat")), "Shabbat filter is exact");
assert(getLookCardModels("vacation").every(({ look }) => look.occasions.includes("vacation")), "vacation filter is exact");
assert(getLookCardModels("event").every(({ look }) => look.occasions.some((occasion) => occasion === "evening_event" || occasion === "wedding_guest")), "event filter covers event occasions");

console.log("Looks tests passed: curated count, editorial heroes, product resolution, pricing, and occasion filters.");
