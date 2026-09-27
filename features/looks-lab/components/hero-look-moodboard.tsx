import Image from "next/image";

import { cn } from "@/lib/utils";

import type { HeroLookModel, LookLabVariant, ResolvedLookAsset } from "../types/look-lab";

type PositionSet = { readonly hero: string; readonly supporting: readonly string[] };

const positions: Record<LookLabVariant, PositionSet> = {
  "hero-center": {
    hero: "end-[16%] bottom-[1%] h-[94%] w-[62%]",
    supporting: [
      "start-[2%] top-[3%] h-[34%] w-[35%] -rotate-[1deg]",
      "start-[3%] bottom-[4%] h-[24%] w-[32%] rotate-[1deg]",
      "end-[2%] top-[5%] h-[19%] w-[20%] rotate-[2deg]",
      "start-[35%] top-[7%] h-[17%] w-[18%] -rotate-[2deg]",
    ],
  },
  "hero-edge": {
    hero: "start-[1%] bottom-[1%] h-[95%] w-[65%]",
    supporting: [
      "end-[2%] top-[4%] h-[38%] w-[38%] rotate-[1deg]",
      "end-[3%] bottom-[4%] h-[27%] w-[34%] -rotate-[1deg]",
      "end-[30%] top-[40%] h-[18%] w-[19%] rotate-[2deg]",
      "start-[40%] bottom-[8%] h-[17%] w-[18%] -rotate-[1deg]",
    ],
  },
  "layered-editorial": {
    hero: "end-[4%] bottom-[1%] h-[94%] w-[61%]",
    supporting: [
      "start-[3%] top-[5%] z-0 h-[43%] w-[42%] -rotate-[1deg]",
      "start-[2%] bottom-[4%] h-[27%] w-[34%] rotate-[1deg]",
      "start-[33%] top-[9%] h-[18%] w-[19%] rotate-[2deg]",
      "end-[1%] top-[4%] h-[18%] w-[19%] -rotate-[1deg]",
    ],
  },
  "model-hero": {
    hero: "end-[1%] top-[1%] h-[98%] w-[69%]",
    supporting: [
      "start-[2%] bottom-[4%] h-[29%] w-[34%] -rotate-[1deg]",
      "start-[3%] top-[5%] h-[22%] w-[27%] rotate-[1deg]",
      "start-[24%] top-[37%] h-[18%] w-[21%] -rotate-[2deg]",
      "start-[34%] bottom-[10%] h-[17%] w-[18%] rotate-[1deg]",
    ],
  },
};

function assetClass(asset: ResolvedLookAsset, isHero: boolean) {
  if (asset.assetType === "model") return "object-cover";
  if (asset.assetType === "detail") return "object-contain p-1.5 mix-blend-multiply";
  return cn("object-contain mix-blend-multiply", isHero ? "p-1" : "p-1.5");
}

function AssetImage({ asset, isHero, priority }: { asset: ResolvedLookAsset; isHero: boolean; priority: boolean }) {
  return (
    <Image
      src={asset.image.url}
      alt={asset.image.alt}
      fill
      priority={priority}
      sizes={isHero ? "(max-width: 767px) 65vw, 340px" : "(max-width: 767px) 36vw, 180px"}
      className={assetClass(asset, isHero)}
    />
  );
}

export function HeroLookMoodboard({ className, model, priority = false, variant = model.look.layoutVariant }: { className?: string; model: HeroLookModel; priority?: boolean; variant?: LookLabVariant }) {
  const modelVariantAllowed = model.hero.assetType === "model";
  const safeVariant = variant === "model-hero" && !modelVariantAllowed ? model.look.layoutVariant : variant;
  const safeLayout = positions[safeVariant];

  return (
    <div className={cn("relative isolate aspect-[4/5] max-h-[31rem] overflow-hidden rounded-[1.35rem] bg-[radial-gradient(circle_at_55%_35%,#fffdf9_0%,#f6eee7_48%,#eee0d5_100%)]", className)} data-layout={safeVariant}>
      <span aria-hidden className="absolute inset-x-[12%] bottom-[-12%] h-[48%] rounded-full bg-white/55 blur-3xl" />
      <div className={cn("absolute z-[2] overflow-hidden", model.hero.assetType === "model" ? "rounded-[1rem] bg-white shadow-[0_16px_36px_rgba(56,39,33,0.15)]" : "drop-shadow-[0_14px_18px_rgba(65,45,37,0.13)]", safeLayout.hero)}>
        <AssetImage asset={model.hero} isHero priority={priority} />
      </div>
      {model.supporting.slice(0, 4).map((asset, index) => (
        <div
          key={asset.productId}
          className={cn(
            "absolute z-[3] overflow-hidden",
            asset.assetType === "model" ? "rounded-[0.85rem] bg-white shadow-[0_12px_28px_rgba(56,39,33,0.13)]" : "drop-shadow-[0_10px_14px_rgba(65,45,37,0.11)]",
            safeLayout.supporting[index],
          )}
        >
          <AssetImage asset={asset} isHero={false} priority={false} />
        </div>
      ))}
    </div>
  );
}
