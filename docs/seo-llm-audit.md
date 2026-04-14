# SEO & LLM Discoverability Audit

This document covers the local audit tooling that keeps `sitemap.xml`, `robots.txt`, and the LLM discoverability files in sync with the site's actual routes.

---

## Overview

The site has three categories of discoverability files that must reflect every public route defined in `src/App.tsx`:

| File / Directory | Purpose |
|---|---|
| `public/sitemap.xml` | XML sitemap for search engine crawlers |
| `public/robots.txt` | Crawler access policy (AI bots, search engines) |
| `public/llms.txt` | Concise LLM content index following the llms.txt spec |
| `public/llms-full.txt` | Full per-page content for LLM ingestion |
| `public/llms-pages/*.md` | Individual markdown files mirroring each route |

The audit script (`scripts/audit-discoverability.ts`) reads `src/App.tsx` as the canonical source of truth for routes and validates all of the above on every push.

> **robots.txt is not checked here.** It is manually curated and rarely changes. Use `npm run verify:robots` to validate it independently when you edit it.

---

## What the Audit Checks

### 1. Sitemap (`public/sitemap.xml`)

- All routes in `src/App.tsx` are present in the sitemap
- No stale URLs in the sitemap for routes that no longer exist
- **Auto-fix**: If out of sync, runs `scripts/generate-sitemap.ts` and stages the result

### 2. LLMs.txt (`public/llms.txt`)

- All canonical routes are linked
- No dead links to removed routes
- **Auto-fix**: If out of sync, runs `scripts/generate-llms-txt.ts` and stages the result

### 3. LLMs Full (`public/llms-full.txt`)

- All canonical routes have a `URL:` entry
- No entries for removed routes
- **Auto-fix**: Same regeneration as above

### 4. LLMs Pages (`public/llms-pages/*.md`)

- A markdown file exists for every route (e.g. `/services/innovation-lab` → `llms-pages/services/innovation-lab.md`)
- No orphan files for routes that no longer exist
- **Auto-fix**: Same regeneration as above

### 5. Cloudflare Workers Handoff

When new routes are detected that weren't in the previous sitemap, the audit:
- Prints an informational message in the terminal
- Writes `docs/new-routes-for-workers.md` listing the new routes

This is informational only and does not affect the exit code. See [Coordinating with Engineering](#coordinating-with-engineering) below.

---

## Running the Audit Manually

```sh
npm run audit:seo
```

This produces a color-coded report in your terminal and exits with:
- **Code 0** — all checks pass (auto-fixed issues count as passing)
- **Code 1** — a critical issue could not be resolved automatically (e.g. a generator script itself is broken)

---

## Pre-Push Hook

The audit runs automatically before every `git push` via a pre-push hook.

### Installing the Hook

The hook is installed automatically when you run `npm install` (via the `prepare` script). To install it manually:

```sh
npm run setup:hooks
```

This writes a shell script to `.git/hooks/pre-push`. The hook is not tracked in git — each developer must install it locally.

### What Happens on Push

1. The hook runs `npm run audit:seo`
2. If all checks pass (or issues were auto-fixed and staged), the push proceeds
3. If a critical issue cannot be resolved, the push is blocked with an explanation

Auto-fixed files (regenerated sitemap, llms.txt, llms-pages/) are staged automatically so they are included in the push commit. You will see them added to the push if they were out of date.

### Emergency Bypass

To skip the audit in an emergency:

```sh
SKIP_AUDIT=1 git push
```

Use this only when necessary (e.g. a generator script is temporarily broken but you need to push a hotfix). The files will be out of sync until the audit runs successfully again.

---

## How New Routes Are Picked Up

When you add a new route to `src/App.tsx`:

1. Add the `<Route>` definition and the `lazy()` import as usual — nothing else is required
2. On your next push, the audit detects the new route is missing from `sitemap.xml` and the LLMs files
3. It auto-regenerates all affected files and stages them
4. The push proceeds with the updated files included
5. `docs/new-routes-for-workers.md` is written — see below

---

## Coordinating with Engineering

The Cloudflare Workers prerender config (in a separate repo, managed by the engineering team) controls which routes receive prerendered HTML for bot user-agents. This must be updated whenever new routes are added.

When the audit detects new routes, it writes `docs/new-routes-for-workers.md` listing them. Share this file with the engineering team so they can update the Worker config before or shortly after deployment.

See `docs/cloudflare-ai-crawlers.md` for guidance on verifying that bots are correctly receiving prerendered content.

---

## Troubleshooting

### "Sitemap regeneration failed"

Run `npm run generate:sitemap` directly to see the full error output. Common causes:
- `src/App.tsx` has a syntax change that breaks the route regex
- A referenced component file was moved or renamed

### "LLMs regeneration failed"

Run `npm run generate:llms` directly. Common causes:
- `src/data/caseStudies.ts` has a slug mismatch with a route path in App.tsx
- A page component file was moved or deleted

### robots.txt validation

robots.txt is not part of the pre-push audit. To validate it manually:

```sh
npm run verify:robots
```

Run this any time you edit `public/robots.txt`.

### "Hook not running"

Run `npm run setup:hooks` to reinstall. The `.git/hooks/pre-push` file may have been lost if you re-cloned the repo or reset the `.git` directory.

### Files being staged unexpectedly on push

This is normal — it means the discoverability files were out of date and the audit regenerated them. The staged files are included in the push. If you want to review them first, run `npm run audit:seo` manually before pushing.
