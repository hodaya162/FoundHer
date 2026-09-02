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
  return allLooks.filter(({ items }) => items.some((item) => item.productId === productId));
}

export function getLooksByBrandId(brandId: string): readonly Look[] {
  return allLooks.filter(({ brandIds }) => brandIds.includes(brandId));
}

/** Returns related looks by shared occasion, then style and season, with stable fixture ordering. */
export function getSimilarLooks(look: Look, limit = 3): readonly Look[] {
  if (limit <= 0) return [];

  return allLooks
    .map((candidate, index) => ({
      candidate,
      index,
      score: candidate.id === look.id
        ? 0
        : Number(candidate.occasions.some((value) => look.occasions.includes(value))) * 3
          + Number(candidate.styleTags.some((value) => look.styleTags.includes(value))) * 2
          + Number(candidate.seasonTags.some((value) => look.seasonTags.includes(value))),
    }))
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score || left.index - right.index)
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}
