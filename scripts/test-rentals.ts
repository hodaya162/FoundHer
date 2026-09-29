import assert from "node:assert/strict";
import { existsSync } from "node:fs";

import { getRentalCards } from "../features/rentals/queries/get-rental-cards";
import { getRentalBusinessDetailsBySlug } from "../features/rentals/queries/get-rental-business-details-by-slug";
import { getRentalBusinessBySlug } from "../lib/repositories/rental-businesses.repository";
import { getAllRentals, getRentalBySlug } from "../lib/repositories/rentals.repository";
import {
  buildBusinessWhatsAppUrl,
  buildRentalWhatsAppUrl,
  businessWhatsAppMessage,
  createRentalWhatsAppMessage,
} from "../features/rentals/utils/whatsapp";

const rentals = getAllRentals();
const bridal = getRentalCards("bridal");
const evening = getRentalCards("evening");

assert(rentals.length > 0, "rental fixtures are required");
assert(bridal.length > 0, "bridal feed is populated");
assert(evening.length > 0, "evening feed is populated");
assert.equal(bridal.length, 5, "public bridal feed contains five real dresses");
assert.equal(evening.length, 5, "public evening feed contains five real dresses");
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

const businessWhatsAppUrl = new URL(buildBusinessWhatsAppUrl(shosBusiness!.whatsappUrl!));
assert.equal(`${businessWhatsAppUrl.origin}${businessWhatsAppUrl.pathname}`, "https://wa.me/972537207193", "business WhatsApp destination remains unchanged");
assert.equal(businessWhatsAppUrl.searchParams.get("text"), businessWhatsAppMessage, "business WhatsApp message preserves Hebrew and emoji");

const productName = "שמלת ערב תחרה שחורה";
const productWhatsAppUrl = new URL(buildRentalWhatsAppUrl(shosBusiness!.whatsappUrl!, productName));
assert.equal(`${productWhatsAppUrl.origin}${productWhatsAppUrl.pathname}`, "https://wa.me/972537207193", "product WhatsApp destination remains unchanged");
assert.equal(productWhatsAppUrl.searchParams.get("text"), createRentalWhatsAppMessage(productName), "product WhatsApp message preserves Hebrew, emoji, and quotation marks");
assert(createRentalWhatsAppMessage().includes("ראיתי שמלה באתר"), "missing product names use the generic WhatsApp fallback");

for (const route of ["app/rentals/page.tsx", "app/rentals/bridal/page.tsx", "app/rentals/evening/page.tsx", "app/rentals/[slug]/page.tsx"]) {
  assert(existsSync(route), `${route} exists`);
}

console.log("Rentals tests passed: route structure, strict intent separation, Shos data, honest pricing, and image provenance.");
