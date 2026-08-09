import { EmptyState } from "@/components/ui";

import type { LookProductItem as LookProductItemModel } from "../types/look-details";
import { LookProductItem } from "./look-product-item";

type LookProductListProps = {
  products: readonly LookProductItemModel[];
  unresolvedCount?: number;
};

export function LookProductList({ products, unresolvedCount = 0 }: LookProductListProps) {
  return (
    <section aria-labelledby="look-products-title" className="border-y border-border py-14 sm:py-20">
      <div className="mb-7 max-w-2xl">
        <p className="type-label text-primary">מרכיבות את הלוק</p>
        <h2 id="look-products-title" className="type-section-title mt-2">הפריטים בלוק</h2>
        <p className="type-body-small mt-3 text-muted">כל פריט מוביל לעמוד המלא שלו, לרכישה או לבדיקת זמינות להשכרה.</p>
      </div>
      {products.length > 0 ? (
        <ul className="grid gap-4 lg:grid-cols-2">
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
