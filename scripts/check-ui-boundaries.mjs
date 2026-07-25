import { readdir, readFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const sourceRoot = fileURLToPath(new URL("../src/", import.meta.url));
const stylesheetPath = fileURLToPath(new URL("../src/styles/site.css", import.meta.url));
const sharedComponents = [
  "Button",
  "Card",
  "Heading",
  "Image",
  "Inline",
  "Link",
  "Section",
  "Stack",
  "ThemeControls",
];
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

  if (
    /import\s+["'][^"']*site\.css["']/.test(source) &&
    !file.endsWith("/src/app/mountPage.tsx")
  ) {
    report(file, "site.css may only be imported by src/app/mountPage.tsx");
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

  if (!file.endsWith("/src/ui/Link.tsx") && /<a\b/.test(source)) {
    report(file, "raw anchor elements must be implemented by the shared Link component");
  }

  if (!file.endsWith("/src/ui/Heading.tsx") && /<h[1-3]\b/.test(source)) {
    report(file, "raw primary headings must be implemented by the shared Heading component");
  }
}

const stylesheet = await readFile(stylesheetPath, "utf8");

if (/\.ui-card(?:\s+|\s*>\s*)[^,{]*\bp\b[^,{]*\{/.test(stylesheet)) {
  report(stylesheetPath, "Card must not determine descendant paragraph typography");
}

if (violations.length > 0) {
  console.error(`UI boundary check failed:\n${violations.map((item) => `- ${item}`).join("\n")}`);
  process.exitCode = 1;
} else {
  console.log("UI boundary check passed.");
}
