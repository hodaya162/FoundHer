import assert from "node:assert/strict";

import { getLabLooks } from "../features/looks-lab/queries/get-lab-looks";
import { LOOK_LAB_VARIANTS } from "../features/looks-lab/types/look-lab";

const looks = getLabLooks();
assert.equal(looks.length, 8, "Looks Lab contains exactly eight visual experiments");

const firstEight = looks.slice(0, 8);
const firstThree = firstEight.slice(0, 3);
assert.deepEqual(
  firstThree.map(({ hero }) => hero.productId),
  ["lab-product-denim-maxi-skirt", "product-demo-champagne-satin-maxi-skirt", "lab-product-black-maxi-skirt"],
  "the approved first three Looks keep denim, cream, and black maxi Heroes",
);
assert(firstThree.every(({ hero, supporting }) => [hero, ...supporting].every(({ backgroundRemovalSafe }) => backgroundRemovalSafe)), "the approved first three Looks use clean transparent assets without visible product boxes");
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
  assert(model.look.palette.length >= 4 && model.look.palette.length <= 5, `${model.look.slug} has four or five outfit-derived palette colors`);
  assert(/^#[0-9A-F]{6}$/i.test(model.look.canvasTone), `${model.look.slug} has a valid subtle canvas tone`);
}

const labOnlyAssets = firstThree.flatMap(({ hero, supporting }) => [hero, ...supporting]).filter(({ isLabOnly }) => isLabOnly);
assert(labOnlyAssets.length > 0, "the Preview identifies internal lab-only demo assets");
assert(labOnlyAssets.every(({ href }) => href === undefined), "lab-only visual assets never expose fake Product destinations");

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

console.log("Looks Lab tests passed: approved first-three art direction, palettes, clean assets, safe lab-only links, eight Hero-led Looks, variants, footwear, and real model-photo handling.");
