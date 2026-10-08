import Link from "next/link";

import type { LookOccasion } from "@/domain/look";
import { cn } from "@/lib/utils";

const filters: readonly { readonly label: string; readonly value?: LookOccasion }[] = [
  { label: "הכל" },
  { label: "יומיום", value: "everyday" },
  { label: "עבודה", value: "work" },
  { label: "אירוע", value: "evening_event" },
  { label: "שבת", value: "shabbat" },
  { label: "חופשה", value: "vacation" },
];

type Props = { selected?: LookOccasion };

export function LookOccasionFilters({ selected }: Props) {
  return (
    <nav aria-label="סינון לוקים לפי אירוע" className="-mx-4 overflow-x-auto px-4 pb-1 hide-scrollbar">
      <div className="flex min-w-max gap-1.5" dir="rtl">
        {filters.map(({ label, value }) => {
          const active = selected === value || (!selected && !value);
          return (
            <Link
              key={label}
              href={value ? `/looks?occasion=${value}` : "/looks"}
              aria-current={active ? "page" : undefined}
              className={cn(
                "inline-flex min-h-10 items-center justify-center rounded-full border px-3 text-[0.72rem] font-semibold transition-colors",
                active
                  ? "border-foreground bg-foreground text-white"
                  : "border-[#dfd5d0] bg-[#fffdf9] text-[#665c59] hover:border-primary/50 hover:text-primary",
              )}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
