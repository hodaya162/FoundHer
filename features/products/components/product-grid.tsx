import { ResponsiveGrid } from "@/components/layout";

import type { ProductCardModel } from "../types/product-card";
import { ProductCard } from "./product-card";
import { ProductEmptyState } from "./product-empty-state";

export type ProductGridProps = {
  products: readonly ProductCardModel[];
  priorityCount?: number;
};

export function ProductGrid({ products, priorityCount = 2 }: ProductGridProps) {
  if (products.length === 0) {
    return <ProductEmptyState />;
  }

  return (
    <ResponsiveGrid columns={4} role="list" aria-label="פריטי אופנה">
      {products.map((product, index) => (
        <div key={product.id} role="listitem">
          <ProductCard product={product} priority={index < priorityCount} />
        </div>
      ))}
    </ResponsiveGrid>
  );
}
