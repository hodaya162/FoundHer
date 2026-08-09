import { getProductsByRentalBusinessId } from "@/lib/repositories/products.repository";
import { getRentalBusinessBySlug } from "@/lib/repositories/rental-businesses.repository";

import type { RentalBusinessDetails } from "../types/rental-business-details";

export function getRentalBusinessDetailsBySlug(slug: string): RentalBusinessDetails | undefined {
  const business = getRentalBusinessBySlug(slug);

  if (!business) {
    return undefined;
  }

  return {
    business,
    products: getProductsByRentalBusinessId(business.id).map((product) => ({
      ...product,
      rentalBusiness: business,
    })),
  };
}
