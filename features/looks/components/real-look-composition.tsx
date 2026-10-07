import Image from "next/image";

import type { CatalogProduct } from "@/domain/catalog";
import type { Look } from "@/domain/look";
import { cn } from "@/lib/utils";

type Props = {
  look: Look;
  products: readonly CatalogProduct[];
  priority?: boolean;
  variant?: "card" | "hero" | "rail";
};

export function RealLookComposition({ look, priority = false, products, variant = "card" }: Props) {
  const hero = products.find(({ id }) => id === look.composition.heroProductId) ?? products[0];
  const isRail = variant === "rail";
  const sizes = isRail
    ? "(max-width: 639px) 43vw, 240px"
    : variant === "hero"
      ? "(max-width: 1023px) 100vw, 58vw"
      : "(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw";

  const image = hero?.images[0];

  return (
    <div className={cn("relative overflow-hidden bg-[#f6efe8]", isRail ? "h-full" : "aspect-[4/5]") }>
      {image ? (
        <Image
          src={image.url}
          alt={image.alt || hero.title}
          fill
          priority={priority}
          sizes={sizes}
          className="object-contain"
        />
      ) : null}
    </div>
  );
}
