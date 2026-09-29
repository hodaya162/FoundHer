import type { SVGProps } from "react";

export function WhatsAppBrandIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" role="img" aria-label="WhatsApp" {...props}>
      <path
        fill="currentColor"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.198.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.208-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479s1.065 2.875 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.693.625.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.052 21.5h-.004a9.45 9.45 0 0 1-4.817-1.318l-.345-.205-3.583.94.956-3.494-.225-.358A9.45 9.45 0 0 1 2.58 12.02C2.582 6.81 6.822 2.57 12.033 2.57a9.38 9.38 0 0 1 6.684 2.77 9.39 9.39 0 0 1 2.768 6.69c-.002 5.21-4.241 9.45-9.433 9.45m8.038-17.55A11.3 11.3 0 0 0 12.035.61C5.763.61.66 5.713.657 11.985c0 2.006.524 3.963 1.519 5.688L.562 23.57l6.033-1.583a11.4 11.4 0 0 0 5.452 1.389h.005c6.271 0 11.374-5.103 11.377-11.375a11.3 11.3 0 0 0-3.339-8.05"
      />
    </svg>
  );
}

export function InstagramBrandIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" role="img" aria-label="Instagram" {...props}>
      <defs>
        <linearGradient id="instagram-brand-gradient" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFD600" />
          <stop offset="0.45" stopColor="#FF3A75" />
          <stop offset="1" stopColor="#6B4BFF" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="url(#instagram-brand-gradient)" strokeWidth="2.3" />
      <circle cx="12" cy="12" r="4.15" fill="none" stroke="url(#instagram-brand-gradient)" strokeWidth="2.3" />
      <circle cx="17.45" cy="6.7" r="1.25" fill="url(#instagram-brand-gradient)" />
    </svg>
  );
}
