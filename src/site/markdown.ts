export type PageSection = {
  id: string;
  label: string;
};

export type MarkdownDocumentMetadata = {
  title: string;
  summary: string;
  openingHighlights: readonly string[];
  headings: readonly PageSection[];
};
