import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";

import { Badge, Card, CardContent } from "@/components/ui";
import { ProductPrice } from "@/features/products/components";

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
      <Card className="flex h-full flex-col overflow-hidden">
        <Link href={href} className="group/image block" aria-label={`צפייה בשמלה ${product.name}`}>
          <div className="relative aspect-[4/5] overflow-hidden bg-surface-muted">
            {image ? (
              <Image
                src={image.url}
                alt={image.alt}
                fill
                priority={priority}
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover/image:scale-[1.02]"
              />
            ) : (
              <span className="flex h-full items-center justify-center p-6 text-center text-sm text-muted">
                תמונה תתווסף בקרוב
              </span>
            )}
            <Badge variant="primary" className="absolute start-3 top-3">
              {getRentalTypeLabel(product.type)}
            </Badge>
          </div>
        </Link>

        <CardContent className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
          <ProductPrice amount={product.rentalPrice} currency={product.currency} rental prominent />
          <Heading className="type-card-title">
            <Link href={href} className="rounded-sm hover:text-primary focus-visible:outline-offset-4">
              {product.name}
            </Link>
          </Heading>
          <div className="type-body-small flex items-center gap-2 text-muted">
            <MapPin aria-hidden="true" className="size-4 shrink-0" />
            <span>{product.city}</span>
          </div>
          <p className="type-caption">
            {product.rentalBusiness?.name ?? "עסק ההשכרה אינו זמין כרגע"}
          </p>
          <Link
            href={href}
            className="mt-auto inline-flex min-h-11 items-center justify-between gap-3 border-t border-border pt-3 text-sm font-semibold text-primary"
          >
            פרטים ובדיקת זמינות
            <ArrowLeft aria-hidden="true" className="size-4" />
          </Link>
        </CardContent>
      </Card>
    </article>
  );
}
