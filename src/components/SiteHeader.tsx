import { cvContent } from "../content/cv";
import type { PageSection } from "../site/markdown";
import {
  primaryNavigation,
  siteRoutes,
  type SiteRouteId,
} from "../site/routes";
import { Button } from "../ui/Button";
import { Heading } from "../ui/Heading";
import { Inline } from "../ui/Inline";
import { Link } from "../ui/Link";
import { Stack } from "../ui/Stack";
import { ThemeControls } from "../ui/ThemeControls";

type SiteHeaderProps = {
  currentPage: SiteRouteId;
  pageSections?: readonly PageSection[] | undefined;
};

export function SiteHeader({ currentPage, pageSections }: SiteHeaderProps) {
  const { contact, identity } = cvContent;
  const isCv = currentPage === "cv";

  return (
    <header className="site-header">
      <Stack gap="large">
        <Inline gap="medium">
          <Stack gap="small">
            {isCv ? (
              <Heading level={1} size="title">
                {identity.name}
              </Heading>
            ) : (
              <Link href={siteRoutes.cv.href} variant="identity">
                {identity.name}
              </Link>
            )}
            <p>{identity.title}</p>
          </Stack>
          <Inline gap="small">
            <p className="site-header__facts">{identity.location}</p>
            <p className="site-header__facts">{identity.workEligibility}</p>
            <p className="site-header__facts">{identity.workPreference}</p>
            <div className="site-header__contact-links">
              <Inline gap="small">
                {contact.links.map((link) => (
                  <Link href={link.href} key={link.href}>
                    {link.label}
                  </Link>
                ))}
              </Inline>
            </div>
          </Inline>
        </Inline>
        <nav aria-label="Primary" className="site-nav" data-print-hidden>
          <ul className="site-nav__list">
            {primaryNavigation.map((routeId) => {
              const route = siteRoutes[routeId];

              return (
                <li key={routeId}>
                  <Link
                    aria-current={routeId === currentPage ? "page" : undefined}
                    data-site-route
                    href={route.href}
                    variant="navigation"
                  >
                    {route.label}
                  </Link>
                  {routeId === currentPage && pageSections?.length ? (
                    <ul
                      aria-label={`${route.label} sections`}
                      className="site-nav__sections"
                    >
                      {pageSections.map((section, index) => (
                        <li key={section.id}>
                          <Link
                            data-page-section
                            href={`#${section.id}`}
                            variant="section-navigation"
                          >
                            <span aria-hidden="true" className="site-nav__tree">
                              {index === pageSections.length - 1 ? "└─" : "├─"}
                            </span>
                            <span>{section.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="site-header__controls" data-print-hidden>
          <ThemeControls />
          {isCv ? (
            <Button data-print-hidden onClick={() => window.print()}>
              Print / Save as PDF
            </Button>
          ) : null}
        </div>
      </Stack>
    </header>
  );
}
