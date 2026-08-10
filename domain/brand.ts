import type { ImageAsset } from "./media";

export type Brand = {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly description: string;
  readonly logo: ImageAsset;
  readonly coverImage: ImageAsset;
  readonly websiteUrl?: string;
  readonly instagramUrl?: string;
  readonly isDemo: boolean;
  readonly featured: boolean;
};
