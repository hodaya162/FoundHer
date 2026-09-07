import type { ImageAsset } from "./media";

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

export type LookItem = {
  readonly productId: string;
  /** Selects a specific original product image when a product has more than one. */
  readonly imageId?: string;
};

export type Look = {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly story: string;
  readonly coverImage: ImageAsset;
  /** Ordered, independently sourced products that compose the moodboard. */
  readonly items: readonly LookItem[];
  readonly brandIds: readonly string[];
  readonly occasions: readonly LookOccasion[];
  readonly styleTags: readonly LookStyleTag[];
  readonly seasonTags: readonly LookSeasonTag[];
  readonly featured: boolean;
  readonly isDemo: boolean;
  readonly createdAt: string;
};
