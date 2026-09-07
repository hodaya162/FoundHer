import type { RentalCardModel } from "../types/rental-card";
import { RentalCard } from "./rental-card";

type RentalGridProps = {
  products: readonly RentalCardModel[];
  headingLevel?: 2 | 3;
  prioritizeFirst?: boolean;
};

export function RentalGrid({ headingLevel = 3, prioritizeFirst = true, products }: RentalGridProps) {
  return (
    <div className="grid grid-cols-2 gap-x-2.5 gap-y-7 sm:gap-x-4 sm:gap-y-9 lg:grid-cols-3">
      {products.map((product, index) => (
        <RentalCard
          key={product.id}
          product={product}
          priority={prioritizeFirst && index < 2}
          headingLevel={headingLevel}
        />
      ))}
    </div>
  );
}
