import Image from "next/image";

import type { CatalogProduct } from "@/domain/catalog";
import { cn } from "@/lib/utils";

import type {
  EditorialLookImage,
  EditorialLookPresentation,
} from "../types/editorial-look-presentation";

type Props = {
  presentation: EditorialLookPresentation;
  products: readonly CatalogProduct[];
  priority?: boolean;
  size?: "featured" | "compact" | "detail";
};

function resolveImage(products: readonly CatalogProduct[], selection: EditorialLookImage) {
  const product = products.find(({ id }) => id === selection.productId);
  const image = product?.images[selection.imageIndex] ?? product?.images[0];
  return product && image ? { image, product } : undefined;
}

const toneClasses = {
  denim: "bg-[#eef1f4] before:bg-[#dce5ef] after:bg-[#f7efe5]",
  rose: "bg-[#f7eee9] before:bg-[#ead7d5] after:bg-[#f6e9dc]",
  wine: "bg-[#f5ece8] before:bg-[#e9d0d1] after:bg-[#efe1d5]",
} as const;

export function EditorialLookComposition({
  presentation,
  priority = false,
  products,
  size = "featured",
}: Props) {
  const dominant = resolveImage(products, presentation.dominant);
  const supporting = presentation.supporting
    ? resolveImage(products, presentation.supporting)
    : undefined;

  if (!dominant) return null;

  const compact = size === "compact";
  const detail = size === "detail";
  const sizes = detail
    ? "(max-width: 1023px) 100vw, 58vw"
    : compact
      ? "(max-width: 767px) 50vw, 24vw"
      : "(max-width: 767px) 100vw, 54vw";

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden",
        "before:absolute before:-end-[14%] before:top-[7%] before:h-[74%] before:w-[58%] before:rotate-[-4deg] before:rounded-[42%_58%_36%_64%/38%_38%_62%_62%] before:opacity-70",
        "after:absolute after:-bottom-[16%] after:-start-[9%] after:h-[43%] after:w-[68%] after:rotate-[6deg] after:rounded-[62%_38%_52%_48%/58%_42%_58%_42%] after:opacity-75",
        toneClasses[presentation.tone],
        compact ? "aspect-[4/5]" : detail ? "aspect-[4/5] sm:aspect-[5/4]" : "aspect-[4/5] sm:aspect-[5/4]",
      )}
    >
      {presentation.variant === "SINGLE_PRODUCT_EDITORIAL" ? (
        <>
          <div className="absolute inset-[4%] z-[1] overflow-hidden rounded-[1.35rem] bg-[#f3e8e2]">
            <Image
              src={dominant.image.url}
              alt={dominant.image.alt || dominant.product.title}
              fill
              priority={priority}
              sizes={sizes}
              className="object-contain"
            />
          </div>
          {!compact ? (
            <div className="absolute bottom-[5%] end-[4%] z-[2] max-w-[68%] rotate-[-1.5deg] rounded-sm bg-[#fffaf4]/95 px-3 py-2 text-end shadow-[0_8px_22px_rgba(83,53,46,0.12)]">
              <p className="text-[0.68rem] font-semibold leading-5 text-[#74454d]">{presentation.editorialNote}</p>
            </div>
          ) : null}
        </>
      ) : (
        <>
          <div
            className={cn(
              "absolute z-[1] overflow-hidden bg-[#eee7df] shadow-[0_10px_30px_rgba(68,48,40,0.08)]",
              presentation.variant === "FEATURED_EDITORIAL"
                ? "bottom-[3%] end-[3%] top-[3%] w-[71%] rounded-[1.45rem]"
                : "bottom-[3%] start-[3%] top-[3%] w-[76%] rounded-[1.2rem]",
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

          {supporting ? (
            <div
              className={cn(
                "absolute z-[3] overflow-hidden border border-white/90 bg-[#fffaf5] shadow-[0_14px_34px_rgba(74,48,40,0.16)]",
                presentation.variant === "FEATURED_EDITORIAL"
                  ? "bottom-[9%] start-[4%] h-[40%] w-[42%] rotate-[1.8deg] rounded-[1.1rem]"
                  : "bottom-[8%] end-[4%] h-[42%] w-[47%] rotate-[-2deg] rounded-[0.9rem]",
              )}
            >
              <Image
                src={supporting.image.url}
                alt={supporting.image.alt || supporting.product.title}
                fill
                sizes={compact ? "42vw" : "45vw"}
                className="object-contain"
              />
            </div>
          ) : null}

          {!compact ? (
            <div
              className={cn(
                "absolute z-[4] max-w-[48%] rotate-[-2deg] rounded-sm bg-[#fffaf4]/94 px-2.5 py-2 shadow-[0_8px_22px_rgba(83,53,46,0.1)]",
                presentation.variant === "FEATURED_EDITORIAL"
                  ? "start-[5%] top-[8%]"
                  : "end-[5%] top-[8%]",
              )}
            >
              <p className="text-xs font-semibold leading-snug text-[#654d48]">{presentation.editorialNote}</p>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
