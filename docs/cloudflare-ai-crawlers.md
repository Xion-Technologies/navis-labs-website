# Cloudflare AI Crawler Configuration

This project uses `public/robots.txt` to define crawler policy. Cloudflare can override that policy if AI crawler blocking is enabled, so review these settings in Cloudflare whenever crawler behavior changes.

## 1) Check Cloudflare AI crawler blocking

1. Open the Cloudflare dashboard.
2. Select the production zone for `navislabs.com`.
3. Go to **Security** -> **Bots**.
4. Locate **AI Scrapers and Crawlers**.
5. Confirm whether blocking is enabled.

If this setting is ON, Cloudflare may block requests before `robots.txt` is evaluated.

## 2) Turn OFF blocking so robots.txt is respected

1. In the same **Security** -> **Bots** panel, set **AI Scrapers and Crawlers** to OFF.
2. Save/apply the setting.
3. Wait for propagation (usually quick, but allow a few minutes).

After disabling it, crawler policy is controlled by `public/robots.txt` in this repo.

## 3) Verify AI bots are reaching the site

Use request logs/analytics and filter by user-agent. Confirm entries for:

- `ChatGPT-User`
- `GPTBot`
- `ClaudeBot`

Recommended checks:

- Ensure requests return successful status codes for crawlable pages.
- Confirm robots fetches (`/robots.txt`) are visible.
- Confirm page fetches are occurring after robots fetches.

## 4) Use Cloudflare AI analytics if available

Depending on your Cloudflare plan/features, review:

- AI Audit
- AI Crawl Metrics
- Bot Analytics

Use these dashboards to validate crawler volume, top user-agents, and blocked/allowed request trends.

## 5) Confirm prerendered HTML is served to bots

This site depends on Cloudflare Workers to serve prerendered HTML responses for bot user-agents.

Validate that for AI bot requests:

1. HTML responses include rendered page content (not only client-side shell).
2. Key pages (`/`, `/services`, `/projects`, case studies) render meaningful indexable text.
3. Worker logic still matches expected bot user-agent patterns.

## Operational reminder

Any time crawler behavior changes unexpectedly:

1. Check Cloudflare AI bot blocking first.
2. Verify `public/robots.txt` contents in the deployed build.
3. Re-check Worker prerender output for bot user-agents.
