import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { BottomNav, DesktopNav } from "./ui/navigation";

const serif = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-serif", weight: ["400", "500", "600"], style: ["normal", "italic"] });
const sans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: { default: "FoundHer — אופנה צנועה, במקום אחד", template: "%s — FoundHer" },
  description: "גלי אופנה יהודית צנועה, לוקים מעוררי השראה, מותגים נבחרים ושמלות להשכרה.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="he" dir="rtl"><body className={`${serif.variable} ${sans.variable}`}>
    <DesktopNav />
    {children}
    <footer><div className="wrap footer-inner"><Link href="/" className="logo">FoundHer<span>.</span></Link><p>אופנה צנועה, שמצאה אותך.</p><div><Link href="/discover">גלי</Link><Link href="/looks">לוקים</Link><Link href="/rentals">השכרה</Link></div><small>© 2026 FoundHer</small></div></footer>
    <BottomNav />
  </body></html>;
}
