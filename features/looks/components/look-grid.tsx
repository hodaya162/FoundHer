import type { Look } from "@/domain/look";

import { LookCard } from "./look-card";

type LookGridProps = {
  looks: readonly Look[];
  headingLevel?: 2 | 3;
  prioritizeFirst?: boolean;
  featuredFirst?: boolean;
};

export function LookGrid({ featuredFirst = false, headingLevel = 2, looks, prioritizeFirst = true }: LookGridProps) {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:grid-cols-3">
      {looks.map((look, index) => (
        <div key={look.id} className={featuredFirst && index === 0 ? "col-span-2 lg:col-span-1" : undefined}>
          <LookCard look={look} priority={prioritizeFirst && index === 0} headingLevel={headingLevel} />
        </div>
      ))}
    </div>
  );
}
