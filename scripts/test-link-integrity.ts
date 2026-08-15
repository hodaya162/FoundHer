import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { extname, join } from "node:path";

import { brands, products, rentalBusinesses } from "@/data/fixtures";
import { desktopNavigationItems, mobileNavigationItems } from "@/config/navigation";
import type { Brand } from "@/domain/brand";
import type { Product } from "@/domain/product";
import type { RentalBusiness } from "@/domain/rental-business";

const blockedHosts = new Set(["example.com", "www.example.com"]);

function assertSafeExternalUrl(value: string, label: string): void {
  const url = new URL(value);

  assert.equal(url.protocol, "https:", `${label} must use HTTPS`);
  assert(!blockedHosts.has(url.hostname), `${label} uses a placeholder host`);
  assert(!value.toLowerCase().includes("fixture"), `${label} contains a fixture marker`);
  assert(!/1555555\d{4}/.test(value), `${label} contains a reserved demo phone number`);
}

const fixtureBrands: readonly Brand[] = brands;
const fixtureProducts: readonly Product[] = products;
const fixtureRentalBusinesses: readonly RentalBusiness[] = rentalBusinesses;

for (const brand of fixtureBrands) {
  assert.equal(typeof brand.isDemo, "boolean", `${brand.id} must declare whether it is demo content`);
  if ("websiteUrl" in brand && brand.websiteUrl) assertSafeExternalUrl(brand.websiteUrl, `${brand.id}.websiteUrl`);
  if ("instagramUrl" in brand && brand.instagramUrl) assertSafeExternalUrl(brand.instagramUrl, `${brand.id}.instagramUrl`);
}

for (const business of fixtureRentalBusinesses) {
  assert.equal(typeof business.isDemo, "boolean", `${business.id} must declare whether it is demo content`);
  if ("websiteUrl" in business && business.websiteUrl) assertSafeExternalUrl(business.websiteUrl, `${business.id}.websiteUrl`);
  if ("instagramUrl" in business && business.instagramUrl) assertSafeExternalUrl(business.instagramUrl, `${business.id}.instagramUrl`);
  if ("whatsappUrl" in business && business.whatsappUrl) assertSafeExternalUrl(business.whatsappUrl, `${business.id}.whatsappUrl`);
}

for (const product of fixtureProducts) {
  if (product.type === "purchase") {
    if ("externalUrl" in product && product.externalUrl) assertSafeExternalUrl(product.externalUrl, `${product.id}.externalUrl`);
  } else if ("availabilityUrl" in product && product.availabilityUrl) {
    assertSafeExternalUrl(product.availabilityUrl, `${product.id}.availabilityUrl`);
  }
}

const publicNavigationHrefs = new Set<string>([...desktopNavigationItems, ...mobileNavigationItems].map(({ href }) => href));
assert(!publicNavigationHrefs.has("/brands"), "the legacy Brands route must not be publicly navigable");
assert(!publicNavigationHrefs.has("/profile"), "the unavailable Profile route must not be publicly navigable");

function collectSourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return collectSourceFiles(path);
    return [".ts", ".tsx"].includes(extname(entry.name)) ? [path] : [];
  });
}

for (const directory of ["app", "components", "features"]) {
  for (const path of collectSourceFiles(directory)) {
    const source = readFileSync(path, "utf8");
    assert(!/href\s*=\s*["']#["']/.test(source), `${path} contains href="#"`);
  }
}

console.log("Link integrity tests passed: external destinations, demo disclosure, navigation, and placeholder hrefs.");
