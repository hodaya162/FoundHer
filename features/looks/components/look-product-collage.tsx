import Image from "next/image";
import Link from "next/link";

import { formatProductPrice } from "@/features/products/utils/format-product-price";
import { cn } from "@/lib/utils";

import type { LookProductItem } from "../types/look-details";

type LookProductCollageProps = {
  items: readonly LookProductItem[];
  priority?: boolean;
  linkItems?: boolean;
  showPrices?: boolean;
  className?: string;
  layout?: "grid" | "board-separates" | "board-layered" | "board-dress";
};

const gridByCount: Record<number, string> = {
  2: "grid-cols-2",
  3: "grid-cols-2 grid-rows-2 [&>*:first-child]:row-span-2",
  4: "grid-cols-2 grid-rows-2",
  5: "grid-cols-6 grid-rows-2 [&>*:nth-child(-n+3)]:col-span-2 [&>*:nth-child(n+4)]:col-span-3",
};

const boardPositions = {
  "board-separates": [
    "end-[2%] bottom-[1%] h-[91%] w-[57%]",
    "start-[3%] top-[3%] h-[47%] w-[42%]",
    "start-[3%] bottom-[3%] h-[30%] w-[37%]",
    "start-[34%] top-[8%] h-[23%] w-[22%]",
    "start-[35%] bottom-[9%] h-[22%] w-[21%]",
  ],
  "board-layered": [
    "start-[2%] bottom-[1%] h-[90%] w-[57%]",
    "end-[3%] top-[3%] h-[44%] w-[42%]",
    "end-[3%] bottom-[3%] h-[29%] w-[37%]",
    "end-[35%] top-[9%] h-[22%] w-[21%]",
    "end-[34%] bottom-[9%] h-[22%] w-[21%]",
  ],
  "board-dress": [
    "end-[14%] bottom-[1%] h-[96%] w-[65%]",
    "start-[2%] bottom-[5%] h-[30%] w-[34%]",
    "start-[3%] top-[7%] h-[25%] w-[28%]",
    "end-[1%] top-[4%] h-[30%] w-[28%]",
    "start-[33%] top-[5%] h-[20%] w-[20%]",
  ],
};

export function LookProductCollage({ className, items, layout = "grid", linkItems = false, priority = false, showPrices = false }: LookProductCollageProps) {
  const visibleItems = items.slice(0, 5);
  const gridClass = gridByCount[visibleItems.length] ?? "grid-cols-2";

  function renderItem(item: LookProductItem, index: number) {
    const amount = item.product.type === "purchase" ? item.product.price : item.product.rentalPrice;
    const preserveSilhouette = item.product.categoryId === "category-shoes" || item.product.categoryId === "category-jewelry";
    const productOnlySource = preserveSilhouette
      || (item.image.url.startsWith("/images/generated/products/") && !item.image.url.endsWith("classic-shabbat-dress.webp"))
      || item.image.url.endsWith("mauve-romantic-evening-gown.webp");
    const content = (
      <>
        <Image
          src={item.image.url}
          alt={item.image.alt}
          fill
          priority={priority && index === 0}
          sizes={layout === "grid" ? "(max-width: 639px) 42vw, (max-width: 1023px) 28vw, 18vw" : "(max-width: 767px) 62vw, 34vw"}
          className={cn(
            "transition-transform duration-300 group-hover:scale-[1.025]",
            layout === "grid"
              ? preserveSilhouette ? "object-contain p-1.5" : "object-cover"
              : productOnlySource ? "object-contain p-1 mix-blend-multiply" : "object-cover [mask-image:linear-gradient(to_bottom,black_86%,transparent)]",
          )}
        />
        {showPrices ? (
          <span className="absolute bottom-2 start-2 rounded-[0.4rem] border border-black/5 bg-[#fffdf9]/94 px-2 py-1 text-[0.72rem] font-semibold leading-none text-foreground shadow-[0_1px_3px_rgba(37,30,27,0.12)] backdrop-blur-sm">
            {formatProductPrice(amount, item.product.currency)}{item.product.type !== "purchase" ? " · להשכרה" : ""}
          </span>
        ) : null}
      </>
    );

    return linkItems ? (
      <Link key={item.product.id} href={item.href} className={cn("group relative block h-full min-h-0 overflow-hidden", layout === "grid" ? "bg-surface" : "bg-transparent")} aria-label={`פתיחת הפריט ${item.product.name}`}>
        {content}
      </Link>
    ) : (
      <div key={item.product.id} className={cn("group relative h-full min-h-0 overflow-hidden", layout === "grid" ? "bg-surface" : "bg-transparent")}>
        {content}
      </div>
    );
  }

  if (layout !== "grid" && visibleItems.length > 1) {
    const positions = boardPositions[layout];
    return (
      <div
        className={cn("relative isolate aspect-[6/5] max-h-[305px] overflow-hidden rounded-[1.05rem] bg-[#f5eee7] md:aspect-[4/3] md:max-h-none", className)}
        aria-label="Moodboard של פריטים מקוריים ונפרדים המרכיבים את הלוק"
      >
        <div aria-hidden className="absolute inset-x-[8%] bottom-[-20%] h-[55%] rounded-full bg-white/55 blur-3xl" />
        {visibleItems.map((item, index) => (
          <div key={item.product.id} className={cn("absolute z-[1] drop-shadow-[0_10px_14px_rgba(70,49,39,0.09)]", positions[index])}>
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn("grid aspect-[4/5] gap-1 overflow-hidden rounded-card bg-surface-muted", gridClass, className)}
      aria-label="Moodboard של פריטים נפרדים המרכיבים את הלוק"
    >
      {visibleItems.map(renderItem)}
    </div>
  );
}
