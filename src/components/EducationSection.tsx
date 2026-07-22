import { cvContent } from "../content/cv";
import { Card } from "../ui/Card";
import { Expandable } from "../ui/Expandable";
import { Heading } from "../ui/Heading";
import { Inline } from "../ui/Inline";
import { Section } from "../ui/Section";
import { Stack } from "../ui/Stack";

const headingId = "education-heading";

function Paragraphs({ paragraphs }: { paragraphs: readonly string[] }) {
  return (
    <Stack gap="paragraph">
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </Stack>
  );
}

export function EducationSection() {
  return (
    <Section id="education" labelledBy={headingId}>
      <Stack gap="large">
        <Heading id={headingId} level={2} size="section">
          Education and relevant background
        </Heading>
        <Stack gap="large">
          {cvContent.education.map((entry) => {
            const entryHeadingId = `education-${entry.dates.start.year}-heading`;
            const summary = <Paragraphs paragraphs={entry.content.summary} />;

            return (
              <Card key={entry.institution} labelledBy={entryHeadingId}>
                <Stack gap="medium">
                  <header>
                    <Stack gap="small">
                      <Inline align="center" gap="medium">
                        <Heading
                          id={entryHeadingId}
                          level={3}
                          size="subsection"
                        >
                          {entry.institution}
                        </Heading>
                        <p className="document-metadata">{entry.dates.label}</p>
                      </Inline>
                      <p>{entry.program}</p>
                    </Stack>
                  </header>

                  {entry.content.details ? (
                    <Expandable
                      details={
                        <Paragraphs paragraphs={entry.content.details} />
                      }
                      label={entry.institution}
                      summary={summary}
                    />
                  ) : (
                    summary
                  )}

                  <ul
                    aria-label={`Education facts for ${entry.institution}`}
                    className="document-list"
                  >
                    {entry.facts.map((fact) => (
                      <li key={fact}>{fact}</li>
                    ))}
                  </ul>
                </Stack>
              </Card>
            );
          })}
        </Stack>
      </Stack>
    </Section>
  );
}
