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
  const { siteRoutes } = await server.ssrLoadModule("/src/site/routes.ts");
  const { faviconPath, routeMetadata, themeColors } =
    await server.ssrLoadModule("/src/site/metadata.ts");

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
} finally {
  await server.close();
}
