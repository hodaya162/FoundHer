import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

import { getRentalCards } from "../features/rentals/queries/get-rental-cards";
import { getRentalBusinessDetailsBySlug } from "../features/rentals/queries/get-rental-business-details-by-slug";
import { getRentalBusinessBySlug } from "../lib/repositories/rental-businesses.repository";
import { getAllRentals, getRentalBySlug } from "../lib/repositories/rentals.repository";
import {
  buildBusinessWhatsAppUrl,
  buildProviderRentalWhatsAppUrl,
  buildRentalWhatsAppUrl,
  businessWhatsAppMessage,
  createRentalProductUrl,
  createProviderRentalWhatsAppMessage,
  createRentalWhatsAppMessage,
} from "../features/rentals/utils/whatsapp";

const rentals = getAllRentals();
const bridal = getRentalCards("bridal");
const evening = getRentalCards("evening");

assert(rentals.length > 0, "rental fixtures are required");
assert(bridal.length > 0, "bridal feed is populated");
assert(evening.length > 0, "evening feed is populated");
assert.equal(bridal.length, 5, "public bridal feed contains five real dresses");
assert.equal(evening.length, 8, "public evening feed contains five Shos and three Tehila dresses");
assert(bridal.every(({ isDemo }) => !isDemo), "public bridal feed excludes demo rentals");
assert(evening.every(({ isDemo }) => !isDemo), "public evening feed excludes demo rentals");
assert(rentals.some(({ isDemo }) => isDemo), "demo fixtures remain available for development and tests");
assert(bridal.every((item) => item.type === "bridal"), "bridal feed never includes evening dresses");
assert(evening.every((item) => item.type === "evening"), "evening feed never includes bridal dresses");
assert.equal(new Set(rentals.map(({ id }) => id)).size, rentals.length, "rental ids are unique");
assert.equal(new Set(rentals.map(({ slug }) => slug)).size, rentals.length, "rental slugs are unique");

const shosItems = rentals.filter(({ businessName }) => businessName === "שוס עיצובים");
const shosBusiness = getRentalBusinessBySlug("shos-designs");
assert.equal(shosItems.filter(({ type }) => type === "bridal").length, 5, "Shos has five curated bridal entries");
assert.equal(shosItems.filter(({ type }) => type === "evening").length, 5, "Shos has five curated evening entries");
assert(shosItems.every(({ price }) => price === undefined), "Shos does not expose invented individual prices");
assert(shosItems.every(({ images }) => images.every(({ url }) => !url.includes("/generated/"))), "Shos never uses generated imagery");
assert(shosItems.every(({ images }) => images.every(({ url }) => existsSync(`public${url}`))), "every Shos image exists locally");
assert(shosItems.every(({ isDemo }) => isDemo === false), "Shos is always real content");
assert(shosItems.every(({ sizes, color, style }) => sizes === undefined && color === undefined && style === undefined), "Shos filters contain no invented metadata");
assert(shosItems.filter(({ type }) => type === "bridal").every(({ priceRange }) => priceRange?.min === 4500 && priceRange.max === 9000), "all Shos bridal entries use the verified business range");
assert(shosItems.filter(({ type }) => type === "evening").every(({ priceRange }) => priceRange?.min === 500 && priceRange.max === 1500), "all Shos evening entries use the verified business range");
assert.equal(shosBusiness?.isDemo, false, "Shos business is real content");
assert.equal(shosBusiness?.city, "מושב שתולים, ליד אשדוד");
assert.equal(shosBusiness?.whatsappUrl, "https://wa.me/972537207193");
assert.equal(shosBusiness?.instagramUrl, "https://www.instagram.com/noa_shosef_israel");
assert.equal(shosBusiness?.coverImage.url, "/images/rentals/shos/shos-evening-black-lace-ballgown-01.webp");
assert(getRentalBusinessDetailsBySlug("shos-designs")?.products.every(({ isDemo }) => !isDemo), "Shos business catalog contains real items only");
assert(getRentalBySlug("shos-classic-bridal"), "known rental detail slug resolves");
assert(getRentalBySlug("shos-black-evening"), "known evening rental detail slug resolves");

