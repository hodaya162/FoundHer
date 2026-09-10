import type { LookCardModel } from "../types/look-details";

import { LookCard } from "./look-card";

type LookGridProps = {
  looks: readonly LookCardModel[];
  headingLevel?: 2 | 3;
  prioritizeFirst?: boolean;
  featuredFirst?: boolean;
  layout?: "standard" | "editorial";
};

export function LookGrid({ featuredFirst = false, headingLevel = 2, layout = "standard", looks, prioritizeFirst = true }: LookGridProps) {
  if (layout === "editorial") {
    return (
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-7 md:grid-cols-2 md:gap-x-6 md:gap-y-10">
        {looks.map((model, index) => {
          const primary = model.products[0]?.product;
          const isDressLed = primary?.categoryId === "category-dresses" || primary?.type !== "purchase";
          const collageVariant = isDressLed ? "board-dress" : index % 2 === 0 ? "board-separates" : "board-layered";

          return (
            <LookCard
              key={model.look.id}
              model={model}
              priority={prioritizeFirst && index === 0}
              headingLevel={headingLevel}
              presentation="editorial"
              collageVariant={collageVariant}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:grid-cols-3">
      {looks.map((model, index) => (
        <div key={model.look.id} className={featuredFirst && index === 0 ? "col-span-2 lg:col-span-1" : undefined}>
          <LookCard model={model} priority={prioritizeFirst && index === 0} headingLevel={headingLevel} />
        </div>
      ))}
    </div>
  );
}
