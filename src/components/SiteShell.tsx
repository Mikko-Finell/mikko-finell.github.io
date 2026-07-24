import type { ReactNode } from "react";
import type { PageSection } from "../site/markdown";
import type { SiteRouteId } from "../site/routes";
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
      <SiteHeader currentPage={currentPage} pageSections={pageSections} />
      <main>
        <div className="site-main__content">{children}</div>
      </main>
    </>
  );
}
