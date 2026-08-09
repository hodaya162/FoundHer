import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Badge, Card, CardContent } from "@/components/ui";
import type { LookSearchResult as LookSearchResultModel } from "../types/search-result";

export function SearchLookResult({ priority = false, result }: { priority?: boolean; result: LookSearchResultModel }) {
  return (
    <article className="h-full">
      <Card className="flex h-full overflow-hidden">
        <Link href={result.href} className="relative block w-28 shrink-0 overflow-hidden bg-surface-muted sm:w-36" aria-label={`צפייה בלוק ${result.title}`}>
          <Image src={result.image.url} alt={result.image.alt} fill priority={priority} sizes="(max-width: 639px) 112px, 144px" className="object-cover transition-transform duration-500 hover:scale-[1.02]" />
        </Link>
        <CardContent className="flex min-w-0 flex-1 flex-col items-start gap-2 p-4">
          <Badge variant="primary">{result.contextLabel}</Badge>
          <h3 className="type-card-title break-words">
            <Link href={result.href} className="rounded-sm hover:text-primary focus-visible:outline-offset-4">{result.title}</Link>
          </h3>
          <p className="type-body-small line-clamp-2 break-words text-muted">{result.subtitle}</p>
          <Link href={result.href} className="mt-auto inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary">
            ללוק המלא <ArrowLeft aria-hidden="true" className="size-4" />
          </Link>
        </CardContent>
      </Card>
    </article>
  );
}
