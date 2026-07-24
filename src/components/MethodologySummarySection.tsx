import { methodologyContent } from "../content/methodology";
import { siteRoutes } from "../site/routes";
import { Heading } from "../ui/Heading";
import { Link } from "../ui/Link";
import { Section } from "../ui/Section";
import { Stack } from "../ui/Stack";

const headingId = "methodology-heading";

export function MethodologySummarySection() {
  return (
    <Section id="methodology" labelledBy={headingId}>
      <Stack gap="medium">
        <Heading id={headingId} level={2} size="section">
          Working methodology
        </Heading>
        <p>{methodologyContent.delivery.short}</p>
        <div data-print-hidden>
          <Link href={siteRoutes.methodology.href}>
            Read the full methodology →
          </Link>
        </div>
      </Stack>
    </Section>
  );
}
