# Work Profile worksheet

Use this worksheet to supply the profile-specific decisions that a job-search
agent cannot safely infer from the CV. The resulting Work Profile should remain
short, structured, and evidence-linked; the CV and article pages remain the
source for detailed history.

Leave an item blank when it is not an approved part of the profile. Do not use
this worksheet to turn every past technology, project, or task into a current
capability.

## Provisional population

The entries below are populated only from the current canonical CV and its
supporting articles. `provisional` marks a classification that is useful for
review but is not stated as a preference in those sources.

## 1. Target roles

List the roles that an agent should actively search for and rank them.

| Priority | Role title | Include only when | Notes |
| --- | --- | --- | --- |
| primary | AI-First Software Architect / Full-Stack Developer |  | Sole primary target role. |
| secondary | Tech Lead |  |  |
| secondary | AI Integration Specialist |  |  |
| secondary | AI Consultant |  |  |

List role titles that should not be recommended, if any.

| Role or role family | Reason or condition |
| --- | --- |
| Mobile app development | Exclude. |
| Roles requiring heavy Microsoft tooling or ecosystems | Exclude, including C# and VBA. |

## 2. Primary capabilities

Enter a small number of durable areas of work. Each item should describe work
you want to do now, not merely a technology you have used. Add the most useful
existing evidence link for an agent to inspect.

| Capability | Priority (primary/supporting) | Evidence URL or CV section | Boundaries or qualifications |
| --- | --- | --- | --- |
| Operational software development from business requirements through design, implementation, deployment, and support. | primary | CV introduction; https://mikko-finell.github.io/work/edupower/ | Includes database and data-model design, backend and frontend development, UI and interaction design, data migration, integrations, deployment, production support, and incident handling. |
| A multi-tenant SaaS platform for internal business applications and AI-assisted tools. | supporting | https://mikko-finell.github.io/work/tealab/ | Tealab was developed independently from November 2025 to May 2026; not presented as a SaaS product-building specialty. |
| AI/LLM integration in operational applications. | supporting | https://mikko-finell.github.io/work/edupower/; https://mikko-finell.github.io/work/tealab/ | Includes LLM-assisted CRM functions and an AI-assisted report writer; AI-first development is the current working method. |

## 3. Technology context

List technologies only when they improve job matching. Mark whether the
technology is a search signal, a useful supporting match, or historical
context. Do not treat this as a completeness inventory.

| Technology or technology group | Classification (search/supporting/context) | Related capability | Qualification, if needed |
| --- | --- | --- | --- |
| Python | search | Operational software development |  |
| JavaScript | search | Operational software development |  |
| Django, Vue | context | Operational software development | Used while maintaining and extending Edulog. |
| Go, React, TypeScript, PostgreSQL, Docker Compose | search | Multi-tenant SaaS platform | Tealab technical stack. |

## 4. Work and engagement conditions

Separate non-negotiable constraints from preferences. Existing availability
statements in `src/content/cv.ts` can be retained, revised, or replaced here
only after approval.

### Hard constraints

| Constraint | Exact condition |
| --- | --- |
| location and remote work | Hard requirement: remote only. |
| working hours or time zone | Hard requirement: Finnish, Nordic and EU working hours. |
| engagement or employment type | No limitations. |
| minimum or maximum commitment | No limitations. |
| compensation, if public in the artifact | Omit. |
| other |  |

### Preferences

| Preference | Strength (strong/moderate) | Notes |
| --- | --- | --- |
| Full-time, part-time, project-scoped contractor work, and other arrangements. |  | No limitation on engagement or employment type. |

## 5. Languages and geography

Confirm which existing language and location facts should be available to a
matching agent, and add any approval conditions for them.

| Item | Include? | Qualification |
| --- | --- | --- |
| location | yes | Finland |
| EU work eligibility | yes | EU work eligibility |
| Swedish | yes | native |
| English | yes | full professional proficiency |
| Finnish | yes | basic |
| other language or geography |  |  |
