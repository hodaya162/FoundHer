"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

import { LOOK_LAB_VARIANTS, type HeroLookModel, type LookLabVariant } from "../types/look-lab";
import { variantLabels } from "../utils/look-lab-labels";
import { HeroLookMoodboard } from "./hero-look-moodboard";

export function LookLayoutComparison({ model, overviewOnly = false }: { model: HeroLookModel; overviewOnly?: boolean }) {
  const [variant, setVariant] = useState<LookLabVariant>(model.look.layoutVariant);
  const hasModelHero = model.hero.assetType === "model";

  return (
    <section aria-labelledby="lab-comparison-title" className="mt-14 border-t border-[#e8ddd7] pt-10">
      <header className="mb-5">
        <p className="text-xs font-semibold tracking-[0.08em] text-primary">כלי השוואה למעבדה</p>
        <h2 id="lab-comparison-title" className="mt-1 text-xl font-semibold">אותו לוק, ארבע קומפוזיציות</h2>
        <p className="mt-1 text-sm leading-6 text-muted">הכפתורים מחליפים רק את הפריסה. התמונות והמוצרים אינם משתנים.</p>
      </header>
      <div className="hide-scrollbar -mx-4 mb-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <div className="flex w-max gap-2">
          {LOOK_LAB_VARIANTS.map((item) => {
            const disabled = item === "model-hero" && !hasModelHero;
            return (
              <button
                key={item}
                type="button"
                disabled={disabled}
                aria-pressed={variant === item}
                onClick={() => setVariant(item)}
                className={cn("min-h-11 rounded-full border px-4 text-xs font-semibold transition-colors", variant === item ? "border-primary bg-primary text-white" : "border-[#dfd4ce] bg-white text-foreground", disabled && "cursor-not-allowed opacity-35")}
              >
                {variantLabels[item]}
              </button>
            );
          })}
        </div>
      </div>
      {overviewOnly ? null : (
        <div className="mx-auto max-w-[25rem]">
          <HeroLookMoodboard model={model} variant={variant} />
          <p className="mt-3 text-center text-sm font-medium text-muted">{model.look.title} · {variantLabels[variant]}</p>
        </div>
      )}
      <div aria-label="כל ארבע הקומפוזיציות להשוואה" className={cn("grid grid-cols-2 gap-3", overviewOnly ? "mt-5" : "mt-8")}>
        {LOOK_LAB_VARIANTS.map((item) => {
          const disabled = item === "model-hero" && !hasModelHero;
          if (disabled) return null;

          return (
            <button key={item} type="button" onClick={() => setVariant(item)} className="rounded-[1rem] text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
              <HeroLookMoodboard model={model} variant={item} className={cn("rounded-[1rem]", variant === item && "ring-2 ring-primary ring-offset-2")} />
              <span className="mt-2 block text-center text-[0.7rem] font-semibold text-muted">{variantLabels[item]}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
