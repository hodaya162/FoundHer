import { ProductGrid } from "@/features/products/components";
import type { PurchaseProductCard } from "@/features/products/types/product-card";

import { EditorialSection } from "./editorial-section";

type NewArrivalsProps = {
  products: readonly PurchaseProductCard[];
};

export function NewArrivals({ products }: NewArrivalsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <EditorialSection
      id="selected-products-title"
      eyebrow="פריטים נבחרים"
      title="חדש ב־FoundHer"
      description="כמה פריטים שכדאי להכיר — למי שכבר יודעת מה היא מחפשת."
      actionHref="/discover"
      actionLabel="לעוד פריטים"
    >
      <ProductGrid products={products} priorityCount={0} />
    </EditorialSection>
  );
}
