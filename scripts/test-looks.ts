import assert from "node:assert/strict";

import { filterLooks } from "../features/looks/queries/filter-looks";
import { getLookProductItems } from "../features/looks/queries/get-look-card-models";
import { LOOK_FILTERS, parseLookFilter } from "../features/looks/types/look-filter";
import { getAllLooks } from "../lib/repositories/looks.repository";

const looks = getAllLooks();
assert(looks.length >= 5, "Looks foundation needs enough fixtures for every primary filter");

for (const filter of LOOK_FILTERS.filter((value) => value !== "all")) {
  assert(filterLooks(filter).length > 0, `filter "${filter}" should return at least one Look`);
}

assert.equal(parseLookFilter("unsupported"), "all", "unknown filters fall back safely to all");
assert(filterLooks("shabbat", "קיצית").some(({ slug }) => slug === "natural-shabbat-layers"), "query and occasion filters compose");
assert.equal(filterLooks("work", "זברה בלתי אפשרית").length, 0, "unrelated query returns an empty result");

for (const look of looks) {
  assert(look.items.length >= 2 && look.items.length <= 5, `${look.slug} uses a two-to-five item moodboard`);
  const items = getLookProductItems(look);
  assert.equal(items.length, look.items.length, `${look.slug} resolves every ordered product`);
  assert.deepEqual(items.map(({ product }) => product.id), look.items.map(({ productId }) => productId), `${look.slug} preserves item order`);
  assert(items.every(({ href, product }) => href === `/products/${product.slug}`), `${look.slug} has safe internal product destinations`);
}

const vacation = looks.find(({ slug }) => slug === "city-vacation-layers");
assert(vacation, "the vacation moodboard fixture is required");
const vacationItems = getLookProductItems(vacation);
const categories = new Set(vacationItems.map(({ product }) => product.categoryId));
for (const categoryId of ["category-tops", "category-skirts", "category-shoes", "category-jewelry"]) {
  assert(categories.has(categoryId), `vacation moodboard includes ${categoryId}`);
}

const purchaseBrandIds = vacationItems.flatMap(({ product }) => product.type === "purchase" ? [product.brandId] : []);
assert(new Set(purchaseBrandIds).size < purchaseBrandIds.length, "at least two Look products may come from the same brand");

const expectedOccasionOrder = ["shabbat", "work", "vacation", "evening_event", "everyday"];
assert.deepEqual(looks.map(({ occasions }) => occasions[0]), expectedOccasionOrder, "Look feed opens with varied intentional occasion ordering");

for (const look of looks.slice(0, 4)) {
  const lookCategories = new Set(getLookProductItems(look).map(({ product }) => product.categoryId));
  assert(lookCategories.has("category-shoes"), `${look.slug} includes footwear styling`);
  assert(lookCategories.has("category-jewelry"), `${look.slug} includes jewelry styling`);
}

console.log("Looks tests passed: filters, query composition, ordered moodboards, product routes, and fixture coverage.");
