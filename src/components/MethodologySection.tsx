import { methodologyContent } from "../content/methodology";
import type { MethodologyTopic as MethodologyTopicContent } from "../content/types";
import { Heading } from "../ui/Heading";
import { Section } from "../ui/Section";
import { Stack } from "../ui/Stack";
import { Paragraphs } from "./Paragraphs";

function MethodologyTopic({
  content,
  id,
  title,
}: {
  content: MethodologyTopicContent;
  id: string;
  title: string;
}) {
  const headingId = `${id}-heading`;

  return (
    <Section id={id} labelledBy={headingId}>
      <Stack gap="medium">
        <Heading id={headingId} level={2} size="section">
          {title}
        </Heading>
        <Paragraphs paragraphs={content.summary} />
        <Paragraphs paragraphs={content.details} />
      </Stack>
    </Section>
  );
}

export function MethodologySection() {
  return (
    <Stack gap="large">
      <Heading level={1} size="title">
        Working methodology
      </Heading>
      <MethodologyTopic
        content={methodologyContent.delivery}
        id="delivery"
        title="Delivery"
      />
      <MethodologyTopic
        content={methodologyContent.applicationDesign}
        id="application-design"
        title="Application UI design"
      />
    </Stack>
  );
}
