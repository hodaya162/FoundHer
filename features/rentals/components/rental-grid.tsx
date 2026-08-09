import type { RentalCardModel } from "../types/rental-card";
import { RentalCard } from "./rental-card";

type RentalGridProps = {
  products: readonly RentalCardModel[];
  headingLevel?: 2 | 3;
  prioritizeFirst?: boolean;
};

export function RentalGrid({ headingLevel = 3, prioritizeFirst = true, products }: RentalGridProps) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product, index) => (
        <RentalCard
          key={product.id}
          product={product}
          priority={prioritizeFirst && index === 0}
          headingLevel={headingLevel}
        />
      ))}
    </div>
  );
}
