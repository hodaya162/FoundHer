import Image from "next/image";

import type { ProductImage as ProductImageAsset } from "@/domain/media";

export type ProductImageProps = {
  image: ProductImageAsset;
  priority?: boolean;
};

export function ProductImage({ image, priority = false }: ProductImageProps) {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-surface-muted">
      <Image
        src={image.url}
        alt={image.alt}
        fill
        priority={priority}
        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
        className="object-cover transition-transform duration-500 group-hover/image:scale-[1.02]"
      />
    </div>
  );
}
