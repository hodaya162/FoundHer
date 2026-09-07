import type { RentalItem, RentalType } from "@/domain/rental-item";
import { getAllRentals, getRentalsByBusinessId, getRentalsByType } from "@/lib/repositories/rentals.repository";
import { getRentalBusinessById } from "@/lib/repositories/rental-businesses.repository";

import type { RentalCardModel } from "../types/rental-card";

function createRentalCardModel(product: RentalItem): RentalCardModel {
  return {
    ...product,
    rentalBusiness: getRentalBusinessById(product.businessId) ?? null,
    name: product.title,
    city: product.location,
    rentalPrice: product.price ?? product.priceRange?.min ?? 0,
  };
}

export function getRentalCards(filter?: RentalType): readonly RentalCardModel[] {
  return (filter ? getRentalsByType(filter) : getAllRentals()).map(createRentalCardModel);
}

export function getFeaturedRentalCards(): readonly RentalCardModel[] {
  return getAllRentals().filter(({ isDemo }) => isDemo).slice(0, 3).map(createRentalCardModel);
}

export function getOtherRentalCardsByBusinessId(
  rentalBusinessId: string,
  currentProductId: string,
  limit = 3,
): readonly RentalCardModel[] {
  return getRentalsByBusinessId(rentalBusinessId)
    .filter(({ id }) => id !== currentProductId)
    .slice(0, Math.max(0, limit))
    .map(createRentalCardModel);
}
