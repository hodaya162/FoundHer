import Link from "next/link";
import { PageContainer } from "@/components/layout";
import { buttonVariants } from "@/components/ui";
export default function RentalNotFound() { return <main><PageContainer className="py-20 text-center"><h1 className="type-page-title">השמלה לא נמצאה</h1><p className="mt-3 text-muted">ייתכן שהפריט כבר אינו זמין.</p><Link href="/rentals" className={`${buttonVariants()} mt-6`}>חזרה להשכרות</Link></PageContainer></main>; }
