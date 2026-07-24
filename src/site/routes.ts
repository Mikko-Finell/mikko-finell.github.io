export const siteRoutes = {
  cv: {
    href: "/",
    label: "CV",
  },
  methodology: {
    href: "/methodology/",
    label: "Methodology",
  },
  edupower: {
    href: "/work/edupower/",
    label: "Edupower",
  },
  tealab: {
    href: "/work/tealab/",
    label: "Tealab",
  },
} as const;

export type SiteRouteId = keyof typeof siteRoutes;

export const primaryNavigation = [
  "cv",
  "methodology",
  "edupower",
  "tealab",
] as const satisfies readonly SiteRouteId[];
