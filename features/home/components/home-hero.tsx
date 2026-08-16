import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

import type { ImageAsset } from "@/domain/media";

type HomeHeroProps = {
  image?: ImageAsset;
};

export function HomeHero({ image }: HomeHeroProps) {
  return (
    <section aria-labelledby="home-title" className="relative overflow-hidden rounded-card bg-foreground">
      <div className="relative min-h-[31rem] bg-surface sm:min-h-[38rem] lg:min-h-[42rem]">
        {image ? (
          <Image
            src={image.url}
            alt={image.alt}
            fill
            loading="eager"
            sizes="(max-width: 1023px) 100vw, 55vw"
            className="object-cover object-center"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-8 text-center text-muted">השראה חדשה תתווסף בקרוב</div>
        )}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-black/5" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-8 lg:max-w-2xl lg:p-12">
          <p className="type-label mb-2 text-white/75">אופנה צנועה, בדרך שלך</p>
          <h1 id="home-title" className="type-display max-w-xl">מה בא לך ללבוש היום?</h1>
          <p className="type-body mt-3 max-w-md text-white/80">לוקים, פריטים והשכרות שנועדו לגלות דרך התמונות.</p>
          <Link href="/looks" className="mt-5 inline-flex min-h-11 items-center gap-2 border-b border-white/70 text-sm font-semibold">
            לגלות לוקים
            <ArrowLeft aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </div>
      <nav aria-label="גילוי מהיר" className="grid grid-cols-3 divide-x divide-x-reverse divide-white/15 bg-foreground text-white">
        <Link href="/looks" className="flex min-h-14 items-center justify-center text-sm">לוקים</Link>
        <Link href="/discover" className="flex min-h-14 items-center justify-center text-sm">פריטים</Link>
        <Link href="/rentals" className="flex min-h-14 items-center justify-center text-sm">השכרות</Link>
      </nav>
      <Link href="/search" className="absolute end-4 top-4 inline-grid size-11 place-items-center rounded-full bg-white/92 text-foreground backdrop-blur-md" aria-label="חיפוש ב־FoundHer">
        <Search aria-hidden="true" className="size-5" />
      </Link>
    </section>
  );
}
