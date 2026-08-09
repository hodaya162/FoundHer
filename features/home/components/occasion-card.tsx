import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import type { HomeOccasionEntry } from "../utils/home-content";

type OccasionCardProps = {
  entry: HomeOccasionEntry;
  priority?: boolean;
};

export function OccasionCard({ entry, priority = false }: OccasionCardProps) {
  return (
    <article className="group relative min-h-52 overflow-hidden rounded-card bg-foreground sm:min-h-64">
      <Image
        src={entry.image.url}
        alt={entry.image.alt}
        fill
        priority={priority}
        sizes="(max-width: 639px) 50vw, (max-width: 1023px) 25vw, 25vw"
        className="object-cover opacity-75 transition duration-500 group-hover:scale-[1.02] group-hover:opacity-65"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
      <Link
        href="/looks"
        data-occasion={entry.occasion}
        aria-label={`השראה ל${entry.label} — מעבר לכל הלוקים`}
        className="absolute inset-0 flex min-h-11 flex-col justify-end p-4 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white sm:p-5"
      >
        <span className="type-card-title">{entry.label}</span>
        <span className="mt-1 flex items-center justify-between gap-3 text-xs text-white/85">
          {entry.subtitle}
          <ArrowLeft aria-hidden="true" className="size-4 shrink-0" />
        </span>
      </Link>
    </article>
  );
}
