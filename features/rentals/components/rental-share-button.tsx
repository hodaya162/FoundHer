"use client";

import { Share2 } from "lucide-react";

export function RentalShareButton({ title }: { title: string }) {
  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title, url });
      return;
    }
    await navigator.clipboard?.writeText(url);
  };

  return (
    <button type="button" onClick={() => void share().catch(() => undefined)} aria-label={`שיתוף ${title}`} className="inline-grid size-11 place-items-center rounded-full bg-white/92 text-foreground shadow-sm transition-colors hover:bg-white">
      <Share2 aria-hidden="true" className="size-5" />
    </button>
  );
}
