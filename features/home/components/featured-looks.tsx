import { LookGrid } from "@/features/looks/components";
import type { LookCardModel } from "@/features/looks/types/look-card";

import { EditorialSection } from "./editorial-section";

type FeaturedLooksProps = {
  models: readonly LookCardModel[];
};

export function FeaturedLooks({ models }: FeaturedLooksProps) {
  if (models.length === 0) {
    return null;
  }

  return (
    <EditorialSection
      id="featured-looks-title"
      eyebrow="הרעיונות של FoundHer"
      title="לוקים שאהבנו"
      description="רעיונות שלמים לרגעים אמיתיים."
      actionHref="/looks"
      actionLabel="כל הלוקים"
    >
      <LookGrid models={models} headingLevel={3} prioritizeFirst={false} featuredFirst />
    </EditorialSection>
  );
}
