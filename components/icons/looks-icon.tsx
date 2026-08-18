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
        <path d="M8.6 3.4 6.1 6.1l2.1 3.1-2.6 10.1c2.1.8 6.7.8 8.8 0L11.8 9.2l2.1-3.1-2.5-2.7c-.5.7-1.1 1.1-1.4 1.1s-.9-.4-1.4-1.1Z" />
        <path d="M8.2 9.2h3.6M6.1 6.1 3.8 9M13.9 6.1l2.3 2.9" />
        <path d="m18.7 3 .35 1.05L20.1 4.4l-1.05.35L18.7 5.8l-.35-1.05-1.05-.35 1.05-.35L18.7 3Z" />
      </svg>
    );
  },
);