const tehilaItems = rentals.filter(({ sourceId }) => sourceId === "tehila-borkhov");
const tehilaBusiness = getRentalBusinessBySlug("tehila-borkhov");
const expectedTehila = [
  {
    id: "tehila-borkhov-rental-01", price: 800, sizeRange: "S–XL", primary: "IMG-20261011-WA0098.jpg",
    filenames: ["IMG-20261011-WA0098.jpg", "IMG-20261011-WA0105.jpg", "IMG-20261011-WA0101.jpg", "IMG-20261011-WA0106.jpg", "IMG-20261011-WA0103.jpg", "IMG-20261011-WA0099.jpg", "IMG-20261011-WA0108.jpg", "IMG-20261011-WA0102.jpg", "IMG-20261011-WA0104.jpg", "IMG-20261011-WA0100.jpg", "IMG-20261011-WA0107.jpg"],
  },
  {
    id: "tehila-borkhov-rental-02", price: 600, sizeRange: "S–M", primary: "IMG-20261011-WA0113.jpg",
    filenames: ["IMG-20261011-WA0109.jpg", "IMG-20261011-WA0110.jpg", "IMG-20261011-WA0111.jpg", "IMG-20261011-WA0117.jpg", "IMG-20261011-WA0113.jpg", "IMG-20261011-WA0112.jpg", "IMG-20261011-WA0115.jpg", "IMG-20261011-WA0119.jpg", "IMG-20261011-WA0114.jpg", "IMG-20261011-WA0116.jpg", "IMG-20261011-WA0118.jpg"],
  },
  {
    id: "tehila-borkhov-rental-03", price: 800, sizeRange: "XS–M", primary: "IMG-20261011-WA0120.jpg",
    filenames: ["IMG-20261011-WA0120.jpg", "IMG-20261011-WA0121.jpg", "IMG-20261011-WA0122.jpg", "IMG-20261011-WA0123.jpg", "IMG-20261011-WA0125.jpg", "IMG-20261011-WA0129.jpg", "IMG-20261011-WA0127.jpg", "IMG-20261011-WA0124.jpg", "IMG-20261011-WA0126.jpg", "IMG-20261011-WA0128.jpg"],
  },
] as const;

