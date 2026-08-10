import Image from "next/image";

import { Badge } from "@/components/ui";
import type { Brand } from "@/domain/brand";

import { FavoriteButton } from "./favorite-button";

export function FavoriteBrandCard({ brand }: { brand: Brand }) {
  return (
    <article className="overflow-hidden rounded-card border border-border bg-surface">
      <div className="relative aspect-[16/10] bg-surface-muted">
        <Image src={brand.coverImage.url} alt={brand.coverImage.alt} fill sizes="(max-width: 639px) 100vw, 33vw" className="object-cover" />
        <FavoriteButton
          reference={{ entityType: "brand", entityId: brand.id }}
          entityLabel={`המותג ${brand.name}`}
          className="absolute end-3 top-3 border-white/70 bg-white/90 shadow-sm hover:bg-white"
        />
      </div>
      <div className="relative p-5 pt-8">
        <div className="absolute end-5 top-0 size-14 -translate-y-1/2 overflow-hidden rounded-full border-4 border-surface bg-surface-muted">
          <Image src={brand.logo.url} alt="" fill sizes="56px" className="object-cover" />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="type-card-title">{brand.name}</h3>
          {brand.isDemo ? <Badge>תוכן לדוגמה</Badge> : null}
        </div>
        <p className="type-body-small mt-2 line-clamp-2 text-muted">{brand.description}</p>
        {brand.isDemo ? <p className="type-caption mt-4">המותג מוצג להמחשת המוצר ואינו עסק מאומת.</p> : null}
      </div>
    </article>
  );
}
