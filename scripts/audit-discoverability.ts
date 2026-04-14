import {
  readFileSync,
  existsSync,
  readdirSync,
  statSync,
  mkdirSync,
  writeFileSync,
} from "node:fs";
import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import chalk from "chalk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const BASE_URL = "https://navislabs.com";
const PUBLIC_DIR = path.join(ROOT, "public");
const DOCS_DIR = path.join(ROOT, "docs");

// ─── Types ────────────────────────────────────────────────────────────────────

type Severity = "pass" | "warn" | "error";

type Finding = {
  severity: Severity;
  message: string;
};

// ─── Route Extraction ─────────────────────────────────────────────────────────

function getCanonicalRoutes(): string[] {
  const appPath = path.join(ROOT, "src", "App.tsx");
  if (!existsSync(appPath)) {
    throw new Error(`src/App.tsx not found at ${appPath}`);
  }
  const src = readFileSync(appPath, "utf8");

  const lazyImports = new Set<string>();
  for (const m of src.matchAll(/const\s+(\w+)\s*=\s*lazy\(\(\)\s*=>\s*import\("@\/([^"]+)"\)\);/g)) {
    lazyImports.add(m[1]);
  }

  const routes: string[] = [];
  for (const m of src.matchAll(/<Route\s+path="([^"]+)"\s+element={<(\w+)\s*\/>}\s*\/>/g)) {
    if (lazyImports.has(m[2])) routes.push(m[1]);
  }
  return routes;
}

function toUrl(routePath: string): string {
  return routePath === "/" ? BASE_URL : `${BASE_URL}${routePath}`;
}

// ─── Shell Helper ─────────────────────────────────────────────────────────────

function run(cmd: string): { ok: boolean; stdout: string; stderr: string } {
  try {
    const stdout = execSync(cmd, {
      cwd: ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    return { ok: true, stdout, stderr: "" };
  } catch (err: unknown) {
    const e = err as { stdout?: string; stderr?: string };
    return { ok: false, stdout: e.stdout ?? "", stderr: e.stderr ?? "" };
  }
}

function stageFiles(...relativePaths: string[]): void {
  const quoted = relativePaths.map((p) => `"${p}"`).join(" ");
  run(`git add ${quoted}`);
}

// ─── Sitemap Audit ────────────────────────────────────────────────────────────

function getSitemapUrls(): Set<string> {
  const sitemapPath = path.join(PUBLIC_DIR, "sitemap.xml");
  if (!existsSync(sitemapPath)) return new Set();
  const content = readFileSync(sitemapPath, "utf8");
  const urls = new Set<string>();
  for (const m of content.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    urls.add(m[1].trim());
  }
  return urls;
}

function auditSitemap(canonicalRoutes: string[]): {
  findings: Finding[];
  newRoutes: string[];
} {
  const findings: Finding[] = [];
  const canonicalUrls = new Set(canonicalRoutes.map(toUrl));
  const sitemapUrls = getSitemapUrls();

  const missing = [...canonicalUrls].filter((u) => !sitemapUrls.has(u));
  const stale = [...sitemapUrls].filter((u) => !canonicalUrls.has(u));

  // Routes that are new (were not in the sitemap before regeneration)
  const newRoutes = missing.map((u) => (u === BASE_URL ? "/" : u.replace(BASE_URL, "")));

  if (missing.length > 0 || stale.length > 0) {
    if (missing.length > 0) {
      findings.push({
        severity: "error",
        message: `Sitemap missing ${missing.length} route(s): ${missing.join(", ")}`,
      });
    }
    if (stale.length > 0) {
      findings.push({
        severity: "warn",
        message: `Sitemap has ${stale.length} stale URL(s) no longer in routes: ${stale.join(", ")}`,
      });
    }

    const regen = run("npx tsx scripts/generate-sitemap.ts");
    if (!regen.ok) {
      findings.push({
        severity: "error",
        message: `Sitemap regeneration failed:\n${regen.stderr || regen.stdout}`,
      });
    } else {
      findings.push({ severity: "pass", message: "Sitemap regenerated and staged" });
      stageFiles("public/sitemap.xml");
    }
  } else {
    findings.push({
      severity: "pass",
      message: `All ${canonicalUrls.size} routes present and accounted for`,
    });
  }

  return { findings, newRoutes };
}

// ─── LLMs.txt + llms-pages/ Audit ────────────────────────────────────────────

function extractPageUrlsFromLlmsTxt(content: string): Set<string> {
  const urls = new Set<string>();
  for (const m of content.matchAll(/\[([^\]]+)\]\((https:\/\/navislabs\.com[^)]*)\)/g)) {
    const url = m[2];
    // Skip markdown file links, sitemap, and robots
    if (url.includes("/llms-pages/") || url.includes("sitemap.xml") || url.includes("robots.txt")) {
      continue;
    }
    // Normalize root URL: both "https://navislabs.com" and "https://navislabs.com/" map to BASE_URL
    const normalized =
      url === BASE_URL || url === `${BASE_URL}/` ? BASE_URL : url.replace(/\/$/, "");
    urls.add(normalized);
  }
  return urls;
}

