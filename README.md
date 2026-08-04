# FoundHer

FoundHer is a mobile-first discovery platform for modest fashion. It helps users discover products, brands, looks, and rental businesses, then redirects them to the original provider to complete a purchase or booking.

## Technology

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase (planned; not connected yet)
- Vercel

## Local development

Requirements:

- Node.js 22.13 or newer
- npm

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validation

```bash
npm run lint
npm run typecheck
npm run build
```

## Current scope

The repository contains the FoundHer visual prototype plus typed domain models, fixture-backed repositories, a semantic design system, and a modular application shell with accessible responsive navigation. The prototype pages have not yet been migrated to the repository layer. Supabase, authentication, live data fetching, and business logic remain intentionally deferred to later tasks.
