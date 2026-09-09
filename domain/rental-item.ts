import type { Currency, ProductSize } from "./product";
import type { ProductImage } from "./media";

export type RentalType = "bridal" | "evening";

export type RentalService =
  | "rental"
  | "alterations"
  | "custom_design"
  | "second_bridal_dress";

export type RentalPriceRange = {
  readonly min: number;
  readonly max: number;
};

export type RentalItem = {
  readonly id: string;
  readonly slug: string;
  readonly type: RentalType;
  readonly title: string;
  readonly description: string;
  readonly businessId: string;
  readonly businessName: string;
  readonly location: string;
  readonly images: readonly ProductImage[];
  readonly price?: number;
  readonly priceRange?: RentalPriceRange;
  readonly currency: Currency;
  readonly sizes?: readonly ProductSize[];
  readonly color?: string;
  readonly style?: string;
  readonly services: readonly RentalService[];
  readonly contactUrl?: string;
  readonly isDemo: boolean;
};
