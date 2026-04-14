import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { caseStudies } from "../src/data/caseStudies";

type RouteEntry = {
  path: string;
  componentName: string;
  pageFile: string;
  title: string;
  description: string;
  content: string[];
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const srcDir = path.join(root, "src");
const publicDir = path.join(root, "public");
const markdownOutputPrefix = "llms-pages";

const htmlEntityMap: Record<string, string> = {
  "&rsquo;": "'",
  "&lsquo;": "'",
  "&ldquo;": '"',
  "&rdquo;": '"',
  "&mdash;": "-",
  "&ndash;": "-",
  "&nbsp;": " ",
  "&amp;": "&",
};

const pageContentFiles: Record<string, string[]> = {
  Home: [
    "components/HeroSection.tsx",
    "components/USPSections.tsx",
    "components/HowItWorksPreview.tsx",
    "components/ServicesPreview.tsx",
    "components/FeaturedProjects.tsx",
    "components/WhoItsForPreview.tsx",
    "components/CTABanner.tsx",
  ],
  About: ["components/AboutContent.tsx"],
  Services: ["components/ServicesContent.tsx"],
  InnovationLab: ["pages/InnovationLab.tsx"],
  CustomDevelopment: ["pages/CustomDevelopment.tsx"],
  HowItWorks: ["components/HowItWorksContent.tsx"],
  Solutions: ["components/SolutionsContent.tsx"],
  Projects: ["components/ProjectsContent.tsx"],
  Contact: ["components/ContactContent.tsx"],
};

function read(filePath: string): string {
  return fs.readFileSync(path.join(srcDir, filePath), "utf8");
}

function decodeEntities(text: string): string {
  let out = text;
  for (const [entity, value] of Object.entries(htmlEntityMap)) {
    out = out.split(entity).join(value);
  }
  return out;
}

function normalize(text: string): string {
  return decodeEntities(text).replace(/\{["'\s]*\}/g, "").replace(/\s+/g, " ").trim();
}

function isUsefulLine(text: string): boolean {
  if (!text) return false;
  if (text.length < 3) return false;
  if (/^(bg-|text-|border-|hover:|focus:|animate-)/.test(text)) return false;
  if (/^(https?:\/\/|\/[a-z0-9])/.test(text)) return false;
  if (/^[A-Za-z0-9_-]+$/.test(text) && text.length < 10) return false;
  if (/^[0-9\s./-]+$/.test(text)) return false;
  if (text.includes("strokeLinecap") || text.includes("viewBox")) return false;
  if (
    /(className|transition:|import |export |function |const |=>|aria-|stroke|fillRule|clipRule|onClick|set[A-Z]|useState|useRef|useEffect)/.test(
      text,
    )
  ) {
    return false;
  }
  if (/[{}()[\];]/.test(text)) return false;
  if ((text.match(/[-_=]/g)?.length ?? 0) > 6) return false;
  return /[A-Za-z]/.test(text);
}

function unique(lines: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const line of lines) {
    const key = line.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(line);
  }
  return out;
}

function extractTextNodes(source: string): string[] {
  const matches = source.matchAll(/<(h[1-6]|p|button|li|span)[^>]*>([\s\S]*?)<\/\1>/g);
  const out: string[] = [];
  for (const match of matches) {
    const inner = (match[2] ?? "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\{[^}]+\}/g, " ")
      .replace(/\s+/g, " ");
    const value = normalize(inner);
    if (isUsefulLine(value)) {
      out.push(value);
    }
  }
  return out;
}

function extractNamedStrings(source: string): string[] {
  const out: string[] = [];
  const regex =
    /(title|tagline|desc|description|summary|short|full|label|overline|body|headline|sub)\s*:\s*"([^"]+)"/g;
  for (const match of source.matchAll(regex)) {
    const value = normalize(match[2] ?? "");
    if (isUsefulLine(value)) {
      out.push(value);
    }
  }

  for (const block of source.matchAll(
    /(items|details|steps|capabilities|impact|paragraphs|bullets|results|whyItMatters|technologies)\s*:\s*\[([\s\S]*?)\]/g,
  )) {
    for (const valueMatch of block[2].matchAll(/"([^"]+)"/g)) {
      const value = normalize(valueMatch[1] ?? "");
      if (isUsefulLine(value)) {
        out.push(value);
      }
    }
  }

  return out;
}

function extractMeta(pageFile: string): { title: string; description: string } {
  const src = read(pageFile);
  const titleMatch = src.match(/<title>([^<]+)<\/title>/);
  const descMatch = src.match(/name="description"\s+content="([^"]+)"/);
  return {
    title: normalize(titleMatch?.[1] ?? "TODO: title not found"),
    description: normalize(descMatch?.[1] ?? "TODO: description not found"),
  };
}

