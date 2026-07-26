import { documentMetadata as edupowerDocumentMetadata } from "./edupower.md";
import { documentMetadata as tealabDocumentMetadata } from "./tealab.md";
import type { CvContent } from "./types";
import { siteRoutes } from "../site/routes";

export const cvContent = {
  identity: {
    name: "Mikko Finell",
    title: "AI-First Software Architect / Full-Stack Developer",
    location: "Finland",
    workEligibility: "EU work eligibility",
    workPreference: "Remote contractor or employee",
    languages: [
      { name: "Swedish", proficiency: "native" },
      { name: "English", proficiency: "full professional proficiency" },
      { name: "Finnish", proficiency: "basic" },
    ],
  },
  contact: {
    availability: [
      "Remote contractor and subcontractor work.",
      "Paid implementation trials.",
      "Bounded development projects.",
      "Longer-term development engagements.",
      "Selected full-time remote positions.",
      "Remote only. Finnish, Nordic and EU working hours.",
    ],
    links: [
      {
        label: "mikko.finell@gmail.com",
        href: "mailto:mikko.finell@gmail.com",
      },
      { label: "GitHub", href: "https://github.com/mikko-finell" },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/mikko-finell",
      },
    ],
  },
  introduction: [
    "I develop operational software from business requirements through design, implementation, deployment, and support. My work has included a daily-use CRM, internal business tools, customer applications, an AI-assisted due-diligence report writer, and a multi-tenant SaaS platform.",
    "I worked with Edupower Oy from 2020 to 2026, first as an employee and then as an independent contractor. For most of the engagement, I worked independently as the company’s only software developer.",
    "My current development process is AI-first. I use AI throughout planning, architecture, implementation, testing, and review. I define what the product or feature needs to accomplish and direct models through design proposals, critique, refinement, and task decomposition. Coding agents implement, test, investigate, review, and correct the work. I evaluate the resulting plans, designs, applications, and completed results.",
  ],
  experience: [
    {
      id: "edupower",
      organization: "Edupower Oy",
      role: "Software Developer / Project Engineer / Independent Contractor",
      context: "Employee 2020–2022 · Independent contractor 2022–2026",
      dates: {
        start: { year: 2020, precision: "year" },
        end: { year: 2026, precision: "year" },
        label: "2020–2026",
      },
      summary: [edupowerDocumentMetadata.summary],
      highlights: edupowerDocumentMetadata.openingHighlights,
      links: [
        {
          label: "Read the full Edupower account →",
          href: siteRoutes.edupower.href,
        },
      ],
    },
    {
      id: "tealab",
      organization: "Tealab",
      role: "Independent application platform",
      dates: {
        start: { year: 2025, precision: "year" },
        end: null,
        // biome-ignore lint/security/noSecrets: This is a human-readable date label.
        label: "2025–present",
      },
      summary: [tealabDocumentMetadata.summary],
      highlights: tealabDocumentMetadata.openingHighlights,
      links: [
        {
          label: "Read the Tealab case study →",
          href: siteRoutes.tealab.href,
        },
      ],
    },
  ],
  education: [
    {
      institution: "Yrkeshögskolan Novia",
      program: "IT engineering studies",
      dates: {
        start: { year: 2016, precision: "year" },
        end: { year: 2020, precision: "year" },
        label: "2016–2020",
      },
      summary: [
        "Completed nearly all coursework in a four-year engineering programme on the IT track.",
      ],
      details: [
        "The degree remains incomplete because of one final course and the thesis.",
      ],
      facts: ["GPA: 4.5 / 5"],
    },
  ],
} as const satisfies CvContent;
