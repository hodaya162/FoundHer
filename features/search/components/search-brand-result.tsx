import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";

import { Card, CardContent } from "@/components/ui";
import type { BrandSearchResult, RentalBusinessSearchResult } from "../types/search-result";

type SearchBrandResultProps = {
  priority?: boolean;
  result: BrandSearchResult | RentalBusinessSearchResult;
};

export function SearchBrandResult({ priority = false, result }: SearchBrandResultProps) {
  const business = result.entityType === "rental_business";

  return (
    <article className="h-full">
      <Card className="flex h-full overflow-hidden">
        <div className="relative w-28 shrink-0 bg-surface-muted sm:w-36">
          <Image src={result.image.url} alt={result.image.alt} fill priority={priority} sizes="(max-width: 639px) 112px, 144px" className="object-cover" />
        </div>
        <CardContent className="flex min-w-0 flex-1 flex-col items-start gap-2 p-4">
          <p className="type-label text-primary">{business ? "עסק השכרה" : "מותג"}</p>
          <h3 className="type-card-title break-words">{result.title}</h3>
          {business ? <p className="type-caption flex items-center gap-2"><MapPin aria-hidden="true" className="size-4" />{result.city}</p> : null}
          <p className="type-body-small line-clamp-2 break-words text-muted">{result.subtitle}</p>
          {business ? (
            <Link href={result.href} className="mt-auto inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary">
              לעמוד העסק <ArrowLeft aria-hidden="true" className="size-4" />
            </Link>
          ) : (
            <p className="type-caption mt-auto pt-2">עמודי מותג יתווספו בהמשך.</p>
          )}
        </CardContent>
      </Card>
    </article>
  );
}
