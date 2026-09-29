import Image from "next/image";

import { cn } from "@/lib/utils";

import type { HeroLookModel, LookLabLayout, ResolvedLookAsset } from "../types/look-lab";

type PositionSet = { readonly hero: string; readonly supporting: readonly string[] };

const flatlayPositions: Record<Extract<LookLabLayout, "flatlay-editorial" | "flatlay-alternative">, PositionSet> = {
  "flatlay-editorial": {
    hero: "end-[15%] bottom-[1%] h-[95%] w-[63%]",
    supporting: [
      "start-[0%] top-[7%] z-[1] h-[41%] w-[42%] -rotate-[1deg]",
      "start-[1%] bottom-[1%] z-[4] h-[29%] w-[35%] rotate-[1deg]",
      "end-[1%] top-[5%] z-[3] h-[25%] w-[25%] rotate-[1deg]",
      "end-[24%] top-[4%] z-[4] h-[24%] w-[22%] -rotate-[1deg]",
    ],
  },
  "flatlay-alternative": {
    hero: "start-[0%] bottom-[0%] h-[90%] w-[62%]",
    supporting: [
      "end-[0%] top-[4%] z-[3] h-[53%] w-[49%] rotate-[1deg]",
      "end-[2%] bottom-[2%] z-[4] h-[32%] w-[38%] -rotate-[1deg]",
      "end-[34%] top-[39%] z-[4] h-[25%] w-[26%] rotate-[2deg]",
      "start-[37%] bottom-[7%] z-[4] h-[21%] w-[22%] -rotate-[1deg]",
    ],
  },
};

const photoSupporting = [
  "start-[3%] bottom-[3%] z-[4] h-[31%] w-[38%] -rotate-[1deg]",
  "start-[38%] bottom-[5%] z-[4] h-[27%] w-[27%] rotate-[1deg]",
  "end-[3%] bottom-[7%] z-[4] h-[24%] w-[24%] -rotate-[1deg]",
  "end-[28%] bottom-[3%] z-[4] h-[20%] w-[20%] rotate-[1deg]",
] as const;

const splitSupporting = [
  "start-[2%] bottom-[3%] z-[4] h-[28%] w-[34%] -rotate-[1deg]",
  "end-[2%] bottom-[3%] z-[4] h-[28%] w-[34%] rotate-[1deg]",
  "start-[39%] bottom-[5%] z-[4] h-[23%] w-[22%]",
] as const;

function assetClass(asset: ResolvedLookAsset) {
  if (asset.assetType === "detail") return "object-contain p-1.5";
  return "object-contain p-1";
}

function AssetImage({ asset, priority, sizes }: { asset: ResolvedLookAsset; priority: boolean; sizes: string }) {
  return <Image src={asset.image.url} alt={asset.image.alt} fill priority={priority} sizes={sizes} className={assetClass(asset)} />;
}

function ProductAsset({ asset, className, priority = false }: { asset: ResolvedLookAsset; className: string; priority?: boolean }) {
  const preserveStudioFrame = asset.assetType === "product-studio" || asset.assetType === "model-crop-safe";
  return (
    <div className={cn("absolute", preserveStudioFrame ? "overflow-hidden rounded-[0.85rem] bg-white/80 shadow-[0_10px_24px_rgba(56,39,33,0.09)]" : "overflow-visible drop-shadow-[0_10px_14px_rgba(65,45,37,0.11)]", className)}>
      <AssetImage asset={asset} priority={priority} sizes="(max-width: 767px) 42vw, 210px" />
    </div>
  );
}

function FlatlayMoodboard({ model, priority }: { model: HeroLookModel; priority: boolean }) {
  const layout = model.layout === "flatlay-alternative" ? "flatlay-alternative" : "flatlay-editorial";
  const positions = flatlayPositions[layout];
  return (
    <>
      <ProductAsset asset={model.hero} className={cn("z-[2]", positions.hero)} priority={priority} />
      {model.supporting.slice(0, 4).map((asset, index) => <ProductAsset key={asset.productId} asset={asset} className={positions.supporting[index]} />)}
    </>
  );
}

function PhotoEditorialMoodboard({ model, priority }: { model: HeroLookModel; priority: boolean }) {
  return (
    <>
      <div className="absolute inset-x-[3%] top-[3%] z-[2] h-[60%] overflow-hidden rounded-[1rem] bg-white shadow-[0_16px_36px_rgba(56,39,33,0.12)]">
        <AssetImage asset={model.hero} priority={priority} sizes="(max-width: 767px) 88vw, 440px" />
      </div>
      {model.supporting.slice(0, 4).map((asset, index) => <ProductAsset key={asset.productId} asset={asset} className={photoSupporting[index]} />)}
    </>
  );
}

function SplitEditorialMoodboard({ model, priority }: { model: HeroLookModel; priority: boolean }) {
  const assets = [model.hero, ...model.supporting];
  const photos = assets.filter(({ assetType }) => assetType === "model-crop-safe").slice(0, 2);
  const companions = assets.filter(({ productId }) => !photos.some((photo) => photo.productId === productId));
  return (
    <>
      {photos.map((asset, index) => (
        <div key={asset.productId} className={cn("absolute top-[3%] z-[2] h-[62%] w-[46%] overflow-hidden rounded-[1rem] bg-white shadow-[0_14px_30px_rgba(56,39,33,0.11)]", index === 0 ? "start-[3%]" : "end-[3%]")}>
          <AssetImage asset={asset} priority={priority && index === 0} sizes="(max-width: 767px) 44vw, 220px" />
        </div>
      ))}
      {companions.slice(0, 3).map((asset, index) => <ProductAsset key={asset.productId} asset={asset} className={splitSupporting[index]} />)}
    </>
  );
}

export function HeroLookMoodboard({ className, featured = false, model, priority = false }: { className?: string; featured?: boolean; model: HeroLookModel; priority?: boolean }) {
  return (
    <div
      className={cn("relative isolate aspect-[4/5] max-h-[31rem] overflow-hidden rounded-[1.35rem]", featured && "aspect-[7/9] max-h-[33rem]", className)}
      data-layout={model.layout}
      style={{ background: `radial-gradient(circle at 55% 35%, rgba(255,255,255,.88) 0%, ${model.look.canvasTone} 58%, ${model.look.canvasTone} 100%)` }}
    >
      <span aria-hidden className="absolute inset-x-[12%] bottom-[-12%] h-[48%] rounded-full bg-white/55 blur-3xl" />
      {model.layout === "photo-editorial" ? <PhotoEditorialMoodboard model={model} priority={priority} /> : null}
      {model.layout === "split-editorial" ? <SplitEditorialMoodboard model={model} priority={priority} /> : null}
      {model.layout === "flatlay-editorial" || model.layout === "flatlay-alternative" ? <FlatlayMoodboard model={model} priority={priority} /> : null}
    </div>
  );
}
