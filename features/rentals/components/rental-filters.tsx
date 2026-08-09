import Link from "next/link";

import type { RentalTypeFilter } from "../types/rental-card";

const typeFilters = [
  { value: "all", label: "הכול" },
  { value: "evening", label: "ערב" },
  { value: "bridal", label: "כלה" },
] as const satisfies readonly { value: RentalTypeFilter; label: string }[];

type RentalFiltersProps = {
  activeFilter: RentalTypeFilter;
};

export function RentalFilters({ activeFilter }: RentalFiltersProps) {
  return (
    <nav aria-label="סוג השכרה" className="mb-6 flex flex-wrap gap-2 border-y border-border py-4">
      {typeFilters.map(({ label, value }) => {
        const isActive = activeFilter === value;
        const href = value === "all" ? "/rentals" : `/rentals?type=${value}`;

        return (
          <Link
            key={value}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={isActive
              ? "inline-flex min-h-11 items-center rounded-full border border-foreground bg-foreground px-5 text-sm font-semibold text-background"
              : "inline-flex min-h-11 items-center rounded-full border border-border bg-surface px-5 text-sm font-semibold hover:bg-surface-muted"
            }
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
