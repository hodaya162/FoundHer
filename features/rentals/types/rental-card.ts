import type { RentalItem } from "@/domain/rental-item";
import type { RentalBusiness } from "@/domain/rental-business";

export type RentalCardModel = RentalItem & {
  readonly rentalBusiness: RentalBusiness | null;
  /** Legacy aliases retained for existing non-Rentals consumers. */
  readonly name: string;
  readonly city: string;
  readonly rentalPrice: number;
};

export type RentalTypeFilter = "all" | "evening" | "bridal";
