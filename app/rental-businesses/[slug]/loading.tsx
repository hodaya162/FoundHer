import { PageContainer } from "@/components/layout";
import { RentalGridSkeleton } from "@/features/rentals/components";

export default function RentalBusinessLoading() {
  return (
    <main>
      <PageContainer className="space-y-10 py-5 pb-16 sm:pb-20">
        <div className="aspect-[16/10] animate-pulse rounded-card bg-surface-muted sm:aspect-[16/7]" />
        <RentalGridSkeleton count={3} />
      </PageContainer>
    </main>
  );
}
