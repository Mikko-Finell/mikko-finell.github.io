import type { ReactNode } from "react";
import type { PageSection } from "../site/markdown";
import type { SiteRouteId } from "../site/routes";
import { Link } from "../ui/Link";
import { SiteHeader } from "./SiteHeader";

type SiteShellProps = {
  children: ReactNode;
  currentPage: SiteRouteId;
  pageSections?: readonly PageSection[] | undefined;
};

export function SiteShell({
  children,
  currentPage,
  pageSections,
}: SiteShellProps) {
  return (
    <>
      <Link data-print-hidden href="#main-content" variant="skip">
        Skip to main content
      </Link>
      <SiteHeader currentPage={currentPage} pageSections={pageSections} />
      <main id="main-content" tabIndex={-1}>
        <div className="site-main__content">{children}</div>
      </main>
    </>
  );
}
