import { cvContent } from "../content/cv";
import { Heading } from "../ui/Heading";
import { Section } from "../ui/Section";
import { Stack } from "../ui/Stack";
import { ExperienceCard } from "./ExperienceCard";

const headingId = "experience-heading";

export function ExperienceSection() {
  return (
    <Section id="experience" labelledBy={headingId}>
      <Stack gap="large">
        <Heading id={headingId} level={2} size="section">
          Professional experience
        </Heading>
        <Stack gap="large">
          {cvContent.experience.map((experience) => (
            <ExperienceCard experience={experience} key={experience.id} />
          ))}
        </Stack>
      </Stack>
    </Section>
  );
}
