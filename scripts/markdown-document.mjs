import { valueToEstree } from "estree-util-value-to-estree";
import { toText } from "hast-util-to-text";
import { visit } from "unist-util-visit";

const metadataExportName = "documentMetadata";

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

    if (titleIndex !== 0) {
      throw new Error(`${sourceName} must begin with its h1`);
    }

    if (!summaryNode || summaryNode.tagName !== "p") {
      throw new Error(
        `${sourceName} must use the first paragraph after its h1 as its summary`,
      );
    }

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
