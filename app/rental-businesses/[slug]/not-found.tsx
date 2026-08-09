import Link from "next/link";
import { Store } from "lucide-react";

import { PageContainer } from "@/components/layout";
import { EmptyState, buttonVariants } from "@/components/ui";

export default function RentalBusinessNotFound() {
  return (
    <main>
      <PageContainer className="py-16 sm:py-24">
        <EmptyState
          headingLevel={1}
          icon={<Store />}
          title="עסק ההשכרה לא נמצא"
          description="ייתכן שהקישור השתנה. אפשר לחזור לעמוד ההשכרות ולגלות שמלות זמינות."
          action={<Link href="/rentals" className={buttonVariants()}>לחזרה להשכרות</Link>}
        />
      </PageContainer>
    </main>
  );
}
