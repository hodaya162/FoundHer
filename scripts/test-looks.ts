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
for (const categoryId of ["category-dresses", "category-shoes", "category-jewelry"]) {
  assert(categories.has(categoryId), `vacation moodboard includes ${categoryId}`);
}

const purchaseBrandIds = vacationItems.flatMap(({ product }) => product.type === "purchase" ? [product.brandId] : []);
assert(new Set(purchaseBrandIds).size < purchaseBrandIds.length, "at least two Look products may come from the same brand");

const expectedOccasionOrder = ["everyday", "shabbat", "work", "vacation", "evening_event"];
assert.deepEqual(looks.slice(0, expectedOccasionOrder.length).map(({ occasions }) => occasions[0]), expectedOccasionOrder, "Look feed opens with varied intentional occasion ordering");
const everydayLooks = looks.filter(({ occasions }) => occasions.includes("everyday"));
assert(everydayLooks.length >= 6, "Everyday discovery includes a varied set of complete Looks");

const firstEightLooks = looks.slice(0, 8);
for (const look of firstEightLooks) {
  const lookCategories = new Set(getLookProductItems(look).map(({ product }) => product.categoryId));
  assert(lookCategories.has("category-shoes"), `${look.slug} includes footwear styling`);
  assert(lookCategories.has("category-jewelry"), `${look.slug} includes jewelry styling`);
}

const firstEightDressLed = firstEightLooks.filter((look) => {
  const primary = getLookProductItems(look)[0]?.product;
  return primary?.categoryId === "category-dresses" || primary?.type !== "purchase";
});
assert(firstEightDressLed.length <= 2, "the first eight Looks use at most two dress-led compositions");

const firstEightSeparatesLed = firstEightLooks.filter((look) => {
  const lookCategories = new Set(getLookProductItems(look).map(({ product }) => product.categoryId));
  return lookCategories.has("category-tops") && lookCategories.has("category-skirts");
});
assert(firstEightSeparatesLed.length >= 5, "the first eight Looks use at least five separates or layered compositions");

const firstEightEveryday = firstEightLooks.filter(({ occasions }) => occasions.includes("everyday"));
assert(firstEightEveryday.length >= 3, "the first eight Looks include at least three everyday compositions");

for (const categoryId of ["category-shoes", "category-jewelry"]) {
  const accessoryIds = firstEightLooks.map((look) => {
    const item = getLookProductItems(look).find(({ product }) => product.categoryId === categoryId);
    assert(item, `${look.slug} resolves its ${categoryId} styling item`);
    return item.product.id;
  });
  for (let index = 1; index < accessoryIds.length; index += 1) {
    assert.notEqual(accessoryIds[index], accessoryIds[index - 1], `${categoryId} does not repeat in adjacent Looks`);
  }
  const counts = new Map<string, number>();
  for (const id of accessoryIds) counts.set(id, (counts.get(id) ?? 0) + 1);
  assert([...counts.values()].every((count) => count <= 2), `${categoryId} products appear at most twice in the first eight Looks`);
}

const denimLook = looks.find(({ slug }) => slug === "everyday-denim-and-black");
assert(denimLook, "the everyday denim-and-black Look is required");
const denimCategories = new Set(getLookProductItems(denimLook).map(({ product }) => product.categoryId));
for (const categoryId of ["category-tops", "category-skirts", "category-shoes", "category-jewelry"]) {
  assert(denimCategories.has(categoryId), `everyday denim Look includes ${categoryId}`);
}

const everydaySeparates = everydayLooks.filter((look) => {
  const lookCategories = new Set(getLookProductItems(look).map(({ product }) => product.categoryId));
  return lookCategories.has("category-tops") && lookCategories.has("category-skirts");
});
assert(everydaySeparates.length >= 3, "Everyday Looks include at least three top-and-skirt combinations rather than only dresses");

console.log("Looks tests passed: filters, query composition, ordered moodboards, product routes, and fixture coverage.");
