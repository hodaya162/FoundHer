import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
] as const;

const previewHeaders = process.env.VERCEL_ENV === "preview"
  ? [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }]
  : [];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.shopify.com", pathname: "/s/files/**" },
      { protocol: "https", hostname: "ayala-dresses.web.app", pathname: "/images/**" },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [...securityHeaders, ...previewHeaders],
      },
    ];
  },
};

export default nextConfig;
