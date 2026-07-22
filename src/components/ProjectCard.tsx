import type { Project } from "../content/types";
import { Card } from "../ui/Card";
import { Expandable } from "../ui/Expandable";
import { Heading } from "../ui/Heading";
import { Inline } from "../ui/Inline";
import { Link } from "../ui/Link";
import { Stack } from "../ui/Stack";
import { Tag } from "../ui/Tag";

type ProjectCardProps = {
  project: Project;
};

function Paragraphs({ paragraphs }: { paragraphs: readonly string[] }) {
  return (
    <Stack gap="small">
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </Stack>
  );
}

export function ProjectCard({ project }: ProjectCardProps) {
  const headingId = `project-${project.id}-heading`;
  const summary = <Paragraphs paragraphs={project.content.summary} />;

  return (
    <Card labelledBy={headingId}>
      <Stack gap="medium">
        <Heading id={headingId} level={3} size="subsection">
          {project.name}
        </Heading>

        {project.content.details ? (
          <Expandable
            details={<Paragraphs paragraphs={project.content.details} />}
            label={project.name}
            summary={summary}
          />
        ) : (
          summary
        )}

        {project.technologies ? (
          <ul
            aria-label={`Technologies used for ${project.name}`}
            className="tag-list"
          >
            {project.technologies.map((technology) => (
              <li key={technology}>
                <Tag>{technology}</Tag>
              </li>
            ))}
          </ul>
        ) : null}

        {project.links ? (
          <Inline gap="small">
            {project.links.map((link) => (
              <Link href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
          </Inline>
        ) : null}
      </Stack>
    </Card>
  );
}
