import Image from "next/image";

import type { ProductImage } from "@/domain/media";
import { cn } from "@/lib/utils";

export type ProductGalleryProps = {
  images: readonly ProductImage[];
  productName: string;
};

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  if (images.length === 0) {
    return (
      <div
        role="img"
        aria-label={`אין תמונה זמינה עבור ${productName}`}
        className="flex aspect-[4/5] items-center justify-center rounded-card bg-surface-muted p-8 text-center text-muted"
      >
        תמונה תתווסף בקרוב
      </div>
    );
  }

  return (
    <section aria-label={`גלריית תמונות של ${productName}`} className="hide-scrollbar -mx-4 flex snap-x gap-2 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:px-0">
      {images.map((image, index) => (
        <figure
          key={image.id}
          className={cn(
            "relative aspect-[4/5] w-[88vw] max-w-[32rem] shrink-0 snap-center overflow-hidden rounded-card bg-surface-muted sm:w-auto sm:max-w-none",
            images.length > 1 && index === 0 && "sm:col-span-2 sm:aspect-[5/4]",
          )}
        >
          <Image
            src={image.url}
            alt={image.alt}
            fill
            priority={index === 0}
            sizes={index === 0 ? "(max-width: 1023px) 100vw, 58vw" : "(max-width: 639px) 100vw, 29vw"}
            className="object-cover"
          />
        </figure>
      ))}
    </section>
  );
}
