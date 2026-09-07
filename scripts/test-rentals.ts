import assert from "node:assert/strict";
import { existsSync } from "node:fs";

import { getRentalCards } from "../features/rentals/queries/get-rental-cards";
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
assert(shosItems.some(({ type }) => type === "bridal"), "Shos is represented in bridal");
assert(shosItems.some(({ type }) => type === "evening"), "Shos is represented in evening");
assert(shosItems.every(({ price }) => price === undefined), "Shos does not expose invented individual prices");
assert(shosItems.every(({ images }) => images.every(({ url }) => !url.includes("/generated/"))), "Shos never uses generated imagery");
assert.deepEqual(shosItems.find(({ type }) => type === "bridal")?.priceRange, { min: 4500, max: 9000 });
assert.deepEqual(shosItems.find(({ type }) => type === "evening")?.priceRange, { min: 500, max: 1500 });
assert(getRentalBySlug("shos-classic-bridal"), "known rental detail slug resolves");

for (const route of ["app/rentals/page.tsx", "app/rentals/bridal/page.tsx", "app/rentals/evening/page.tsx", "app/rentals/[slug]/page.tsx"]) {
  assert(existsSync(route), `${route} exists`);
}

console.log("Rentals tests passed: route structure, strict intent separation, Shos data, honest pricing, and image provenance.");
