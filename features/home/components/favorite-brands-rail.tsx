import type { Brand } from "@/domain/brand";

import { HomeSection } from "./home-section";

type FavoriteBrandsRailProps = { brands: readonly Brand[] };

export function FavoriteBrandsRail({ brands }: FavoriteBrandsRailProps) {
  if (brands.length === 0) return null;

  return (
    <HomeSection title="מותגים שכדאי להכיר" id="home-brands-title">
      <ul className="hide-scrollbar -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
        {brands.map((brand) => (
          <li key={brand.id} className="w-16 shrink-0 snap-start text-center">
            <div className="mx-auto grid size-14 place-items-center rounded-full border border-border/70 bg-surface text-foreground shadow-[0_2px_12px_rgba(91,55,61,0.035)]">
              <span className="font-serif text-sm font-semibold tracking-[-0.04em]" dir="ltr">{brand.name.slice(0, 2)}</span>
            </div>
            <span className="mt-1.5 block truncate text-[0.62rem] font-semibold" dir="ltr">{brand.name}</span>
            {brand.isDemo ? <span className="block text-[0.52rem] text-muted">תוכן לדוגמה</span> : null}
          </li>
        ))}
      </ul>
    </HomeSection>
  );
}
