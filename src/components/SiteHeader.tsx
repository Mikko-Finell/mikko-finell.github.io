import { cvContent } from "../content/cv";
import { Heading } from "../ui/Heading";
import { Inline } from "../ui/Inline";
import { Link } from "../ui/Link";
import { Stack } from "../ui/Stack";

export function SiteHeader() {
  const { identity } = cvContent;

  return (
    <header className="site-header">
      <Stack gap="large">
        <Inline gap="medium">
          <Stack gap="small">
            <Heading level={1} size="title">
              {identity.name}
            </Heading>
            <p>{identity.title}</p>
          </Stack>
          <Inline gap="small">
            <p className="site-header__facts">{identity.location}</p>
            <p className="site-header__facts">{identity.workEligibility}</p>
            <p className="site-header__facts">{identity.workPreference}</p>
          </Inline>
        </Inline>
        <nav aria-label="Primary" className="site-nav">
          <ul className="site-nav__list">
            <li>
              <Link href="#introduction" variant="navigation">
                Introduction
              </Link>
            </li>
            <li>
              <Link href="#capabilities" variant="navigation">
                Capabilities
              </Link>
            </li>
            <li>
              <Link href="#experience" variant="navigation">
                Experience
              </Link>
            </li>
          </ul>
        </nav>
      </Stack>
    </header>
  );
}
