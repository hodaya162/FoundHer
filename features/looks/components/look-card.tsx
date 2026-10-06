import Link from "next/link";

import type { Look } from "@/domain/look";

import { LookCoverImage } from "./look-cover-image";
import { LookMeta } from "./look-meta";
import { LookSaveButton } from "./look-save-button";
import { LookTags } from "./look-tags";

type LookCardProps = {
  headingLevel?: 2 | 3;
  look: Look;
  priority?: boolean;
};

export function LookCard({ headingLevel = 2, look, priority = false }: LookCardProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const href = `/looks/${look.slug}`;

  return (
    <article className="break-inside-avoid">
      <div className="relative overflow-hidden rounded-card bg-surface-muted">
        <Link href={href} className="group/image block" aria-label={`פתיחת הלוק ${look.title}`}>
          <LookCoverImage image={look.coverImage} priority={priority} />
        </Link>
        <LookSaveButton lookId={look.id} lookTitle={look.title} className="absolute end-3 top-3 bg-surface/95 shadow-sm" />
      </div>
      <div className="space-y-2 px-0.5 pb-2 pt-3">
        <div className="flex items-center justify-between gap-2">
          <LookTags look={look} compact />
          <LookMeta productCount={look.productRefs.length} />
        </div>
        <Heading className="type-card-title">
          <Link href={href} className="rounded-sm hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            {look.title}
          </Link>
        </Heading>
      </div>
    </article>
  );
}
