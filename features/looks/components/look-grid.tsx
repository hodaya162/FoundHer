import type { LookCardModel } from "../types/look-card";

import { LookCard } from "./look-card";

type LookGridProps = {
  models: readonly LookCardModel[];
  headingLevel?: 2 | 3;
  prioritizeFirst?: boolean;
  featuredFirst?: boolean;
};

export function LookGrid({ featuredFirst = false, headingLevel = 2, models, prioritizeFirst = true }: LookGridProps) {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:grid-cols-3">
      {models.map((model, index) => (
        <div key={model.look.id} className={featuredFirst && index === 0 ? "col-span-2 lg:col-span-1" : undefined}>
          <LookCard model={model} priority={prioritizeFirst && index === 0} headingLevel={headingLevel} />
        </div>
      ))}
    </div>
  );
}
