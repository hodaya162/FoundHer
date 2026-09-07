import { rentals } from "@/data/fixtures/rentals";
import type { RentalItem, RentalType } from "@/domain/rental-item";

export function getAllRentals(): readonly RentalItem[] {
  return rentals;
}

export function getRentalsByType(type: RentalType): readonly RentalItem[] {
  return rentals.filter((rental) => rental.type === type);
}

export function getRentalBySlug(slug: string): RentalItem | undefined {
  return rentals.find((rental) => rental.slug === slug);
}

export function getRentalsByBusinessId(businessId: string): readonly RentalItem[] {
  return rentals.filter((rental) => rental.businessId === businessId);
}
