import type { MDXComponents, MDXProps } from "mdx/types.js";
import type { ComponentType, ReactNode } from "react";
import { Heading } from "../ui/Heading";
import { Link } from "../ui/Link";

function MarkdownRoot({ children }: { children?: ReactNode }) {
  return <div className="document-prose markdown-document">{children}</div>;
}

const markdownComponents: MDXComponents = {
  wrapper: MarkdownRoot,
  h1: ({ children, id }) => (
    <Heading id={id} level={1} size="title">
      {children}
    </Heading>
  ),
  h2: ({ children, id }) => (
    <Heading id={id} level={2} size="section">
      {children}
    </Heading>
  ),
  h3: ({ children, id }) => (
    <Heading id={id} level={3} size="subsection">
      {children}
    </Heading>
  ),
  a: ({ children, href }) => <Link href={href}>{children}</Link>,
  ol: ({ children }) => <ol className="document-list">{children}</ol>,
  ul: ({ children }) => <ul className="document-list">{children}</ul>,
};

type MarkdownDocumentProps = {
  content: ComponentType<MDXProps>;
};

export function MarkdownDocument({ content: Content }: MarkdownDocumentProps) {
  return <Content components={markdownComponents} />;
}
