import { cvContent } from "../content/cv";
import { Card } from "../ui/Card";
import { Heading } from "../ui/Heading";
import { Section } from "../ui/Section";
import { Stack } from "../ui/Stack";

const headingId = "capabilities-heading";

export function CapabilitiesSection() {
  return (
    <Section id="capabilities" labelledBy={headingId}>
      <Stack gap="large">
        <Heading id={headingId} level={2} size="section">
          Production capabilities
        </Heading>
        <div className="capabilities-grid">
          {cvContent.capabilities.map((group) => {
            const groupHeadingId = `capability-${group.id}-heading`;

            return (
              <Card key={group.id} labelledBy={groupHeadingId}>
                <Stack gap="medium">
                  <Heading id={groupHeadingId} level={3} size="subsection">
                    {group.title}
                  </Heading>
                  <ul
                    aria-labelledby={groupHeadingId}
                    className="document-list"
                  >
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </Stack>
              </Card>
            );
          })}
        </div>
      </Stack>
    </Section>
  );
}
