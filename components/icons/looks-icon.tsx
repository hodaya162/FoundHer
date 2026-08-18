import { forwardRef, type SVGProps } from "react";

export const LooksIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  function LooksIcon({ className, ...props }, ref) {
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
        <path d="M9.1 4.3 6 6.2l-2 4.9 2.8 1.2 1.6-3.7.6 2-2.1 9.7c3.3.9 6.9.9 10.2 0L15 10.6l.6-2 1.6 3.7 2.8-1.2-2-4.9-3.1-1.9" />
        <path d="M9.1 4.3c.6 1.1 1.6 1.7 2.9 1.7s2.3-.6 2.9-1.7M9 10.6h6" />
        <path d="m19.3 2.3.3.9.9.3-.9.3-.3.9-.3-.9-.9-.3.9-.3.3-.9Z" />
      </svg>
    );
  },
);
