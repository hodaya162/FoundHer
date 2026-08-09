import type { RentalProduct } from "@/domain/product";
import type { RentalBusiness } from "@/domain/rental-business";

export type RentalCardModel = RentalProduct & {
  readonly rentalBusiness: RentalBusiness | null;
};

export type RentalTypeFilter = "all" | "evening" | "bridal";
