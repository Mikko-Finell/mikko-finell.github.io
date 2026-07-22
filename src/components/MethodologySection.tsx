import { cvContent } from "../content/cv";
import type { LayeredContent } from "../content/types";
import { Card } from "../ui/Card";
import { Expandable } from "../ui/Expandable";
import { Heading } from "../ui/Heading";
import { Section } from "../ui/Section";
import { Stack } from "../ui/Stack";

const headingId = "methodology-heading";

function Paragraphs({ paragraphs }: { paragraphs: readonly string[] }) {
  return (
    <Stack gap="small">
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </Stack>
  );
}

function MethodologyCard({
  content,
  id,
  title,
}: {
  content: LayeredContent;
  id: string;
  title: string;
}) {
  const cardHeadingId = `methodology-${id}-heading`;
  const summary = <Paragraphs paragraphs={content.summary} />;

  return (
    <Card labelledBy={cardHeadingId}>
      <Stack gap="medium">
        <Heading id={cardHeadingId} level={3} size="subsection">
          {title}
        </Heading>
        {content.details ? (
          <Expandable
            details={<Paragraphs paragraphs={content.details} />}
            label={title}
            summary={summary}
          />
        ) : (
          summary
        )}
      </Stack>
    </Card>
  );
}

export function MethodologySection() {
  const { methodology } = cvContent;
  const verificationHeadingId = "methodology-verification-heading";

  return (
    <Section id="methodology" labelledBy={headingId}>
      <Stack gap="large">
        <Heading id={headingId} level={2} size="section">
          Working methodology
        </Heading>
        <Stack gap="large">
          <MethodologyCard
            content={methodology.delivery}
            id="delivery"
            title="Delivery"
          />
          <Card labelledBy={verificationHeadingId}>
            <Stack gap="medium">
              <Heading id={verificationHeadingId} level={3} size="subsection">
                Verification
              </Heading>
              <ul
                aria-labelledby={verificationHeadingId}
                className="document-list"
              >
                {methodology.verification.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Stack>
          </Card>
          <MethodologyCard
            content={methodology.applicationDesign}
            id="application-design"
            title="Application UI design"
          />
        </Stack>
      </Stack>
    </Section>
  );
}
