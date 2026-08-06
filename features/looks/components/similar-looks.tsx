import type { Look } from "@/domain/look";

import { LookGrid } from "./look-grid";

type SimilarLooksProps = { looks: readonly Look[] };

export function SimilarLooks({ looks }: SimilarLooksProps) {
  if (looks.length === 0) return null;

  return (
    <section aria-labelledby="similar-looks-title" className="py-14 sm:py-20">
      <div className="mb-7">
        <p className="type-label text-primary">להמשיך לקבל השראה</p>
        <h2 id="similar-looks-title" className="type-section-title mt-2">לוקים דומים</h2>
      </div>
      <LookGrid looks={looks} headingLevel={3} prioritizeFirst={false} />
    </section>
  );
}
