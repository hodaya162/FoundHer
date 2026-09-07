import type { ImageAsset } from "./media";
import type { RentalService } from "./rental-item";

export type RentalBusiness = {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly ownerName?: string;
  readonly description: string;
  readonly city: string;
  readonly logo: ImageAsset;
  readonly coverImage: ImageAsset;
  readonly gallery: readonly ImageAsset[];
  readonly services?: readonly RentalService[];
  readonly bridalPriceRange?: { readonly min: number; readonly max: number };
  readonly eveningPriceRange?: { readonly min: number; readonly max: number };
  readonly websiteUrl?: string;
  readonly whatsappUrl?: string;
  readonly instagramUrl?: string;
  readonly isDemo: boolean;
  readonly featured: boolean;
};
