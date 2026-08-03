import { categories } from "@/data/fixtures/categories";
import type { Category } from "@/domain/category";

export function getAllCategories(): readonly Category[] {
  return categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}
