import Link from "next/link";

import { Badge } from "@/components/ui";
import { occasionLabels } from "@/features/looks/utils/look-labels";
import { cn } from "@/lib/utils";

import type { LookCardModel } from "../types/look-card-model";
import { LookEditorialVisual } from "./look-editorial-visual";
import { LookSaveButton } from "./look-save-button";

const occasionClassNames: Record<string, string> = {
  everyday: "bg-[#eed0ca] text-[#6c3d3a]",
  work: "bg-[#dbe6db] text-[#425a46]",
  shabbat: "bg-[#efe0d1] text-[#6e4d37]",
  evening_event: "bg-[#dfd4e9] text-[#594168]",
  wedding_guest: "bg-[#dfd4e9] text-[#594168]",
  vacation: "bg-[#d8ebe8] text-[#365e5a]",
};

function formatStartingPrice(price: number | null): string | null {
  return price === null ? null : `החל מ־₪${price.toLocaleString("he-IL")}`;
}

export function EditorialLookCard({ model, priority = false }: { model: LookCardModel; priority?: boolean }) {
  const { look, products, startingPrice } = model;
  const href = `/looks/${look.slug}`;
  const occasion = look.occasions[0];

  return (
    <article className="group overflow-hidden rounded-[1.25rem] border border-border/60 bg-surface shadow-[0_16px_45px_rgba(50,39,32,0.06)]">
      <div className="relative">
        <Link href={href} aria-label={`פתיחת הלוק ${look.title}`} className="block overflow-hidden">
          <LookEditorialVisual look={look} products={products} priority={priority} />
        </Link>
        {occasion ? (
          <Badge className={cn("absolute end-3 top-3 border-0 px-3 py-1.5", occasionClassNames[occasion])}>
            {occasionLabels[occasion]}
          </Badge>
        ) : null}
        <LookSaveButton lookId={look.id} lookTitle={look.title} className="absolute start-2 top-2 bg-white/92 shadow-sm" />
      </div>
      <div className="space-y-1.5 px-4 pb-4 pt-3.5">
        <h2 className="text-lg font-semibold leading-tight text-foreground">
          <Link href={href} className="rounded-sm hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            {look.title}
          </Link>
        </h2>
        <p className="flex flex-wrap items-center gap-x-2 text-sm text-muted">
          <span>{products.length} פריטים</span>
          {formatStartingPrice(startingPrice) ? <><span aria-hidden="true">·</span><span>{formatStartingPrice(startingPrice)}</span></> : null}
        </p>
      </div>
    </article>
  );
}