function parseRoutes(): Array<{ path: string; componentName: string; pageFile: string }> {
  const app = fs.readFileSync(path.join(srcDir, "App.tsx"), "utf8");
  const lazyImports = new Map<string, string>();
  for (const match of app.matchAll(/const\s+(\w+)\s*=\s*lazy\(\(\)\s*=>\s*import\("@\/([^"]+)"\)\);/g)) {
    lazyImports.set(match[1], `${match[2]}.tsx`);
  }

  const routes: Array<{ path: string; componentName: string; pageFile: string }> = [];
  for (const match of app.matchAll(/<Route\s+path="([^"]+)"\s+element={<(\w+)\s*\/>}\s*\/>/g)) {
    const componentName = match[2];
    const pageFile = lazyImports.get(componentName);
    if (!pageFile) continue;
    routes.push({ path: match[1], componentName, pageFile });
  }
  return routes;
}

function getCaseStudyMarkdown(slug: string): string[] {
  const study = caseStudies.find((entry) => entry.slug === slug);
  if (!study) {
    return ["TODO: case study content not found"];
  }

  const lines: string[] = [];
  lines.push(study.title);
  lines.push(study.summary);
  lines.push("Client Overview");
  for (const [key, value] of Object.entries(study.clientOverview)) {
    lines.push(`${key}: ${value}`);
  }
  lines.push("The Challenge");
  lines.push(...study.challenge.paragraphs);
  lines.push(...study.challenge.bullets.map((item) => `- ${item}`));
  lines.push("Our Approach");
  lines.push(...study.approach.paragraphs);
  lines.push(...study.approach.bullets.map((item) => `- ${item}`));
  lines.push("The Results");
  lines.push(...study.results.map((item) => `- ${item}`));
  lines.push("Why It Matters");
  lines.push(...study.whyItMatters);
  lines.push("Technologies Used");
  lines.push(...study.technologies.map((item) => `- ${item}`));
  lines.push(study.anonymizedNote);
  return unique(lines.map(normalize).filter(isUsefulLine));
}

function buildRouteEntries(): RouteEntry[] {
  const routes = parseRoutes();
  return routes.map((route) => {
    const meta = extractMeta(route.pageFile);
    let content: string[] = [];

    if (route.path.startsWith("/case-studies/")) {
      const slug = route.path.replace("/case-studies/", "");
      const study = caseStudies.find((entry) => entry.slug === slug);
      const title = study ? `${study.title} | Navis Labs` : "TODO: title not found";
      const description = study?.summary ?? "TODO: description not found";
      content = getCaseStudyMarkdown(slug);
      return {
        ...route,
        title,
        description,
        content,
      };
    } else {
      const files = pageContentFiles[route.componentName] ?? [route.pageFile];
      for (const file of files) {
        const source = read(file);
        content.push(...extractTextNodes(source));
        content.push(...extractNamedStrings(source));
      }
      content = unique(content.map(normalize).filter(isUsefulLine));
    }

    return {
      ...route,
      title: meta.title,
      description: meta.description,
      content,
    };
  });
}

function routeToMarkdownPath(routePath: string): string {
  if (routePath === "/") return "index.md";
  return `${routePath.replace(/^\//, "")}.md`;
}

