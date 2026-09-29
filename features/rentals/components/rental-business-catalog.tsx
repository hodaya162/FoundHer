"use client";

import { useMemo, useState } from "react";

import type { RentalType } from "@/domain/rental-item";
import { cn } from "@/lib/utils";

import type { RentalCardModel } from "../types/rental-card";
import { RentalGrid } from "./rental-grid";
import { RentalSection } from "./rental-section";

type RentalBusinessCatalogProps = {
  businessName: string;
  products: readonly RentalCardModel[];
};

const categoryLabels: Record<RentalType, string> = {
  bridal: "שמלות כלה",
  evening: "שמלות ערב",
};

export function RentalBusinessCatalog({ businessName, products }: RentalBusinessCatalogProps) {
  const [category, setCategory] = useState<RentalType>("bridal");
  const visibleProducts = useMemo(
    () => products.filter(({ type }) => type === category),
    [category, products],
  );

  return (
    <RentalSection
      title={`השמלות של ${businessName}`}
      titleId="business-rentals-title"
      description={`${visibleProducts.length} ${categoryLabels[category]}`}
    >
      <div className="mb-5 flex border-b border-border/70" role="tablist" aria-label="קטגוריית שמלות">
        {(Object.keys(categoryLabels) as RentalType[]).map((value) => (
          <button
            key={value}
            id={`business-rentals-${value}-tab`}
            type="button"
            role="tab"
            aria-selected={category === value}
            aria-controls="business-rentals-panel"
            onClick={() => setCategory(value)}
            className={cn(
              "relative min-h-11 px-4 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
              category === value
                ? "font-semibold text-foreground after:absolute after:inset-x-3 after:bottom-[-1px] after:h-0.5 after:bg-primary"
                : "text-muted hover:text-foreground",
            )}
          >
            {categoryLabels[value]}
          </button>
        ))}
      </div>
      <div id="business-rentals-panel" role="tabpanel" aria-labelledby={`business-rentals-${category}-tab`}>
        <RentalGrid products={visibleProducts} headingLevel={3} featureOddFinalOnMobile />
      </div>
    </RentalSection>
  );
}
