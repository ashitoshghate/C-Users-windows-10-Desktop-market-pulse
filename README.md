# Market Pulse — Website

Marketing website for **Market Pulse**, a digital marketing and brand-building
agency based in Ahilyanagar, Maharashtra. Built with Next.js (App Router),
TypeScript and Tailwind CSS as a fast, SEO-friendly, single-page site with
anchor navigation (Home, About, Services, Industries, Why Market Pulse,
Process, Portfolio, Contact).

## Tech stack

- **Next.js 16** (App Router, Turbopack)
- **React 19** + **TypeScript**
- **Tailwind CSS** for styling / design system
- No external UI or animation libraries — icons are hand-rolled inline SVG
  (`components/icons.tsx`) and scroll-reveal animation uses a small
  IntersectionObserver hook (`components/Reveal.tsx`), keeping the JS
  bundle minimal.

## Project structure

```
market-pulse/
├── app/
│   ├── layout.tsx          Root layout, fonts, global <head> metadata, JSON-LD
│   ├── page.tsx            Homepage — assembles all sections
│   ├── globals.css         Tailwind entrypoint + base styles
│   ├── sitemap.ts          Generates /sitemap.xml
│   ├── robots.ts           Generates /robots.txt
│   ├── opengraph-image.tsx Generates the social share image
│   └── api/
│       ├── contact/route.ts        Contact form submission endpoint
│       └── generate-image/route.ts AI ad-creative generator endpoint
├── components/             UI building blocks, one per section
├── data/                   Content (services, industries, portfolio,
│                           testimonials, process, nav, metrics) — kept
│                           separate from components so it can be edited
│                           without touching UI code
├── lib/
│   ├── constants.ts        Company details, phone/WhatsApp/Maps links
│   ├── ai-image.ts         Image-generation provider adapter (OpenAI)
│   └── rate-limit.ts       In-memory per-IP rate limiter
└── public/                 Static assets (favicon, etc.)
```

## Content & compliance notes

Per the project brief, the site does **not** invent clients, testimonials,
statistics, awards, or campaign results. Placeholder content is clearly
marked in `data/portfolio.ts` and `data/testimonials.ts` — replace it with
real, approved material as it becomes available. Similarly:

- `lib/constants.ts` leaves `SOCIAL_LINKS` and `CONTACT_EMAIL` empty on
  purpose; the footer renders those as "coming soon" until real links are
  added.
- The map section links out to Google Maps via an address-based search URL
  rather than an embedded pin, since exact coordinates were not provided.

## Running locally

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Building for production

```bash
npm run build
npm start
```

`npm run build` produces an optimized production build; `npm start` serves
it. Set `NEXT_PUBLIC_SITE_URL` (see `.env.example`) to the real production
domain before building, so metadata, the sitemap and Open Graph tags point
to the correct URL.

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

- `NEXT_PUBLIC_SITE_URL` — the live domain (used in metadata, sitemap, OG tags)
- `CONTACT_WEBHOOK_URL` (optional) — once you wire the contact form
  (`app/api/contact/route.ts`) up to an email or CRM provider (e.g. Resend,
  SendGrid, HubSpot), set its webhook/API URL here. Never commit real
  credentials — the route currently only validates and logs enquiries
  server-side as a placeholder.
- `OPENAI_API_KEY` — **required** for the "Generate An Ad Visual With AI"
  section to work. Without it, `/api/generate-image` returns a clean error
  and the rest of the site is unaffected.

## AI ad-creative generator

The homepage includes a lead-gated section (`components/AIGenerator.tsx`,
`#ai-generator`) where a visitor enters their name/email and a short
description, and gets back an AI-generated advertising visual via
`/api/generate-image`.

