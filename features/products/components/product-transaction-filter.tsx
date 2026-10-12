import Link from "next/link";

import { cn } from "@/lib/utils";

import type { ProductTransactionFilter } from "../types/product-card";

const options: readonly { value: ProductTransactionFilter; label: string }[] = [
  { value: "all", label: "הכל" },
  { value: "purchase", label: "לרכישה" },
  { value: "rental", label: "להשכרה" },
];

export function ProductTransactionFilter({ selected }: { selected: ProductTransactionFilter }) {
  return (
    <nav aria-label="סינון לפי סוג עסקה" className="mb-7 flex gap-2 overflow-x-auto pb-1">
      {options.map((option) => {
        const href = option.value === "all" ? "/products" : `/products?type=${option.value}`;
        const active = selected === option.value;

        return (
          <Link
            key={option.value}
            href={href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "min-h-10 shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              active
                ? "border-foreground bg-foreground text-white"
                : "border-border bg-surface text-foreground hover:border-primary hover:text-primary",
            )}
          >
            {option.label}
          </Link>
        );
      })}
    </nav>
  );
}
