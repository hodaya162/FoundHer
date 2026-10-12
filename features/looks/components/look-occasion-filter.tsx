import Link from "next/link";

import { cn } from "@/lib/utils";

import type { LookOccasionFilter as LookOccasionFilterValue } from "../queries/get-look-card-models";

const filters: readonly { value: LookOccasionFilterValue; label: string }[] = [
  { value: "all", label: "הכל" },
  { value: "everyday", label: "יומיום" },
  { value: "work", label: "עבודה" },
  { value: "shabbat", label: "שבת" },
  { value: "event", label: "אירוע" },
  { value: "vacation", label: "חופשה" },
];

export function LookOccasionFilter({ selected }: { selected: LookOccasionFilterValue }) {
  return (
    <nav aria-label="סינון לוקים לפי אירוע" className="hide-scrollbar -mx-4 mb-7 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
      {filters.map((filter) => {
        const active = filter.value === selected;
        return (
          <Link
            key={filter.value}
            href={filter.value === "all" ? "/looks" : `/looks?occasion=${filter.value}`}
            aria-current={active ? "page" : undefined}
            className={cn(
              "min-h-11 shrink-0 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              active
                ? "border-foreground bg-foreground text-white"
                : "border-border/80 bg-surface text-foreground hover:border-primary/50 hover:text-primary",
            )}
          >
            {filter.label}
          </Link>
        );
      })}
    </nav>
  );
}
