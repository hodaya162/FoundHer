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

function ProductImage({
  className,
  priority,
  product,
  sizes,
}: {
  className?: string;
  priority?: boolean;
  product: CatalogProduct;
  sizes: string;
}) {
  const image = product.images[0];
  if (!image) return null;

  return (
    <div className={cn("relative overflow-hidden bg-[#f7f1eb]", className)}>
      <Image
        src={image.url}
        alt={image.alt || product.title}
        fill
        priority={priority}
        sizes={sizes}
        className="object-contain"
      />
    </div>
  );
}

export function RealLookComposition({ look, priority = false, products, variant = "card" }: Props) {
  const hero = products.find(({ id }) => id === look.composition.heroProductId) ?? products[0];
  const supporting = products.filter(({ id }) => id !== hero?.id);
  const isRail = variant === "rail";
  const sizes = isRail
    ? "(max-width: 639px) 43vw, 240px"
    : variant === "hero"
      ? "(max-width: 1023px) 100vw, 58vw"
      : "(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw";

  if (!hero) return <div className="aspect-[4/5] bg-surface-muted" />;

  if (look.composition.layout === "single-photo" || supporting.length === 0) {
    return (
      <div className={cn("relative overflow-hidden bg-[#f6efe8]", isRail ? "h-full" : "aspect-[4/5]") }>
        <ProductImage product={hero} priority={priority} sizes={sizes} className="absolute inset-0" />
      </div>
    );
  }

  if (look.composition.layout === "photo-pair") {
    return (
      <div className={cn("relative overflow-hidden bg-[#f3ebe3]", isRail ? "h-full" : "aspect-[4/5]") }>
        <ProductImage product={hero} priority={priority} sizes={sizes} className="absolute inset-y-[5%] start-[4%] w-[64%] rounded-[1rem]" />
        <ProductImage product={supporting[0]} sizes={sizes} className="absolute bottom-[7%] end-[4%] h-[48%] w-[34%] rounded-[0.85rem] ring-4 ring-[#f3ebe3]" />
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden bg-[#f4ede5]", isRail ? "h-full" : "aspect-[4/5]") }>
      <ProductImage product={hero} priority={priority} sizes={sizes} className="absolute inset-y-[4%] start-[3%] w-[69%] rounded-[1rem]" />
      <ProductImage product={supporting[0]} sizes={sizes} className="absolute end-[3%] top-[20%] h-[55%] w-[34%] rounded-[0.85rem] ring-4 ring-[#f4ede5]" />
    </div>
  );
}
