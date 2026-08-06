import type { Look } from "@/domain/look";

import { LookCard } from "./look-card";

type LookGridProps = {
  looks: readonly Look[];
  headingLevel?: 2 | 3;
  prioritizeFirst?: boolean;
};

export function LookGrid({ headingLevel = 2, looks, prioritizeFirst = true }: LookGridProps) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {looks.map((look, index) => (
        <LookCard key={look.id} look={look} priority={prioritizeFirst && index === 0} headingLevel={headingLevel} />
      ))}
    </div>
  );
}
