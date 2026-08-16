import Image from "next/image";
import Link from "next/link";
import { ImageIcon } from "lucide-react";

import { ProductPrice } from "@/features/products/components";

import type { LookProductItem as LookProductItemModel } from "../types/look-details";

type LookProductItemProps = { item: LookProductItemModel };

export function LookProductItem({ item }: LookProductItemProps) {
  const { product, sellerName } = item;
  const image = product.images[0];
  const href = `/products/${product.slug}`;
  const isPurchase = product.type === "purchase";
  const resolvedSellerName = sellerName ?? (isPurchase ? "מותג לא זמין" : "עסק השכרה לא זמין");

  return (
    <li className="w-[68vw] max-w-64 shrink-0 snap-start sm:w-auto sm:max-w-none">
      <article className="h-full bg-transparent">
        <Link href={href} className="group/image relative block aspect-[4/5] overflow-hidden rounded-card bg-surface-muted" aria-label={`צפייה בפריט ${product.name}`}>
          {image?.url ? (
            <Image
              src={image.url}
              alt={image.alt}
              fill
              sizes="(max-width: 639px) 68vw, (max-width: 1023px) 50vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover/image:scale-[1.03]"
            />
          ) : (
            <span className="grid h-full place-items-center text-muted"><ImageIcon aria-hidden="true" /></span>
          )}
        </Link>

        <div className="flex min-w-0 flex-col items-start gap-1.5 pt-3">
          <div className="min-w-0 w-full">
            <p className="type-caption truncate">{resolvedSellerName}</p>
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
          />
          {!isPurchase ? <p className="type-caption">{product.city}</p> : null}
        </div>
      </article>
    </li>
  );
}
