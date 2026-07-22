# Main CV content allocation

## Status and purpose

This document maps the current canonical material to its intended editorial job. It does not approve replacement prose and does not itself become a second content source.

References such as `introduction.summary[0]` point to `src/content/cv.ts`. Short quoted fragments identify entries without copying their full wording.

This allocation is the basis for the next content-editing task. Any item marked `Mikko wording required` needs deliberately supplied text before implementation. Agents must not fill those slots by paraphrasing the source.

## Main-page jobs

The main CV has five content jobs:

1. The header identifies Mikko and keeps contact and essential working facts immediately available.
2. The introduction establishes what Mikko builds, that the production method is AI-first throughout, that substantial commercial software has been delivered, and that application UI design is a major capability.
3. Professional experience supplies evidence for those claims without attempting to restate the complete methodology.
4. Working methodology supplies enough concrete mechanism to distinguish the process from conventional AI-assisted coding. The complete procedural account belongs on a future `How I Work` surface.
5. Education, languages, availability and links supply compact background facts.

The main page does not currently need separate capabilities, technology-inventory or selected-project sections. Projects return only when they add publishable evidence or context beyond professional experience.

## Header and background facts

| Reference | Role | Allocation | Decision |
| --- | --- | --- | --- |
| `identity.name` | Background fact | Header | Keep. |
| `identity.title` | Claim and role label | Header | Keep provisionally; review separately rather than changing it during compression. |
| `identity.location` | Background fact | Header | Keep. |
| `identity.workEligibility` | Background fact | Header | Keep. |
| `identity.workPreference` | Background fact | Header | Keep; accept its compact overlap with the fuller availability facts. |
| `identity.languages[*]` | Background facts | Main CV | Render compactly. These canonical facts are currently absent from the page. |
| `contact.links[*]` | Background facts | Header and final contact area | Keep in the header. Repetition at the end is acceptable because it serves a closing contact function rather than a second claim. |
| `contact.availability[0..4]` | Background facts | Final contact area | Keep pending a separate decision about whether the engagement formats can be presented more compactly. Do not merge them through invented wording. |
| `contact.availability[5]` | Background fact | Final contact area | Keep. |

## Introduction

| Reference | Role | Allocation | Decision |
| --- | --- | --- | --- |
| `introduction.summary[0]` — “I design and build internal systems...” | Claim plus commercial evidence | Main introduction | Keep as source material. It currently carries the correct subjects but is too large for the opening allocation. `Mikko wording required`. |
| `introduction.summary[1]` — “My current workflow methodology is AI-first...” | Method claim plus planning mechanism | Main introduction and future How I Work | Retain a shorter deliberately written account on the CV; move the complete sequence to How I Work. `Mikko wording required`. |
| `introduction.summary[2]` — “Every implementation round is followed...” | Verification and defect-hunting mechanisms | Main methodology and future How I Work | Remove from the introduction. Preserve selected distinguishing mechanisms in the main methodology account and the complete material in How I Work. `Mikko wording required` for the main-page selection. |
| `introduction.summary[3]` — “Application UI design is one of the areas...” | Capability claim plus Edupower evidence | Main introduction and professional experience | Retain a compact UI-design claim in the introduction. Keep the Edupower proof with Edupower rather than repeating it here. `Mikko wording required`. |

The introduction should establish the four central facts, not narrate the complete production process. It must not reduce the workflow to “Mikko designs, agents implement,” generic AI assistance or generic quality language.

## Professional experience

### Edupower

| Reference | Role | Allocation | Decision |
| --- | --- | --- | --- |
| `experience[0].content.summary[0]` | Claim and background fact | Main CV | Keep as the entry summary. Review only after the evidence bullets have been reduced. |
| `experience[0].highlights[0]` — CRM replacing the Excel process | Evidence | Main CV | Keep. This is the strongest concise evidence of useful sustained delivery. |
| `experience[0].highlights[1]` — CRM UI and workflows | Evidence | Main CV | Keep. This is the strongest direct evidence for application UI design. |
| `experience[0].highlights[2]` — company, contact and operational functions | Evidence and system inventory | Main CV or future Evidence | Retain only if it materially explains the business system after compression; otherwise move to Evidence. |
| `experience[0].highlights[3]` — maintained and extended over several years | Evidence | Main CV | Keep. It demonstrates continuing ownership and adaptation to real business processes. |
| `experience[0].highlights[4]` — smaller connected applications | Supporting evidence | Future Evidence | Remove from the main CV unless needed to establish the breadth of the Edupower relationship. |
| `experience[0].highlights[5]` — Jupyter utilities | Implementation fact | Report-system entry or future Evidence | Remove from the Edupower highlights. The reporting work has a more specific entry. |
| `experience[0].highlights[6]` — Android application | Supporting evidence | Future Evidence | Remove from the compressed CV unless the cross-platform breadth is later shown to matter. |
| `experience[0].highlights[7]` — AI-assisted features | Evidence | Main CV or future Evidence | Retain only if the CV needs to show the transition toward AI-enabled business tooling; do not present it as proof of the mature current methodology. |
| `experience[0].highlights[8]` — mentored interns | Background fact | Main CV optional | Low priority. Keep only if mentoring is an intended hiring signal. |
| `experience[0].highlights[9]` — helped colleagues use AI tools | Background fact | Main CV optional | Low priority. Keep only if practical AI adoption is an intended engagement signal. |
| `experience[0].technologies[*]` | Implementation facts | Factual sentences and future Evidence | Retire the decorative inventory. Django and Vue remain useful in the CRM sentence; other technologies appear only where they explain actual work. |

