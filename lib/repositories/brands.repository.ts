import { brands } from "@/data/fixtures/brands";
import type { Brand } from "@/domain/brand";

export function getAllBrands(): readonly Brand[] {
  return brands;
}

export function getFeaturedBrands(): readonly Brand[] {
  return brands.filter(({ featured }) => featured);
}

export function getBrandBySlug(slug: string): Brand | undefined {
  return brands.find((brand) => brand.slug === slug);
}
