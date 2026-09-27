import Link from "next/link";

import { FavoriteButton } from "@/features/favorites";
import { formatProductPrice } from "@/features/products/utils/format-product-price";

import type { HeroLookModel } from "../types/look-lab";
import { categoryLabels, categoryStyles } from "../utils/look-lab-labels";
import { HeroLookMoodboard } from "./hero-look-moodboard";

const favoriteClass = "absolute end-1.5 top-1.5 z-20 size-11 min-h-11 min-w-11 border-0 bg-transparent p-0 text-primary shadow-none before:absolute before:end-2 before:top-2 before:size-7 before:rounded-full before:border before:border-black/5 before:bg-white/92 [&_svg]:relative [&_svg]:z-10 [&_svg]:size-3.5";

export function HeroLookCard({ model, priority = false }: { model: HeroLookModel; priority?: boolean }) {
  const { look } = model;
  const href = `/looks-lab/${look.slug}`;

  return (
    <article className="overflow-hidden rounded-[1.35rem] bg-[#fffaf7]">
      <div className="relative">
        <Link href={href} aria-label={`פתיחת הלוק ${look.title}`} className="group block rounded-[1.35rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <HeroLookMoodboard model={model} priority={priority} />
        </Link>
        <span className={`pointer-events-none absolute start-3 top-3 z-20 rounded-full px-3 py-1.5 text-xs font-semibold ${categoryStyles[look.category]}`}>{categoryLabels[look.category]}</span>
        <FavoriteButton reference={{ entityType: "look", entityId: look.id }} entityLabel={`הלוק ${look.title}`} className={favoriteClass} />
      </div>
      <div className="px-2.5 pb-3 pt-2.5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="truncate text-[1.08rem] font-semibold leading-snug"><Link href={href}>{look.title}</Link></h2>
            <p className="mt-0.5 truncate text-[0.74rem] text-muted">{look.descriptor}</p>
          </div>
          <p className="shrink-0 pt-0.5 text-[0.76rem] font-medium text-primary">{look.assets.length} פריטים · החל מ־{formatProductPrice(model.lowestPrice, model.currency)}</p>
        </div>
      </div>
    </article>
  );
}
