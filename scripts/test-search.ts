import assert from "node:assert/strict";

import { searchFoundHer } from "../features/search/queries/search-foundher";
import { getAllLooks } from "../lib/repositories/looks.repository";
import { getAllProducts } from "../lib/repositories/products.repository";

const firstLook = getAllLooks()[0];
const firstPurchase = getAllProducts().find((product) => product.type === "purchase");
const firstRental = getAllProducts().find((product) => product.type !== "purchase");

assert(firstLook, "A Look fixture is required for Search tests");
assert(firstPurchase, "A purchase Product fixture is required for Search tests");
assert(firstRental, "A rental Product fixture is required for Search tests");

assert.equal(searchFoundHer("   ").total, 0, "empty queries return no results");

const exactLook = searchFoundHer(firstLook.title);
assert.equal(exactLook.looks[0]?.id, firstLook.id, "an exact Look title ranks its Look first");

const purchase = searchFoundHer(firstPurchase.name);
assert.equal(purchase.products[0]?.id, firstPurchase.id, "a Product name finds the purchase Product");
assert.equal(purchase.products[0]?.entityType, "product", "purchase Products retain their result type");

const brand = searchFoundHer("Brand A");
assert.equal(brand.brands[0]?.title, "Brand A", "a Brand name finds the Brand");

const rentalByCity = searchFoundHer("השכרה ירושלים");
assert(rentalByCity.rentals.length > 0, "rental intent and city find rental Products");

const multiword = searchFoundHer("לוק שבת");
assert(multiword.looks.length > 0, "a two-word query can match across Look fields");

assert.equal(searchFoundHer("זברה סגולה בלתי אפשרית").total, 0, "an unrelated query returns no results");

const titleRelevance = searchFoundHer(firstPurchase.name);
assert.equal(titleRelevance.products[0]?.title, firstPurchase.name, "an exact title outranks partial matches");

const rental = searchFoundHer(firstRental.name);
assert.equal(rental.rentals[0]?.entityType, "rental_product", "rental Products are separated from purchase Products");
assert(!rental.products.some(({ id }) => id === firstRental.id), "a rental Product is never classified as purchase");

assert.equal(exactLook.looks[0]?.href, `/looks/${firstLook.slug}`, "Look result URLs target Look details");
assert.equal(purchase.products[0]?.href, `/products/${firstPurchase.slug}`, "Product result URLs target Product details");
assert.equal(rental.rentals[0]?.href, `/products/${firstRental.slug}`, "Rental result URLs target Product details");

console.log("Search tests passed: empty, relevance, entity grouping, multiword matching, and URLs.");
