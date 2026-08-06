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
    <section aria-label={`גלריית תמונות של ${productName}`} className="grid gap-3 sm:grid-cols-2">
      {images.map((image, index) => (
        <figure
          key={image.id}
          className={cn(
            "relative aspect-[4/5] overflow-hidden rounded-card bg-surface-muted",
            images.length > 1 && index === 0 && "sm:col-span-2 sm:aspect-[16/11]",
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
