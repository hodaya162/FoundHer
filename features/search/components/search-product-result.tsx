import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";

import { Badge, Card, CardContent } from "@/components/ui";
import { ProductFavoriteButton, ProductPrice } from "@/features/products/components";
import type { PurchaseProductSearchResult, RentalProductSearchResult } from "../types/search-result";

type Props = { priority?: boolean; result: PurchaseProductSearchResult | RentalProductSearchResult };

export function SearchProductResult({ priority = false, result }: Props) {
  const rental = result.entityType === "rental_product";
  return (
    <article className="h-full">
      <Card className="flex h-full flex-col overflow-hidden bg-transparent">
        <div className="relative">
          <Link href={result.href} target={!rental && result.external ? "_blank" : undefined} rel={!rental && result.external ? "noopener noreferrer" : undefined} className="group block" aria-label={`צפייה בפריט ${result.title}`}>
            <div className="relative aspect-[4/5] overflow-hidden bg-surface-muted">
              <Image src={result.image.url} alt={result.image.alt} fill priority={priority} unoptimized={result.image.url.startsWith("https://")} sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
              <Badge variant={rental ? "primary" : "neutral"} className="absolute start-3 top-3">{rental ? result.rentalTypeLabel : "לרכישה"}</Badge>
            </div>
          </Link>
          <ProductFavoriteButton productId={result.id} productName={result.title} />
        </div>
        <CardContent className="flex flex-1 flex-col gap-1.5 px-0.5 pb-2 pt-3">
          <h3 className="type-card-title break-words"><Link href={result.href} target={!rental && result.external ? "_blank" : undefined} rel={!rental && result.external ? "noopener noreferrer" : undefined} className="rounded-sm hover:text-primary focus-visible:outline-offset-4">{result.title}</Link></h3>
          <p className="type-caption">{result.sellerName}</p>
          <div className="flex flex-wrap items-center justify-between gap-1">
            {rental || result.price !== undefined ? <ProductPrice amount={rental ? result.rentalPrice : result.price!} currency={result.currency} rental={rental} /> : <p className="type-caption">מחיר באתר המותג</p>}
            {rental ? <p className="type-caption flex items-center gap-1"><MapPin aria-hidden="true" className="size-3.5" />{result.city}</p> : null}
          </div>
        </CardContent>
      </Card>
    </article>
  );
}
