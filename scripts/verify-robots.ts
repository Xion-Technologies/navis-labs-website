import fs from "node:fs";
import path from "node:path";

type RobotsBlock = {
  userAgent: string;
  allows: string[];
  disallows: string[];
};

const REQUIRED_AI_AGENTS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
  "Bytespider",
  "CCBot",
  "anthropic-ai",
  "cohere-ai",
] as const;

const REQUIRED_DEFAULT_DISALLOWS = [
  "/admin",
  "/admin/",
  "/dashboard",
  "/dashboard/",
  "/auth",
  "/auth/",
  "/api",
  "/api/",
  "/login",
  "/login/",
  "/signup",
  "/signup/",
  "/settings",
  "/settings/",
  "/assets/",
] as const;

function parseRobots(content: string): { blocks: RobotsBlock[]; sitemaps: string[] } {
  const blocks: RobotsBlock[] = [];
  const sitemaps: string[] = [];
  const lines = content.split(/\r?\n/);
  let currentBlock: RobotsBlock | null = null;

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) {
      continue;
    }

    const separatorIndex = line.indexOf(":");
    if (separatorIndex < 0) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim().toLowerCase();
    const value = line.slice(separatorIndex + 1).trim();
    if (!value) {
      continue;
    }

    if (key === "user-agent") {
      currentBlock = { userAgent: value, allows: [], disallows: [] };
      blocks.push(currentBlock);
      continue;
    }

    if (key === "allow") {
      if (currentBlock) currentBlock.allows.push(value);
      continue;
    }

    if (key === "disallow") {
      if (currentBlock) currentBlock.disallows.push(value);
      continue;
    }

    if (key === "sitemap") {
      sitemaps.push(value);
    }
  }

  return { blocks, sitemaps };
}

function main(): void {
  const robotsPath = path.resolve(process.cwd(), "public/robots.txt");

  if (!fs.existsSync(robotsPath)) {
    console.error(`FAIL: robots.txt not found at ${robotsPath}`);
    process.exit(1);
  }

  const robotsContent = fs.readFileSync(robotsPath, "utf8");
  const { blocks, sitemaps } = parseRobots(robotsContent);

  const failures: string[] = [];
  const warnings: string[] = [];

  for (const agent of REQUIRED_AI_AGENTS) {
    const matchingBlocks = blocks.filter((block) => block.userAgent === agent);
    if (matchingBlocks.length === 0) {
      failures.push(`Missing required AI user-agent block: ${agent}`);
      continue;
    }

    const hasAllowRoot = matchingBlocks.some((block) => block.allows.includes("/"));
    if (!hasAllowRoot) {
      failures.push(`AI user-agent is not explicitly allowed root path '/': ${agent}`);
    }
  }

  const defaultBlocks = blocks.filter((block) => block.userAgent === "*");
  if (defaultBlocks.length === 0) {
    failures.push("Missing default user-agent block: *");
  } else {
    const defaultDisallowSet = new Set(defaultBlocks.flatMap((block) => block.disallows));
    for (const disallowPath of REQUIRED_DEFAULT_DISALLOWS) {
      if (!defaultDisallowSet.has(disallowPath)) {
        failures.push(`Default '*' block missing disallow: ${disallowPath}`);
      }
    }

    const hasCrawlDelay = /(^|\n)\s*Crawl-delay\s*:\s*1\s*($|\n)/im.test(robotsContent);
    if (!hasCrawlDelay) {
      failures.push("Missing required Crawl-delay: 1 directive");
    }
  }

  if (sitemaps.length === 0) {
    failures.push("Missing sitemap directive");
  } else if (!sitemaps.some((value) => /^https?:\/\/.+\/sitemap\.xml$/i.test(value))) {
    warnings.push("Sitemap directive exists, but does not match expected */sitemap.xml format");
  }

  console.log("Robots Verification Report");
  console.log(`- File: ${robotsPath}`);
  console.log(`- User-agent blocks: ${blocks.length}`);
  console.log(`- Sitemap directives: ${sitemaps.length}`);

  if (warnings.length > 0) {
    console.log("\nWarnings:");
    for (const warning of warnings) {
      console.log(`- ${warning}`);
    }
  }

  if (failures.length > 0) {
    console.log("\nFailures:");
    for (const failure of failures) {
      console.log(`- ${failure}`);
    }
    process.exit(1);
  }

  console.log("\nPASS: robots.txt satisfies all required checks.");
}

main();
