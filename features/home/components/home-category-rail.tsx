import Link from "next/link";
import { CalendarDays, Grid2X2, Shirt, Sparkles, Store, Sun } from "lucide-react";

const categories = [
  { label: "הכול", href: "/discover", icon: Grid2X2 },
  { label: "לוקים", href: "/looks", icon: Sparkles },
  { label: "פריטים", href: "/discover", icon: Shirt },
  { label: "השכרות", href: "/rentals", icon: Store },
  { label: "אירועים", href: "/search?q=אירוע", icon: CalendarDays },
  { label: "שבת", href: "/search?q=שבת", icon: Sun },
] as const;

export function HomeCategoryRail() {
  return (
    <nav aria-label="קטגוריות גילוי" className="-mx-4 sm:mx-0">
      <ul className="hide-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 sm:px-0">
        {categories.map(({ href, icon: Icon, label }) => (
          <li key={label} className="w-[4.25rem] shrink-0 snap-start text-center">
            <Link href={href} className="group flex min-h-16 flex-col items-center justify-center gap-1.5 rounded-card text-xs font-medium text-foreground">
              <span className="grid size-11 place-items-center rounded-full bg-surface-muted text-primary transition-colors group-hover:bg-[#f0e3e3]">
                <Icon aria-hidden="true" className="size-[1.15rem]" strokeWidth={1.7} />
              </span>
              <span>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
