import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";

import { Badge } from "@/components/ui";
import { ProductFavoriteButton } from "@/features/products/components/product-favorite-button";

import type { RentalCardModel } from "../types/rental-card";
import { getRentalTypeLabel } from "../utils/rental-labels";
import { RentalPrice } from "./rental-price";

type RentalCardProps = {
  product: RentalCardModel;
  priority?: boolean;
  headingLevel?: 2 | 3;
};

export function RentalCard({ headingLevel = 3, priority = false, product }: RentalCardProps) {
  const Heading = `h${headingLevel}` as const;
  const href = `/rentals/${product.slug}`;
  const image = product.images[0];

  return (
    <article className="min-w-0">
        <div className="relative">
          <Link href={href} className="group/image block" aria-label={`צפייה בשמלה ${product.title}`}>
            <div className="relative aspect-[3/4] overflow-hidden rounded-[0.85rem] bg-surface-muted">
              {image ? (
                <Image src={image.url} alt={image.alt} fill priority={priority} sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover/image:scale-[1.02]" />
              ) : (
                <span className="flex h-full items-center justify-center p-6 text-center text-sm text-muted">תמונה תתווסף בקרוב</span>
              )}
              <Badge variant="primary" className="absolute start-2.5 top-2.5">{getRentalTypeLabel(product.type === "bridal" ? "rental_bridal" : "rental_evening")}</Badge>
              {product.isDemo ? <span className="absolute bottom-2.5 start-2.5 rounded-full bg-background/90 px-2 py-1 text-[0.62rem] text-muted">תוכן לדוגמה</span> : null}
            </div>
          </Link>
          <ProductFavoriteButton productId={product.id} productName={product.title} className="absolute end-1.5 top-1.5 z-[var(--z-base)] border-0 bg-transparent p-2 before:absolute before:size-7 before:rounded-full before:bg-white/90 before:shadow-sm [&_svg]:relative [&_svg]:z-[1] [&_svg]:size-3.5" />
        </div>

        <div className="flex flex-col gap-1 px-0.5 pt-3">
          <Heading className="type-card-title">
            <Link href={href} className="rounded-sm hover:text-primary focus-visible:outline-offset-4">{product.title}</Link>
          </Heading>
          <p className="text-xs font-medium text-foreground/75">{product.businessName}</p>
          <span className="type-caption flex min-w-0 items-center gap-1">
            <MapPin aria-hidden="true" className="size-3.5 shrink-0" />
            <span className="truncate">{product.location}</span>
          </span>
          <div className="mt-1">
            <RentalPrice price={product.price} priceRange={product.priceRange} currency={product.currency} />
          </div>
        </div>
    </article>
  );
}
