import { EmptyState } from "@/components/ui";

import type { LookProductItem as LookProductItemModel } from "../types/look-details";
import { LookProductItem } from "./look-product-item";

type LookProductListProps = {
  products: readonly LookProductItemModel[];
  unresolvedCount?: number;
};

export function LookProductList({ products, unresolvedCount = 0 }: LookProductListProps) {
  return (
    <section aria-labelledby="look-products-title" className="border-y border-border/60 py-9 sm:py-14">
      <div className="mb-5 max-w-2xl">
        <p className="type-label text-primary">מרכיבות את הלוק</p>
        <h2 id="look-products-title" className="type-section-title mt-1">הפריטים בלוק</h2>
      </div>
      {products.length > 0 ? (
        <ul className="hide-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:px-0 lg:grid-cols-3">
          {products.map((item) => <LookProductItem key={item.product.id} item={item} />)}
        </ul>
      ) : (
        <EmptyState title="הפריטים אינם זמינים כרגע" description="הלוק נשאר כאן להשראה, והפריטים יחזרו בהמשך." headingLevel={3} />
      )}
      {unresolvedCount > 0 ? (
        <p className="type-caption mt-4" role="status">{unresolvedCount === 1 ? "פריט אחד אינו זמין כרגע." : `${unresolvedCount} פריטים אינם זמינים כרגע.`}</p>
      ) : null}
    </section>
  );
}
