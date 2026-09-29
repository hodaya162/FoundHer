import Image from "next/image";
import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

import type { HeroLookModel, LookLabVariant, ResolvedLookAsset } from "../types/look-lab";

type PositionSet = { readonly hero: string; readonly supporting: readonly string[] };

const positions: Record<LookLabVariant, PositionSet> = {
  "hero-center": {
    hero: "end-[15%] bottom-[1%] h-[95%] w-[63%]",
    supporting: [
      "start-[0%] top-[7%] z-[1] h-[41%] w-[42%] -rotate-[1deg]",
      "start-[1%] bottom-[1%] z-[4] h-[29%] w-[35%] rotate-[1deg]",
      "end-[1%] top-[5%] z-[3] h-[25%] w-[25%] rotate-[1deg]",
      "end-[24%] top-[4%] z-[4] h-[24%] w-[22%] -rotate-[1deg]",
    ],
  },
  "hero-edge": {
    hero: "start-[0%] bottom-[0%] h-[89%] w-[61%]",
    supporting: [
      "end-[0%] top-[4%] z-[3] h-[52%] w-[49%] rotate-[1deg]",
      "end-[2%] bottom-[2%] z-[4] h-[31%] w-[37%] -rotate-[1deg]",
      "end-[35%] top-[39%] z-[4] h-[24%] w-[25%] rotate-[2deg]",
      "start-[37%] bottom-[7%] z-[4] h-[21%] w-[22%] -rotate-[1deg]",
    ],
  },
  "layered-editorial": {
    hero: "end-[1%] bottom-[1%] h-[90%] w-[58%]",
    supporting: [
      "start-[0%] top-[7%] z-[1] h-[42%] w-[43%] -rotate-[1deg]",
      "start-[1%] bottom-[4%] z-[4] h-[29%] w-[36%] rotate-[1deg]",
      "start-[36%] top-[7%] z-[4] h-[24%] w-[21%] rotate-[1deg]",
      "end-[2%] top-[3%] z-[4] h-[21%] w-[20%] -rotate-[1deg]",
    ],
  },
  "model-hero": {
    hero: "end-[1%] top-[1%] h-[98%] w-[72%]",
    supporting: [
      "start-[1%] bottom-[3%] z-[4] h-[31%] w-[36%] -rotate-[1deg]",
      "start-[2%] top-[4%] z-[4] h-[25%] w-[29%] rotate-[1deg]",
      "start-[25%] top-[35%] z-[4] h-[22%] w-[24%] -rotate-[2deg]",
      "start-[34%] bottom-[9%] z-[4] h-[20%] w-[21%] rotate-[1deg]",
    ],
  },
};

function assetClass(asset: ResolvedLookAsset, isHero: boolean) {
  if (asset.assetType === "model") return "object-cover";
  if (asset.assetType === "detail") return "object-contain p-1.5 mix-blend-multiply";
  return cn("object-contain mix-blend-multiply", isHero ? "p-1" : "p-1.5");
}

function assetStyle(asset: ResolvedLookAsset, isHero: boolean): CSSProperties | undefined {
  if (asset.assetType === "model" || asset.backgroundRemovalSafe) return undefined;
  const mask = isHero
    ? "radial-gradient(ellipse 88% 96% at center, black 60%, transparent 98%)"
    : "radial-gradient(ellipse 84% 82% at center, black 54%, transparent 95%)";
  return { maskImage: mask, WebkitMaskImage: mask };
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
      style={assetStyle(asset, isHero)}
    />
  );
}

export function HeroLookMoodboard({ className, featured = false, model, priority = false, variant = model.look.layoutVariant }: { className?: string; featured?: boolean; model: HeroLookModel; priority?: boolean; variant?: LookLabVariant }) {
  const modelVariantAllowed = model.hero.assetType === "model";
  const safeVariant = variant === "model-hero" && !modelVariantAllowed ? model.look.layoutVariant : variant;
  const safeLayout = positions[safeVariant];

  return (
    <div
      className={cn("relative isolate aspect-[4/5] max-h-[31rem] overflow-hidden rounded-[1.35rem]", featured && "aspect-[7/9] max-h-[33rem]", className)}
      data-layout={safeVariant}
      style={{ background: `radial-gradient(circle at 55% 35%, rgba(255,255,255,.88) 0%, ${model.look.canvasTone} 58%, ${model.look.canvasTone} 100%)` }}
    >
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
