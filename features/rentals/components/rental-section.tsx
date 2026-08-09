import type { ReactNode } from "react";

import { SectionHeader } from "@/components/layout";

type RentalSectionProps = {
  children: ReactNode;
  description?: string;
  title: string;
  titleId: string;
};

export function RentalSection({ children, description, title, titleId }: RentalSectionProps) {
  return (
    <section aria-labelledby={titleId}>
      <SectionHeader title={title} titleId={titleId} description={description} />
      {children}
    </section>
  );
}