### AI-assisted report-generation system

| Reference | Role | Allocation | Decision |
| --- | --- | --- | --- |
| `experience[1].content.summary[0]` | Claim and project definition | Main CV | Keep. |
| `experience[1].highlights[0]` — explicit inputs, stages and reviewable outputs | Evidence | Main CV | Keep. It distinguishes the system from undirected text generation. |
| `experience[1].highlights[1]` — Python, Jupyter and OpenAI API | Implementation fact | Main CV | Keep as concise technical context, preferably attached to the system description rather than treated as a separate capability. |
| `experience[1].highlights[2]` — structured generation rather than a chatbot | Evidence | Main CV | Keep. |
| `experience[1].highlights[3]` — requirements through delivery process | Claim and process inventory | Future How I Work or Evidence | Remove from the compressed experience entry unless a specific artifact supports it. |
| `experience[1].highlights[4]` — reused in Tealab | Evidence and continuity | Main CV | Keep if it remains necessary to connect the two systems. |
| `experience[1].technologies[*]` | Implementation facts | Factual sentence | Remove the unused inventory after the approved prose carries the relevant context. |

### Tealab

| Reference | Role | Allocation | Decision |
| --- | --- | --- | --- |
| `experience[2].content.summary[0]` | Claim and project definition | Main CV | Keep as source material. It requires stronger evidence around it rather than a longer inventory. |
| `experience[2].content.details[0]` — Tealab UI surfaces | Evidence | Main CV and future Evidence | Promote the essential application-UI evidence into the visible entry. `Mikko wording required` if it must be compressed. |
| `experience[2].content.details[1]` — “working example...” | Claim | Future Evidence | Remove from the main CV until it is connected to inspectable material and its current availability can be stated precisely. |
| `experience[2].highlights[0..2]` — Go, TypeScript/React and Python | Implementation facts | Main CV | Keep as factual context in a sentence, not as three inventory bullets. `Mikko wording required`. |
| `experience[2].highlights[3..7]` — users, tenants, permissions, hosting, configuration and operational views | System evidence | Main CV summary and future Evidence | Replace the equal-weight inventory with an approved description of the platform scope. `Mikko wording required`. Preserve the detailed list for evidence work only if it helps an artifact inventory. |
| `experience[2].highlights[8..11]` — processing, API structure, report writer and deployment | Mixed evidence and implementation trivia | Future Evidence | Remove from the main CV except for the report writer if it is needed to connect the customer project to Tealab. |
| `experience[2].technologies[*]` | Implementation facts | Factual sentence and future Evidence | Remove the unused inventory after the approved entry contains the material technologies. |

## Working methodology

### Delivery

