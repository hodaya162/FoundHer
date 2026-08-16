import type { Look } from "@/domain/look";

type LookStoryProps = { look: Look };

export function LookStory({ look }: LookStoryProps) {
  return (
    <section aria-labelledby="look-story-title" className="mx-auto max-w-3xl py-10 sm:py-16">
      <h2 id="look-story-title" className="type-section-title">הסיפור של הלוק</h2>
      <p className="type-body mt-3 text-pretty text-muted">{look.story}</p>
    </section>
  );
}
