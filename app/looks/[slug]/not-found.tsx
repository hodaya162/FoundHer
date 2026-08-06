import Link from "next/link";

import { PageContainer } from "@/components/layout";
import { EmptyState, buttonVariants } from "@/components/ui";

export default function LookNotFound() {
  return (
    <main>
      <PageContainer className="py-16 sm:py-24">
        <EmptyState
          headingLevel={1}
          title="הלוק לא נמצא"
          description="ייתכן שהלוק הוסר או שהקישור השתנה. אפשר לחזור לפיד ההשראה ולמצוא רעיון חדש."
          action={<Link href="/looks" className={buttonVariants()}>חזרה ללוקים</Link>}
        />
      </PageContainer>
    </main>
  );
}