function extractPageUrlsFromLlmsFullTxt(content: string): Set<string> {
  const urls = new Set<string>();
  for (const m of content.matchAll(/^URL:\s*(https:\/\/navislabs\.com[^\s]*)$/gim)) {
    const url = m[1].trim().replace(/\/$/, "");
    urls.add(url || BASE_URL);
  }
  return urls;
}

function routeToExpectedMarkdownPath(routePath: string): string {
  const rel = routePath === "/" ? "index.md" : `${routePath.replace(/^\//, "")}.md`;
  return path.join(PUBLIC_DIR, "llms-pages", rel);
}

function scanLlmsPagesFiles(): Set<string> {
  const result = new Set<string>();
  const base = path.join(PUBLIC_DIR, "llms-pages");
  if (!existsSync(base)) return result;

  function walk(dir: string): void {
    for (const entry of readdirSync(dir)) {
      const full = path.join(dir, entry);
      if (statSync(full).isDirectory()) {
        walk(full);
      } else if (entry.endsWith(".md")) {
        result.add(full);
      }
    }
  }
  walk(base);
  return result;
}

function auditLlms(canonicalRoutes: string[]): Finding[] {
  const findings: Finding[] = [];
  const canonicalUrls = new Set(canonicalRoutes.map(toUrl));
  let needsRegen = false;

  // ── llms.txt ──────────────────────────────────────────────────────────────
  const llmsTxtPath = path.join(PUBLIC_DIR, "llms.txt");
  if (!existsSync(llmsTxtPath)) {
    findings.push({ severity: "error", message: "llms.txt not found — will regenerate" });
    needsRegen = true;
  } else {
    const content = readFileSync(llmsTxtPath, "utf8");
    const listedUrls = extractPageUrlsFromLlmsTxt(content);
    const missing = [...canonicalUrls].filter((u) => !listedUrls.has(u));
    const dead = [...listedUrls].filter((u) => !canonicalUrls.has(u));

    if (missing.length > 0) {
      findings.push({
        severity: "error",
        message: `llms.txt missing ${missing.length} route(s): ${missing.join(", ")}`,
      });
      needsRegen = true;
    }
    if (dead.length > 0) {
      findings.push({
        severity: "warn",
        message: `llms.txt has ${dead.length} dead link(s) to removed routes: ${dead.join(", ")}`,
      });
      needsRegen = true;
    }
    if (missing.length === 0 && dead.length === 0) {
      findings.push({ severity: "pass", message: `llms.txt: all ${canonicalUrls.size} routes listed` });
    }
  }

  // ── llms-full.txt ─────────────────────────────────────────────────────────
  const llmsFullPath = path.join(PUBLIC_DIR, "llms-full.txt");
  if (!existsSync(llmsFullPath)) {
    findings.push({ severity: "error", message: "llms-full.txt not found — will regenerate" });
    needsRegen = true;
  } else {
    const content = readFileSync(llmsFullPath, "utf8");
    const listedUrls = extractPageUrlsFromLlmsFullTxt(content);
    const missing = [...canonicalUrls].filter((u) => !listedUrls.has(u));
    const dead = [...listedUrls].filter((u) => !canonicalUrls.has(u));

    if (missing.length > 0) {
      findings.push({
        severity: "error",
        message: `llms-full.txt missing ${missing.length} route(s): ${missing.join(", ")}`,
      });
      needsRegen = true;
    }
    if (dead.length > 0) {
      findings.push({
        severity: "warn",
        message: `llms-full.txt has ${dead.length} dead link(s) to removed routes: ${dead.join(", ")}`,
      });
      needsRegen = true;
    }
    if (missing.length === 0 && dead.length === 0) {
      findings.push({ severity: "pass", message: `llms-full.txt: all ${canonicalUrls.size} routes listed` });
    }
  }

  // ── llms-pages/*.md ───────────────────────────────────────────────────────
  const expectedFiles = new Set(canonicalRoutes.map(routeToExpectedMarkdownPath));
  const actualFiles = scanLlmsPagesFiles();
  const missingFiles = [...expectedFiles].filter((f) => !actualFiles.has(f));
  const orphanFiles = [...actualFiles].filter((f) => !expectedFiles.has(f));

  if (missingFiles.length > 0) {
    const rel = missingFiles.map((f) => path.relative(ROOT, f));
    findings.push({
      severity: "error",
      message: `llms-pages/ missing ${missingFiles.length} file(s): ${rel.join(", ")}`,
    });
    needsRegen = true;
  }
  if (orphanFiles.length > 0) {
    const rel = orphanFiles.map((f) => path.relative(ROOT, f));
    findings.push({
      severity: "warn",
      message: `llms-pages/ has ${orphanFiles.length} orphan file(s) for removed routes: ${rel.join(", ")}`,
    });
    needsRegen = true;
  }
  if (missingFiles.length === 0 && orphanFiles.length === 0) {
    findings.push({
      severity: "pass",
      message: `llms-pages/: all ${canonicalRoutes.length} markdown files present`,
    });
  }

  // ── Regenerate if needed ──────────────────────────────────────────────────
  if (needsRegen) {
    const regen = run("npx tsx scripts/generate-llms-txt.ts");
    if (!regen.ok) {
      findings.push({
        severity: "error",
        message: `LLMs regeneration failed:\n${regen.stderr || regen.stdout}`,
      });
    } else {
      findings.push({ severity: "pass", message: "LLMs files regenerated and staged" });
      stageFiles("public/llms.txt", "public/llms-full.txt", "public/llms-pages/");
    }
  }

  return findings;
}

