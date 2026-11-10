# Fetchlab Website

Marketing site and web dashboard for **Fetchlab**, an API testing app for iOS. The mobile app lives in the separate [Api-Management](https://github.com/Burqk1/Api-Management) repo. This repo holds the public landing pages and a browser dashboard that signs in to the same Supabase project and reads and writes the same synced data as the app.

Built with Astro (static output), React islands, Tailwind CSS and Supabase.

## What's in it

### Marketing pages

- **Landing page** (`/`): hero, feature grid, code comparison, showcase, pricing (Free / Pro $9.99 per month / Team $19.99 per month), FAQ and CTA sections
- **Content pages**: about, blog, careers, changelog, customers, docs, download, GraphQL, scripts, cloud sync, security, status, support, contact
- **Legal**: privacy, terms
- **Auth**: `/login` and `/signup`, using Supabase email/password and OAuth (Google, GitHub, Apple)
- The contact form writes to a Supabase `contact_messages` table

### Web dashboard (`/dashboard`)

Visiting `/dashboard` without a Supabase session sends you to `/login`.

- **Overview**: call counts, average response time, success rate, recent activity
- **APIs**: collections plus a request builder (method, headers, body, query, auth) that sends requests with `fetch` straight from the browser
- **Monitor**, **Environments**, **History**, **Settings**
- **Tools** (`/dashboard/tools/*`): each tool page checks `profiles.plan` and sends free-plan users to `/dashboard/tools/pro-required`

Not every tool page does something yet. These run client-side logic: AI Analysis (a local JSON structure summary, no AI service is called), Benchmark, Request Chaining, Code Generator, Response Diff, Dynamic Variables, GraphQL Explorer, JSON Path, Load Testing, Mock Server, SSE, AI Type Generator, WebSocket. These are UI-only for now: API Docs, Assertions, Contract Testing, Data-Driven, Git Sync, gRPC, Plugins, Proxy, Scheduled Runs, Pre/Post Scripts, SSL, Team Sync, Workspaces.

The dashboard UI comes in English and Turkish (`src/lib/i18n.ts`). The language is read from the `fl_settings` value in `localStorage`.

### Sync with the mobile app

`src/lib/syncStore.ts` uses the same Supabase `user_data` table as the mobile app. It has one row per user, with columns `collections`, `endpoints`, `call_logs`, `environments`, `monitor_checks`, `api_keys` and `settings`. Push uses an upsert on `user_id` and keeps only the last 200 call logs. Pull decrypts each column.

The "encryption" in `src/lib/encryption.ts` has to match the mobile app byte for byte. It is a XOR with a single-byte key derived from the user ID, then Base64. That is obfuscation, not real encryption.

## Tech stack

| | |
|---|---|
| Framework | Astro 6 (`output: 'static'`) |
| UI islands | React 19 via `@astrojs/react`, Framer Motion |
| Styling | Tailwind CSS 3, `clsx`, `tailwind-merge`, `class-variance-authority` |
| Backend | Supabase (`@supabase/supabase-js`): auth and Postgres tables |
| SEO | `@astrojs/sitemap`, with `site` set to `https://fetchlab.dev` in `astro.config.mjs` |
| Tooling | Puppeteer, used only by the screenshot scripts |

## Project structure

```
.
├── astro.config.mjs        # static output, React + sitemap integrations
├── tailwind.config.mjs
├── public/                 # favicon, logo, hero image, robots.txt
├── screenshot*.mjs         # Puppeteer screenshot helpers
└── src/
    ├── components/         # landing page sections (Hero, Features, Pricing, FAQ, ...)
    │   └── ui/             # React components (aurora background, logo carousel, hero visual)
    ├── layouts/
    │   ├── Base.astro      # marketing layout
    │   ├── Dashboard.astro # dashboard shell + session check
    │   └── ToolPage.astro  # tool page wrapper + Pro plan gate
    ├── lib/
    │   ├── supabase.ts     # Supabase client
    │   ├── syncStore.ts    # cloud sync shared with the mobile app
    │   ├── encryption.ts   # XOR/Base64 codec (must match the app)
    │   └── i18n.ts         # en / tr strings for the dashboard
    └── pages/              # routes (marketing, auth, dashboard, dashboard/tools)
```

## Requirements

- Node.js. Astro 6 needs a recent version; Node 20 or newer is a safe choice.
- A Supabase project with the tables the code uses:
  - `profiles` (with `id` and `plan` columns; `plan` is `free`, `pro` or `team`)
  - `user_data` (columns listed above, unique on `user_id`)
  - `contact_messages`
- If you want social login, enable the OAuth providers (Google, GitHub, Apple) in Supabase. The redirect target is `<origin>/dashboard`.

No SQL schema or migrations ship with this repo.

## Getting started

```bash
npm install
npm run dev       # dev server at http://localhost:4321
npm run build     # static build into dist/
npm run preview   # serve the built site
```

## Configuration

Create a `.env` file in the project root:

```env
PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

Both variables have the `PUBLIC_` prefix, so they are bundled into client-side code. Use only the anon key here, and protect the tables with Supabase Row Level Security.

## Screenshot scripts

Three Puppeteer scripts take screenshots of a running site. They save into `./temporary screenshots/`, and the URL defaults to `http://localhost:4321`.

```bash
node screenshot.mjs [url] [label]                   # full-page desktop shot, 1440x900 viewport
node screenshot-mobile.mjs [url] [label]            # 390x844 viewport at 2x scale
node screenshot-section.mjs [url] [label] [scrollY] # one viewport-sized shot at a scroll offset
```

## Notes

- The App Store button on `/download` links to `#`. There is no store link yet.
- The repository currently tracks `node_modules/`, `dist/`, `.astro/` and `.env`, even though `.gitignore` lists `node_modules`. You can remove them from version control with `git rm -r --cached`. Note that the committed `.env` contains real Supabase values.
- No license is specified.
