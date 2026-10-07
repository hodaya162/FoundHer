import type { CatalogProductReference } from "./catalog";

export const LOOK_OCCASIONS = [
  "wedding_guest",
  "evening_event",
  "shabbat",
  "work",
  "everyday",
  "vacation",
  "nursing",
  "holiday",
] as const;

export const LOOK_STYLE_TAGS = [
  "elegant",
  "romantic",
  "minimal",
  "classic",
  "casual",
  "modern",
  "soft",
  "formal",
] as const;

export const LOOK_SEASON_TAGS = [
  "spring",
  "summer",
  "autumn",
  "winter",
  "all_season",
] as const;

export type LookOccasion = (typeof LOOK_OCCASIONS)[number];
export type LookStyleTag = (typeof LOOK_STYLE_TAGS)[number];
export type LookSeasonTag = (typeof LOOK_SEASON_TAGS)[number];

export type LookComposition = {
  readonly heroProductId: string;
};

export type Look = {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly productRefs: readonly CatalogProductReference[];
  readonly composition: LookComposition;
  readonly occasions: readonly LookOccasion[];
  readonly styleTags: readonly LookStyleTag[];
  readonly seasonTags: readonly LookSeasonTag[];
  readonly featured: boolean;
  readonly createdAt: string;
};
