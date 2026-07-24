export type PageSection = {
  id: string;
  label: string;
};

export type MarkdownDocumentMetadata = {
  title: string;
  summary: string;
  headings: readonly PageSection[];
};
