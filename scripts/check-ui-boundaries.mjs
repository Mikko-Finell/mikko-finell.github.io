import { readdir, readFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const sourceRoot = fileURLToPath(new URL("../src/", import.meta.url));
const sharedComponents = ["Heading", "Inline", "Link", "Section", "Stack"];
const violations = [];

async function collectSourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nestedFiles = await Promise.all(
    entries.map((entry) => {
      const entryPath = join(directory, entry.name);
      return entry.isDirectory() ? collectSourceFiles(entryPath) : [entryPath];
    }),
  );

  return nestedFiles.flat();
}

function report(file, message) {
  violations.push(`${relative(process.cwd(), file)}: ${message}`);
}

for (const file of await collectSourceFiles(sourceRoot)) {
  if (![".ts", ".tsx"].includes(extname(file))) {
    continue;
  }

  const source = await readFile(file, "utf8");

  if (/\bstyle\s*=\s*\{/.test(source)) {
    report(file, "inline style attributes are forbidden");
  }

  if (/import\s+["'][^"']*site\.css["']/.test(source) && !file.endsWith("/src/main.tsx")) {
    report(file, "site.css may only be imported by src/main.tsx");
  }

  if (file.includes("/src/ui/") && /\b(?:className|style)\??\s*:/.test(source)) {
    report(file, "shared UI props must not expose className or style overrides");
  }

  for (const component of sharedComponents) {
    const overridePattern = new RegExp(`<${component}\\b[^>]*\\b(?:className|style)=`, "s");
    if (overridePattern.test(source)) {
      report(file, `${component} must not receive className or style overrides`);
    }
  }

  if (!file.endsWith("/src/ui/Button.tsx") && /<button\b/.test(source)) {
    report(file, "raw button elements must be implemented by the shared Button component");
  }

  if (!file.endsWith("/src/ui/Expandable.tsx") && /<(?:details|summary)\b/.test(source)) {
    report(file, "disclosure controls must be implemented by the shared Expandable component");
  }
}

if (violations.length > 0) {
  console.error(`UI boundary check failed:\n${violations.map((item) => `- ${item}`).join("\n")}`);
  process.exitCode = 1;
} else {
  console.log("UI boundary check passed.");
}
