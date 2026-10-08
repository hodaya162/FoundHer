import Link from "next/link";

import { cn } from "@/lib/utils";

import type { LookCardModel } from "../types/look-card";
import { formatLookTotalPrice } from "../utils/look-price";
import { occasionLabels } from "../utils/look-labels";
import { EditorialLookComposition } from "./editorial-look-composition";
import { LookSaveButton } from "./look-save-button";

type Props = {
  model: LookCardModel;
  size: "featured" | "compact";
  priority?: boolean;
};

const occasionClasses = {
  everyday: "bg-[#f3d7d2] text-[#71454b]",
  work: "bg-[#dce7dc] text-[#405a47]",
  evening_event: "bg-[#dfd2e8] text-[#594264]",
  wedding_guest: "bg-[#ead7e3] text-[#654558]",
  shabbat: "bg-[#ead5d2] text-[#704a50]",
  vacation: "bg-[#d9e8ed] text-[#3f5f69]",
  nursing: "bg-[#eee1d0] text-[#6b563d]",
  holiday: "bg-[#eee1d0] text-[#6b563d]",
} as const;

export function EditorialLookCard({ model, priority = false, size }: Props) {
  const { editorialPresentation, look, products } = model;
  if (!editorialPresentation) return null;

  const href = `/looks/${look.slug}`;
  const compact = size === "compact";
  const occasion = look.occasions[0];
  const total = formatLookTotalPrice(products);

  return (
    <article className={cn("min-w-0", compact ? "" : "w-full")}>
      <div className="relative overflow-hidden rounded-[1.15rem] border border-[#eadfda]/70 bg-[#f7efea] shadow-[0_10px_32px_rgba(62,39,34,0.06)]">
        <Link href={href} aria-label={`פתיחת הלוק ${look.title}`} className="block">
          <EditorialLookComposition
            presentation={editorialPresentation}
            products={products}
            priority={priority}
            size={size}
          />
        </Link>
        {occasion ? (
          <span className={cn("absolute start-3 top-3 z-10 rounded-full px-3 py-1 text-xs font-semibold shadow-sm", occasionClasses[occasion])}>
            {occasionLabels[occasion]}
          </span>
        ) : null}
        <LookSaveButton
          lookId={look.id}
          lookTitle={look.title}
          className="absolute end-2 top-2 z-10 bg-[#fffdf9]/94 shadow-sm"
        />
      </div>

      <div className={cn("pt-3", compact ? "px-0.5" : "px-1")}>
        <h2 className={cn("font-semibold leading-snug text-foreground", compact ? "text-[0.92rem]" : "text-lg")}>
          <Link href={href} className="rounded-sm hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            {look.title}
          </Link>
        </h2>
        <p className={cn("mt-1 font-medium text-muted", compact ? "text-[0.68rem]" : "text-xs")}>
          {products.length} {products.length === 1 ? "פריט" : "פריטים"}
          {total ? <> · {total}</> : null}
          {editorialPresentation.singleProductConcept ? <> · קונספט עריכתי</> : null}
        </p>
      </div>
    </article>
  );
}
