import { cvContent } from "../content/cv";
import { Card } from "../ui/Card";
import { Heading } from "../ui/Heading";
import { Inline } from "../ui/Inline";
import { Section } from "../ui/Section";
import { Stack } from "../ui/Stack";
import { Paragraphs } from "./Paragraphs";

const headingId = "education-heading";
const languagesHeadingId = "languages-heading";

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

                  <Paragraphs paragraphs={entry.summary} />
                  {entry.details ? (
                    <Paragraphs paragraphs={entry.details} />
                  ) : null}

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
          <Card labelledBy={languagesHeadingId}>
            <Stack gap="medium">
              <Heading id={languagesHeadingId} level={3} size="subsection">
                Languages
              </Heading>
              <ul
                aria-labelledby={languagesHeadingId}
                className="document-list"
              >
                {cvContent.identity.languages.map((language) => (
                  <li key={language.name}>
                    {language.name}: {language.proficiency}
                  </li>
                ))}
              </ul>
            </Stack>
          </Card>
        </Stack>
      </Stack>
    </Section>
  );
}
