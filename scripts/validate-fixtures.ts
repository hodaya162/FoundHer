import {
  brands,
  categories,
  looks,
  products,
  rentalBusinesses,
} from "@/data/fixtures";
import { assertFixtureIntegrity } from "@/data/fixtures/integrity";

assertFixtureIntegrity();

const purchaseProducts = products.filter(({ type }) => type === "purchase");
const eveningRentals = products.filter(({ type }) => type === "rental_evening");
const bridalRentals = products.filter(({ type }) => type === "rental_bridal");

console.log("Fixture integrity validation passed.");
console.log({
  purchaseProducts: purchaseProducts.length,
  eveningRentals: eveningRentals.length,
  bridalRentals: bridalRentals.length,
  brands: brands.length,
  rentalBusinesses: rentalBusinesses.length,
  looks: looks.length,
  categories: categories.length,
});
