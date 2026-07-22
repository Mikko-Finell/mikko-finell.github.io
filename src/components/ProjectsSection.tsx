import { cvContent } from "../content/cv";
import { Heading } from "../ui/Heading";
import { Section } from "../ui/Section";
import { Stack } from "../ui/Stack";
import { ProjectCard } from "./ProjectCard";

const headingId = "projects-heading";

export function ProjectsSection() {
  return (
    <Section id="projects" labelledBy={headingId}>
      <Stack gap="large">
        <Heading id={headingId} level={2} size="section">
          Selected projects
        </Heading>
        <Stack gap="large">
          {cvContent.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </Stack>
      </Stack>
    </Section>
  );
}
