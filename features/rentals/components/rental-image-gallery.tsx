"use client";

import Image from "next/image";
import { useState } from "react";

import type { ProductImage } from "@/domain/media";
import { cn } from "@/lib/utils";

export function RentalImageGallery({ images, title }: { images: readonly ProductImage[]; title: string }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = images[selectedIndex];

  if (!selectedImage) {
    return <div className="flex aspect-[2/3] items-center justify-center rounded-[0.9rem] bg-surface-muted text-sm text-muted">תמונה תתווסף בקרוב</div>;
  }

  return (
    <div className="space-y-2">
      <figure className="relative aspect-[2/3] overflow-hidden rounded-[0.9rem] bg-surface-muted">
        <Image src={selectedImage.url} alt="" fill loading="eager" sizes="(max-width: 1023px) 100vw, 60vw" className="scale-110 object-cover blur-xl opacity-25" />
        <Image src={selectedImage.url} alt={selectedImage.alt} fill loading="eager" sizes="(max-width: 1023px) 100vw, 60vw" className="object-contain" />
        <figcaption className="absolute bottom-3 end-3 rounded-full bg-black/65 px-2.5 py-1 text-[0.68rem] text-white" aria-live="polite">
          {selectedIndex + 1} / {images.length}
        </figcaption>
      </figure>

      {images.length > 1 ? (
        <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-1" role="list" aria-label={`בחירת תמונה עבור ${title}`}>
          {images.map((image, index) => (
            <button
              key={image.id}
              type="button"
              role="listitem"
              aria-label={`הצגת תמונה ${index + 1} מתוך ${images.length}`}
              aria-current={selectedIndex === index ? "true" : undefined}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                "relative aspect-[2/3] w-[4.25rem] shrink-0 overflow-hidden rounded-[0.55rem] border-2 bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                selectedIndex === index ? "border-foreground" : "border-transparent",
              )}
            >
              <Image src={image.url} alt="" fill sizes="4.25rem" className="object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
