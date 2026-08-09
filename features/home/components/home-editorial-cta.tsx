import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";

export function HomeEditorialCta() {
  return (
    <section aria-labelledby="home-editorial-cta-title" className="my-12 rounded-card bg-foreground px-6 py-12 text-background sm:my-16 sm:px-10 sm:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <Heart aria-hidden="true" className="mx-auto size-6 text-primary" />
        <h2 id="home-editorial-cta-title" className="type-section-title mt-4">לא צריך להתחיל מהפריט</h2>
        <p className="type-body mt-3 text-background/70">
          התחילי מהרגע, מהאירוע או מההרגשה — ותני ללוק השלם להוביל אותך משם.
        </p>
        <Link href="/looks" className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-background underline-offset-4 hover:underline">
          למצוא את הלוק שלך
          <ArrowLeft aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </section>
  );
}
