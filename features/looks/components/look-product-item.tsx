import Image from "next/image";
import { ExternalLink, ImageIcon } from "lucide-react";

import { ProductFavoriteButton, ProductPrice } from "@/features/products/components";

import type { LookProductItem as LookProductItemModel } from "../types/look-details";

type LookProductItemProps = { item: LookProductItemModel };

export function LookProductItem({ item }: LookProductItemProps) {
  const { product } = item;
  const image = product.images[0];
  const href = product.productUrl;

  return (
    <li className="w-[68vw] max-w-64 shrink-0 snap-start sm:w-auto sm:max-w-none">
      <article className="h-full bg-transparent">
        <div className="relative">
          <a href={href} target="_blank" rel="noopener noreferrer" className="group/image relative block aspect-[4/5] overflow-hidden rounded-card bg-surface-muted" aria-label={`צפייה בפריט ${product.title} באתר Mini Allenby`}>
            {image?.url ? (
              <Image
                src={image.url}
                alt={image.alt}
                fill
                sizes="(max-width: 639px) 68vw, (max-width: 1023px) 50vw, 25vw"
                className="object-contain transition-transform duration-300 group-hover/image:scale-[1.02]"
              />
            ) : (
              <span className="grid h-full place-items-center text-muted"><ImageIcon aria-hidden="true" /></span>
            )}
          </a>
          <ProductFavoriteButton productId={product.id} productName={product.title} />
        </div>

        <div className="flex min-w-0 flex-col items-start gap-1.5 pt-3">
          <div className="min-w-0 w-full">
            <p className="type-caption truncate">{product.brand}</p>
            <h3 className="type-card-title mt-1">
              <a href={href} target="_blank" rel="noopener noreferrer" className="rounded-sm hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                {product.title}
              </a>
            </h3>
          </div>
          <ProductPrice
            amount={product.price}
            currency={product.currency}
          />
          <a href={href} target="_blank" rel="noopener noreferrer" className="type-label inline-flex items-center gap-1.5 text-primary">
            לרכישה באתר Mini Allenby
            <ExternalLink aria-hidden="true" className="size-3.5" />
          </a>
        </div>
      </article>
    </li>
  );
}
