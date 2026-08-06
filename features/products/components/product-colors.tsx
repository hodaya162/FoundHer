import type { ProductColor } from "@/domain/product";

export type ProductColorsProps = {
  colors: readonly ProductColor[];
};

export function ProductColors({ colors }: ProductColorsProps) {
  if (colors.length === 0) {
    return <p className="type-body-small text-muted">הצבעים יעודכנו בקרוב.</p>;
  }

  return (
    <ul aria-label="צבעים זמינים" className="flex flex-wrap gap-3">
      {colors.map((color) => (
        <li key={color.id} className="flex items-center gap-2 text-sm">
          <span
            aria-hidden="true"
            className="size-7 rounded-full border border-border shadow-sm"
            style={{ backgroundColor: color.hex }}
          />
          <span>{color.name}</span>
        </li>
      ))}
    </ul>
  );
}
