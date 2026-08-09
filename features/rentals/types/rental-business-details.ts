import type { RentalBusiness } from "@/domain/rental-business";

import type { RentalCardModel } from "./rental-card";

export type RentalBusinessDetails = {
  readonly business: RentalBusiness;
  readonly products: readonly RentalCardModel[];
};
