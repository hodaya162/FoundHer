import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { BottomNav, DesktopNav } from "./ui/navigation";

export const metadata: Metadata = {
  title: { default: "FoundHer — אופנה צנועה, במקום אחד", template: "%s — FoundHer" },
  description: "גלי אופנה יהודית צנועה, לוקים מעוררי השראה, מותגים נבחרים ושמלות להשכרה.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="he" dir="rtl"><body>
    <DesktopNav />
    {children}
    <footer><div className="wrap footer-inner"><Link href="/" className="logo">FoundHer<span>.</span></Link><p>אופנה צנועה, שמצאה אותך.</p><div><Link href="/discover">גלי</Link><Link href="/looks">לוקים</Link><Link href="/rentals">השכרה</Link></div><small>© 2026 FoundHer</small></div></footer>
    <BottomNav />
  </body></html>;
}
