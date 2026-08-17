import Link from "next/link";
import { LayoutGrid, Shirt, Tags, WandSparkles } from "lucide-react";

const categories = [
  { label: "לוקים", href: "/looks", icon: LayoutGrid },
  { label: "פריטים", href: "/discover", icon: Shirt },
  { label: "מותגים", href: "/#home-brands-title", icon: Tags },
  { label: "השכרות", href: "/rentals", icon: WandSparkles },
] as const;

export function HomeCategoryRail() {
  return (
    <nav aria-label="שערי גילוי ראשיים">
      <ul className="grid grid-cols-4 gap-2 sm:gap-3">
        {categories.map(({ href, icon: Icon, label }) => (
          <li key={label} className="min-w-0 text-center">
            <Link href={href} className="group flex min-h-[4.75rem] flex-col items-center justify-center gap-1.5 rounded-card bg-surface-muted px-1 text-xs font-medium text-foreground transition-colors hover:bg-[#f0e3e3]">
              <span className="grid size-8 place-items-center text-primary">
                <Icon aria-hidden="true" className="size-[1.2rem]" strokeWidth={1.65} />
              </span>
              <span>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