| Reference | Role | Allocation | Decision |
| --- | --- | --- | --- |
| `methodology.delivery.short` | Core claim | Main CV | Preserve as the minimum statement of scope. It is not sufficient by itself because it does not explain how the process differs from ordinary AI assistance. |
| `methodology.delivery.summary[0]` | Core claim plus planning sequence | Main CV and future How I Work | Replace on the main page with an approved compressed account that includes adversarial planning, refinement into specifications and bounded implementation tasks. Keep the full sequence for How I Work. `Mikko wording required`. |
| `methodology.delivery.details[0]` | Corrective review mechanism | Future How I Work; selected mechanism on main CV | Preserve. The main CV should retain the independence and editorial purpose of review, not reduce it to “code review.” `Mikko wording required` for compression. |
| `methodology.delivery.details[1]` | Invariant-based verification mechanism | Future How I Work; selected mechanism on main CV | Preserve. The main CV may state the invariant-led selection of verification layers without listing every check. `Mikko wording required`. |
| `methodology.delivery.details[2]` | Mechanical lint and architecture enforcement | Future How I Work | Move off the main CV unless needed as one concrete example of executable quality control. |
| `methodology.delivery.details[3]` | Defect hunting, regression proof and explicit refactoring | Future How I Work; selected mechanism on main CV | Preserve. Defect hunting is unusually differentiating; the full refactoring inventory can move to How I Work. `Mikko wording required` for any main-page form. |
| `methodology.delivery.details[4]` | Division of responsibility inside the process | Main CV and future How I Work | Preserve the substance. It prevents the inaccurate “Mikko designs, agents implement” interpretation. `Mikko wording required` for a shorter main-page form. |
| `methodology.delivery.details[5]` | Technology breadth claim | Main CV optional and future Evidence | Keep only if supported by the experience or evidence inventory. Do not turn it into a conventional framework list. |

The main CV should contain one methodology account. The introduction establishes the model; this section supplies the minimum concrete mechanism. Neither should repeat the other paragraph by paragraph.

### Application UI design

| Reference | Role | Allocation | Decision |
| --- | --- | --- | --- |
| `methodology.applicationDesign.summary[0]` | Capability claim and design criteria | Main introduction or compact main-page account; future How I Work | Preserve the criteria as source material. Do not repeat the full paragraph after the introduction and experience already establish the claim. `Mikko wording required`. |
| `methodology.applicationDesign.summary[1]` | Capability scope | Main CV | Preserve if a compact explicit UI-design statement is still needed after the introduction is rewritten. |
| `methodology.applicationDesign.details[0]` | Explanation of direct UI direction | Future How I Work | Move off the main CV. It explains the process but is not evidence by itself. |
| `methodology.applicationDesign.details[1]` | Edupower evidence | Professional experience | Keep the evidence once, with Edupower. Remove the repeated methodology version. |

Application UI design should remain one of the four facts established during initial orientation. Its main-page proof comes from Edupower and Tealab. It does not need a second long explanatory card if that claim and evidence remain visible elsewhere.

## Education

| Reference | Role | Allocation | Decision |
| --- | --- | --- | --- |
| `education[0].institution`, `program` and `dates` | Background facts | Main CV | Keep. |
| `education[0].content.summary[0]` | Background fact | Main CV | Keep. |
| `education[0].content.details[0]` | Background fact and limitation | Main CV detail or print | Keep. Do not conceal the incomplete degree. |
| `education[0].facts[0]` | Background fact | Main CV | Keep. |

## Dormant projects and technology data

| Reference | Role | Allocation | Decision |
| --- | --- | --- | --- |
| `projects[0]` | Duplicate Edupower/CRM evidence | Future Evidence source | Remove from the active CV content model. The same system is already described in professional experience. |
| `projects[1]` | Duplicate report-system evidence | Future Evidence source | Remove from the active CV content model. Restore only as an evidence record tied to publishable artifacts. |
| `projects[2]` | Duplicate Tealab evidence | Future Evidence source | Remove from the active CV content model. Restore only as an evidence record tied to publishable artifacts. |
| All `technologies` arrays | Implementation facts and decorative inventory | Contextual prose or evidence metadata | Remove from the active CV model once the approved experience wording contains the material factual context. Do not restore technology pills. |

The raw source document already preserves this material. The canonical CV module should describe the page being rendered, not retain an invisible second version of removed sections indefinitely.

## Required Mikko wording

The next prose decision is limited to these slots:

1. A shorter introduction which establishes the four central facts without reproducing the full workflow.
2. A visible Tealab account which combines platform scope, the material Go/TypeScript/React/Python context and application UI design without becoming a dependency inventory.
3. A single compressed main-page methodology account which preserves:
   - AI throughout planning, implementation, testing and verification;
   - adversarial planning and repeated critique;
   - specifications becoming bounded implementation work;
   - independent corrective editorial review;
   - invariant-led executable verification;
   - dedicated defect hunting;
   - Mikko's actual decision-making and quality-control role.
4. A compact application-UI claim only if the revised introduction and visible experience evidence do not already make the capability sufficiently clear.

No other new self-descriptive prose is required for the next implementation slice.

## Deferred work

The following work remains explicitly deferred:

- building a complete How I Work page;
- building Evidence pages or project routes;
- selecting repository metrics;
- publishing an unavailable Tealab deployment link;
- creating technology inventories, badges or pills;
- another broad visual redesign;
- inventing claims or filling the wording slots above without Mikko's supplied text.
