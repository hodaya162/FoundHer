import type { Brand } from "@/domain/brand";

import { HomeSection } from "./home-section";

type FavoriteBrandsRailProps = { brands: readonly Brand[] };

export function FavoriteBrandsRail({ brands }: FavoriteBrandsRailProps) {
  if (brands.length === 0) return null;

  return (
    <HomeSection title="מותגים שכדאי להכיר" id="home-brands-title">
      <ul className="hide-scrollbar -mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
        {brands.map((brand) => (
          <li key={brand.id} className="shrink-0 snap-start">
            <div className="flex min-h-9 items-center justify-center gap-1 rounded-full border border-border/70 bg-surface px-3 text-center">
              <span className="truncate text-[0.68rem] font-semibold" dir="ltr">{brand.name}</span>
              {brand.isDemo ? <span className="text-[0.55rem] text-muted">· דוגמה</span> : null}
            </div>
          </li>
        ))}
      </ul>
    </HomeSection>
  );
}
