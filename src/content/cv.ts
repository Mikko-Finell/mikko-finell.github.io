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
    "I design and build internal systems, business software and application platforms, including both the underlying systems and the application UI. From 2020 to 2026 I was the primary technical owner for Edupower’s internal software, including a custom CRM which replaced its Excel-based sales process and stayed in operational use for several years. More recently I built Tealab, a Go, TypeScript/React and Python platform for hosting AI-enabled business applications.",
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
      summary: [
        "Long-term developer and primary technical owner for internal business software, customer-facing tools, data-processing utilities and AI-assisted systems.",
      ],
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
      summary: [
        "Designed and built a platform for hosting AI-enabled business applications and internal tools.",
      ],
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