**Setup**
1. Create an API key at [platform.openai.com](https://platform.openai.com).
   The `gpt-image-1` model may require organization verification in the
   OpenAI dashboard before it can be called via API — check this first if
   generation requests fail.
2. Set `OPENAI_API_KEY` in `.env.local` (or your hosting provider's
   environment variables). The key is read server-side only
   (`lib/ai-image.ts`) and is never exposed to the browser.

**Cost & abuse controls already in place**
- Each generation costs real money on your OpenAI account — there is no
  free tier for this feature.
- The form requires name + email before generating, which discourages
  casual/bot abuse and doubles as a lead capture (logged the same way as
  the contact form — see the note above about wiring up a real CRM/email
  webhook).
- `lib/rate-limit.ts` caps each IP address to 5 generations per hour. This
  is in-memory and per-server-instance — fine for a single small deployment,
  but if you deploy to a multi-instance or serverless environment at scale,
  swap it for a shared store (Redis, DynamoDB, etc.) using the same
  `isRateLimited(key)` interface.
- Prompts are capped at 500 characters server-side regardless of what the
  client sends.
- To change provider later (e.g. Stability AI), only `lib/ai-image.ts`
  needs to change — nothing else in the app calls the provider directly.

## Deploying to AWS

Live domain: **marketplusecompony.com**. The site is a standard Next.js
app, so it fits either of two common AWS paths:

**Option A — simplest: AWS Amplify Hosting (recommended for this launch)**
1. Create a GitHub repository (e.g. `market-pulse`) and push this project
   to it — see "Push this project to GitHub" below if it isn't a git repo
   yet.
2. In the [AWS Amplify console](https://console.aws.amazon.com/amplify/),
   choose **New app → Host web app**, connect your GitHub account, and
   select the repository/branch. Amplify auto-detects the Next.js build
   settings — no custom build config needed.
3. Before the first build, add environment variables under **App settings
   → Environment variables**:
   - `NEXT_PUBLIC_SITE_URL` = `https://marketplusecompony.com`
   - `OPENAI_API_KEY` = your key (only if the AI ad-generator should be live)
   - `CONTACT_WEBHOOK_URL` = once a real email/CRM provider is wired up
4. Deploy. Amplify gives you a temporary `*.amplifyapp.com` URL first —
   confirm the site loads there before attaching the real domain.
5. Go to **App settings → Domain management → Add domain**, enter
   `marketplusecompony.com`, and let Amplify add both the apex domain and
   `www` subdomain. Amplify will show you DNS records (CNAME/ALIAS) to add.
6. At your domain registrar (wherever `marketplusecompony.com` was
   purchased), add the DNS records Amplify gave you. Amplify provisions
   and renews the SSL certificate (ACM) automatically once DNS is verified
   — this can take anywhere from a few minutes to a few hours to propagate.
7. Once the custom domain shows **Available** in Amplify, `.com` and
   `www.` should both serve the live site over HTTPS.

**Push this project to GitHub** (if not already a git repo):
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/market-pulse.git
git push -u origin main
```

**Option B — manual CloudFront architecture**
```
Internet → Route 53 (domain) → CloudFront → origin
```
- Static assets (`_next/static`, `public/`) → S3 bucket, served through
  CloudFront.
- Server-rendered routes and the `/api/contact` route → run on a small
  compute layer (e.g. an ECS Fargate service or Lambda via
  `@opennextjs/aws`) behind the same CloudFront distribution.
- No database is required for the current site — the contact form is
  stateless and forwards to an external email/CRM webhook once configured.
- Store all secrets (webhook URLs, API keys) in AWS Secrets Manager or as
  encrypted environment variables — never in source control.

Either path keeps the architecture in line with the target diagram: no
backend or database beyond what the contact form needs, which is currently
none.

## Pre-launch checklist

- [x] Production build passes (`npm run build`) with zero errors
- [x] All nav links scroll to their matching section (desktop + mobile menu)
- [x] Mobile, tablet and desktop layouts verified
- [x] Contact form client-side validation (required fields, email/phone format) + honeypot spam field
- [x] `tel:` and WhatsApp `wa.me` links verified
- [x] SEO: title, meta description, canonical, Open Graph, JSON-LD `ProfessionalService` schema, sitemap.xml, robots.txt
- [x] No fabricated clients, testimonials, statistics or results
- [ ] Replace placeholder portfolio/testimonials with real, approved content
- [ ] Add real social media links and business email in `lib/constants.ts`
- [x] `NEXT_PUBLIC_SITE_URL` set to `https://marketplusecompony.com` as the default
- [ ] Connect `/api/contact` to a real email/CRM provider
- [ ] Push repository to GitHub and connect it in AWS Amplify
- [ ] Set `NEXT_PUBLIC_SITE_URL` (and `OPENAI_API_KEY` / `CONTACT_WEBHOOK_URL` if used) as environment variables in the Amplify app itself — `.env.local` is not deployed
- [ ] Attach `marketplusecompony.com` (and `www.`) in Amplify domain management and add the DNS records at your registrar
- [ ] Confirm HTTPS is active on the custom domain (Amplify/ACM auto-provisions this once DNS is verified)
- [ ] Re-check Open Graph preview and JSON-LD on the live domain (paste the live URL into a link-preview/OG debugger) once DNS has propagated
