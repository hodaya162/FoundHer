import Link from "next/link";

import { formatProductPrice } from "@/features/products/utils/format-product-price";

import type { LookCardModel } from "../types/look-details";
import { LookMeta } from "./look-meta";
import { LookProductCollage } from "./look-product-collage";
import { LookSaveButton } from "./look-save-button";
import { LookTags } from "./look-tags";
import { styleLabels } from "../utils/look-labels";

type LookCardProps = {
  headingLevel?: 2 | 3;
  model: LookCardModel;
  priority?: boolean;
  presentation?: "standard" | "editorial";
  collageVariant?: "board-separates" | "board-layered" | "board-dress";
};

export function LookCard({ collageVariant = "board-separates", headingLevel = 2, model, presentation = "standard", priority = false }: LookCardProps) {
  const { look, products } = model;
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const href = `/looks/${look.slug}`;

  if (presentation === "editorial") {
    const descriptor = look.styleTags.slice(0, 2).map((tag) => styleLabels[tag]).join(" · ");
    const lowestPrice = Math.min(...products.map(({ product }) => product.type === "purchase" ? product.price : product.rentalPrice));
    const currency = products[0]?.product.currency ?? "ILS";

    return (
      <article className="break-inside-avoid overflow-hidden rounded-[1.05rem] bg-[#fff9f6]">
        <div className="relative">
          <Link href={href} className="group/image block rounded-[1.15rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label={`פתיחת הלוק ${look.title}`}>
            <LookProductCollage items={products} priority={priority} layout={collageVariant} showPrices />
          </Link>
          <LookTags look={look} compact className="pointer-events-none absolute start-2 top-2 z-10 [&>span]:px-2.5 [&>span]:py-1.5 [&>span]:text-[0.78rem]" />
          <LookSaveButton
            lookId={look.id}
            lookTitle={look.title}
            className="absolute end-0.5 top-0.5 z-10 border-0 bg-transparent text-primary shadow-none before:absolute before:size-7 before:rounded-full before:border before:border-black/5 before:bg-[#fffdf9]/94 [&_svg]:relative [&_svg]:z-10 [&_svg]:size-3.5"
          />
        </div>
        <div className="px-3 pb-2.5 pt-2.5">
          <Heading className="text-[1.08rem] font-semibold leading-snug tracking-[-0.01em] sm:text-lg">
            <Link href={href} className="rounded-sm hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              {look.title}
            </Link>
          </Heading>
          <div className="mt-1 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
            <p className="text-[0.8rem] leading-5 text-muted">
              {descriptor ? `${descriptor} · ` : ""}{look.items.length} פריטים{look.isDemo ? " · הדגמה" : ""}
            </p>
            {Number.isFinite(lowestPrice) ? <p className="shrink-0 text-[0.8rem] font-semibold leading-5 text-primary">החל מ־{formatProductPrice(lowestPrice, currency)}</p> : null}
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="break-inside-avoid">
      <div className="relative overflow-hidden rounded-card bg-surface-muted">
        <Link href={href} className="group/image block" aria-label={`פתיחת הלוק ${look.title}`}>
          <LookProductCollage items={products} priority={priority} />
        </Link>
        <LookSaveButton lookId={look.id} lookTitle={look.title} className="absolute end-3 top-3 bg-surface/95 shadow-sm" />
      </div>
      <div className="space-y-2 px-0.5 pb-2 pt-3">
        <div className="flex items-center justify-between gap-2">
          <LookTags look={look} compact />
          <LookMeta productCount={look.items.length} />
        </div>
        <Heading className="type-card-title">
          <Link href={href} className="rounded-sm hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            {look.title}
          </Link>
        </Heading>
        {look.isDemo ? <p className="type-caption">תוכן להדגמה · אין כאן שיתוף פעולה מסחרי</p> : null}
      </div>
    </article>
  );
}
