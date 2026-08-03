import type { Product } from "@/domain/product";
import { brands } from "./brands";
import { categories } from "./categories";
import { looks } from "./looks";
import { products } from "./products";
import { rentalBusinesses } from "./rental-businesses";

export type FixtureIntegrityResult = {
  readonly valid: boolean;
  readonly errors: readonly string[];
};

type IdentifiableFixture = {
  readonly id: string;
  readonly slug: string;
};

function findDuplicates(values: readonly string[]): readonly string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }

  return [...duplicates];
}

function validateUniqueEntities(
  label: string,
  entities: readonly IdentifiableFixture[],
  errors: string[],
): void {
  for (const duplicate of findDuplicates(entities.map(({ id }) => id))) {
    errors.push(`${label}: duplicate id "${duplicate}"`);
  }

  for (const duplicate of findDuplicates(entities.map(({ slug }) => slug))) {
    errors.push(`${label}: duplicate slug "${duplicate}"`);
  }
}

function isPurchaseProduct(product: Product): product is Extract<Product, { type: "purchase" }> {
  return product.type === "purchase";
}

function isRentalProduct(product: Product): product is Extract<Product, { type: "rental_evening" | "rental_bridal" }> {
  return product.type === "rental_evening" || product.type === "rental_bridal";
}

export function validateFixtureIntegrity(): FixtureIntegrityResult {
  const errors: string[] = [];

  validateUniqueEntities("products", products, errors);
  validateUniqueEntities("brands", brands, errors);
  validateUniqueEntities("rental businesses", rentalBusinesses, errors);
  validateUniqueEntities("looks", looks, errors);
  validateUniqueEntities("categories", categories, errors);

  const productIds = new Set(products.map(({ id }) => id));
  const brandIds = new Set(brands.map(({ id }) => id));
  const rentalBusinessIds = new Set(rentalBusinesses.map(({ id }) => id));
  const categoryIds = new Set(categories.map(({ id }) => id));

  for (const product of products) {
    if (!categoryIds.has(product.categoryId)) {
      errors.push(`product "${product.id}" references missing category "${product.categoryId}"`);
    }

    if (isPurchaseProduct(product) && !brandIds.has(product.brandId)) {
      errors.push(`product "${product.id}" references missing brand "${product.brandId}"`);
    }

    if (isRentalProduct(product) && !rentalBusinessIds.has(product.rentalBusinessId)) {
      errors.push(`product "${product.id}" references missing rental business "${product.rentalBusinessId}"`);
    }
  }

  for (const look of looks) {
    for (const productId of look.productIds) {
      if (!productIds.has(productId)) {
        errors.push(`look "${look.id}" references missing product "${productId}"`);
      }
    }

    for (const brandId of look.brandIds) {
      if (!brandIds.has(brandId)) {
        errors.push(`look "${look.id}" references missing brand "${brandId}"`);
      }
    }
  }

  return { valid: errors.length === 0, errors };
}

export function assertFixtureIntegrity(): void {
  const result = validateFixtureIntegrity();
  if (!result.valid) {
    throw new Error(`Fixture integrity validation failed:\n${result.errors.join("\n")}`);
  }
}
