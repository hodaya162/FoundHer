"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";

import { Input } from "@/components/ui";

export function HomeSearch() {
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = String(new FormData(event.currentTarget).get("q") ?? "").trim();
    router.push(query ? `/search?q=${encodeURIComponent(query)}` : "/search");
  }

  return (
    <form action="/search" role="search" onSubmit={handleSubmit}>
      <div>
        <div className="relative">
          <Input
          type="search"
          name="q"
          aria-label="חיפוש ב־FoundHer"
          placeholder="חפשי לוק, פריט או מותג..."
          className="h-12 rounded-[0.85rem] border-[#e9dcda] bg-white/90 ps-4 pe-12 text-sm shadow-[0_5px_22px_rgba(91,55,61,0.045)] placeholder:text-[#9a8d8a]"
          />
          <button type="submit" aria-label="חיפוש" className="absolute left-1.5 top-1/2 inline-grid size-9 -translate-y-1/2 place-items-center rounded-full bg-[#f6eceb] text-primary transition-colors hover:bg-[#eedddb]">
            <Search aria-hidden="true" className="size-[1.05rem]" strokeWidth={1.7} />
          </button>
        </div>
      </div>
    </form>
  );
}
