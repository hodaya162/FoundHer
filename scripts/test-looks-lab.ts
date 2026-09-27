import assert from "node:assert/strict";

import { getLabLooks } from "../features/looks-lab/queries/get-lab-looks";
import { LOOK_LAB_VARIANTS } from "../features/looks-lab/types/look-lab";

const looks = getLabLooks();
assert.equal(looks.length, 8, "Looks Lab contains exactly eight visual experiments");

const firstEight = looks.slice(0, 8);
const everyday = firstEight.filter(({ look }) => look.category === "everyday");
assert(everyday.length >= 4, "at least four Lab Looks are Everyday");

const dressLed = firstEight.filter(({ hero }) => hero.product.type !== "purchase" || hero.product.categoryId === "category-dresses");
assert(dressLed.length <= 2, "at most two Lab Looks are dress-led");

const separatesLed = firstEight.filter(({ look, hero, supporting }) => {
  const categories = new Set([hero, ...supporting].map(({ product }) => product.categoryId));
  return look.category !== "event" && (categories.has("category-skirts") || hero.product.categoryId === "category-skirts");
});
assert(separatesLed.length >= 5, "at least five Lab Looks are skirt/separates-led");

for (const model of firstEight) {
  const assets = [model.hero, ...model.supporting];
  const categories = new Set(assets.map(({ product }) => product.categoryId));
  assert(categories.has("category-shoes"), `${model.look.slug} includes footwear`);
  assert(categories.has("category-jewelry"), `${model.look.slug} includes jewelry/accessory styling`);
  assert(assets.every(({ modestySafe, moodboardReady }) => modestySafe && moodboardReady), `${model.look.slug} excludes unsafe or unready assets`);
  assert.equal(new Set(assets.map(({ productId }) => productId)).size, assets.length, `${model.look.slug} does not duplicate products`);
}

const modelHero = looks.find(({ look }) => look.layoutVariant === "model-hero");
assert(modelHero, "a real model-photo Hero example exists");
assert.equal(modelHero.hero.source, "real", "model Hero is classified as a real source asset");
assert.equal(modelHero.hero.assetType, "model", "model Hero keeps its original photo treatment");
assert.equal(modelHero.hero.backgroundRemovalSafe, false, "model Hero cannot be background-removed");
assert(!modelHero.hero.image.url.includes("/generated/"), "model Hero does not use a generated image path");

assert(new Set(looks.map(({ look }) => look.layoutVariant)).size >= 4, "all four deterministic layout variants are represented");
for (const variant of LOOK_LAB_VARIANTS) assert(looks.some(({ look }) => look.layoutVariant === variant), `${variant} has a Lab example`);

for (let index = 1; index < firstEight.length; index += 1) {
  const previous = firstEight[index - 1];
  const current = firstEight[index];
  const previousShoe = [previous.hero, ...previous.supporting].find(({ product }) => product.categoryId === "category-shoes")?.productId;
  const currentShoe = [current.hero, ...current.supporting].find(({ product }) => product.categoryId === "category-shoes")?.productId;
  assert.notEqual(previousShoe, currentShoe, "adjacent Lab Looks vary footwear");
}

console.log("Looks Lab tests passed: eight Hero-led Looks, asset safety, mix, variants, footwear, and real model-photo handling.");
