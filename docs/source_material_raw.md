This keeps the factual material from the existing source but replaces the self-description with the unfiltered version of the methodology and UI work.

# Mikko Finell

## AI-First Software Architect / Full-Stack Developer

Remote contractor or employee
Finland · EU work eligibility
Native Swedish · Professional English

I design and build internal systems, business software, application platforms, data-processing systems and AI-assisted workflows.

My workflow methodology is AI-first. I use AI at every step from planning to implementation to testing and verification. I start by deeply planning the codebase architecture by having several frontier models adversarially duel about ideas to find the best, most robust and practical and radically innovative and accretive and cohesive ideas possible. We then iteratively refine those ideas over several rounds of critique and stress testing. The specifications which emerge from this process are then turned into roadmaps and plans which explain in detail how to convert the ideas into reality. We then turn those plans into concretely actionable implementation tasks which my agents start to work through.

Every round of implementation is followed by fresh-eyes corrective editorial code review by multiple agents. These reviews are not just there to check whether the task technically passed its tests, they look at whether the implementation actually fits the architecture, whether it introduced unnecessary complexity, whether it misunderstood the purpose of the feature, whether there are missing cases, whether the structure will remain usable as the system grows, and whether the agent solved the literal task in a way that damages the larger project.

Testing policy is equally rigorous. Every invariant is covered by tests at the appropriate level whether that is unit tests, integration tests or e2e, and implementation is not considered complete because one narrow test file happens to pass. The standard finalization procedure runs the full relevant verification stack, including strict type checking, static analysis, linting, compilation where applicable, architectural checks and the test suites which can expose interactions outside the immediately changed component.

My projects always use the strictest practical linting rules and every warning is mechanically treated as a hard error that must be fixed while finalizing a task before committing. On top of that we enforce architectural rules which are difficult to capture through standard linting by encoding them into scripts that are part of the same finalization procedure.

I also run agents whose sole task is searching the codebase for defects. They investigate the implementation without being constrained to the feature currently under development, identify behaviour which appears wrong or structurally dangerous, write regression tests to prove the bug is real, and then fix it. Refactoring and technical-debt work is handled as explicit work rather than something we vaguely intend to return to later, and agents are regularly sent through the system to find duplicated logic, weak abstractions, obsolete compatibility layers, accidental complexity and places where the implementation has drifted away from the architecture.

This is the process through which I produce software. I decide what we are trying to build, what properties it needs to have, which ideas are worth keeping, how the project should be structured, how much complexity is justified, what quality bar applies, and whether the result is actually done. The agents do most of the direct implementation, testing, investigation, review and correction work inside that process.

I have used this methodology to build substantial systems in Go, TypeScript/React, Python and Rust. It also lets me work effectively in unfamiliar technologies and existing codebases because the process is based on investigation, explicit reasoning, executable verification and repeated review rather than depending on memorized framework syntax.

Application UI design is one of my strongest areas. I am very particular about information hierarchy, workflow structure, visual density, terminology, interaction details and whether the whole application feels logical when someone actually has to use it repeatedly. I tend to prefer compact interfaces which expose a lot of useful functionality without degenerating into clutter, but compact does not mean cramming controls together until the user has to decipher the screen.

Current agents are often good at implementing established HTML, CSS and component patterns, but they are still not reliably capable of looking at a rendered application and deciding whether it actually looks good, whether the hierarchy is wrong, whether the page wastes half the available space, whether related controls feel disconnected, whether the interaction flow is annoying, or whether the whole thing has the visual character of a generic admin template assembled by committee. I guide that work directly through repeated visual inspection and iteration.

During my time at Edupower I frequently received positive feedback specifically about the UIs I designed being logical, intuitive, compact and functional. This was not separate design work handed over to an implementation team. I worked out how the business process should map into screens and interactions and then built the systems around that.

Paid software delivery since 2020. Programming since 2014.

## What I work on

* Internal tools, CRM systems and operational business software.
* Backend services and full-stack web applications.
* Application UI, information architecture and workflow design.
* Dense administration, reporting and operations interfaces.
* SaaS and multi-tenant application platforms.
* LLM integrations, structured generation systems and AI-assisted business workflows.
* Data-processing and reporting systems.
* External API integrations and background processing.
* Replacement of spreadsheet-heavy and manual processes with maintained software.
* Investigation, extension and restructuring of existing systems.
* Architecture, specification, implementation planning and verification design.

## Professional experience

### Edupower Oy

**Software Developer / Project Engineer / Independent Contractor**
2020–2026
Employee 2020–2022 · Independent contractor 2022–2026

Long-term developer and primary technical owner for internal business software, customer-facing tools, data-processing utilities and AI-assisted systems.

* Built and maintained an internal Django/Vue CRM which replaced a large Excel-based sales and customer-management process and remained in operational use for several years.
* Designed the CRM UI and workflows around the company’s actual daily work. The interfaces were frequently praised for being logical, intuitive and compact while still exposing substantial functionality.
* Built company and contact management, communication history, sales funnel tracking, task handling and shared operational data.
* Maintained and extended the system over several years as the underlying business processes changed.
* Built smaller customer-facing applications and tools connected to the same business-data system.
* Built Jupyter-based data-processing and reporting utilities.
* Built an Android application connected to the underlying system.
* Added AI-assisted features for structured outputs, communication summaries, relationship overviews, follow-up extraction and drafting.
* Mentored interns.
* Helped colleagues use AI tools for practical software and business work.

