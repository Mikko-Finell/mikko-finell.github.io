import type { Experience } from "../content/types";
import { Card } from "../ui/Card";
import { Expandable } from "../ui/Expandable";
import { Heading } from "../ui/Heading";
import { Inline } from "../ui/Inline";
import { Stack } from "../ui/Stack";

type ExperienceCardProps = {
  experience: Experience;
};

function Paragraphs({ paragraphs }: { paragraphs: readonly string[] }) {
  return (
    <Stack gap="paragraph">
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </Stack>
  );
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  const headingId = `experience-${experience.id}-heading`;
  const summary = <Paragraphs paragraphs={experience.content.summary} />;

  return (
    <Card labelledBy={headingId}>
      <Stack gap="medium">
        <header>
          <Stack gap="small">
            <Inline align="center" gap="medium">
              <Heading id={headingId} level={3} size="subsection">
                {experience.organization}
              </Heading>
              <p className="document-metadata">{experience.dates.label}</p>
            </Inline>
            {experience.role ? <p>{experience.role}</p> : null}
            {experience.context ? (
              <p className="document-metadata">{experience.context}</p>
            ) : null}
          </Stack>
        </header>

        {experience.content.details ? (
          <Expandable
            details={<Paragraphs paragraphs={experience.content.details} />}
            label={experience.organization}
            summary={summary}
          />
        ) : (
          summary
        )}

        <ul
          aria-label={`Highlights for ${experience.organization}`}
          className="document-list"
        >
          {experience.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      </Stack>
    </Card>
  );
}
