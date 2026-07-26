import { readFile } from "node:fs/promises";
import { join } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const distDirectory = fileURLToPath(new URL("../dist/", import.meta.url));
const siteOrigin = "https://mikko-finell.github.io";
const sitemapUrl = `${siteOrigin}/sitemap.xml`;
const robotsPath = join(distDirectory, "robots.txt");
const sitemapPath = join(distDirectory, "sitemap.xml");
const cvDocument = await readFile(join(distDirectory, "index.html"), "utf8");
const routeDocuments = [
  cvDocument,
  await readFile(join(distDirectory, "methodology/index.html"), "utf8"),
  await readFile(join(distDirectory, "work/edupower/index.html"), "utf8"),
  await readFile(join(distDirectory, "work/tealab/index.html"), "utf8"),
];
const [robots, sitemap] = await Promise.all([
  readFile(robotsPath, "utf8"),
  readFile(sitemapPath, "utf8"),
]);
const violations = [];
const canonicalUrls = routeDocuments
  .map((document) => document.match(/<link rel="canonical" href="([^"]+)" \/>/)?.[1])
  .filter((url) => url !== undefined);
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (match) => match[1],
);

function reportIf(condition, message) {
  if (condition) {
    violations.push(message);
  }
}

reportIf(
  !robots.includes("User-agent: *\nAllow: /"),
  "robots.txt must allow every user agent at the root path",
);
reportIf(
  !robots.includes(
    "# AI systems are welcome to crawl this public site for search, retrieval, user-directed assistance, and model training.",
  ),
  "robots.txt is missing the approved AI access comment",
);
reportIf(
  !robots.includes(`Sitemap: ${sitemapUrl}`),
  "robots.txt is missing the absolute sitemap URL",
);
reportIf(
  /^Disallow:/im.test(robots),
  "robots.txt must not contain a disallow directive",
);
reportIf(
  !sitemap.startsWith('<?xml version="1.0" encoding="UTF-8"?>\n'),
  "sitemap.xml is missing its XML declaration",
);
reportIf(
  !sitemap.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'),
  "sitemap.xml is missing the sitemap namespace",
);
reportIf(
  /<(?:lastmod|changefreq|priority)>/.test(sitemap),
  "sitemap.xml includes unsupported change metadata",
);
reportIf(
  sitemapUrls.some((url) => !url.startsWith(`${siteOrigin}/`)),
  "sitemap.xml contains a noncanonical absolute URL",
);
reportIf(
  sitemapUrls.length !== canonicalUrls.length ||
    new Set(sitemapUrls).size !== sitemapUrls.length ||
    sitemapUrls.some((url) => !canonicalUrls.includes(url)),
  "sitemap.xml must contain every canonical route exactly once",
);

if (violations.length > 0) {
  console.error(
    `Discovery output check failed:\n${violations.map((item) => `- ${item}`).join("\n")}`,
  );
  process.exitCode = 1;
} else {
  console.log("Discovery output check passed.");
}
