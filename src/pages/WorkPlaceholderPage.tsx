import { SiteShell } from "../components/SiteShell";
import { siteRoutes, type SiteRouteId } from "../site/routes";
import { Heading } from "../ui/Heading";
import { Link } from "../ui/Link";
import { Stack } from "../ui/Stack";

type WorkPlaceholderPageProps = {
  currentPage: Extract<SiteRouteId, "edupower" | "tealab">;
  title: string;
};

export function WorkPlaceholderPage({
  currentPage,
  title,
}: WorkPlaceholderPageProps) {
  return (
    <SiteShell currentPage={currentPage}>
      <Stack gap="large">
        <Heading level={1} size="title">
          {title}
        </Heading>
        <p>Case study in preparation.</p>
        <div data-print-hidden>
          <Link href={siteRoutes.cv.href}>Return to the CV</Link>
        </div>
      </Stack>
    </SiteShell>
  );
}
