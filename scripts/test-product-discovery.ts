import assert from "node:assert/strict";

import { getDiscoverProductCards } from "../features/products/queries/get-discover-product-cards";
import { getRentalCards } from "../features/rentals/queries/get-rental-cards";

const all = getDiscoverProductCards();
const purchases = getDiscoverProductCards("purchase");
const rentals = getDiscoverProductCards("rental");
const sourceRentals = getRentalCards();
const eveningRentals = getRentalCards("evening");
const bridalRentals = getRentalCards("bridal");

assert.equal(sourceRentals.length, 10, "the approved public Shos fixture set contains 10 rentals");
assert.equal(rentals.length, eveningRentals.length, "all public Shos evening rentals surface in Products");
assert.equal(rentals.length, 5, "Products surfaces the five approved Shos evening dresses");
assert(bridalRentals.every(({ id }) => rentals.every((rental) => rental.id !== id)), "bridal dresses remain outside Products");
assert(purchases.length > 0, "existing purchase demos remain available");
assert(purchases.every(({ transactionType }) => transactionType === "purchase"), "purchase filter contains only purchase items");
assert(rentals.every(({ transactionType }) => transactionType === "rental"), "rental filter contains only rental items");

const rentalCards = rentals.filter((card) => card.transactionType === "rental");

for (const rental of rentalCards) {
  const source = eveningRentals.find(({ id }) => id === rental.id);
  assert(source, `rental discovery card ${rental.id} reuses an existing Rental entity`);
  assert.equal(rental.sourceType, "rental", "rental cards retain their source type");
  assert.equal(rental.href, `/rentals/${source.slug}`, "rental cards link to existing Rental details");
  assert.equal(rental.id, source.id, "rental favorite identity is unchanged across surfaces");
  assert.equal(rental.image.url, source.images[0]?.url, "rental discovery reuses the real source image");
  assert.deepEqual(rental.priceRange, source.priceRange, "rental discovery reuses the source price range");
}

assert.equal(all.length, purchases.length + rentals.length, "mixed catalog contains every source entity exactly once");
assert.equal(new Set(all.map(({ id }) => id)).size, all.length, "mixed catalog contains no duplicate entity IDs");
assert(all.slice(0, 4).some(({ transactionType }) => transactionType === "purchase"), "opening feed contains purchase items");
assert(all.slice(0, 4).some(({ transactionType }) => transactionType === "rental"), "opening feed contains rental items");

console.log("Product discovery tests passed: source reuse, filters, routing, favorites identity, and mixed ordering.");
