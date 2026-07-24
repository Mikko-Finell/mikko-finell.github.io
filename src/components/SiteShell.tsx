import type { ReactNode } from "react";
import type { SiteRouteId } from "../site/routes";
import { SiteHeader } from "./SiteHeader";

type SiteShellProps = {
  children: ReactNode;
  currentPage: SiteRouteId;
};

export function SiteShell({ children, currentPage }: SiteShellProps) {
  return (
    <>
      <SiteHeader currentPage={currentPage} />
      <main>{children}</main>
    </>
  );
}
