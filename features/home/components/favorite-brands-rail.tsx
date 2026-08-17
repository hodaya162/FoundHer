import Image from "next/image";

import type { Brand } from "@/domain/brand";

import { HomeSection } from "./home-section";

type FavoriteBrandsRailProps = { brands: readonly Brand[] };

export function FavoriteBrandsRail({ brands }: FavoriteBrandsRailProps) {
  if (brands.length === 0) return null;

  return (
    <HomeSection title="מותגים שכדאי להכיר" id="home-brands-title">
      <ul className="hide-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
        {brands.map((brand) => (
          <li key={brand.id} className="w-[7.2rem] shrink-0 snap-start">
            <div className="flex h-[5.4rem] flex-col items-center justify-center rounded-card border border-border/70 bg-surface px-2 text-center">
              <div className="relative size-8 overflow-hidden rounded-full bg-surface-muted">
                <Image src={brand.logo.url} alt="" fill sizes="32px" className="object-cover" />
              </div>
              <span className="mt-1.5 truncate text-xs font-semibold" dir="ltr">{brand.name}</span>
              {brand.isDemo ? <span className="mt-0.5 text-[0.6rem] text-muted">תוכן לדוגמה</span> : null}
            </div>
          </li>
        ))}
      </ul>
    </HomeSection>
  );
}
