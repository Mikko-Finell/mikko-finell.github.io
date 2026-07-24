import { Stack } from "../ui/Stack";

type ParagraphsProps = {
  paragraphs: readonly string[];
};

export function Paragraphs({ paragraphs }: ParagraphsProps) {
  return (
    <Stack gap="paragraph">
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </Stack>
  );
}
