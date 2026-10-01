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

const modelLedPositions = [
  "end-[5%] top-[6%] h-[88%] w-[58%]",
  "start-[5%] top-[8%] h-[31%] w-[31%] -rotate-1",
  "start-[9%] top-[37%] h-[29%] w-[33%] rotate-1",
  "start-[4%] bottom-[7%] h-[25%] w-[30%] -rotate-1",
] as const;

const flatLayPositions = [
  "end-[23%] top-[8%] h-[68%] w-[54%]",
  "start-[4%] top-[7%] h-[34%] w-[30%] -rotate-1",
  "end-[4%] bottom-[7%] h-[31%] w-[31%] rotate-1",
  "start-[7%] bottom-[6%] h-[28%] w-[29%] -rotate-2",
] as const;

const twoProductPositions = [
  "end-[5%] top-[6%] h-[88%] w-[61%]",
  "start-[5%] top-[24%] h-[43%] w-[33%] -rotate-1",
] as const;

const threeProductPositions = [
  "end-[5%] top-[6%] h-[88%] w-[59%]",
  "start-[5%] top-[11%] h-[38%] w-[32%] -rotate-1",
  "start-[7%] bottom-[10%] h-[35%] w-[34%] rotate-1",
] as const;

function ProductPhoto({ className, priority, product }: { className?: string; priority?: boolean; product: Product }) {
  const image = product.images[0];
  if (!image) return null;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1rem] bg-white/90 shadow-[0_14px_35px_rgba(71,55,43,0.09)]",
        className,
      )}
    >
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
  const orderedProducts = hero ? [hero, ...companions] : products;
  const positions = products.length === 2
    ? twoProductPositions
    : products.length === 3
      ? threeProductPositions
      : look.visualMode === "flat-lay"
        ? flatLayPositions
        : modelLedPositions;

  return (
    <div
      className={cn(
        "relative aspect-[5/6] overflow-hidden bg-[radial-gradient(circle_at_22%_18%,rgba(255,255,255,0.88),transparent_32%),linear-gradient(145deg,#f8f2eb_0%,#f2e8de_100%)]",
        isDetail && "rounded-[1.5rem]",
      )}
      aria-label={`קומפוזיציית הפריטים של ${look.title}`}
    >
      <div aria-hidden="true" className="absolute -bottom-16 -end-12 size-52 rounded-full bg-white/35 blur-2xl" />
      {orderedProducts.slice(0, 4).map((product, index) => (
        <ProductPhoto
          key={product.id}
          product={product}
          priority={priority && index === 0}
          className={cn("absolute", positions[index])}
        />
      ))}
      {products.length > 0 ? (
        <span className="sr-only">
          {products.map(({ name }) => name).join(", ")}
        </span>
      ) : null}
    </div>
  );
}
