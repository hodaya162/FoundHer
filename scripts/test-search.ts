import assert from "node:assert/strict";

import { searchFoundHer } from "../features/search/queries/search-foundher";
import { getAllLooks } from "../lib/repositories/looks.repository";
import { getAllProducts } from "../lib/repositories/products.repository";
import ayalaSnapshot from "../data/catalog-snapshots/ayala.json";
import miniAllenbySnapshot from "../data/catalog-snapshots/mini-allenby.json";
import type { CatalogProduct } from "../domain/catalog";

const catalogProducts = [...miniAllenbySnapshot.products, ...ayalaSnapshot.products] as CatalogProduct[];
const search = (query: string) => searchFoundHer(query, { catalogProducts });

const firstLook = getAllLooks()[0];
const firstPurchase = getAllProducts().find((product) => product.type === "purchase");
const firstRental = getAllProducts().find((product) => product.type !== "purchase");

assert(firstLook, "A Look fixture is required for Search tests");
assert(firstPurchase, "A purchase Product fixture is required for Search tests");
assert(firstRental, "A rental Product fixture is required for Search tests");

assert.equal((await search("   ")).total, 0, "empty queries return no results");

const exactLook = await search(firstLook.title);
assert.equal(exactLook.looks[0]?.id, firstLook.id, "an exact Look title ranks its Look first");

const purchase = await search("Mini Allenby");
assert(purchase.products.some(({ sellerName }) => sellerName === "Mini Allenby"), "real catalog products are searchable by brand");
assert.equal(purchase.products[0]?.entityType, "product", "purchase Products retain their result type");

const brand = await search("אילה שמלות");
assert.equal(brand.brands[0]?.title, "אילה שמלות", "a real catalog brand is searchable");

const rentalByCity = await search("השכרה ירושלים");
assert.equal(rentalByCity.rentals.length, 0, "demo rental Products are excluded from public Search");
assert.equal(rentalByCity.rentalBusinesses.length, 0, "demo rental Businesses are excluded from public Search");

const multiword = await search("לוק שבת");
assert(multiword.looks.length > 0, "a two-word query can match across Look fields");

assert.equal((await search("זברה סגולה בלתי אפשרית")).total, 0, "an unrelated query returns no results");

const titleRelevance = await search(purchase.products[0]?.title ?? "");
assert(titleRelevance.products.length > 0, "an exact real catalog title is searchable");

const rental = await search(firstRental.name);
assert.equal(rental.rentals.length, 0, "demo rental Products never surface in public Search");
assert(!rental.products.some(({ id }) => id === firstRental.id), "a rental Product is never classified as purchase");

for (const query of ["שוס עיצובים", "כלה", "ערב", "שתולים", "אשדוד"]) {
  assert((await search(query)).rentalBusinesses.some(({ slug }) => slug === "shos-designs"), `Shos is discoverable for ${query}`);
}

assert.equal(exactLook.looks[0]?.href, `/looks/${firstLook.slug}`, "Look result URLs target Look details");
assert(purchase.products[0]?.href.startsWith("https://"), "real catalog results target the original merchant");
assert.equal((await search("Rental Business B")).rentalBusinesses.length, 0, "Rental Business B never surfaces in public Search");

console.log("Search tests passed: empty, relevance, entity grouping, multiword matching, and URLs.");
