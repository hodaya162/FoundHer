import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

import { buttonVariants } from "@/components/ui";
import type { ImageAsset } from "@/domain/media";
import { cn } from "@/lib/utils";

type HomeHeroProps = {
  image?: ImageAsset;
};

export function HomeHero({ image }: HomeHeroProps) {
  return (
    <section aria-labelledby="home-title" className="grid overflow-hidden rounded-card bg-surface-muted lg:grid-cols-[0.9fr_1.1fr]">
      <div className="flex flex-col justify-center px-6 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-20">
        <p className="type-label mb-4 flex items-center gap-2 text-primary">
          <Sparkles aria-hidden="true" className="size-4" />
          השראה צנועה שמתחילה בך
        </p>
        <h1 id="home-title" className="type-display max-w-xl">מה בא לך ללבוש היום?</h1>
        <p className="type-body mt-5 max-w-lg text-muted">
          גלי לוקים שלמים, פריטים ושמלות להשכרה ממותגים ועסקים נבחרים — במקום אחד.
        </p>
        <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
          <Link href="/looks" className={cn(buttonVariants({ size: "lg" }), "w-full min-[420px]:w-auto")}>
            לגלות לוקים
            <ArrowLeft aria-hidden="true" className="size-4" />
          </Link>
          <Link href="/rentals" className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "w-full min-[420px]:w-auto")}>
            למצוא שמלה להשכרה
          </Link>
        </div>
      </div>
      <div className="relative min-h-[24rem] bg-surface sm:min-h-[32rem] lg:min-h-[38rem]">
        {image ? (
          <Image
            src={image.url}
            alt={image.alt}
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 55vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-8 text-center text-muted">השראה חדשה תתווסף בקרוב</div>
        )}
        <div className="absolute inset-x-5 bottom-5 rounded-card bg-surface/92 p-4 backdrop-blur-sm sm:inset-x-auto sm:end-6 sm:max-w-xs">
          <p className="type-label text-primary">התחילי מההרגשה</p>
          <p className="type-body-small mt-1">FoundHer מחברת בין הרעיון לפריטים שיוצרים אותו.</p>
        </div>
      </div>
    </section>
  );
}
