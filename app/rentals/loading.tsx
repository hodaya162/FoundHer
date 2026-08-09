import { PageContainer } from "@/components/layout";
import { RentalGridSkeleton } from "@/features/rentals/components";

export default function RentalsLoading() {
  return (
    <main>
      <PageContainer className="space-y-8 py-10 pb-16 sm:py-14 sm:pb-20">
        <div className="space-y-4" aria-hidden="true">
          <div className="h-4 w-28 animate-pulse rounded bg-surface-muted" />
          <div className="h-12 w-52 animate-pulse rounded bg-surface-muted" />
          <div className="h-5 max-w-xl animate-pulse rounded bg-surface-muted" />
        </div>
        <RentalGridSkeleton />
      </PageContainer>
    </main>
  );
}
