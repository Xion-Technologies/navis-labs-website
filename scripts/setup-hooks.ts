import { writeFileSync, chmodSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const HOOKS_DIR = path.join(ROOT, ".git", "hooks");
const HOOK_PATH = path.join(HOOKS_DIR, "pre-push");

const HOOK_CONTENT = `#!/bin/sh
# pre-push hook — installed by scripts/setup-hooks.ts
# Runs the discoverability audit before every push.
#
# Emergency bypass: SKIP_AUDIT=1 git push

if [ "$SKIP_AUDIT" = "1" ]; then
  echo "SKIP_AUDIT=1 set — skipping discoverability audit."
  exit 0
fi

echo ""
echo "Running discoverability audit..."
echo ""

npx tsx scripts/audit-discoverability.ts
EXIT_CODE=$?

if [ $EXIT_CODE -ne 0 ]; then
  echo ""
  echo "Push blocked: discoverability audit failed."
  echo "Fix the issues above, or bypass with: SKIP_AUDIT=1 git push"
  echo ""
  exit 1
fi

exit 0
`;

function main(): void {
  if (!existsSync(path.join(ROOT, ".git"))) {
    console.error("Error: .git directory not found. Run this script from the project root.");
    process.exit(1);
  }

  if (!existsSync(HOOKS_DIR)) {
    mkdirSync(HOOKS_DIR, { recursive: true });
  }

  writeFileSync(HOOK_PATH, HOOK_CONTENT, "utf8");
  chmodSync(HOOK_PATH, "755");

  const rel = path.relative(ROOT, HOOK_PATH);
  console.log(`✓ Pre-push hook installed at ./${rel}`);
  console.log("  Runs:   npx tsx scripts/audit-discoverability.ts");
  console.log("  Bypass: SKIP_AUDIT=1 git push");
}

main();
