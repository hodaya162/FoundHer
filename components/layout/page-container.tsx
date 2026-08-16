import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageContainerProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function PageContainer<T extends ElementType = "div">({
  as,
  children,
  className,
  ...props
}: PageContainerProps<T>) {
  const Component = as ?? "div";
  return (
    <Component className={cn("mx-auto w-[min(var(--container-width),calc(100%_-_2rem))] sm:w-[min(var(--container-width),calc(100%_-_3rem))]", className)} {...props}>
      {children}
    </Component>
  );
}
