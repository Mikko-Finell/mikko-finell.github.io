import { cvContent } from "../content/cv";
import edupowerDocumentMetadata from "../content/edupower.md?metadata";
import methodologyDocumentMetadata from "../content/methodology.md?metadata";
import tealabDocumentMetadata from "../content/tealab.md?metadata";
import { siteRoutes, type SiteRouteId } from "./routes";

export const siteOrigin = "https://mikko-finell.github.io";
export const faviconPath = "/favicon.svg";
export const socialPreviewPath = "/social-preview.png";
export const themeColors = {
  light: "#f3efe6",
  dark: "#181715",
} as const;

type StructuredData = {
  "@context": "https://schema.org";
  "@type": "ProfilePage";
  mainEntity: {
    "@type": "Person";
    name: string;
    jobTitle: string;
    homeLocation: {
      "@type": "Place";
      name: string;
    };
    sameAs: readonly string[];
  };
};

export type PageMetadata = {
  title: string;
  description: string;
  canonicalUrl: string;
  socialPreviewUrl: string;
  structuredData?: StructuredData;
};

function absoluteUrl(path: string) {
  return new URL(path, siteOrigin).toString();
}

function pageMetadata(title: string, description: string, href: string) {
  return {
    title,
    description,
    canonicalUrl: absoluteUrl(href),
    socialPreviewUrl: absoluteUrl(socialPreviewPath),
  };
}

const { identity } = cvContent;
const profileTitle = `${identity.name} — ${siteRoutes.cv.label}`;

export const routeMetadata = {
  cv: {
    ...pageMetadata(
      profileTitle,
      cvContent.introduction[0],
      siteRoutes.cv.href,
    ),
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      mainEntity: {
        "@type": "Person",
        name: identity.name,
        jobTitle: identity.title,
        homeLocation: {
          "@type": "Place",
          name: identity.location,
        },
        sameAs: cvContent.contact.links
          .filter(
            (link) => "relationship" in link && link.relationship === "me",
          )
          .map((link) => link.href),
      },
    },
  },
  methodology: pageMetadata(
    `${identity.name} — ${methodologyDocumentMetadata.title}`,
    methodologyDocumentMetadata.summary,
    siteRoutes.methodology.href,
  ),
  edupower: pageMetadata(
    `${identity.name} — ${edupowerDocumentMetadata.title}`,
    edupowerDocumentMetadata.summary,
    siteRoutes.edupower.href,
  ),
  tealab: pageMetadata(
    `${identity.name} — ${tealabDocumentMetadata.title}`,
    tealabDocumentMetadata.summary,
    siteRoutes.tealab.href,
  ),
} as const satisfies Record<SiteRouteId, PageMetadata>;
