import { cvContent } from "./cv";
import type { WorkProfileContent } from "./types";

const { experience, identity } = cvContent;

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
    languages: identity.languages,
  },
  targetRoles: {
    primary: "AI-First Software Architect / Full-Stack Developer",
    secondary: ["Tech Lead", "AI Integration Specialist", "AI Consultant"],
    excluded: [
      "Mobile app development",
      "Roles requiring heavy Microsoft tooling or ecosystems, including C# and VBA",
    ],
  },
  capabilities: {
    primary: [
      "Operational software development from business requirements through design, implementation, deployment, and support",
    ],
    supporting: [
      "Multi-tenant SaaS platform development for internal business applications and AI-assisted tools",
      "AI/LLM integration in operational applications",
    ],
  },
  technologySignals: {
    search: [
      "Python",
      "JavaScript",
      "FastAPI",
      "Rust",
      "Go",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Docker Compose",
      "Backend web and API development",
      "Relational databases and data modelling",
      "Internal business applications, CRM, and workflow systems",
      "Frontend web applications and UI/interaction design",
      "Third-party integrations and data migration",
      "Authentication, roles and permissions, tenancy, and administration",
      "Asynchronous jobs, background workers, and operational tooling",
      "Containerized deployment and production support",
      "AI/LLM features embedded in applications",
      "Structured document and report-generation workflows",
      "Technical leadership and architecture responsibility",
    ],
    context: ["Django", "Vue"],
  },
  workPreferences: {
    remoteOnly: true,
    workingHourRegions: ["Finland", "Nordics", "EU"],
    engagementTypes: "unrestricted",
    commitmentDuration: "unrestricted",
    compensation: "not-disclosed",
  },
  evidenceReferences: experience.flatMap((entry) =>
    (entry.links ?? []).map((link) => ({
      label: link.label,
      href: link.href,
    })),
  ),
} as const satisfies WorkProfileContent;
