import { looks } from "@/data/fixtures/looks";
import type { Look } from "@/domain/look";

export function getAllLooks(): readonly Look[] {
  return looks;
}

export function getFeaturedLooks(): readonly Look[] {
  return looks.filter(({ featured }) => featured);
}

export function getLookBySlug(slug: string): Look | undefined {
  return looks.find((look) => look.slug === slug);
}
