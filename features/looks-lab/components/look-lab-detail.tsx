import { ArrowRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { FavoriteButton } from "@/features/favorites";
import { ProductFavoriteButton } from "@/features/products/components/product-favorite-button";
import { formatProductPrice } from "@/features/products/utils/format-product-price";

import type { HeroLookModel } from "../types/look-lab";
import { categoryLabels, categoryStyles } from "../utils/look-lab-labels";
import { HeroLookMoodboard } from "./hero-look-moodboard";
import { LookPalette } from "./look-palette";

function amount(model: HeroLookModel["hero"]): number {
  return model.product.type === "purchase" ? model.product.price : model.product.rentalPrice;
}

export function LookLabDetail({ model }: { model: HeroLookModel }) {
  const assets = [model.hero, ...model.supporting];
  return (
    <main className="mx-auto w-[min(64rem,calc(100%_-_2rem))] pb-20 pt-4 sm:pt-8">
      <Link href="/looks-lab" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted hover:text-foreground"><ArrowRight className="size-4" />חזרה למעבדה</Link>
      <div className="mt-3 grid items-start gap-7 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,.75fr)] lg:gap-12">
        <div className="relative">
          <HeroLookMoodboard model={model} priority className="lg:max-h-none" />
          <span className={`absolute start-3 top-3 z-20 rounded-full px-3 py-1.5 text-xs font-semibold ${categoryStyles[model.look.category]}`}>{categoryLabels[model.look.category]}</span>
        </div>
        <header className="space-y-4 lg:sticky lg:top-24 lg:py-6">
          <div>
            <p className="text-xs font-semibold text-primary">ניסוי עיצוב · תוכן הדגמה</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.025em]">{model.look.title}</h1>
            <p className="mt-2 text-sm leading-6 text-muted">{model.look.descriptor}</p>
            <LookPalette colors={model.look.palette} />
          </div>
          <FavoriteButton reference={{ entityType: "look", entityId: model.look.id }} entityLabel={`הלוק ${model.look.title}`} variant="label" />
        </header>
      </div>

      <section aria-labelledby="lab-products-title" className="mt-12">
        <h2 id="lab-products-title" className="text-2xl font-semibold">הפריטים בלוק</h2>
        <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 lg:grid-cols-4">
          {assets.map((asset) => {
            const externalUrl = asset.product.type === "purchase" ? asset.product.externalUrl : asset.product.availabilityUrl;
            const productImage = <Image src={asset.image.url} alt={asset.image.alt} fill sizes="(max-width: 639px) 46vw, 220px" className={asset.assetType === "model" ? "object-cover" : "object-contain p-2 mix-blend-multiply"} />;
            return (
              <article key={asset.productId} className="min-w-0">
                <div className="relative aspect-[3/4] overflow-hidden rounded-[1rem] bg-[#f6eee7]">
                  {asset.href ? <Link href={asset.href} className="relative block h-full" aria-label={`לפריט ${asset.product.name}`}>{productImage}</Link> : <div className="relative h-full" aria-label={asset.product.name}>{productImage}</div>}
                  {asset.isLabOnly ? null : <ProductFavoriteButton productId={asset.product.id} productName={asset.product.name} />}
                </div>
                <div className="pt-2">
                  <h3 className="truncate text-sm font-semibold">{asset.href ? <Link href={asset.href}>{asset.product.name}</Link> : asset.product.name}</h3>
                  <p className="mt-1 truncate text-xs text-muted">{asset.sellerName}</p>
                  <p className="mt-1 text-sm font-semibold">{formatProductPrice(amount(asset), asset.product.currency)}</p>
                  {externalUrl ? <a href={externalUrl} target="_blank" rel="noreferrer" className="mt-2 inline-flex min-h-10 items-center gap-1.5 text-xs font-semibold text-primary">לאתר המקור<ExternalLink className="size-3.5" /></a> : asset.href ? <Link href={asset.href} className="mt-2 inline-flex min-h-10 items-center text-xs font-semibold text-primary">לפרטי הפריט</Link> : <p className="mt-2 text-xs text-muted">נכס המחשה בלבד</p>}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
