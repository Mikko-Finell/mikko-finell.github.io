import { createProcessor } from "@mdx-js/mdx";
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { valueToEstree } from "estree-util-value-to-estree";
import { toText } from "hast-util-to-text";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";

const metadataExportName = "documentMetadata";
const metadataQuery = "?metadata";
const virtualMetadataModulePrefix = "\0document-metadata:";

function documentMdxOptions() {
  return {
    rehypePlugins: [rehypeSlug, rehypeDocumentMetadata],
    remarkPlugins: [remarkGfm],
  };
}

export function rehypeDocumentMetadata() {
  return (tree, file) => {
    const topLevelElements = tree.children.filter(
      (node) => node.type === "element",
    );
    const titleNodes = topLevelElements.filter(
      (node) => node.tagName === "h1",
    );
    const sourceName = file.path || "Markdown document";

    if (titleNodes.length !== 1) {
      throw new Error(`${sourceName} must contain exactly one top-level h1`);
    }

    const titleNode = titleNodes[0];
    const titleIndex = topLevelElements.indexOf(titleNode);
    const summaryNode = topLevelElements[titleIndex + 1];
    const openingHighlightsNode = topLevelElements[titleIndex + 2];

    if (titleIndex !== 0) {
      throw new Error(`${sourceName} must begin with its h1`);
    }

    if (!summaryNode || summaryNode.tagName !== "p") {
      throw new Error(
        `${sourceName} must use the first paragraph after its h1 as its summary`,
      );
    }

    const openingHighlights =
      openingHighlightsNode?.tagName === "ul"
        ? openingHighlightsNode.children
            .filter((node) => node.type === "element" && node.tagName === "li")
            .map((node) => toText(node).trim())
        : [];

    const headings = [];

    visit(tree, "element", (node) => {
      if (node.tagName !== "h2") {
        return;
      }

      const id = node.properties?.id;

      if (typeof id !== "string") {
        throw new Error(`${sourceName} contains an h2 without a generated id`);
      }

      headings.push({
        id,
        label: toText(node).trim(),
      });
    });

    if (headings.length === 0) {
      throw new Error(`${sourceName} must contain at least one h2 section`);
    }

    file.data.documentMetadata = {
      headings,
      openingHighlights,
      summary: toText(summaryNode).trim(),
      title: toText(titleNode).trim(),
    };
  };
}

export function recmaExportDocumentMetadata() {
  return (tree, file) => {
    const metadata = file.data.documentMetadata;

    if (!metadata) {
      throw new Error("Markdown document metadata was not generated");
    }

    tree.body.push({
      type: "ExportNamedDeclaration",
      declaration: {
        type: "VariableDeclaration",
        declarations: [
          {
            type: "VariableDeclarator",
            id: { type: "Identifier", name: metadataExportName },
            init: valueToEstree(metadata),
          },
        ],
        kind: "const",
      },
      specifiers: [],
      source: null,
    });
  };
}

export function createDocumentMetadataPlugin() {
  return {
    name: "document-metadata",
    enforce: "pre",
    resolveId(source, importer) {
      if (!source.endsWith(metadataQuery) || !importer) {
        return null;
      }

      const sourcePath = source.slice(0, -metadataQuery.length);
      return `${virtualMetadataModulePrefix}${resolve(dirname(importer), sourcePath)}`;
    },
    async load(id) {
      if (!id.startsWith(virtualMetadataModulePrefix)) {
        return null;
      }

      const sourcePath = id.slice(virtualMetadataModulePrefix.length);
      const source = await readFile(sourcePath, "utf8");
      const file = await createProcessor(documentMdxOptions()).process({
        path: sourcePath,
        value: source,
      });
      const metadata = file.data.documentMetadata;

      if (!metadata) {
        throw new Error("Markdown document metadata was not generated");
      }

      return `export default ${JSON.stringify(metadata)};`;
    },
  };
}