// ─── Cloudflare Workers Handoff ───────────────────────────────────────────────

function writeWorkersHandoff(newRoutes: string[]): void {
  mkdirSync(DOCS_DIR, { recursive: true });
  const date = new Date().toISOString().split("T")[0];
  const routeList = newRoutes
    .map((r) => `- \`${r}\` → ${toUrl(r)}`)
    .join("\n");

  const content = [
    `# New Routes for Cloudflare Worker Prerender Config`,
    ``,
    `> Auto-generated by \`scripts/audit-discoverability.ts\` on ${date}.`,
    `> Review and coordinate with the engineering team before the next deployment.`,
    ``,
    `## New Routes Detected`,
    ``,
    `The following routes are in \`src/App.tsx\` but were not present in the previous sitemap.`,
    `The Cloudflare Workers prerender configuration (managed in the separate workers repo)`,
    `may need updating so these pages receive prerendered HTML for bot user-agents.`,
    ``,
    routeList,
    ``,
    `## Action Required`,
    ``,
    `1. Share this file with the engineering team responsible for the Cloudflare Workers config.`,
    `2. Confirm each route is included in the Worker's prerender route list.`,
    `3. Verify prerendered HTML is served correctly for bot user-agents on these routes.`,
    `4. Delete or archive this file once the Worker config has been updated.`,
    ``,
    `## Reference`,
    ``,
    `See \`docs/cloudflare-ai-crawlers.md\` for guidance on verifying crawler access.`,
    ``,
  ].join("\n");

  writeFileSync(path.join(DOCS_DIR, "new-routes-for-workers.md"), content, "utf8");
}

// ─── Report ───────────────────────────────────────────────────────────────────

function printReport(sections: { label: string; findings: Finding[] }[]): boolean {
  let hasUnresolvedErrors = false;

  console.log("");
  console.log(chalk.bold("━━━ Discoverability Audit ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));
  console.log("");

  for (const { label, findings } of sections) {
    console.log(chalk.bold(`  ${label}`));
    for (const f of findings) {
      if (f.severity === "pass") {
        console.log(chalk.green(`    ✓ ${f.message}`));
      } else if (f.severity === "warn") {
        console.log(chalk.yellow(`    ⚠ ${f.message}`));
      } else {
        console.log(chalk.red(`    ✗ ${f.message}`));
        hasUnresolvedErrors = true;
      }
    }
    console.log("");
  }

  if (hasUnresolvedErrors) {
    console.log(chalk.red.bold("  FAILED — one or more issues could not be resolved automatically."));
    console.log(chalk.dim("  Fix the errors above, then retry."));
  } else {
    console.log(chalk.green.bold("  PASSED"));
  }

  console.log("");
  console.log(chalk.dim("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));
  console.log("");

  return hasUnresolvedErrors;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main(): void {
  const canonicalRoutes = getCanonicalRoutes();

  const { findings: sitemapFindings, newRoutes } = auditSitemap(canonicalRoutes);
  const llmsFindings = auditLlms(canonicalRoutes);

  if (newRoutes.length > 0) {
    writeWorkersHandoff(newRoutes);
    console.log(chalk.cyan(`\n  ℹ  New routes detected: ${newRoutes.join(", ")}`));
    console.log(chalk.cyan(`     docs/new-routes-for-workers.md written — coordinate with engineering`));
    console.log(chalk.cyan(`     to add these to the Cloudflare Worker prerender config.\n`));
  }

  const failed = printReport([
    { label: "Sitemap  (public/sitemap.xml)", findings: sitemapFindings },
    { label: "LLMs     (llms.txt · llms-full.txt · llms-pages/)", findings: llmsFindings },
  ]);

  process.exit(failed ? 1 : 0);
}

main();
