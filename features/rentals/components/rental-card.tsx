import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";

import { Badge, Card, CardContent } from "@/components/ui";
import { ProductPrice } from "@/features/products/components";
import { ProductFavoriteButton } from "@/features/products/components/product-favorite-button";

import type { RentalCardModel } from "../types/rental-card";
import { getRentalTypeLabel } from "../utils/rental-labels";

type RentalCardProps = {
  product: RentalCardModel;
  priority?: boolean;
  headingLevel?: 2 | 3;
};

export function RentalCard({ headingLevel = 3, priority = false, product }: RentalCardProps) {
  const Heading = `h${headingLevel}` as const;
  const href = `/products/${product.slug}`;
  const image = product.images[0];

  return (
    <article className="h-full">
      <Card className="flex h-full flex-col overflow-hidden bg-transparent">
        <div className="relative">
          <Link href={href} className="group/image block" aria-label={`צפייה בשמלה ${product.name}`}>
            <div className="relative aspect-[4/5] overflow-hidden bg-surface-muted">
              {image ? (
                <Image src={image.url} alt={image.alt} fill priority={priority} sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover/image:scale-[1.02]" />
              ) : (
                <span className="flex h-full items-center justify-center p-6 text-center text-sm text-muted">תמונה תתווסף בקרוב</span>
              )}
              <Badge variant="primary" className="absolute start-3 top-3">{getRentalTypeLabel(product.type)}</Badge>
            </div>
          </Link>
          <ProductFavoriteButton productId={product.id} productName={product.name} />
        </div>

        <CardContent className="flex flex-1 flex-col gap-1.5 px-0.5 pb-2 pt-3">
          <Heading className="type-card-title">
            <Link href={href} className="rounded-sm hover:text-primary focus-visible:outline-offset-4">{product.name}</Link>
          </Heading>
          <p className="type-caption">{product.rentalBusiness?.name ?? "עסק השכרה"}</p>
          <div className="flex items-center justify-between gap-2">
            <ProductPrice amount={product.rentalPrice} currency={product.currency} rental />
            <span className="type-caption flex items-center gap-1">
            <MapPin aria-hidden="true" className="size-3.5 shrink-0" />
            <span>{product.city}</span>
            </span>
          </div>
          {product.rentalBusiness?.isDemo ? <p className="type-caption text-muted/80">תוכן לדוגמה</p> : null}
        </CardContent>
      </Card>
    </article>
  );
}
