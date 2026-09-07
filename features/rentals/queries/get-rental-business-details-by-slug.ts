import { getRentalBusinessBySlug } from "@/lib/repositories/rental-businesses.repository";

import type { RentalBusinessDetails } from "../types/rental-business-details";
import { getRentalCards } from "./get-rental-cards";

export function getRentalBusinessDetailsBySlug(slug: string): RentalBusinessDetails | undefined {
  const business = getRentalBusinessBySlug(slug);

  if (!business) {
    return undefined;
  }

  return {
    business,
    products: getRentalCards().filter(({ businessId }) => businessId === business.id),
  };
}
