import Link from "next/link";

import { cn } from "@/lib/utils";

import { LOOK_LAB_CATEGORIES, type LookLabCategory } from "../types/look-lab";
import { categoryLabels } from "../utils/look-lab-labels";

export function LookLabFilters({ active }: { active?: LookLabCategory }) {
  const filters: readonly { label: string; value?: LookLabCategory }[] = [
    { label: "הכול" },
    ...LOOK_LAB_CATEGORIES.map((value) => ({ value, label: categoryLabels[value] })),
  ];

  return (
    <nav aria-label="סינון לוקים במעבדה" className="hide-scrollbar -mx-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
      <div className="flex w-max min-w-full gap-2">
        {filters.map(({ label, value }) => {
          const selected = active === value || (!active && !value);
          return (
            <Link
              key={value ?? "all"}
              href={value ? `/looks-lab?category=${value}` : "/looks-lab"}
              aria-current={selected ? "page" : undefined}
              className={cn("inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium transition-colors", selected ? "border-foreground bg-foreground text-white" : "border-[#dfd4ce] bg-[#fffaf7] text-[#655b57] hover:border-primary/50")}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
