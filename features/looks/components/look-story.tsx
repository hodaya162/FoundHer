import type { Look } from "@/domain/look";

type LookStoryProps = { look: Look };

export function LookStory({ look }: LookStoryProps) {
  return (
    <section aria-labelledby="look-story-title" className="mx-auto max-w-3xl py-14 sm:py-20">
      <p className="type-label text-primary">הסיפור של הלוק</p>
      <h2 id="look-story-title" className="type-section-title mt-2">לדמיין את הרגע</h2>
      <div className="mt-5 space-y-4 text-pretty text-muted">
        <p className="type-body text-foreground">{look.description}</p>
        <p className="type-body">{look.story}</p>
      </div>
    </section>
  );
}
