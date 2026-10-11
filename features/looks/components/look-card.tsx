import Link from "next/link";

import { getCatalogSourceById } from "@/config/catalog-sources";
import type { LookCardModel } from "../types/look-card";

import { LookSaveButton } from "./look-save-button";
import { LookTags } from "./look-tags";
import { RealLookComposition } from "./real-look-composition";
import { formatLookTotalPrice } from "../utils/look-price";

type LookCardProps = {
  candidateNumber?: number;
  headingLevel?: 2 | 3;
  model: LookCardModel;
  priority?: boolean;
};

export function LookCard({ candidateNumber, headingLevel = 2, model, priority = false }: LookCardProps) {
  const { look, products } = model;
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const href = `/looks/${look.slug}`;
  const totalPrice = formatLookTotalPrice(products);
  const firstProduct = products[0];
  const reviewSource = firstProduct && products.every(({ sourceId }) => sourceId === firstProduct.sourceId)
    ? getCatalogSourceById(firstProduct.sourceId)
    : undefined;
  const showSourceCandidate = reviewSource?.id === "ayala" || reviewSource?.id === "esti-belle";

  return (
    <article className="break-inside-avoid">
      <div className="relative overflow-hidden rounded-card bg-surface-muted">
        <Link href={href} className="group/image block" aria-label={`פתיחת הלוק ${look.title}`}>
          <RealLookComposition look={look} products={products} priority={priority} />
        </Link>
        <LookSaveButton lookId={look.id} lookTitle={look.title} className="absolute end-3 top-3 bg-surface/95 shadow-sm" />
        {candidateNumber ? <span className="absolute right-3 top-3 rounded-full bg-foreground/88 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm" dir="ltr">#{String(candidateNumber).padStart(2, "0")}</span> : null}
      </div>
      <div className="space-y-2 px-0.5 pb-2 pt-3">
        <div className="flex items-center gap-2">
          <LookTags look={look} compact />
          {showSourceCandidate ? <span className="type-caption text-primary">{reviewSource.brandName} · מועמד</span> : null}
        </div>
        <Heading className="type-card-title">
          <Link href={href} className="rounded-sm hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            {look.title}
          </Link>
        </Heading>
        <p className="text-xs font-medium text-primary">
          {products.length} {products.length === 1 ? "פריט" : "פריטים"}
          {totalPrice ? <> · {totalPrice}</> : null}
        </p>
      </div>
    </article>
  );
}
