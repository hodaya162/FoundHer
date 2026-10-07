import { EmptyState } from "@/components/ui";

import type { LookProductItem as LookProductItemModel } from "../types/look-details";
import { LookProductItem } from "./look-product-item";

type LookProductListProps = {
  products: readonly LookProductItemModel[];
  unresolvedCount?: number;
  catalogUnavailable?: boolean;
};

export function LookProductList({ catalogUnavailable = false, products, unresolvedCount = 0 }: LookProductListProps) {
  return (
    <section aria-labelledby="look-products-title" className="border-y border-border/70 py-10 sm:py-16">
      <div className="mb-5 max-w-2xl">
        <p className="type-label text-primary">מרכיבות את הלוק</p>
        <h2 id="look-products-title" className="type-section-title mt-1">הפריטים בלוק</h2>
      </div>
      {products.length > 0 ? (
        <ul className="grid gap-3 sm:grid-cols-2">
          {products.map((item) => <LookProductItem key={item.product.id} item={item} />)}
        </ul>
      ) : (
        <EmptyState
          title="הפריטים אינם זמינים כרגע"
          description={catalogUnavailable ? "הקטלוג החיצוני אינו זמין זמנית. אפשר לנסות שוב בהמשך." : "הלוק נשאר כאן להשראה, והפריטים יחזרו בהמשך."}
          headingLevel={3}
        />
      )}
      {unresolvedCount > 0 ? (
        <p className="type-caption mt-4" role="status">{unresolvedCount === 1 ? "פריט אחד אינו זמין כרגע." : `${unresolvedCount} פריטים אינם זמינים כרגע.`}</p>
      ) : null}
    </section>
  );
}
