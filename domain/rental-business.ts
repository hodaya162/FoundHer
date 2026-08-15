import type { ImageAsset } from "./media";

export type RentalBusiness = {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly description: string;
  readonly city: string;
  readonly logo: ImageAsset;
  readonly coverImage: ImageAsset;
  readonly gallery: readonly ImageAsset[];
  readonly websiteUrl?: string;
  readonly whatsappUrl?: string;
  readonly instagramUrl?: string;
  readonly isDemo: boolean;
  readonly featured: boolean;
};
