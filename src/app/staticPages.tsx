import type { ReactNode } from "react";
import { CvPage } from "../pages/CvPage";
import { EdupowerPage } from "../pages/EdupowerPage";
import { MethodologyPage } from "../pages/MethodologyPage";
import { TealabPage } from "../pages/TealabPage";
import type { SiteRouteId } from "../site/routes";

const staticPages = {
  cv: <CvPage />,
  methodology: <MethodologyPage />,
  edupower: <EdupowerPage />,
  tealab: <TealabPage />,
} as const satisfies Record<SiteRouteId, ReactNode>;

export function getStaticPage(routeId: SiteRouteId): ReactNode {
  return staticPages[routeId];
}
