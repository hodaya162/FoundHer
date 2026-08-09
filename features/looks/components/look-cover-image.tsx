import Image from "next/image";
import { Sparkles } from "lucide-react";

import type { ImageAsset } from "@/domain/media";
import { cn } from "@/lib/utils";

type LookCoverImageProps = {
  image: ImageAsset;
  priority?: boolean;
  variant?: "card" | "hero";
};

export function LookCoverImage({ image, priority = false, variant = "card" }: LookCoverImageProps) {
  const isHero = variant === "hero";

  return (
    <div className={cn("relative overflow-hidden bg-surface-muted", isHero ? "aspect-[4/5] rounded-card" : "aspect-[4/5]")}>
      {image.url ? (
        <Image
          src={image.url}
          alt={image.alt}
          fill
          priority={priority}
          sizes={isHero ? "(max-width: 1023px) 100vw, 58vw" : "(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"}
          className="object-cover transition-transform duration-500 group-hover/image:scale-[1.02]"
        />
      ) : (
        <div className="grid h-full place-items-center px-6 text-center text-muted">
          <div>
            <Sparkles aria-hidden="true" className="mx-auto mb-3 size-7" />
            <p className="type-body-small">התמונה תעלה בקרוב</p>
          </div>
        </div>
      )}
    </div>
  );
}