function markdownPublicPath(routePath: string): string {
  return `${markdownOutputPrefix}/${routeToMarkdownPath(routePath)}`;
}

function siteUrl(routePath: string): string {
  return routePath === "/" ? "https://navislabs.com/" : `https://navislabs.com${routePath}`;
}

function markdownUrl(routePath: string): string {
  return `https://navislabs.com/${markdownPublicPath(routePath)}`;
}

function writePageMarkdown(route: RouteEntry): void {
  const relPath = markdownPublicPath(route.path);
  const outputPath = path.join(publicDir, relPath);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  const body = [
    `# ${route.title}`,
    "",
    `> ${route.description}`,
    "",
    "## Content",
    "",
    ...route.content.map((line) => (line.startsWith("- ") ? line : line)),
    "",
    `Source URL: ${siteUrl(route.path)}`,
    "",
  ].join("\n");

  fs.writeFileSync(outputPath, body, "utf8");
}

function buildLlmsTxt(routes: RouteEntry[]): string {
  const main = routes.filter(
    (r) =>
      ["/", "/about", "/services", "/how-it-works", "/solutions", "/projects", "/contact"].includes(
        r.path,
      ),
  );
  const services = routes.filter((r) => r.path.startsWith("/services/"));
  const caseStudyRoutes = routes.filter((r) => r.path.startsWith("/case-studies/"));

  const lines: string[] = [];
  lines.push("# Navis Labs");
  lines.push("");
  lines.push(
    "> Navis Labs is a development team obsessed with tech. We turn ideas into working prototypes in 3 days using the latest AI - custom-built for your business.",
  );
  lines.push("");
  lines.push("## Main Pages");
  lines.push("");
  for (const route of main) {
    lines.push(`- [${route.title}](${siteUrl(route.path)}): ${route.description}`);
    lines.push(`- [${route.title} (Markdown)](${markdownUrl(route.path)}): Static markdown version.`);
  }
  lines.push("");
  lines.push("## Documentation");
  lines.push("");
  lines.push("- [TODO](https://navislabs.com/): TODO: No dedicated docs routes found in source routes.");
  lines.push("");
  lines.push("## Resources");
  lines.push("");
  for (const route of services) {
    lines.push(`- [${route.title}](${siteUrl(route.path)}): ${route.description}`);
  }
  for (const route of caseStudyRoutes) {
    lines.push(`- [${route.title}](${siteUrl(route.path)}): ${route.description}`);
  }
  lines.push("- [Sitemap](https://navislabs.com/sitemap.xml): XML index of public routes.");
  lines.push("- [Robots](https://navislabs.com/robots.txt): Crawler directives for public content.");
  lines.push("");

  return lines.join("\n");
}

function buildLlmsFullTxt(routes: RouteEntry[]): string {
  const lines: string[] = [];
  lines.push("# Navis Labs");
  lines.push("");
  lines.push(
    "> Navis Labs is a development team obsessed with tech. We turn ideas into working prototypes in 3 days using the latest AI - custom-built for your business.",
  );
  lines.push("");

  for (const route of routes) {
    lines.push(`## ${route.title}`);
    lines.push("");
    lines.push(`URL: ${siteUrl(route.path)}`);
    lines.push(`Description: ${route.description}`);
    lines.push("");
    if (route.content.length === 0) {
      lines.push("TODO: Content extraction returned no text.");
    } else {
      for (const entry of route.content) {
        lines.push(entry.startsWith("- ") ? entry : `- ${entry}`);
      }
    }
    lines.push("");
  }

  return lines.join("\n");
}

function main(): void {
  const routes = buildRouteEntries();

  for (const route of routes) {
    writePageMarkdown(route);
  }

  fs.writeFileSync(path.join(publicDir, "llms.txt"), buildLlmsTxt(routes), "utf8");
  fs.writeFileSync(path.join(publicDir, "llms-full.txt"), buildLlmsFullTxt(routes), "utf8");

  console.log(`Generated ${routes.length} page markdown files + llms.txt + llms-full.txt`);
}

main();
