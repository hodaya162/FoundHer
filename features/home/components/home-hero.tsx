import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import type { ImageAsset } from "@/domain/media";

type HomeHeroProps = {
  image?: ImageAsset;
};

export function HomeHero({ image }: HomeHeroProps) {
  return (
    <section aria-labelledby="home-title" className="relative overflow-hidden rounded-[0.9rem] bg-surface-muted">
      <div className="relative aspect-[16/11] min-h-[17rem] max-h-[28rem] sm:aspect-[16/8]">
        {image ? (
          <Image
            src={image.url}
            alt={image.alt}
            fill
            loading="eager"
            sizes="(max-width: 1023px) 100vw, 76rem"
            className="object-cover object-[center_32%]"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-8 text-center text-muted">השראה חדשה תתווסף בקרוב</div>
        )}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-l from-black/68 via-black/20 to-transparent" />
        <div className="absolute inset-y-0 start-0 flex w-[72%] max-w-lg flex-col justify-center p-5 text-white sm:p-8">
          <p className="text-[0.68rem] font-semibold tracking-[0.08em] text-white/75">FOUNDHER EDIT</p>
          <h1 id="home-title" className="mt-2 text-[1.8rem] font-medium leading-[1.08] tracking-[-0.035em] sm:text-4xl">לוקים שמדגישים אותך</h1>
          <p className="mt-2 max-w-xs text-sm leading-6 text-white/82">השראה צנועה ומדויקת ללוק שלם.</p>
          <Link href="/looks" className="mt-4 inline-flex min-h-11 w-fit items-center gap-2 rounded-button bg-primary px-4 text-sm font-semibold text-white hover:bg-primary-hover">
            לגלות את הלוקים
            <ArrowLeft aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