### AI-assisted report-generation system

**External customer project delivered through Edupower**
Late 2025 – early 2026

Designed and built a system for producing expert report sections from structured inputs.

* Converted an existing expert reporting process into explicit inputs, processing stages and reviewable generated outputs.
* Built Python libraries and Jupyter tooling using the OpenAI API.
* Used structured generation instead of treating the problem as a general chatbot interface.
* Worked out the requirements, processing model, generation workflow, prompt structure, API behaviour, testing and delivery process.
* Later reused the same foundation in the web-based report writer built into Tealab.

### Tealab

**Independent application platform**
2025–present

Designed and built a platform for hosting AI-enabled business applications and internal tools.

* Go backend.
* TypeScript/React frontend.
* Python application and processing services.
* User and tenant management.
* Access control and application permissions.
* Application hosting.
* Usage and configuration mechanics.
* Health, administration and operational views.
* Background processing.
* API-backed application structure.
* Web-based report-writer application.
* Dockerized Linux deployment.

I designed the Tealab UI across the ordinary application surfaces and the less visible operational parts of the platform, including dashboards, tenant and user settings, access control, system health, application management and the report-writing workflow.

Tealab is a working example of the systems I build, the interfaces I design and the AI-first development process described above.

## Selected systems

### Internal CRM

A custom business application used for company data, contacts, communication history, sales work, tasks and shared operational information.

It replaced a spreadsheet-based process and remained in use for several years. I was its sole developer and primary technical owner.

The original Excel process did not provide a useful application structure which could simply be copied into a web UI, so I had to work out how the information related, what belonged together, which actions needed to be immediately available, how users moved between companies, contacts, communications and sales work, and how to expose all of that without turning every screen into a bloated enterprise form.

### Report writer

A structured AI-assisted reporting system which turns defined business inputs into report sections for human review.

The first version used Python and Jupyter. The later version added a full web interface and platform integration through Tealab.

The system is built around an actual reporting process rather than a chat window. Inputs, generation stages, generated sections and human review are represented as explicit parts of the application workflow.

### Tealab platform

A general application platform with backend services, a React frontend, user and tenant management, access-control surfaces, operational tooling and hosted application support.

The report writer is the first full application built on the platform, but the underlying system was designed to support multiple separately configured applications rather than becoming a report-writer codebase with some generic platform language added around it afterward.

## Technology

Primary production stack:

* Go
* TypeScript/React
* Python
* Rust
* SQL

Systems and delivery work includes backend services, web applications, HTTP APIs, background processing, relational data systems, CI and Dockerized Linux deployment.

Earlier Edupower systems also used Django, Vue, JavaScript, Jupyter and C#/Xamarin.

## Verification and engineering policy

* Specification-driven implementation with detailed roadmaps and actionable task breakdowns.
* Strict typing, static analysis and the strictest practical linting configuration.
* Unit/integration/e2e testing selected according to the invariant being protected.
* Full standard verification before a task is finalized and committed.
* Compilation and production-build checks where the normal test suite does not prove that the system actually builds.
* Custom architectural checks for project rules which ordinary linters and type systems cannot express.
* Fresh-eyes corrective editorial review by multiple agents after implementation.
* Dedicated defect investigations which begin by proving suspected bugs through regression tests.
* Explicit refactoring and technical-debt work.
* Repeated full verification after corrections and structural changes.

## Application design

I design application UIs and operational workflows, particularly systems where the user needs access to a lot of connected information and functionality without the interface becoming confusing or physically enormous.

My UI work commonly includes:

* Information architecture.
* Workflow design.
* Dense operational interfaces.
* Dashboards and administration tools.
* Complex forms and configuration surfaces.
* Reporting and review workflows.
* Navigation between related business entities.
* Visual hierarchy and use of space.
* Empty, loading, error and partial-data states.
* Repeated direct review of the rendered application.

## Engagement

Available for:

* Remote contractor and subcontractor work.
* Paid implementation trials.
* Bounded development projects.
* Longer-term development engagements.
* Selected full-time remote positions.

Remote only. Finnish, Nordic and EU working hours.

## Education

**Yrkeshögskolan Novia**
IT engineering studies, 2016–2020

Completed nearly all coursework in a four-year engineering programme on the IT track.

GPA: 4.5 / 5

The degree remains incomplete because of one final course and the thesis.

## Languages

* Swedish: native
* English: full professional proficiency
* Finnish: basic

## Links

* Email: [mikko.finell@gmail.com](mailto:mikko.finell@gmail.com)
* Tealab: [https://tealab.io/](https://tealab.io/)
* GitHub: [https://github.com/mikko-finell](https://github.com/mikko-finell)

This is intentionally too long and too explicit for the final version. It gives us a source written in the right register, which we can now shorten without replacing the underlying ideas with generic CV abstractions.
