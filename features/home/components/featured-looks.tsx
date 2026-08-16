import type { Look } from "@/domain/look";
import { LookGrid } from "@/features/looks/components";

import { EditorialSection } from "./editorial-section";

type FeaturedLooksProps = {
  looks: readonly Look[];
};

export function FeaturedLooks({ looks }: FeaturedLooksProps) {
  if (looks.length === 0) {
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
      <LookGrid looks={looks} headingLevel={3} prioritizeFirst={false} featuredFirst />
    </EditorialSection>
  );
}
