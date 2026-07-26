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

  for (const [routeId, route] of Object.entries(siteRoutes)) {
    const pagePath = outputPath(route.href);
    const document = await readFile(pagePath, "utf8");
    const pageMarkup = renderToString(getStaticPage(routeId));

    if (!emptyRootPattern.test(document)) {
      throw new Error(`${pagePath} does not contain an empty application root`);
    }

    await writeFile(
      pagePath,
      document.replace(emptyRootPattern, `<div id="root">${pageMarkup}</div>`),
    );
  }
} finally {
  await server.close();
}
