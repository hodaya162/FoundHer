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
          className="h-12 rounded-card border-border/80 bg-surface ps-10 pe-3 text-sm shadow-none"
          />
          <button type="submit" aria-label="חיפוש" className="absolute inset-inline-start-0 top-1/2 inline-grid size-11 -translate-y-1/2 place-items-center text-muted hover:text-primary">
            <Search aria-hidden="true" className="size-4" />
          </button>
        </div>
      </div>
    </form>
  );
}