assert.equal(tehilaItems.length, 3, "Tehila export creates exactly three rental listings");
for (const expected of expectedTehila) {
  const item = tehilaItems.find(({ id }) => id === expected.id);
  assert(item, `${expected.id} resolves by stable id`);
  assert.equal(item.slug, expected.id, `${expected.id} has a stable route slug`);
  assert.equal(item.type, "evening", `${expected.id} is an evening rental`);
  assert.equal(item.price, expected.price, `${expected.id} keeps its exact rental price`);
  assert.equal(item.sizeRange, expected.sizeRange, `${expected.id} keeps its verified size range`);
  assert.equal(item.images.length, expected.filenames.length, `${expected.id} keeps its exact image count`);
  assert.deepEqual(item.images.map(({ url }) => url.split("/").at(-1)).toSorted(), [...expected.filenames].toSorted(), `${expected.id} keeps its authoritative image group`);
  assert.equal(item.images[0]?.url.split("/").at(-1), expected.primary, `${expected.id} uses the visually selected primary image`);
  assert(item.images.every(({ url }) => existsSync(`public${url}`)), `${expected.id} images all exist locally`);
  assert.equal(item.availabilityStatus, "date-coordination", `${expected.id} never exposes a fake stock state`);
  assert.equal(item.contactType, "whatsapp", `${expected.id} exposes its verified WhatsApp contact state`);
  assert.equal(item.contactUrl, undefined, `${expected.id} does not invent contact information`);
  assert.equal(item.priceRange, undefined, `${expected.id} uses its verified rental price, not a purchase/range fallback`);
}
assert.equal(new Set(tehilaItems.flatMap(({ images }) => images.map(({ url }) => url))).size, 32, "Tehila gallery mapping contains 32 unique authorized images");
assert(tehilaItems.every(({ sourceType }) => sourceType === "manual-rental"), "Tehila uses the manual rental source type");
assert(tehilaItems.every(({ color }) => color === undefined), "Tehila items expose no image-inferred color metadata");
assert.equal(tehilaBusiness?.whatsappUrl, "https://wa.me/972532242193", "Tehila verified phone is normalized to 972532242193");
assert.equal(tehilaBusiness?.instagramUrl, "https://www.instagram.com/tehila_borochov", "Tehila uses the verified canonical Instagram URL");
for (const item of tehilaItems) {
  const message = createProviderRentalWhatsAppMessage("תהילה בורכוב", item.title);
  const whatsappLink: globalThis.URL = new globalThis.URL(buildProviderRentalWhatsAppUrl(tehilaBusiness!.whatsappUrl!, "תהילה בורכוב", item.title));
  assert.equal(`${whatsappLink.origin}${whatsappLink.pathname}`, "https://wa.me/972532242193", `${item.id} opens the verified WhatsApp number`);
  assert.equal(whatsappLink.searchParams.get("text"), message, `${item.id} includes its own title in the prefilled message`);
  assert(whatsappLink.toString().includes("text="), `${item.id} encodes the prefilled WhatsApp message`);
}
const rentalDetailSource = readFileSync("features/rentals/components/rental-detail.tsx", "utf8");
assert(!rentalDetailSource.includes("פרטי הקשר יתווספו לאחר אימות"), "verified contact UI removes the old pending-contact helper");

const businessWhatsAppUrl = new URL(buildBusinessWhatsAppUrl(shosBusiness!.whatsappUrl!));
assert.equal(`${businessWhatsAppUrl.origin}${businessWhatsAppUrl.pathname}`, "https://wa.me/972537207193", "business WhatsApp destination remains unchanged");
assert.equal(businessWhatsAppUrl.searchParams.get("text"), businessWhatsAppMessage, "business WhatsApp message preserves Hebrew and emoji");

const productSlug = "shos-black-evening";
const previewEnvironment = { VERCEL_URL: "foundher-preview.vercel.app" };
const productUrl = createRentalProductUrl(productSlug, previewEnvironment);
const productWhatsAppUrl = new URL(buildRentalWhatsAppUrl(shosBusiness!.whatsappUrl!, productSlug, previewEnvironment));
assert.equal(`${productWhatsAppUrl.origin}${productWhatsAppUrl.pathname}`, "https://wa.me/972537207193", "product WhatsApp destination remains unchanged");
assert.equal(productUrl, "https://foundher-preview.vercel.app/rentals/shos-black-evening", "product URL uses the exact rental slug and current FoundHer origin");
assert.equal(productWhatsAppUrl.searchParams.get("text"), createRentalWhatsAppMessage(productUrl), "product WhatsApp message preserves Hebrew, emoji, line breaks, and the product URL");
assert.equal(
  productWhatsAppUrl.searchParams.get("text"),
  "היי, הגעתי אליכן דרך FoundHer 🌸\nהתעניינתי בשמלה הזאת:\nhttps://foundher-preview.vercel.app/rentals/shos-black-evening\nאשמח לקבל פרטים לגבי השכרה וזמינות.",
  "product WhatsApp message matches the approved copy",
);

for (const route of ["app/rentals/page.tsx", "app/rentals/bridal/page.tsx", "app/rentals/evening/page.tsx", "app/rentals/[slug]/page.tsx"]) {
  assert(existsSync(route), `${route} exists`);
}

console.log("Rentals tests passed: route structure, strict intent separation, Shos and Tehila data, honest pricing, and image provenance.");
