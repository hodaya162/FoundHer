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
    <nav aria-label="סוג השכרה" className="hide-scrollbar -mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
      {typeFilters.map(({ label, value }) => {
        const isActive = activeFilter === value;
        const href = value === "all" ? "/rentals" : `/rentals?type=${value}`;

        return (
          <Link
            key={value}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={isActive
              ? "inline-flex min-h-10 shrink-0 items-center rounded-full bg-foreground px-5 text-sm font-semibold text-white"
              : "inline-flex min-h-10 shrink-0 items-center rounded-full border border-border bg-surface px-5 text-sm font-medium hover:bg-surface-muted"
            }
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
