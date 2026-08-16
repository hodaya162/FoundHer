import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { PageContainer } from "@/components/layout";
import { buttonVariants } from "@/components/ui";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <main>
      <PageContainer className="flex min-h-[62dvh] items-center py-12 sm:py-20">
        <section aria-labelledby="not-found-title" className="max-w-lg">
          <p className="type-label text-primary">404</p>
          <h1 id="not-found-title" className="type-page-title mt-2">העמוד לא נמצא</h1>
          <p className="type-body mt-3 text-muted">אפשר לחזור לגלות לוקים, פריטים והשכרות.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link href="/" className={cn(buttonVariants(), "gap-3")}>לעמוד הבית <ArrowLeft aria-hidden="true" className="size-4" /></Link>
            <Link href="/looks" className={buttonVariants({ variant: "secondary" })}>ללוקים</Link>
          </div>
        </section>
      </PageContainer>
    </main>
  );
}
