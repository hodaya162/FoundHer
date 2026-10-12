import Link from "next/link";

import { FavoriteButton } from "@/features/favorites";
import { formatProductPrice } from "@/features/products/utils/format-product-price";

import type { HeroLookModel } from "../types/look-lab";
import { categoryLabels, categoryStyles } from "../utils/look-lab-labels";
import { HeroLookMoodboard } from "./hero-look-moodboard";
import { LookPalette } from "./look-palette";

const favoriteClass = "relative size-11 min-h-11 min-w-11 shrink-0 border-0 bg-transparent p-0 text-primary shadow-none before:absolute before:start-2 before:top-2 before:size-7 before:rounded-full before:border before:border-black/5 before:bg-white/92 [&_svg]:relative [&_svg]:z-10 [&_svg]:size-3.5";

export function HeroLookCard({ featured = false, model, priority = false }: { featured?: boolean; model: HeroLookModel; priority?: boolean }) {
  const { look } = model;
  const href = `/looks-lab/${look.slug}`;

  return (
    <article className="overflow-hidden rounded-[1.35rem] bg-[#fffaf7]" data-featured={featured || undefined}>
      <div className="relative">
        <Link href={href} aria-label={`פתיחת הלוק ${look.title}`} className="group block rounded-[1.35rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <HeroLookMoodboard model={model} priority={priority} featured={featured} />
        </Link>
        <span className={`pointer-events-none absolute start-3 top-3 z-20 rounded-full px-2.5 py-1 text-[0.7rem] font-semibold ${categoryStyles[look.category]}`}>{categoryLabels[look.category]}</span>
      </div>
      <div className="px-3 pb-3.5 pt-2.5">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h2 className="truncate text-[1.08rem] font-semibold leading-snug"><Link href={href}>{look.title}</Link></h2>
            <p className="mt-1 text-[0.76rem] font-medium text-muted">{look.assets.length} פריטים · החל מ־{formatProductPrice(model.lowestPrice, model.currency)}</p>
          </div>
          <FavoriteButton reference={{ entityType: "look", entityId: look.id }} entityLabel={`הלוק ${look.title}`} className={favoriteClass} />
        </div>
        <LookPalette colors={look.palette} />
      </div>
    </article>
  );
}
