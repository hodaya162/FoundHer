import type { RentalCardModel } from "../types/rental-card";
import { cn } from "@/lib/utils";
import { RentalCard } from "./rental-card";

type RentalGridProps = {
  products: readonly RentalCardModel[];
  headingLevel?: 2 | 3;
  prioritizeFirst?: boolean;
  featureOddFinalOnMobile?: boolean;
};

export function RentalGrid({ featureOddFinalOnMobile = false, headingLevel = 3, prioritizeFirst = true, products }: RentalGridProps) {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-4 sm:gap-y-9 lg:grid-cols-3">
      {products.map((product, index) => {
        const isFeaturedFinal = featureOddFinalOnMobile && products.length % 2 === 1 && index === products.length - 1;

        return (
          <div key={product.id} className={cn(isFeaturedFinal && "col-span-2 sm:col-span-1")}>
            <RentalCard
              product={product}
              priority={prioritizeFirst && index < 2}
              headingLevel={headingLevel}
              featuredMobile={isFeaturedFinal}
            />
          </div>
        );
      })}
    </div>
  );
}
