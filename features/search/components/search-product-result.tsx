import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";

import { Badge, Card, CardContent } from "@/components/ui";
import { ProductFavoriteButton, ProductPrice } from "@/features/products/components";
import type { PurchaseProductSearchResult, RentalProductSearchResult } from "../types/search-result";

type Props = { priority?: boolean; result: PurchaseProductSearchResult | RentalProductSearchResult };

export function SearchProductResult({ priority = false, result }: Props) {
  const rental = result.entityType === "rental_product";
  return (
    <article className="h-full">
      <Card className="flex h-full flex-col overflow-hidden">
        <div className="relative">
          <Link href={result.href} className="group block" aria-label={`צפייה בפריט ${result.title}`}>
            <div className="relative aspect-[4/5] overflow-hidden bg-surface-muted">
              <Image src={result.image.url} alt={result.image.alt} fill priority={priority} sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
              <Badge variant={rental ? "primary" : "neutral"} className="absolute start-3 top-3">{rental ? result.rentalTypeLabel : "לרכישה"}</Badge>
            </div>
          </Link>
          <ProductFavoriteButton productId={result.id} productName={result.title} />
        </div>
        <CardContent className="flex flex-1 flex-col gap-2 p-4">
          <ProductPrice amount={rental ? result.rentalPrice : result.price} currency={result.currency} rental={rental} />
          <h3 className="type-card-title break-words"><Link href={result.href} className="rounded-sm hover:text-primary focus-visible:outline-offset-4">{result.title}</Link></h3>
          <p className="type-caption">{result.sellerName}</p>
          {rental ? <p className="type-body-small flex items-center gap-2 text-muted"><MapPin aria-hidden="true" className="size-4" />{result.city}</p> : null}
          <Link href={result.href} className="mt-auto inline-flex min-h-11 items-center justify-between gap-2 border-t border-border pt-3 text-sm font-semibold text-primary">
            {rental ? "לפרטי השמלה" : "לפרטי המוצר"} <ArrowLeft aria-hidden="true" className="size-4" />
          </Link>
        </CardContent>
      </Card>
    </article>
  );
}
