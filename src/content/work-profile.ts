import { cvContent } from "./cv";

const { contact, experience, identity } = cvContent;

export const workProfileContent = {
  schema: "work-profile/v1",
  profileRevision: 1,
  provenance: {
    canonicalContent: ["src/content/cv.ts", "src/content/work-profile.ts"],
  },
  identity: {
    name: identity.name,
    title: identity.title,
    location: identity.location,
    workEligibility: identity.workEligibility,
  },
  compatibility: {
    availability: contact.availability,
    primaryCapabilities: [],
    preferredWork: [identity.workPreference],
    engagementConstraints: [],
  },
  evidenceReferences: experience.flatMap((entry) =>
    (entry.links ?? []).map((link) => ({
      label: link.label,
      href: link.href,
    })),
  ),
} as const;
