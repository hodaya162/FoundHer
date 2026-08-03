import Link from "next/link";
import { Grid, Heart, HomeIcon, Menu, Search, User } from "./icons";

export function DesktopNav() {
  return <header className="site-header"><div className="wrap header-inner"><Link href="/" className="logo">FoundHer<span>.</span></Link><nav aria-label="ניווט ראשי"><Link href="/discover">גלי</Link><Link href="/looks">לוקים</Link><Link href="/rentals">השכרה</Link><Link href="/brands">מותגים</Link></nav><div className="nav-actions"><button aria-label="חיפוש"><Search /></button><Link href="/favorites" aria-label="מועדפים"><Heart /></Link><Link href="/profile" aria-label="פרופיל"><User /></Link><button className="mobile-menu" aria-label="פתיחת תפריט"><Menu /></button></div></div></header>;
}
export function BottomNav() {
  const items = [["בית", "/", HomeIcon], ["גלי", "/discover", Search], ["לוקים", "/looks", Grid], ["מועדפים", "/favorites", Heart], ["פרופיל", "/profile", User]] as const;
  return <nav className="bottom-nav" aria-label="ניווט בנייד">{items.map(([label, href, Icon]) => <Link href={href} key={label}><Icon /><span>{label}</span></Link>)}</nav>;
}
