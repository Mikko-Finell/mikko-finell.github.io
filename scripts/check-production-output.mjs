import { readdir, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const distDirectory = fileURLToPath(new URL("../dist/", import.meta.url));
const assetsDirectory = join(distDirectory, "assets");
const cvHtml = await readFile(join(distDirectory, "index.html"), "utf8");
const articleOnlyPhrases = [
  "The company retained the Excel system during development",
  "The work did not proceed as a commissioned Edupower project",
];
const initialAssetPattern = /(?:src|href)="(\/assets\/[^"?#]+\.js)"/g;
const importPattern = /(?:\bfrom|\bimport)"(\.\/[^"?#]+\.js)"/g;
const initialAssets = new Set();
const pendingAssets = [];

for (const match of cvHtml.matchAll(initialAssetPattern)) {
  const assetPath = match[1];

  if (assetPath) {
    pendingAssets.push(join(distDirectory, assetPath));
  }
}

while (pendingAssets.length > 0) {
  const assetPath = pendingAssets.pop();

  if (!assetPath || initialAssets.has(assetPath)) {
    continue;
  }

  initialAssets.add(assetPath);
  const asset = await readFile(assetPath, "utf8");

  for (const match of asset.matchAll(importPattern)) {
    const importedPath = match[1];

    if (importedPath) {
      pendingAssets.push(join(dirname(assetPath), importedPath));
    }
  }
}

const initialOutput = await Promise.all(
  [...initialAssets].map(async (assetPath) => ({
    path: assetPath,
    source: await readFile(assetPath, "utf8"),
  })),
);
const initialPayloadSize = initialOutput.reduce(
  (size, asset) => size + Buffer.byteLength(asset.source),
  0,
);
const allAssetPaths = (await readdir(assetsDirectory))
  .filter((fileName) => fileName.endsWith(".js"))
  .map((fileName) => join(assetsDirectory, fileName));
const allOutput = await Promise.all(
  allAssetPaths.map(async (assetPath) => ({
    path: assetPath,
    source: await readFile(assetPath, "utf8"),
  })),
);
const violations = [];

for (const phrase of articleOnlyPhrases) {
  if (initialOutput.some((asset) => asset.source.includes(phrase))) {
    violations.push(`CV initial output contains article-only prose: ${phrase}`);
  }

  if (!allOutput.some((asset) => asset.source.includes(phrase))) {
    violations.push(`production output is missing canonical article prose: ${phrase}`);
  }
}

if (initialPayloadSize > 230_000) {
  violations.push(
    `CV initial JavaScript payload is ${initialPayloadSize} bytes; expected at most 230000 bytes`,
  );
}

if (violations.length > 0) {
  console.error(
    `Production output check failed:\n${violations.map((item) => `- ${item}`).join("\n")}`,
  );
  process.exitCode = 1;
} else {
  console.log(
    `Production output check passed (${initialPayloadSize} bytes across ${initialAssets.size} CV initial JavaScript assets).`,
  );
}
