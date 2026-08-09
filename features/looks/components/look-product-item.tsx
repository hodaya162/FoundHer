import Image from "next/image";
import Link from "next/link";
import { ImageIcon } from "lucide-react";

import { ProductBadge, ProductPrice } from "@/features/products/components";

import type { LookProductItem as LookProductItemModel } from "../types/look-details";

type LookProductItemProps = { item: LookProductItemModel };

export function LookProductItem({ item }: LookProductItemProps) {
  const { product, sellerName } = item;
  const image = product.images[0];
  const href = `/products/${product.slug}`;
  const isPurchase = product.type === "purchase";
  const resolvedSellerName = sellerName ?? (isPurchase ? "מותג לא זמין" : "עסק השכרה לא זמין");

  return (
    <li>
      <article className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-4 rounded-card border border-border bg-surface p-3 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-5 sm:p-4">
        <Link href={href} className="group/image relative aspect-[4/5] overflow-hidden rounded-button bg-surface-muted" aria-label={`צפייה בפריט ${product.name}`}>
          {image?.url ? (
            <Image
              src={image.url}
              alt={image.alt}
              fill
              sizes="(max-width: 639px) 104px, 128px"
              className="object-cover transition-transform duration-300 group-hover/image:scale-[1.03]"
            />
          ) : (
            <span className="grid h-full place-items-center text-muted"><ImageIcon aria-hidden="true" /></span>
          )}
        </Link>

        <div className="flex min-w-0 flex-col items-start gap-2 py-1">
          <ProductBadge type={product.type} />
          <div className="min-w-0">
            <p className="type-label truncate text-muted">{resolvedSellerName}</p>
            <h3 className="type-card-title mt-1">
              <Link href={href} className="rounded-sm hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                {product.name}
              </Link>
            </h3>
          </div>
          <ProductPrice
            amount={isPurchase ? product.price : product.rentalPrice}
            currency={product.currency}
            rental={!isPurchase}
            className="mt-auto"
          />
          {!isPurchase ? <p className="type-caption">{product.city}</p> : null}
        </div>
      </article>
    </li>
  );
}
