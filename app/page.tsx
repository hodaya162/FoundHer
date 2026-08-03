import Link from "next/link";
import { ArrowUpRight, Heart, Search, Sparkles } from "./ui/icons";

const quickLinks = [
  ["קנייה מבוטיק", "♙", "/discover"],
  ["השכרות לכל אירוע", "♧", "/rentals"],
  ["לוקים והשראה", "♡", "/looks"],
  ["הטבות בלעדיות", "♢", "/discover"],
  ["מותגים נבחרים", "♧", "/brands"],
];

const categories = [
  ["שמלות", "♙"],
  ["חצאיות", "♢"],
  ["חולצות", "♧"],
  ["מטפחות", "♡"],
  ["בגדי ים צנועים", "♢"],
  ["אקססוריז", "♧"],
  ["השכרות", "♙"],
  ["קולקציות חדשות", "♡"],
];

const products = [
  { name: "שמלת מקסי רקומה", brand: "ESTI BELLE", price: "₪689", badge: "לקנייה", image: "https://images.pexels.com/photos/7048338/pexels-photo-7048338.jpeg?auto=compress&cs=tinysrgb&w=900" },
  { name: "שמלת קפלים", brand: "LIDOR BAR", price: "₪420", badge: "להשכרה", image: "https://images.pexels.com/photos/18239440/pexels-photo-18239440.jpeg?auto=compress&cs=tinysrgb&w=900" },
  { name: "סט שכבות", brand: "SHOSH DESIGNS", price: "₪590", badge: "בלעדי", image: "https://images.pexels.com/photos/16512659/pexels-photo-16512659.jpeg?auto=compress&cs=tinysrgb&w=900" },
  { name: "שמלה מחויטת", brand: "RENÉ", price: "₪760", badge: "חדש", image: "https://images.pexels.com/photos/17299354/pexels-photo-17299354.jpeg?auto=compress&cs=tinysrgb&w=900" },
];

export default function Home() {
  return <main className="app-home wrap">
    <section className="app-intro">
      <div>
        <p className="eyebrow">כל מה שאת צריכה במקום אחד</p>
        <h1>אופנה צנועה.<br /><em>בדיוק בשבילך.</em></h1>
        <p>קנייה · השכרה · לוקים · מבצעים · השראה</p>
      </div>
      <div className="quick-links">{quickLinks.map(([label, icon, href]) => <Link href={href} key={label}><span>{icon}</span><strong>{label}</strong></Link>)}</div>
    </section>

    <section className="app-search">
      <Search /><span>חפשי שמלה, מותג, צבע או סגנון...</span>
    </section>

    <section className="promo-card">
      <div><span>הכירי את FoundHer</span><h2>מוצאת לך את הפריטים<br />הכי שווים</h2><p>מכל המותגים והבוטיקים שאת אוהבת</p><Link href="/discover">לגלות עכשיו <ArrowUpRight /></Link></div>
    </section>

    <section className="icon-categories">
      {categories.map(([label, icon]) => <Link href="/discover" key={label}><span>{icon}</span><small>{label}</small></Link>)}
    </section>

    <section className="home-products">
      <div className="app-section-title"><div><Sparkles /><h2>הכי חדשים בשבילך</h2></div><Link href="/discover">הצג הכול ←</Link></div>
      <div className="compact-grid">{products.map(p => <article key={p.name}><Link href="/product"><div className="compact-image"><img src={p.image} alt={p.name}/><span className="compact-badge">{p.badge}</span><button aria-label={`שמירת ${p.name}`}><Heart /></button></div><p>{p.brand}</p><h3>{p.name}</h3><strong>{p.price}</strong></Link></article>)}</div>
    </section>

    <section className="looks-strip">
      <div className="app-section-title"><div><h2>לוקים והשראה</h2></div><Link href="/looks">לכל הלוקים ←</Link></div>
      <div><article><img src="https://images.pexels.com/photos/7048338/pexels-photo-7048338.jpeg?auto=compress&cs=tinysrgb&w=700" alt="לוק צנוע לאירוע"/><h3>לוק קלאסי לאירוע קיצי</h3><p>3 פריטים</p></article><article><img src="https://images.pexels.com/photos/16512659/pexels-photo-16512659.jpeg?auto=compress&cs=tinysrgb&w=700" alt="לוק צנוע לשבת"/><h3>שבת בגוונים טבעיים</h3><p>4 פריטים</p></article></div>
    </section>
  </main>;
}
