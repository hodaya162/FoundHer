import type { Metadata } from "next";
import { Heart, Search, Sparkles } from "lucide-react";

import { PageContainer, PageHeader, ResponsiveGrid, SectionHeader } from "@/components/layout";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  EmptyState,
  IconButton,
  Input,
  SearchField,
  Separator,
  Skeleton,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "מערכת העיצוב",
  robots: { index: false, follow: false },
};

const colors = [
  { name: "Background", className: "bg-background" },
  { name: "Surface", className: "bg-surface" },
  { name: "Surface muted", className: "bg-surface-muted" },
  { name: "Primary", className: "bg-primary" },
  { name: "Primary hover", className: "bg-primary-hover" },
  { name: "Foreground", className: "bg-foreground" },
  { name: "Muted", className: "bg-muted" },
  { name: "Border", className: "bg-border" },
  { name: "Destructive", className: "bg-destructive" },
  { name: "Success", className: "bg-success" },
  { name: "Warning", className: "bg-warning" },
] as const;

export default function DesignSystemPage() {
  return (
    <main className="bg-background pb-24 text-foreground">
      <PageContainer>
        <PageHeader
          eyebrow="FoundHer UI"
          title="מערכת העיצוב"
          description="יסודות חזותיים ורכיבים משותפים לממשק רך, עריכתי ונגיש בעברית. עמוד זה מיועד לפיתוח בלבד."
          actions={<Button variant="secondary">פעולה משנית</Button>}
        />

        <Separator />

        <section className="py-10" aria-labelledby="typography-title">
          <SectionHeader title="טיפוגרפיה" titleId="typography-title" eyebrow="Foundation" description="סולם טיפוגרפי עקבי, mobile-first, עם כיסוי עברית מפורש." />
          <Card>
            <CardContent className="space-y-8 pt-6">
              <div><p className="type-caption mb-2">Display</p><p className="type-display">אופנה שמרגישה שלך</p></div>
              <div><p className="type-caption mb-2">Page title</p><p className="type-page-title">לגלות משהו יפה</p></div>
              <div><p className="type-caption mb-2">Section title</p><p className="type-section-title">בחירות חדשות</p></div>
              <div><p className="type-caption mb-2">Card title</p><p className="type-card-title">שמלת ערב בגזרה רכה</p></div>
              <div className="grid gap-4 sm:grid-cols-2">
                <p className="type-body">טקסט גוף לקריאה נוחה, עם קצב ומרווח עקביים.</p>
                <p className="type-body-small">טקסט גוף קטן לפרטים משלימים והסברים קצרים.</p>
                <p className="type-caption">כיתוב משני ועדין</p>
                <p className="type-label">תווית מערכת</p>
                <p className="type-price">₪689</p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="py-10" aria-labelledby="colors-title">
          <SectionHeader title="צבעים סמנטיים" titleId="colors-title" eyebrow="Tokens" />
          <ResponsiveGrid columns={4}>
            {colors.map((color) => (
              <div key={color.name} className="overflow-hidden rounded-card border border-border bg-surface shadow-sm">
                <div className={`h-20 ${color.className}`} />
                <p className="type-caption p-3 text-foreground">{color.name}</p>
              </div>
            ))}
          </ResponsiveGrid>
        </section>

        <section className="py-10" aria-labelledby="buttons-title">
          <SectionHeader title="כפתורים ותגיות" titleId="buttons-title" eyebrow="Actions" />
          <Card>
            <CardContent className="space-y-7 pt-6">
              <div className="flex flex-wrap gap-3">
                <Button>כפתור ראשי</Button>
                <Button variant="secondary">כפתור משני</Button>
                <Button variant="ghost">כפתור שקוף</Button>
                <Button variant="destructive">מחיקה</Button>
                <Button disabled>לא זמין</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="primary">חדש</Badge><Badge>ניטרלי</Badge><Badge variant="success">זמין</Badge><Badge variant="warning">נותרו מעט</Badge><Badge variant="destructive">לא זמין</Badge>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="py-10" aria-labelledby="forms-title">
          <SectionHeader title="שדות ופעולות אייקון" titleId="forms-title" eyebrow="Forms" />
          <ResponsiveGrid columns={2}>
            <Card>
              <CardHeader><CardTitle>שדות קלט</CardTitle><CardDescription>Labels נשארים נגישים גם כשהם חזותית מוסתרים.</CardDescription></CardHeader>
              <CardContent className="space-y-4">
                <label className="type-label block space-y-2"><span>שם</span><Input placeholder="הקלידי שם" /></label>
                <SearchField label="חיפוש בפריטים" placeholder="חפשי פריט או מותג" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Icon buttons</CardTitle><CardDescription>שטח מגע של 44×44 ו־ARIA label חובה.</CardDescription></CardHeader>
              <CardContent className="flex gap-3">
                <IconButton aria-label="חיפוש"><Search /></IconButton>
                <IconButton aria-label="שמירה למועדפים"><Heart /></IconButton>
              </CardContent>
            </Card>
          </ResponsiveGrid>
        </section>

        <section className="py-10" aria-labelledby="cards-title">
          <SectionHeader title="כרטיסים ורשת רספונסיבית" titleId="cards-title" eyebrow="Layout" action={<Button size="sm" variant="ghost">הצגת הכול</Button>} />
          <ResponsiveGrid columns={3}>
            {["רכות יומיומית", "ערב מדויק", "שכבות טבעיות"].map((title) => (
              <Card key={title}>
                <CardHeader><CardTitle>{title}</CardTitle><CardDescription>כרטיס גנרי ללא לוגיקה עסקית.</CardDescription></CardHeader>
                <CardContent><div className="h-24 rounded-button bg-surface-muted" /></CardContent>
                <CardFooter><Button size="sm" variant="secondary">לפרטים</Button></CardFooter>
              </Card>
            ))}
          </ResponsiveGrid>
        </section>

        <section className="py-10" aria-labelledby="states-title">
          <SectionHeader title="מצבים" titleId="states-title" eyebrow="Feedback" />
          <div className="space-y-5">
            <EmptyState title="עדיין אין כאן פריטים" description="הפריטים שתשמרי יופיעו כאן ויחכו לך." icon={<Sparkles />} action={<Button>התחילי לגלות</Button>} />
            <Card>
              <CardHeader><CardTitle>Skeleton</CardTitle></CardHeader>
              <CardContent className="space-y-3"><Skeleton className="h-40 w-full" /><Skeleton className="h-4 w-2/3" /><Skeleton className="h-4 w-1/3" /></CardContent>
            </Card>
          </div>
        </section>
      </PageContainer>
    </main>
  );
}
