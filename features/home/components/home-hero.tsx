import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import type { ImageAsset } from "@/domain/media";

type HomeHeroProps = {
  image?: ImageAsset;
};

export function HomeHero({ image }: HomeHeroProps) {
  return (
    <section aria-labelledby="home-title" className="relative overflow-hidden rounded-[1rem] border border-white/80 bg-[#eee1dc] shadow-[0_10px_32px_rgba(91,55,61,0.08)]">
      <div className="relative aspect-[16/7.2] min-h-[10.25rem] max-h-[21rem] sm:aspect-[16/6.5]">
        {image ? (
          <div className="absolute inset-y-0 end-0 w-[55%] overflow-hidden">
            <Image
              src={image.url}
              alt={image.alt}
              fill
              loading="eager"
              sizes="(max-width: 639px) 55vw, 42rem"
              className="object-cover object-[center_16%]"
            />
          </div>
        ) : (
          <div className="flex h-full items-center justify-center p-8 text-center text-muted">השראה חדשה תתווסף בקרוב</div>
        )}
        <div aria-hidden="true" className="absolute inset-y-0 end-[42%] w-[18%] bg-gradient-to-l from-transparent to-[#eee1dc]" />
        <div className="absolute inset-y-0 start-0 flex w-[52%] max-w-lg flex-col justify-center p-3.5 sm:p-7">
          <p className="font-serif text-base font-semibold leading-none text-primary sm:text-xl">FoundHer.</p>
          <h1 id="home-title" className="mt-1.5 text-[1.2rem] font-medium leading-[1.08] tracking-[-0.035em] text-foreground sm:text-3xl">לוקים שמדגישים אותך</h1>
          <p className="mt-1.5 max-w-xs text-[0.68rem] leading-4 text-muted sm:text-sm">השראה צנועה ומדויקת ללוק שלם.</p>
          <Link href="/looks" className="mt-2.5 inline-flex min-h-9 w-fit items-center gap-1.5 rounded-button bg-primary px-3 text-[0.68rem] font-semibold text-white hover:bg-primary-hover sm:min-h-10 sm:text-sm">
            לגלות את הלוקים
            <ArrowLeft aria-hidden="true" className="size-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
