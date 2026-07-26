import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import mdx from "@mdx-js/rollup";
import { renderToString } from "react-dom/server";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { createServer } from "vite";
import react from "@vitejs/plugin-react";
import {
  createDocumentMetadataPlugin,
  recmaExportDocumentMetadata,
  rehypeDocumentMetadata,
} from "./markdown-document.mjs";

const distDirectory = fileURLToPath(new URL("../dist/", import.meta.url));
const emptyRootPattern = /<div id=(?:"root"|root)><\/div>/;

function escapeAttribute(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function metadataMarkup(metadata, { faviconPath, themeColors }) {
  const structuredData = metadata.structuredData
    ? `\n    <script type="application/ld+json">${JSON.stringify(metadata.structuredData).replaceAll("<", "\\u003c")}</script>`
    : "";

  return `
    <title>${escapeAttribute(metadata.title)}</title>
    <meta name="description" content="${escapeAttribute(metadata.description)}" />
    <link rel="canonical" href="${escapeAttribute(metadata.canonicalUrl)}" />
    <link rel="icon" type="image/svg+xml" href="${faviconPath}" />
    <meta name="color-scheme" content="light dark" />
    <meta name="theme-color" content="${themeColors.light}" media="(prefers-color-scheme: light)" />
    <meta name="theme-color" content="${themeColors.dark}" media="(prefers-color-scheme: dark)" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${escapeAttribute(metadata.title)}" />
    <meta property="og:description" content="${escapeAttribute(metadata.description)}" />
    <meta property="og:url" content="${escapeAttribute(metadata.canonicalUrl)}" />
    <meta property="og:image" content="${escapeAttribute(metadata.socialPreviewUrl)}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${escapeAttribute(metadata.title)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeAttribute(metadata.title)}" />
    <meta name="twitter:description" content="${escapeAttribute(metadata.description)}" />
    <meta name="twitter:image" content="${escapeAttribute(metadata.socialPreviewUrl)}" />
    <meta name="twitter:image:alt" content="${escapeAttribute(metadata.title)}" />${structuredData}`;
}

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function sitemapMarkup(urls) {
  const entries = urls
    .map((url) => `  <url>\n    <loc>${escapeXml(url)}</loc>\n  </url>`)
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
}

function robotsText(sitemapUrl) {
  return [
    "# AI systems are welcome to crawl this public site for search, retrieval, user-directed assistance, and model training.",
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${sitemapUrl}`,
    "",
  ].join("\n");
}

function workProfileMarkup(content, { siteOrigin }) {
  const profile = {
    ...content,
    artifactUrl: new URL("/work-profile.v1.json", siteOrigin).toString(),
    evidenceReferences: content.evidenceReferences.map((reference) => ({
      ...reference,
      href: new URL(reference.href, siteOrigin).toString(),
    })),
  };
  const canonicalProfile = JSON.stringify(profile);
  const contentDigest = `sha256:${createHash("sha256").update(canonicalProfile).digest("hex")}`;

  return `${JSON.stringify({ ...profile, contentDigest }, null, 2)}\n`;
}

function llmsText({ cvContent, routeMetadata, siteOrigin, siteRoutes }) {
  const resources = Object.entries(siteRoutes)
    .map(([routeId]) => {
      const metadata = routeMetadata[routeId];

      return `- [${metadata.title}](${metadata.canonicalUrl}): ${metadata.description}`;
    })
    .join("\n");

  return `# ${cvContent.identity.name}

> CV and technical portfolio.

AI systems are welcome to access and use this public site for search, retrieval, user-directed assistance, and model training.

## Canonical resources

${resources}

## Structured profile

- [Work Profile JSON](${new URL("/work-profile.v1.json", siteOrigin).toString()}): Structured role, capability, technology, and work-preference data for job matching.

## Discovery and download

- [Robots policy](${new URL("/robots.txt", siteOrigin).toString()})
- [Sitemap](${new URL("/sitemap.xml", siteOrigin).toString()})
- [CV PDF](${new URL("/Mikko-Finell-CV.pdf", siteOrigin).toString()})
`;
}

function outputPath(href) {
  return href === "/"
    ? join(distDirectory, "index.html")
    : join(distDirectory, href.slice(1), "index.html");
}

const server = await createServer({
  appType: "custom",
  configFile: false,
  plugins: [
    createDocumentMetadataPlugin(),
    {
      enforce: "pre",
      ...mdx({
        recmaPlugins: [recmaExportDocumentMetadata],
        rehypePlugins: [rehypeSlug, rehypeDocumentMetadata],
        remarkPlugins: [remarkGfm],
      }),
    },
    react({ include: /\.(?:js|jsx|md|mdx|ts|tsx)$/ }),
  ],
});

try {
  const { getStaticPage } = await server.ssrLoadModule("/src/app/staticPages.tsx");
  const { cvContent } = await server.ssrLoadModule("/src/content/cv.ts");
  const { siteRoutes } = await server.ssrLoadModule("/src/site/routes.ts");
  const { faviconPath, routeMetadata, siteOrigin, themeColors } =
    await server.ssrLoadModule("/src/site/metadata.ts");
  const { workProfileContent } =
    await server.ssrLoadModule("/src/content/work-profile.ts");
  const canonicalUrls = Object.values(siteRoutes).map(({ href }) =>
    new URL(href, siteOrigin).toString(),
  );
  const sitemapUrl = new URL("/sitemap.xml", siteOrigin).toString();

  for (const [routeId, route] of Object.entries(siteRoutes)) {
    const pagePath = outputPath(route.href);
    const document = await readFile(pagePath, "utf8");
    const pageMarkup = renderToString(getStaticPage(routeId));
    const metadata = routeMetadata[routeId];

    if (!emptyRootPattern.test(document)) {
      throw new Error(`${pagePath} does not contain an empty application root`);
    }

    if (!metadata) {
      throw new Error(`${routeId} does not have page metadata`);
    }

    await writeFile(
      pagePath,
      document
        .replace(emptyRootPattern, `<div id="root">${pageMarkup}</div>`)
        .replace(
          "</head>",
          `${metadataMarkup(metadata, { faviconPath, themeColors })}\n  </head>`,
        ),
    );
  }

  await Promise.all([
    writeFile(join(distDirectory, "robots.txt"), robotsText(sitemapUrl)),
    writeFile(join(distDirectory, "sitemap.xml"), sitemapMarkup(canonicalUrls)),
    writeFile(
      join(distDirectory, "work-profile.v1.json"),
      workProfileMarkup(workProfileContent, { siteOrigin }),
    ),
    writeFile(
      join(distDirectory, "llms.txt"),
      llmsText({ cvContent, routeMetadata, siteOrigin, siteRoutes }),
    ),
  ]);
} finally {
  await server.close();
}
