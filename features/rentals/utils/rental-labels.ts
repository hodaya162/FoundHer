import type { RentalProduct } from "@/domain/product";

export type RentalProductType = RentalProduct["type"];

export const rentalTypeLabels = {
  rental_evening: "השכרת ערב",
  rental_bridal: "השכרת כלה",
} as const satisfies Record<RentalProductType, string>;

export const compactRentalLabel = "להשכרה";

export function getRentalTypeLabel(type: RentalProductType): string {
  return rentalTypeLabels[type];
}
