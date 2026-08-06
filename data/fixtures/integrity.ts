import type { Product } from "@/domain/product";
import {
  LOOK_OCCASIONS,
  LOOK_SEASON_TAGS,
  LOOK_STYLE_TAGS,
} from "@/domain/look";
import type { Look } from "@/domain/look";
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
  const fixtureLooks: readonly Look[] = looks;
  const fixtureProducts: readonly Product[] = products;

  validateUniqueEntities("products", products, errors);
  validateUniqueEntities("brands", brands, errors);
  validateUniqueEntities("rental businesses", rentalBusinesses, errors);
  validateUniqueEntities("looks", looks, errors);
  validateUniqueEntities("categories", categories, errors);

  const productIds = new Set<string>(products.map(({ id }) => id));
  const brandIds = new Set<string>(brands.map(({ id }) => id));
  const rentalBusinessIds = new Set<string>(rentalBusinesses.map(({ id }) => id));
  const categoryIds = new Set<string>(categories.map(({ id }) => id));
  const validOccasions = new Set<string>(LOOK_OCCASIONS);
  const validStyleTags = new Set<string>(LOOK_STYLE_TAGS);
  const validSeasonTags = new Set<string>(LOOK_SEASON_TAGS);

  for (const product of fixtureProducts) {
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

  for (const look of fixtureLooks) {
    if (look.productIds.length === 0) {
      errors.push(`look "${look.id}" must reference at least one product`);
    }

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

    for (const occasion of look.occasions) {
      if (!validOccasions.has(occasion)) {
        errors.push(`look "${look.id}" has invalid occasion "${occasion}"`);
      }
    }

    for (const styleTag of look.styleTags) {
      if (!validStyleTags.has(styleTag)) {
        errors.push(`look "${look.id}" has invalid style tag "${styleTag}"`);
      }
    }

    for (const seasonTag of look.seasonTags) {
      if (!validSeasonTags.has(seasonTag)) {
        errors.push(`look "${look.id}" has invalid season tag "${seasonTag}"`);
      }
    }
  }

  const hasMixedCommerceLook = fixtureLooks.some((look) => {
    const lookProducts = look.productIds
      .map((productId) => fixtureProducts.find(({ id }) => id === productId))
      .filter((product): product is Product => Boolean(product));

    return lookProducts.some(isPurchaseProduct) && lookProducts.some(isRentalProduct);
  });

  if (!hasMixedCommerceLook) {
    errors.push("looks: expected at least one fixture combining purchase and rental products");
  }

  return { valid: errors.length === 0, errors };
}

export function assertFixtureIntegrity(): void {
  const result = validateFixtureIntegrity();
  if (!result.valid) {
    throw new Error(`Fixture integrity validation failed:\n${result.errors.join("\n")}`);
  }
}
