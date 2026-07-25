import type { MDXProps } from "mdx/types.js";
import type { ComponentType } from "react";
import { MarkdownDocument } from "../components/MarkdownDocument";
import { SiteShell } from "../components/SiteShell";
import type { MarkdownDocumentMetadata } from "../site/markdown";
import type { SiteRouteId } from "../site/routes";

type ArticlePageProps = {
  content: ComponentType<MDXProps>;
  currentPage: Extract<SiteRouteId, "edupower" | "tealab">;
  metadata: MarkdownDocumentMetadata;
};

export function ArticlePage({
  content,
  currentPage,
  metadata,
}: ArticlePageProps) {
  return (
    <SiteShell currentPage={currentPage} pageSections={metadata.headings}>
      <MarkdownDocument content={content} />
    </SiteShell>
  );
}
