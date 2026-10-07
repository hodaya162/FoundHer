import Image from "next/image";

import type { CatalogProduct } from "@/domain/catalog";
import type { Look, LookCompositionImage } from "@/domain/look";
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
  const prototype = isRail ? undefined : look.composition.prototype;
  const sizes = isRail
    ? "(max-width: 639px) 43vw, 240px"
    : variant === "hero"
      ? "(max-width: 1023px) 100vw, 58vw"
      : "(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw";

  const image = hero?.images[0];

  if (prototype) {
    const resolveCompositionImage = (selection: LookCompositionImage) => {
      const product = products.find(({ id }) => id === selection.productId);
      const selectedImage = product?.images[selection.imageIndex] ?? product?.images[0];

      return product && selectedImage ? { image: selectedImage, product, selection } : undefined;
    };

    const dominant = resolveCompositionImage(prototype.dominant);
    const supporting = resolveCompositionImage(prototype.supporting);

    if (dominant && supporting) {
      const supportingIsClean = supporting.selection.presentation === "PRODUCT_CLEAN";
      const overlapLeft = prototype.layout === "EDITORIAL_OVERLAP_LEFT";
      const photoLed = prototype.layout === "PHOTO_LED";

      return (
        <div className="relative aspect-[4/5] overflow-hidden bg-[#f4ece4]">
          <div
            className={cn(
              "absolute bottom-[4%] top-[4%] overflow-hidden rounded-[1.15rem] bg-[#eee4da]",
              photoLed
                ? "end-[5%] w-[73%]"
                : overlapLeft
                  ? "end-[4%] w-[76%]"
                  : "start-[4%] w-[76%]",
            )}
          >
            <Image
              src={dominant.image.url}
              alt={dominant.image.alt || dominant.product.title}
              fill
              priority={priority}
              sizes={sizes}
              className="object-contain"
            />
          </div>

          <div
            className={cn(
              "absolute z-10 overflow-hidden border border-white/80 bg-[#faf6f1] shadow-[0_12px_28px_rgba(74,55,42,0.13)]",
              supportingIsClean ? "rounded-[1rem]" : "rounded-[0.85rem] border-[5px] border-[#faf6f1]",
              photoLed
                ? "bottom-[8%] start-[5%] h-[39%] w-[37%] -rotate-[1.25deg]"
                : overlapLeft
                  ? "bottom-[9%] start-[5%] h-[35%] w-[39%] rotate-[1deg]"
                  : "bottom-[9%] end-[5%] h-[35%] w-[39%] -rotate-[1deg]",
            )}
          >
            <Image
              src={supporting.image.url}
              alt={supporting.image.alt || supporting.product.title}
              fill
              sizes="(max-width: 767px) 42vw, 16rem"
              className="object-contain"
            />
          </div>

          <div
            aria-hidden="true"
            className={cn(
              "absolute h-16 w-16 rounded-full bg-primary/10 blur-2xl",
              overlapLeft ? "bottom-[3%] start-[1%]" : "bottom-[3%] end-[1%]",
            )}
          />
        </div>
      );
    }
  }

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
