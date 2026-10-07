import Image from "next/image";
import Link from "next/link";
import { Layers3 } from "lucide-react";
import { Badge } from "@/components/ui";
import { FavoriteButton } from "@/features/favorites";
import type { LookSearchResult as LookSearchResultModel } from "../types/search-result";

export function SearchLookResult({ priority = false, result }: { priority?: boolean; result: LookSearchResultModel }) {
  return (
    <article className="h-full">
      <div className="relative overflow-hidden rounded-card bg-foreground">
        <Link href={result.href} className="group relative block aspect-[4/5] sm:aspect-[16/10]" aria-label={`צפייה בלוק ${result.title}`}>
          {result.image ? (
            <Image src={result.image.url} alt={result.image.alt} fill priority={priority} sizes="(max-width: 639px) 100vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
          ) : (
            <span className="grid h-full place-items-center bg-surface-muted text-primary"><Layers3 aria-hidden="true" className="size-8" /></span>
          )}
          <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
        </Link>
        <div className="absolute inset-x-0 bottom-0 z-10 p-4 text-white">
          <div className="mb-2 flex items-center justify-between gap-2">
            <Badge variant="primary">{result.contextLabel}</Badge>
            <FavoriteButton reference={{ entityType: "look", entityId: result.id }} entityLabel={`הלוק ${result.title}`} className="bg-white/92 text-foreground" />
          </div>
          <h3 className="type-card-title text-lg"><Link href={result.href} className="rounded-sm focus-visible:outline-offset-4">{result.title}</Link></h3>
          <p className="mt-1 line-clamp-1 text-xs text-white/75">{result.subtitle}</p>
        </div>
      </div>
    </article>
  );
}
