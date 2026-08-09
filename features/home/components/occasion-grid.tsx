import type { HomeOccasionEntry } from "../utils/home-content";
import { OccasionCard } from "./occasion-card";

type OccasionGridProps = {
  entries: readonly HomeOccasionEntry[];
};

export function OccasionGrid({ entries }: OccasionGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
      {entries.map((entry) => (
        <OccasionCard key={entry.occasion} entry={entry} />
      ))}
    </div>
  );
}
