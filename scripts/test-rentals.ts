import assert from "node:assert/strict";
import { existsSync } from "node:fs";

import { getRentalCards } from "../features/rentals/queries/get-rental-cards";
import { getRentalBusinessBySlug } from "../lib/repositories/rental-businesses.repository";
import { getAllRentals, getRentalBySlug } from "../lib/repositories/rentals.repository";

const rentals = getAllRentals();
const bridal = getRentalCards("bridal");
const evening = getRentalCards("evening");

assert(rentals.length > 0, "rental fixtures are required");
assert(bridal.length > 0, "bridal feed is populated");
assert(evening.length > 0, "evening feed is populated");
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
assert(getRentalBySlug("shos-classic-bridal"), "known rental detail slug resolves");
assert(getRentalBySlug("shos-black-evening"), "known evening rental detail slug resolves");

for (const route of ["app/rentals/page.tsx", "app/rentals/bridal/page.tsx", "app/rentals/evening/page.tsx", "app/rentals/[slug]/page.tsx"]) {
  assert(existsSync(route), `${route} exists`);
}

console.log("Rentals tests passed: route structure, strict intent separation, Shos data, honest pricing, and image provenance.");
