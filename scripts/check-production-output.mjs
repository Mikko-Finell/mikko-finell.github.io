import { readdir, readFile, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const distDirectory = fileURLToPath(new URL("../dist/", import.meta.url));
const assetsDirectory = join(distDirectory, "assets");
const cvHtml = await readFile(join(distDirectory, "index.html"), "utf8");
const siteOrigin = "https://mikko-finell.github.io";
const routeOutputs = [
  { href: "/", path: "index.html" },
  { href: "/methodology/", path: "methodology/index.html" },
  { href: "/work/edupower/", path: "work/edupower/index.html" },
  { href: "/work/tealab/", path: "work/tealab/index.html" },
];
const requiredArtifacts = [
  "favicon.svg",
  "social-preview.png",
  "robots.txt",
  "sitemap.xml",
  "llms.txt",
  "Mikko-Finell-CV.pdf",
  "work-profile.v1.json",
];
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

async function collectDotfiles(directory) {
  const dotfiles = [];

  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const entryPath = join(directory, entry.name);

    if (entry.name.startsWith(".")) {
      dotfiles.push(entryPath);
    }

    if (entry.isDirectory()) {
      dotfiles.push(...(await collectDotfiles(entryPath)));
    }
  }

  return dotfiles;
}

for (const artifactPath of requiredArtifacts) {
  try {
    const details = await stat(join(distDirectory, artifactPath));

    if (details.size === 0) {
      violations.push(`production artifact is empty: ${artifactPath}`);
    }
  } catch {
    violations.push(`production artifact is missing: ${artifactPath}`);
  }
}

for (const route of routeOutputs) {
  const document = await readFile(join(distDirectory, route.path), "utf8");
  const canonicalUrl = new URL(route.href, siteOrigin).toString();

  if (!/<main\b/.test(document) || (document.match(/<h1\b/g) ?? []).length !== 1) {
    violations.push(`${route.href} is missing meaningful static document content`);
  }

  if (
    !document.includes(`<link rel="canonical" href="${canonicalUrl}" />`) ||
    !/<meta name="description" content="[^"]+" \/>/.test(document)
  ) {
    violations.push(`${route.href} has incomplete canonical metadata`);
  }
}

const llms = await readFile(join(distDirectory, "llms.txt"), "utf8");
const [robots, sitemap, favicon, socialPreview, pdf] = await Promise.all([
  readFile(join(distDirectory, "robots.txt"), "utf8"),
  readFile(join(distDirectory, "sitemap.xml"), "utf8"),
  readFile(join(distDirectory, "favicon.svg"), "utf8"),
  readFile(join(distDirectory, "social-preview.png")),
  readFile(join(distDirectory, "Mikko-Finell-CV.pdf")),
]);

if (!robots.includes("User-agent: *") || !robots.includes("Sitemap:")) {
  violations.push("robots.txt is missing its crawler discovery contract");
}

if (!sitemap.includes("<urlset") || !llms.startsWith("# ")) {
  violations.push("generated discovery artifacts have an invalid document format");
}

if (!favicon.includes("<svg") || !socialPreview.subarray(1, 4).equals(Buffer.from("PNG"))) {
  violations.push("social or favicon assets have an invalid file format");
}

if (!pdf.subarray(0, 4).equals(Buffer.from("%PDF"))) {
  violations.push("generated CV download is not a PDF document");
}

for (const route of routeOutputs) {
  const canonicalUrl = new URL(route.href, siteOrigin).toString();

  if (!llms.includes(canonicalUrl)) {
    violations.push(`llms.txt is missing canonical route: ${canonicalUrl}`);
  }
}

for (const dotfilePath of await collectDotfiles(distDirectory)) {
  violations.push(`production artifact contains a dotfile: ${dotfilePath}`);
}

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
