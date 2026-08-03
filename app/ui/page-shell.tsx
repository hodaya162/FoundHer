import Link from "next/link";
import { ArrowUpRight, Heart } from "./icons";

const data = [
  ["חייטות רכה", "Atelier Noor", "https://images.pexels.com/photos/7048338/pexels-photo-7048338.jpeg?auto=compress&cs=tinysrgb&w=900"],
  ["ערב בקטיפה", "Laelle Rental", "https://images.pexels.com/photos/18239440/pexels-photo-18239440.jpeg?auto=compress&cs=tinysrgb&w=900"],
  ["העריכה הניטרלית", "Naya Studio", "https://images.pexels.com/photos/16512659/pexels-photo-16512659.jpeg?auto=compress&cs=tinysrgb&w=900"],
  ["אירוע בגינה", "Maison Noura", "https://images.pexels.com/photos/17299354/pexels-photo-17299354.jpeg?auto=compress&cs=tinysrgb&w=900"],
  ["רומנטיקה מודרנית", "Serein", "https://images.pexels.com/photos/7048338/pexels-photo-7048338.jpeg?auto=compress&cs=tinysrgb&w=900"],
  ["שכבות של יום ראשון", "Aveline", "https://images.pexels.com/photos/16512659/pexels-photo-16512659.jpeg?auto=compress&cs=tinysrgb&w=900"],
];

export function PageShell({ eyebrow, title, description, mode = "grid" }: { eyebrow: string; title: string; description: string; mode?: "grid" | "empty" | "profile" }) {
  return <main className="inner-page wrap">
    <div className="page-intro"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{description}</p></div>
    {mode === "empty" ? <div className="empty-state"><Heart /><h2>האוסף שלך מתחיל כאן.</h2><p>שמרי פריטים ולוקים שאהבת, והם יחכו לך כאן.</p><Link href="/discover" className="button dark">התחילי לגלות <ArrowUpRight /></Link></div> :
    mode === "profile" ? <div className="profile-panel"><div className="avatar">FH</div><h2>הפכי את FoundHer לשלך</h2><p>צרי פרופיל כדי לשמור מועדפים ולהתאים את חוויית הגילוי אלייך.</p><button className="button dark">יצירת פרופיל <ArrowUpRight /></button></div> :
    <><div className="filter-row"><button className="active">הכול</button><button>לרכישה</button><button>להשכרה</button><button>סינון +</button></div><div className="masonry">{data.map(([name, brand, image], i) => <article key={name} className={i % 3 === 1 ? "tall" : ""}><Link href="/product"><div><img src={image} alt={name}/>{(i === 1 || i === 3) && <span className="badge">השכרה</span>}<button aria-label={`שמירת ${name}`}><Heart /></button></div><p>{brand}</p><h2>{name}</h2></Link></article>)}</div></>}
  </main>;
}
