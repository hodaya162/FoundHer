import { looks } from "@/data/fixtures/looks";
import type {
  Look,
  LookOccasion,
  LookSeasonTag,
  LookStyleTag,
} from "@/domain/look";

const allLooks: readonly Look[] = looks;

export function getAllLooks(): readonly Look[] {
  return allLooks;
}

export function getFeaturedLooks(): readonly Look[] {
  return allLooks.filter(({ featured }) => featured);
}

export function getLookBySlug(slug: string): Look | undefined {
  return allLooks.find((look) => look.slug === slug);
}

export function getLooksByOccasion(occasion: LookOccasion): readonly Look[] {
  return allLooks.filter(({ occasions }) => occasions.includes(occasion));
}

export function getLooksByStyle(style: LookStyleTag): readonly Look[] {
  return allLooks.filter(({ styleTags }) => styleTags.includes(style));
}

export function getLooksBySeason(season: LookSeasonTag): readonly Look[] {
  return allLooks.filter(({ seasonTags }) => seasonTags.includes(season));
}

export function getLooksByProductId(productId: string): readonly Look[] {
  return allLooks.filter(({ productIds }) => productIds.includes(productId));
}

export function getLooksByBrandId(brandId: string): readonly Look[] {
  return allLooks.filter(({ brandIds }) => brandIds.includes(brandId));
}
