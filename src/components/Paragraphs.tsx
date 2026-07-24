type ParagraphsProps = {
  paragraphs: readonly string[];
};

export function Paragraphs({ paragraphs }: ParagraphsProps) {
  return (
    <div className="document-prose">
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}
