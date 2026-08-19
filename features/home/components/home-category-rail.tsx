import Link from "next/link";
import { Shirt, Tags } from "lucide-react";

import { HangerIcon, LooksIcon } from "@/components/icons";

const categories = [
  { label: "לוקים", href: "/looks", icon: LooksIcon },
  { label: "פריטים", href: "/discover", icon: Shirt },
  { label: "מותגים", href: "/#home-brands-title", icon: Tags },
  { label: "השכרות", href: "/rentals", icon: HangerIcon },
] as const;

export function HomeCategoryRail() {
  return (
    <nav aria-label="שערי גילוי ראשיים">
      <ul className="grid grid-cols-4 gap-2 sm:gap-3">
        {categories.map(({ href, icon: Icon, label }) => (
          <li key={label} className="min-w-0 text-center">
            <Link href={href} className="group flex min-h-[4.75rem] flex-col items-center justify-center gap-1.5 rounded-[0.8rem] border border-white/70 bg-[linear-gradient(145deg,#fbf5f4,#f4e9e8)] px-1 text-xs font-semibold text-foreground shadow-[0_5px_18px_rgba(91,55,61,0.035)] transition-colors hover:bg-[#f0e3e3] sm:min-h-[4.1rem] sm:gap-1 sm:text-[0.68rem]">
              <span className="grid size-9 place-items-center text-[#9a626b] sm:size-8">
                <Icon aria-hidden="true" className="size-[1.45rem] sm:size-[1.2rem]" strokeWidth={1.65} />
              </span>
              <span>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
