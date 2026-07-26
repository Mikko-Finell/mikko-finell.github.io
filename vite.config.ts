import mdx from "@mdx-js/rollup";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import {
  createDocumentMetadataPlugin,
  recmaExportDocumentMetadata,
  rehypeDocumentMetadata,
} from "./scripts/markdown-document.mjs";

const entryPath = (path: string) => new URL(path, import.meta.url).pathname;

export default defineConfig({
  base: "/",
  build: {
    rollupOptions: {
      input: {
        cv: entryPath("index.html"),
        edupower: entryPath("work/edupower/index.html"),
        methodology: entryPath("methodology/index.html"),
        tealab: entryPath("work/tealab/index.html"),
      },
    },
  },
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
