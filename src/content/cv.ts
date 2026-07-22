import type { CvContent } from "./types";

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
    ],
  },
  introduction: {
    summary: [
      "I design and build internal systems, business software, application platforms, data-processing systems and AI-assisted workflows.",
      "Paid software delivery since 2020. Programming since 2014.",
    ],
  },
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
      content: {
        summary: [
          "Long-term developer and primary technical owner for internal business software, customer-facing tools, data-processing utilities and AI-assisted systems.",
        ],
      },
      highlights: [
        "Built and maintained an internal Django/Vue CRM which replaced a large Excel-based sales and customer-management process and remained in operational use for several years.",
        "Designed the CRM UI and workflows around the company’s actual daily work. The interfaces were frequently praised for being logical, intuitive and compact while still exposing substantial functionality.",
        "Built company and contact management, communication history, sales funnel tracking, task handling and shared operational data.",
        "Maintained and extended the system over several years as the underlying business processes changed.",
        "Built smaller customer-facing applications and tools connected to the same business-data system.",
        "Built Jupyter-based data-processing and reporting utilities.",
        "Built an Android application connected to the underlying system.",
        "Added AI-assisted features for structured outputs, communication summaries, relationship overviews, follow-up extraction and drafting.",
        "Mentored interns.",
        "Helped colleagues use AI tools for practical software and business work.",
      ],
      technologies: ["Django", "Vue", "JavaScript", "Jupyter", "C#/Xamarin"],
    },
    {
      id: "report-generation-system",
      organization: "AI-assisted report-generation system",
      context: "External customer project delivered through Edupower",
      dates: {
        start: { year: 2025, precision: "late-year" },
        end: { year: 2026, precision: "early-year" },
        label: "Late 2025 – early 2026",
      },
      content: {
        summary: [
          "Designed and built a system for producing expert report sections from structured inputs.",
        ],
      },
      highlights: [
        "Converted an existing expert reporting process into explicit inputs, processing stages and reviewable generated outputs.",
        "Built Python libraries and Jupyter tooling using the OpenAI API.",
        "Used structured generation instead of treating the problem as a general chatbot interface.",
        "Worked out the requirements, processing model, generation workflow, prompt structure, API behaviour, testing and delivery process.",
        "Later reused the same foundation in the web-based report writer built into Tealab.",
      ],
      technologies: ["Python", "Jupyter", "OpenAI API"],
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
      content: {
        summary: [
          "Designed and built a platform for hosting AI-enabled business applications and internal tools.",
        ],
        details: [
          "I designed the Tealab UI across the ordinary application surfaces and the less visible operational parts of the platform, including dashboards, tenant and user settings, access control, system health, application management and the report-writing workflow.",
          "Tealab is a working example of the systems I build, the interfaces I design and the AI-first development process described above.",
        ],
      },
      highlights: [
        "Go backend.",
        "TypeScript/React frontend.",
        "Python application and processing services.",
        "User and tenant management.",
        "Access control and application permissions.",
        "Application hosting.",
        "Usage and configuration mechanics.",
        "Health, administration and operational views.",
        "Background processing.",
        "API-backed application structure.",
        "Web-based report-writer application.",
        "Dockerized Linux deployment.",
      ],
      technologies: ["Go", "TypeScript/React", "Python", "Docker", "Linux"],
    },
  ],
  projects: [
    {
      id: "internal-crm",
      name: "Internal CRM",
      content: {
        summary: [
          "A custom business application used for company data, contacts, communication history, sales work, tasks and shared operational information.",
          "It replaced a spreadsheet-based process and remained in use for several years. I was its sole developer and primary technical owner.",
        ],
        details: [
          "The original Excel process did not provide a useful application structure which could simply be copied into a web UI, so I had to work out how the information related, what belonged together, which actions needed to be immediately available, how users moved between companies, contacts, communications and sales work, and how to expose all of that without turning every screen into a bloated enterprise form.",
        ],
      },
      technologies: ["Django", "Vue", "JavaScript", "SQL"],
    },
    {
      id: "report-writer",
      name: "Report writer",
      content: {
        summary: [
          "A structured AI-assisted reporting system which turns defined business inputs into report sections for human review.",
          "The first version used Python and Jupyter. The later version added a full web interface and platform integration through Tealab.",
        ],
        details: [
          "The system is built around an actual reporting process rather than a chat window. Inputs, generation stages, generated sections and human review are represented as explicit parts of the application workflow.",
        ],
      },
      technologies: ["Python", "Jupyter", "OpenAI API", "TypeScript/React"],
    },
    {
      id: "tealab-platform",
      name: "Tealab platform",
      content: {
        summary: [
          "A general application platform with backend services, a React frontend, user and tenant management, access-control surfaces, operational tooling and hosted application support.",
        ],
        details: [
          "The report writer is the first full application built on the platform, but the underlying system was designed to support multiple separately configured applications rather than becoming a report-writer codebase with some generic platform language added around it afterward.",
        ],
      },
      technologies: ["Go", "TypeScript/React", "Python", "Docker", "Linux"],
    },
  ],
  methodology: {
    delivery: {
      short:
        "My workflow methodology is AI-first. I use AI at every step from planning to implementation to testing and verification.",
      summary: [
        "My workflow methodology is AI-first. I use AI at every step from planning to implementation to testing and verification. I start by deeply planning the codebase architecture by having several frontier models adversarially duel about ideas to find the best, most robust and practical and radically innovative and accretive and cohesive ideas possible. We then iteratively refine those ideas over several rounds of critique and stress testing. The specifications which emerge from this process are then turned into roadmaps and plans which explain in detail how to convert the ideas into reality. We then turn those plans into concretely actionable implementation tasks which my agents start to work through.",
      ],
      details: [
        "Every round of implementation is followed by fresh-eyes corrective editorial code review by multiple agents. These reviews are not just there to check whether the task technically passed its tests, they look at whether the implementation actually fits the architecture, whether it introduced unnecessary complexity, whether it misunderstood the purpose of the feature, whether there are missing cases, whether the structure will remain usable as the system grows, and whether the agent solved the literal task in a way that damages the larger project.",
        "Testing policy is equally rigorous. Every invariant is covered by tests at the appropriate level whether that is unit tests, integration tests or e2e, and implementation is not considered complete because one narrow test file happens to pass. The standard finalization procedure runs the full relevant verification stack, including strict type checking, static analysis, linting, compilation where applicable, architectural checks and the test suites which can expose interactions outside the immediately changed component.",
        "My projects always use the strictest practical linting rules and every warning is mechanically treated as a hard error that must be fixed while finalizing a task before committing. On top of that we enforce architectural rules which are difficult to capture through standard linting by encoding them into scripts that are part of the same finalization procedure.",
        "I also run agents whose sole task is searching the codebase for defects. They investigate the implementation without being constrained to the feature currently under development, identify behaviour which appears wrong or structurally dangerous, write regression tests to prove the bug is real, and then fix it. Refactoring and technical-debt work is handled as explicit work rather than something we vaguely intend to return to later, and agents are regularly sent through the system to find duplicated logic, weak abstractions, obsolete compatibility layers, accidental complexity and places where the implementation has drifted away from the architecture.",
        "This is the process through which I produce software. I decide what we are trying to build, what properties it needs to have, which ideas are worth keeping, how the project should be structured, how much complexity is justified, what quality bar applies, and whether the result is actually done. The agents do most of the direct implementation, testing, investigation, review and correction work inside that process.",
        "I have used this methodology to build substantial systems in Go, TypeScript/React, Python and Rust. It also lets me work effectively in unfamiliar technologies and existing codebases because the process is based on investigation, explicit reasoning, executable verification and repeated review rather than depending on memorized framework syntax.",
      ],
    },
    applicationDesign: {
      summary: [
        "Application UI design is one of my strongest areas. I am very particular about information hierarchy, workflow structure, visual density, terminology, interaction details and whether the whole application feels logical when someone actually has to use it repeatedly. I tend to prefer compact interfaces which expose a lot of useful functionality without degenerating into clutter, but compact does not mean cramming controls together until the user has to decipher the screen.",
        "I design application UIs and operational workflows, particularly systems where the user needs access to a lot of connected information and functionality without the interface becoming confusing or physically enormous.",
      ],
      details: [
        "Current agents are often good at implementing established HTML, CSS and component patterns, but they are still not reliably capable of looking at a rendered application and deciding whether it actually looks good, whether the hierarchy is wrong, whether the page wastes half the available space, whether related controls feel disconnected, whether the interaction flow is annoying, or whether the whole thing has the visual character of a generic admin template assembled by committee. I guide that work directly through repeated visual inspection and iteration.",
        "During my time at Edupower I frequently received positive feedback specifically about the UIs I designed being logical, intuitive, compact and functional. This was not separate design work handed over to an implementation team. I worked out how the business process should map into screens and interactions and then built the systems around that.",
      ],
    },
  },
  education: [
    {
      institution: "Yrkeshögskolan Novia",
      program: "IT engineering studies",
      dates: {
        start: { year: 2016, precision: "year" },
        end: { year: 2020, precision: "year" },
        label: "2016–2020",
      },
      content: {
        summary: [
          "Completed nearly all coursework in a four-year engineering programme on the IT track.",
        ],
        details: [
          "The degree remains incomplete because of one final course and the thesis.",
        ],
      },
      facts: ["GPA: 4.5 / 5"],
    },
  ],
} as const satisfies CvContent;
