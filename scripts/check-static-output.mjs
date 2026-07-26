import { readFile } from "node:fs/promises";
import { join } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const distDirectory = fileURLToPath(new URL("../dist/", import.meta.url));
const pages = [
  { h1: "Mikko Finell", href: "/" },
  { h1: "Working methodology", href: "/methodology/" },
  { h1: "Edupower Oy", href: "/work/edupower/" },
  { h1: "Tealab", href: "/work/tealab/" },
];
const violations = [];

function outputPath(href) {
  return href === "/"
    ? join(distDirectory, "index.html")
    : join(distDirectory, href.slice(1), "index.html");
}

for (const page of pages) {
  const document = await readFile(outputPath(page.href), "utf8");
  const h1Count = (document.match(/<h1\b/g) ?? []).length;

  if (h1Count !== 1) {
    violations.push(`${page.href} contains ${h1Count} h1 elements`);
  }

  if (!new RegExp(`<h1\\b[^>]*>${page.h1}</h1>`).test(document)) {
    violations.push(`${page.href} is missing its rendered route heading`);
  }

  if (!document.includes('<nav aria-label="Primary"')) {
    violations.push(`${page.href} is missing primary navigation`);
  }

  if (!/<main\b/.test(document)) {
    violations.push(`${page.href} is missing its main landmark`);
  }

  if (/id=(?:"root"|root)><\/div>/.test(document)) {
    violations.push(`${page.href} contains an empty application root`);
  }
}

if (violations.length > 0) {
  console.error(
    `Static output check failed:\n${violations.map((item) => `- ${item}`).join("\n")}`,
  );
  process.exitCode = 1;
} else {
  console.log("Static output check passed.");
}
