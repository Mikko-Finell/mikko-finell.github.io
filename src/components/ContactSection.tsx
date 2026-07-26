import { cvContent } from "../content/cv";
import { Card } from "../ui/Card";
import { Heading } from "../ui/Heading";
import { Link } from "../ui/Link";
import { Section } from "../ui/Section";
import { Stack } from "../ui/Stack";

const headingId = "contact-heading";

export function ContactSection() {
  const availabilityHeadingId = "contact-availability-heading";
  const linksHeadingId = "contact-links-heading";

  return (
    <Section id="contact" labelledBy={headingId}>
      <Stack gap="large">
        <Heading id={headingId} level={2} size="section">
          Contact
        </Heading>
        <Stack gap="large">
          <Card labelledBy={availabilityHeadingId}>
            <Stack gap="medium">
              <Heading id={availabilityHeadingId} level={3} size="subsection">
                Availability
              </Heading>
              <ul
                aria-labelledby={availabilityHeadingId}
                className="document-list"
              >
                {cvContent.contact.availability.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Stack>
          </Card>
          <Card labelledBy={linksHeadingId}>
            <Stack gap="medium">
              <Heading id={linksHeadingId} level={3} size="subsection">
                Contact information and external links
              </Heading>
              <ul aria-labelledby={linksHeadingId} className="document-list">
                {cvContent.contact.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      rel={
                        "relationship" in link ? link.relationship : undefined
                      }
                    >
                      {link.label}
                    </Link>
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
