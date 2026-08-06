import Link from "next/link";

import { PageContainer } from "@/components/layout";
import { buttonVariants, EmptyState } from "@/components/ui";

export default function ProductNotFound() {
  return (
    <main>
      <PageContainer className="py-16 sm:py-24">
        <EmptyState
          headingLevel={1}
          title="הפריט לא נמצא"
          description="ייתכן שהפריט הוסר או שהקישור השתנה. אפשר לחזור לעמוד הגילוי ולמצוא פריטים נוספים."
          action={<Link href="/discover" className={buttonVariants()}>חזרה לגילוי</Link>}
        />
      </PageContainer>
    </main>
  );
}
