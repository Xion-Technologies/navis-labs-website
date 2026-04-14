import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import path from "node:path";

const BASE_URL = "https://navislabs.com";
const XML_COMMENT =
  "<!-- Prerendering for crawler access is handled via Cloudflare Workers (separate repo). Coordinate with engineering when adding new routes. -->";
const ROOT_DIR = process.cwd();
const APP_FILE = path.join(ROOT_DIR, "src", "App.tsx");
const PUBLIC_DIR = path.join(ROOT_DIR, "public");
const MAX_URLS_PER_FILE = 50000;

type RouteEntry = {
  routePath: string;
  componentFile: string;
};

type SitemapUrlEntry = {
  loc: string;
  lastmod: string;
  changefreq: "weekly" | "monthly";
  priority: string;
};

function parseLazyImports(appSource: string): Map<string, string> {
  const lazyImportRegex = /const\s+(\w+)\s*=\s*lazy\(\(\)\s*=>\s*import\("([^"]+)"\)\);/g;
  const map = new Map<string, string>();

  for (const match of appSource.matchAll(lazyImportRegex)) {
    const componentName = match[1];
    const importPath = match[2];
    map.set(componentName, importPath);
  }

  return map;
}

function resolveComponentFile(importPath: string): string | null {
  if (!importPath.startsWith("@/")) {
    return null;
  }

  const withoutAlias = importPath.replace("@/", "src/");
  const candidates = [".tsx", ".ts", ".jsx", ".js"];

  for (const ext of candidates) {
    const filePath = path.join(ROOT_DIR, `${withoutAlias}${ext}`);
    if (existsSync(filePath)) {
      return filePath;
    }
  }

  return null;
}

function parseRouteEntries(appSource: string, lazyImports: Map<string, string>): RouteEntry[] {
  const routeRegex = /<Route\s+path="([^"]+)"\s+element={<(\w+)\s*\/?>}\s*\/>/g;
  const entries: RouteEntry[] = [];

  for (const match of appSource.matchAll(routeRegex)) {
    const routePath = match[1];
    const componentName = match[2];
    const lazyImportPath = lazyImports.get(componentName);
    if (!lazyImportPath) {
      continue;
    }

    const componentFile = resolveComponentFile(lazyImportPath);
    if (!componentFile) {
      console.warn(`Skipping route "${routePath}" because "${lazyImportPath}" could not be resolved.`);
      continue;
    }

    entries.push({ routePath, componentFile });
  }

  return entries;
}

function shouldSkipRoute(routePath: string, componentFile: string): boolean {
  const lowerPath = routePath.toLowerCase();
  const lowerFile = componentFile.toLowerCase();

  if (routePath.includes(":")) {
    return true;
  }

  if (lowerPath.includes("dashboard") || lowerPath.includes("auth")) {
    return true;
  }

  if (lowerFile.includes("dashboard") || lowerFile.includes("auth")) {
    return true;
  }

  return false;
}

function getPriority(routePath: string): string {
  if (routePath === "/") {
    return "1.0";
  }

  const depth = routePath.split("/").filter(Boolean).length;
  return depth <= 1 ? "0.8" : "0.6";
}

function getChangefreq(routePath: string): "weekly" | "monthly" {
  return routePath === "/" ? "weekly" : "monthly";
}

function getLastModified(componentFile: string): string {
  const relativePath = path.relative(ROOT_DIR, componentFile);
  try {
    const gitDate = execSync(`git log -1 --format=%cI -- "${relativePath}"`, {
      cwd: ROOT_DIR,
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();

    if (gitDate) {
      return gitDate;
    }
  } catch {
    // Fall back to current date when git history is unavailable.
  }

  return new Date().toISOString();
}

function toAbsoluteUrl(routePath: string): string {
  if (routePath === "/") {
    return BASE_URL;
  }

  return `${BASE_URL}${routePath}`;
}

function buildUrlXml(url: SitemapUrlEntry): string {
  return [
    "  <url>",
    `    <loc>${url.loc}</loc>`,
    `    <lastmod>${url.lastmod}</lastmod>`,
    `    <changefreq>${url.changefreq}</changefreq>`,
    `    <priority>${url.priority}</priority>`,
    "  </url>",
  ].join("\n");
}

function buildSitemapXml(urls: SitemapUrlEntry[]): string {
  const body = urls.map(buildUrlXml).join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    XML_COMMENT,
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    body,
    "</urlset>",
    "",
  ].join("\n");
}

function buildSitemapIndexXml(files: string[]): string {
  const now = new Date().toISOString();
  const entries = files
    .map((file) =>
      ["  <sitemap>", `    <loc>${BASE_URL}/${file}</loc>`, `    <lastmod>${now}</lastmod>`, "  </sitemap>"].join("\n"),
    )
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    XML_COMMENT,
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    entries,
    "</sitemapindex>",
    "",
  ].join("\n");
}

function writeSingleSitemap(urls: SitemapUrlEntry[]): void {
  const outputFile = path.join(PUBLIC_DIR, "sitemap.xml");
  writeFileSync(outputFile, buildSitemapXml(urls), "utf8");
  console.log(`Generated sitemap with ${urls.length} URLs: ${path.relative(ROOT_DIR, outputFile)}`);
}

function writeChunkedSitemaps(urls: SitemapUrlEntry[]): void {
  const sitemapFiles: string[] = [];

  for (let i = 0; i < urls.length; i += MAX_URLS_PER_FILE) {
    const chunk = urls.slice(i, i + MAX_URLS_PER_FILE);
    const index = Math.floor(i / MAX_URLS_PER_FILE) + 1;
    const fileName = `sitemap-${index}.xml`;
    const filePath = path.join(PUBLIC_DIR, fileName);
    writeFileSync(filePath, buildSitemapXml(chunk), "utf8");
    sitemapFiles.push(fileName);
  }

  const indexPath = path.join(PUBLIC_DIR, "sitemap.xml");
  writeFileSync(indexPath, buildSitemapIndexXml(sitemapFiles), "utf8");
  console.log(`Generated sitemap index with ${sitemapFiles.length} files: ${path.relative(ROOT_DIR, indexPath)}`);
}

function main(): void {
  if (!existsSync(APP_FILE)) {
    throw new Error(`Could not locate route source file: ${APP_FILE}`);
  }

  if (!existsSync(PUBLIC_DIR)) {
    mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  const appSource = readFileSync(APP_FILE, "utf8");
  const lazyImports = parseLazyImports(appSource);
  const routeEntries = parseRouteEntries(appSource, lazyImports);

  const urls: SitemapUrlEntry[] = routeEntries
    .filter((entry) => !shouldSkipRoute(entry.routePath, entry.componentFile))
    .map((entry) => ({
      loc: toAbsoluteUrl(entry.routePath),
      lastmod: getLastModified(entry.componentFile),
      changefreq: getChangefreq(entry.routePath),
      priority: getPriority(entry.routePath),
    }));

  if (urls.length === 0) {
    throw new Error("No sitemap URLs were generated. Check route parsing logic.");
  }

  if (urls.length > MAX_URLS_PER_FILE) {
    writeChunkedSitemaps(urls);
  } else {
    writeSingleSitemap(urls);
  }
}

main();
