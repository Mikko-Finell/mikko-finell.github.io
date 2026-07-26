import { execFileSync } from "node:child_process";
import { stat } from "node:fs/promises";
import { join } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const distDirectory = fileURLToPath(new URL("../dist/", import.meta.url));
const pdfPath = join(distDirectory, "Mikko-Finell-CV.pdf");
const expectedTextOrder = [
  "Mikko Finell",
  "Introduction",
  "Professional experience",
  "Working methodology",
  "Education and relevant background",
  "Contact",
];
const requiredText = [
  "mikko.finell@gmail.com",
  "https://github.com/mikko-finell",
  "https://www.linkedin.com/in/mikko-finell",
];
const violations = [];

function run(command, args) {
  try {
    return execFileSync(command, args, { encoding: "utf8" });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    violations.push(`${command} could not inspect the PDF: ${message}`);
    return "";
  }
}

try {
  const file = await stat(pdfPath);

  if (file.size < 10_000) {
    violations.push("PDF is unexpectedly small");
  }
} catch {
  violations.push("PDF output is missing");
}

const info = run("pdfinfo", [pdfPath]);
const text = run("pdftotext", ["-nopgbrk", pdfPath, "-"]);
const pageCount = Number(/^Pages:\s+(\d+)$/m.exec(info)?.[1]);

if (!Number.isInteger(pageCount) || pageCount < 2 || pageCount > 3) {
  violations.push(`PDF has ${Number.isNaN(pageCount) ? "an unknown" : pageCount} page count`);
}

if (!/^Page size:.*\(A4\)$/m.test(info)) {
  violations.push("PDF page size is not A4");
}

if (!/^Title:\s+Mikko Finell — CV$/m.test(info)) {
  violations.push("PDF title metadata does not match the canonical document title");
}

if (!/^Tagged:\s+yes$/m.test(info)) {
  violations.push("PDF is not tagged");
}

for (const item of requiredText) {
  if (!text.includes(item)) {
    violations.push(`PDF text extraction is missing: ${item}`);
  }
}

let previousIndex = -1;

for (const item of expectedTextOrder) {
  const index = text.indexOf(item);

  if (index <= previousIndex) {
    violations.push(`PDF reading order does not include ${item} in sequence`);
  }

  previousIndex = index;
}

if (violations.length > 0) {
  console.error(
    `PDF output check failed:\n${violations.map((item) => `- ${item}`).join("\n")}`,
  );
  process.exitCode = 1;
} else {
  console.log(`PDF output check passed (${pageCount} A4 pages).`);
}
