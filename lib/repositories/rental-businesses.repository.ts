import { rentalBusinesses } from "@/data/fixtures/rental-businesses";
import type { RentalBusiness } from "@/domain/rental-business";

export function getAllRentalBusinesses(): readonly RentalBusiness[] {
  return rentalBusinesses;
}

export function getFeaturedRentalBusinesses(): readonly RentalBusiness[] {
  return rentalBusinesses.filter(({ featured }) => featured);
}

export function getRentalBusinessBySlug(slug: string): RentalBusiness | undefined {
  return rentalBusinesses.find((business) => business.slug === slug);
}
