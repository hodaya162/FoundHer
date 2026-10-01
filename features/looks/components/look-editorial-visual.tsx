import Image from "next/image";

import type { Look } from "@/domain/look";
import type { Product } from "@/domain/product";
import { cn } from "@/lib/utils";

type Props = {
  look: Look;
  products: readonly Product[];
  priority?: boolean;
  variant?: "card" | "detail";
};

const flatLayPositions = [
  "end-[5%] top-[5%] h-[72%] w-[62%]",
  "start-[5%] top-[8%] h-[38%] w-[36%] -rotate-1",
  "start-[9%] bottom-[8%] h-[34%] w-[38%] rotate-1",
  "end-[28%] bottom-[3%] h-[25%] w-[28%] -rotate-2",
] as const;

function ProductPhoto({ className, priority, product }: { className?: string; priority?: boolean; product: Product }) {
  const image = product.images[0];
  if (!image) return null;

  return (
    <div className={cn("relative overflow-hidden rounded-[1rem] bg-white/70", className)}>
      <Image
        src={image.url}
        alt={image.alt}
        fill
        priority={priority}
        sizes="(max-width: 767px) 90vw, 33vw"
        className="object-contain"
      />
    </div>
  );
}

export function LookEditorialVisual({ look, priority = false, products, variant = "card" }: Props) {
  const hero = products.find(({ id }) => id === look.heroProductId) ?? products[0];
  const companions = products.filter(({ id }) => id !== hero?.id);
  const isDetail = variant === "detail";

  if (look.visualMode === "flat-lay") {
    return (
      <div className={cn("relative overflow-hidden bg-[#f6f0e9]", isDetail ? "aspect-[4/5] rounded-[1.5rem]" : "aspect-[4/5]")}>
        {products.slice(0, 4).map((product, index) => (
          <ProductPhoto
            key={product.id}
            product={product}
            priority={priority && index === 0}
            className={cn("absolute shadow-[0_12px_35px_rgba(71,55,43,0.08)]", flatLayPositions[index])}
          />
        ))}
      </div>
    );
  }

  const heroImage = hero?.images[0];
  return (
    <div className={cn("overflow-hidden bg-[#f6f0e9]", isDetail && "rounded-[1.5rem]")}>
      <div className={cn("relative", isDetail ? "aspect-[4/5]" : "aspect-[4/5]")}>
        {heroImage ? (
          <Image
            src={heroImage.url}
            alt={heroImage.alt}
            fill
            priority={priority}
            sizes={isDetail ? "(max-width: 1023px) 100vw, 58vw" : "(max-width: 767px) 100vw, 33vw"}
            className="object-contain"
          />
        ) : null}
      </div>
      {companions.length > 0 ? (
        <div className="grid grid-cols-3 gap-2 border-t border-white/80 bg-[#fbf7f2] p-2.5">
          {companions.slice(0, 3).map((product) => (
            <ProductPhoto key={product.id} product={product} className="aspect-square" />
          ))}
        </div>
      ) : null}
    </div>
  );
}
