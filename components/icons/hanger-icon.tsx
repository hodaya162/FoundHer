import { forwardRef, type SVGProps } from "react";

export const HangerIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  function HangerIcon({ className, ...props }, ref) {
    return (
      <svg
        ref={ref}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        {...props}
      >
        <path d="M9.6 6.1a2.4 2.4 0 1 1 3.1 2.3c-.8.3-1.2.9-1.2 1.6v.7" />
        <path d="m11.5 10.7-7.9 5.7c-.8.6-.4 1.9.6 1.9h15.6c1 0 1.4-1.3.6-1.9l-7.9-5.7a.9.9 0 0 0-1 0Z" />
      </svg>
    );
  },
);
