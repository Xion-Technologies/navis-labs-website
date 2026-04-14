# Navis Labs Website Assistant Guide

This repository is a React 19 SPA built with Vite 8 and TypeScript. Discoverability files are maintained in-repo, while prerendering is handled externally by the engineering team.

## LLM Discoverability Maintenance

When working on routes or page components, always check whether discoverability files must be updated.

### Trigger Conditions

Treat discoverability maintenance as required whenever any of the following occurs:

- A route is added, removed, renamed, or restructured in router configuration.
- A page component's content, title, or meta description changes significantly.
- A page component file is created, deleted, or moved.
- The user explicitly asks about SEO, LLM visibility, sitemaps, or discoverability.

### Required Actions

1. Detect the change type:
   - Identify affected routes/pages.
   - Classify as addition, removal, rename, or content update.
2. Keep discoverability files in sync:
   - New routes: ensure route coverage in `public/sitemap.xml`, `public/llms.txt`, `public/llms-full.txt`, and route markdown files in `public/llms-pages/`.
   - Removed routes: remove stale entries from `public/sitemap.xml`, `public/llms.txt`, `public/llms-full.txt`, and delete orphan markdown files.
   - Renamed routes: update URL paths consistently across sitemap, llms files, and markdown paths.
   - Content changes: refresh route descriptions in llms outputs and regenerate markdown/full text output.
3. Use existing scripts:
   - `npm run generate:sitemap`
   - `npm run generate:llms`
   - `npm run audit:seo`
4. If a route might be protected/non-public and that is unclear, ask the user before including it in discoverability files.

### Content Quality Rules

- Use only source text that exists in route/page/component data.
- Do not invent copy for descriptions.
- If no reliable source description is available, use a TODO placeholder.
- Keep formatting consistent with existing `public/` discoverability files.

### robots.txt Rule

- Never auto-modify `public/robots.txt`.
- If route changes could affect crawler policy, notify the user and suggest manual review.
- Use `npm run verify:robots` for validation when robots changes are relevant.

### New Routes and Engineering Coordination

When new routes are introduced:

- Remind the user: `New route [/path] added. Remember to coordinate with your engineer to include this in the Cloudflare Worker prerender config.`
- Ensure `docs/new-routes-for-workers.md` is updated (typically by running `npm run audit:seo`).

## Scripts and Operational Notes

- `npm run generate:sitemap` regenerates `public/sitemap.xml` from route definitions.
- `npm run generate:llms` regenerates `public/llms.txt`, `public/llms-full.txt`, and markdown pages in `public/llms-pages/`.
- `npm run audit:seo` validates and auto-fixes discoverability drift; this is the final check after updates.
- Full audit behavior and troubleshooting are documented in `docs/seo-llm-audit.md`.

The pre-push hook runs discoverability audit checks before push. Emergency bypass:

`SKIP_AUDIT=1 git push`

## Safety Constraints

- NEVER modify `vite.config.ts`, `index.html`, `tsconfig.json`, `.env`, `wrangler.toml`, `_worker.js`, `_headers`, `_redirects`, or anything in `functions/`.
- NEVER install prerendering, SSR, or SSG packages.
- NEVER modify existing npm scripts in `package.json`.
- Cloudflare Workers are managed separately; never touch or reference their config.
- ONLY write to: `public/`, `scripts/`, `docs/`, and new npm scripts in `package.json`.
- ONLY read from `src/`; never write to it.
