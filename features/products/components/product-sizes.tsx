import type { ProductSize } from "@/domain/product";

export type ProductSizesProps = {
  sizes: readonly ProductSize[];
};

export function ProductSizes({ sizes }: ProductSizesProps) {
  if (sizes.length === 0) {
    return <p className="type-body-small text-muted">המידות יעודכנו בקרוב.</p>;
  }

  return (
    <ul aria-label="מידות זמינות" className="flex flex-wrap gap-2">
      {sizes.map((size) => (
        <li key={size} className="flex min-h-11 min-w-11 items-center justify-center rounded-button border border-border bg-surface px-3 text-sm">
          {size === "ONE_SIZE" ? "מידה אחת" : size}
        </li>
      ))}
    </ul>
  );
}
