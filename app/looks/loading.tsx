import { PageContainer } from "@/components/layout";
import { Skeleton } from "@/components/ui";
import { LookGridSkeleton } from "@/features/looks/components";

export default function LooksLoading() {
  return (
    <main>
      <PageContainer className="space-y-10 py-10 sm:py-14">
        <div className="space-y-4">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-12 w-72 max-w-full" />
          <Skeleton className="h-5 w-full max-w-xl" />
        </div>
        <LookGridSkeleton />
      </PageContainer>
    </main>
  );
}
