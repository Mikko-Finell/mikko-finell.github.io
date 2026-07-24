import type { Experience } from "../content/types";
import { Card } from "../ui/Card";
import { Heading } from "../ui/Heading";
import { Inline } from "../ui/Inline";
import { Link } from "../ui/Link";
import { Stack } from "../ui/Stack";
import { Paragraphs } from "./Paragraphs";

type ExperienceCardProps = {
  experience: Experience;
};

export function ExperienceCard({ experience }: ExperienceCardProps) {
  const headingId = `experience-${experience.id}-heading`;

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

        <Paragraphs paragraphs={experience.summary} />

        <ul
          aria-label={`Highlights for ${experience.organization}`}
          className="document-list"
        >
          {experience.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
        {experience.links ? (
          <ul className="document-links" data-print-hidden>
            {experience.links.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        ) : null}
      </Stack>
    </Card>
  );
}
