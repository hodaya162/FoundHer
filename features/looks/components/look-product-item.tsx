import Image from "next/image";
import { ExternalLink, ImageIcon } from "lucide-react";

import { ProductFavoriteButton, ProductPrice } from "@/features/products/components";

import type { LookProductItem as LookProductItemModel } from "../types/look-details";

type LookProductItemProps = { item: LookProductItemModel };

export function LookProductItem({ item }: LookProductItemProps) {
  const { product } = item;
  const image = product.images[0];
  const href = product.productUrl;
  const contactCta = product.purchaseType === "contact";
  const actionLabel = contactCta
    ? product.contactChannel === "instagram"
      ? `לפרטים ב־Instagram של ${product.brand}`
      : `לפרטים אצל ${product.brand}`
    : `לרכישה באתר ${product.brand}`;

  return (
    <li>
      <article className="flex gap-3 rounded-card border border-border/60 bg-surface p-2.5">
        <div className="relative w-24 shrink-0 sm:w-28">
          <a href={href} target="_blank" rel="noopener noreferrer" className="group/image relative block aspect-[4/5] overflow-hidden rounded-[0.85rem] bg-surface-muted" aria-label={`צפייה בפריט ${product.title} באתר ${product.brand}`}>
            {image?.url ? (
              <Image
                src={image.url}
                alt={image.alt}
                fill
                sizes="112px"
                className="object-contain transition-transform duration-300 group-hover/image:scale-[1.02]"
              />
            ) : (
              <span className="grid h-full place-items-center text-muted"><ImageIcon aria-hidden="true" /></span>
            )}
          </a>
          <ProductFavoriteButton productId={product.id} productName={product.title} />
        </div>

        <div className="flex min-w-0 flex-1 flex-col items-start justify-center gap-1.5 py-1">
          <div className="min-w-0 w-full">
            <p className="type-caption truncate">{product.brand}</p>
            <h3 className="text-sm font-semibold leading-snug sm:text-base">
              <a href={href} target="_blank" rel="noopener noreferrer" className="rounded-sm hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                {product.title}
              </a>
            </h3>
          </div>
          {product.price === undefined ? <p className="type-caption">מחיר באתר המקור</p> : (
            <ProductPrice amount={product.price} currency={product.currency} />
          )}
          <a href={href} target="_blank" rel="noopener noreferrer" className="type-label inline-flex items-center gap-1.5 text-primary">
            {actionLabel}
            <ExternalLink aria-hidden="true" className="size-3.5" />
          </a>
        </div>
      </article>
    </li>
  );
}
