import { PageContainer } from "@/components/layout";
import { Skeleton } from "@/components/ui";
import { ProductGridSkeleton } from "@/features/products/components";

export default function DiscoverLoading() {
  return (
    <main aria-busy="true" aria-label="טוען את עמוד הגילוי">
      <PageContainer className="pb-16 sm:pb-20">
        <div className="py-10 sm:py-14">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="mt-4 h-12 w-full max-w-lg" />
          <Skeleton className="mt-4 h-6 w-full max-w-2xl" />
        </div>
        <div className="mb-8 space-y-4 border-y border-border py-5">
          <Skeleton className="h-11 w-full" />
          <Skeleton className="h-10 w-full max-w-md" />
        </div>
        <Skeleton className="mb-5 h-9 w-64" />
        <ProductGridSkeleton />
      </PageContainer>
    </main>
  );
}
