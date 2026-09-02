import Link from "next/link";

import { cn } from "@/lib/utils";

import { LOOK_FILTERS, lookFilterLabels, type LookFilter } from "../types/look-filter";

type LookFiltersProps = {
  activeFilter: LookFilter;
  query: string;
};

const accentClasses: Record<LookFilter, string> = {
  all: "bg-foreground text-white",
  everyday: "bg-[#eee8df] text-[#5f554b]",
  work: "bg-[#e9edf0] text-[#4c5961]",
  event: "bg-[#f3e4e7] text-[#84545e]",
  vacation: "bg-[#e7efeb] text-[#4d675b]",
  shabbat: "bg-[#eee6f0] text-[#65506b]",
};

function getFilterHref(filter: LookFilter, query: string): string {
  const params = new URLSearchParams();
  if (filter !== "all") params.set("occasion", filter);
  if (query) params.set("q", query);
  const suffix = params.toString();
  return suffix ? `/looks?${suffix}` : "/looks";
}

export function LookFilters({ activeFilter, query }: LookFiltersProps) {
  return (
    <nav aria-label="סינון לוקים לפי הקשר" className="hide-scrollbar -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <ul className="flex w-max gap-2 pb-1">
        {LOOK_FILTERS.map((filter) => {
          const active = filter === activeFilter;
          return (
            <li key={filter}>
              <Link
                href={getFilterHref(filter, query)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium transition-colors",
                  active ? `${accentClasses[filter]} border-transparent` : "border-border bg-surface text-muted hover:text-foreground",
                )}
              >
                {lookFilterLabels[filter]}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
