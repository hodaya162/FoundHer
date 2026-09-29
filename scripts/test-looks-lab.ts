import assert from "node:assert/strict";

import { getLabLooks } from "../features/looks-lab/queries/get-lab-looks";

const looks = getLabLooks();
assert.equal(looks.length, 8, "Looks Lab contains exactly eight asset-compatible experiments");

const firstThree = looks.slice(0, 3);
assert.deepEqual(
  firstThree.map(({ hero }) => hero.productId),
  ["lab-product-denim-maxi-skirt", "product-demo-champagne-satin-maxi-skirt", "rental-soft-satin-evening-dress"],
  "the review set demonstrates two product boards followed by one full model photograph",
);
assert.deepEqual(
  firstThree.map(({ layout }) => layout),
  ["flatlay-editorial", "flatlay-alternative", "photo-editorial"],
  "layout selection follows the available asset composition",
);

for (const model of firstThree.slice(0, 2)) {
  const assets = [model.hero, ...model.supporting];
  assert(assets.every(({ assetType }) => ["product-cutout", "detail"].includes(assetType)), `${model.look.slug} uses only clean product/detail sources`);
  assert(assets.every(({ backgroundRemovalSafe }) => backgroundRemovalSafe), `${model.look.slug} uses existing clean transparent demo assets`);
}

const photoLook = firstThree[2];
assert.equal(photoLook.hero.source, "real", "the photo-led Hero is the original repository source");
assert.equal(photoLook.hero.assetType, "model-full", "the model photograph is classified as MODEL_FULL");
assert.equal(photoLook.hero.backgroundRemovalSafe, false, "the full model photograph cannot be background-removed");
assert(!photoLook.hero.image.url.includes("/generated/"), "the full model photograph is not a generated asset");
assert(photoLook.supporting.every(({ assetType }) => ["product-cutout", "product-studio", "detail"].includes(assetType)), "photo companions are separately rendered products/details");

for (const model of looks) {
  const assets = [model.hero, ...model.supporting];
  const categories = new Set(assets.map(({ product }) => product.categoryId));
  assert(categories.has("category-shoes"), `${model.look.slug} includes footwear`);
  assert(categories.has("category-jewelry"), `${model.look.slug} includes jewelry/accessory styling`);
  assert(assets.every(({ modestySafe, moodboardReady, assetType }) => modestySafe && moodboardReady && assetType !== "unsuitable"), `${model.look.slug} excludes unsafe, unsuitable, or unready imagery`);
  assert.equal(new Set(assets.map(({ productId }) => productId)).size, assets.length, `${model.look.slug} does not duplicate products`);
  assert(model.look.palette.length >= 4 && model.look.palette.length <= 5, `${model.look.slug} has four or five outfit-derived palette colors`);
  assert(/^#[0-9A-F]{6}$/i.test(model.look.canvasTone), `${model.look.slug} has a valid subtle canvas tone`);
}

const labOnlyAssets = firstThree.flatMap(({ hero, supporting }) => [hero, ...supporting]).filter(({ isLabOnly }) => isLabOnly);
assert(labOnlyAssets.length > 0, "the Preview identifies internal lab-only demo assets");
assert(labOnlyAssets.every(({ href }) => href === undefined), "lab-only visual assets never expose fake Product destinations");

console.log("Looks Lab tests passed: asset-first layout selection, two clean product boards, full original model photography, safe companions, and lab-only links.");
