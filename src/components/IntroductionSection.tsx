import { cvContent } from "../content/cv";
import { Heading } from "../ui/Heading";
import { Section } from "../ui/Section";
import { Stack } from "../ui/Stack";
import { Paragraphs } from "./Paragraphs";

const headingId = "introduction-heading";

export function IntroductionSection() {
  return (
    <Section id="introduction" labelledBy={headingId}>
      <Stack gap="medium">
        <Heading id={headingId} level={2} size="section">
          Introduction
        </Heading>
        <Paragraphs paragraphs={cvContent.introduction} />
      </Stack>
    </Section>
  );
}
