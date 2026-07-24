/// <reference types="vite/client" />

declare module "*.md" {
  import type { MDXProps } from "mdx/types.js";
  import type { ComponentType } from "react";
  import type { MarkdownDocumentMetadata } from "./site/markdown";

  export const documentMetadata: MarkdownDocumentMetadata;

  const MarkdownContent: ComponentType<MDXProps>;
  export default MarkdownContent;
}
