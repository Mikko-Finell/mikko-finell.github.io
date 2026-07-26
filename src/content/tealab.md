# Tealab

I developed Tealab independently from November 2025 to May 2026 as a multi-tenant SaaS platform for internal business applications and AI-assisted tools. It used a Go API and worker, a React and TypeScript SPA, PostgreSQL, Docker Compose and external application backends. Its first substantial application was a web-based report writer built from the earlier Edupower pilot.

* Separated shared SaaS concerns from application-specific execution through a common adapter and durable job contract.
* Developed shared platform mechanisms for identity, tenancy, permissions, entitlements, credits, asynchronous jobs, audit, analytics, and administration.
* Integrated an evolved version of the report pipeline as a web application for managing source corpora, templates, prompts, generation stages, section editing, intermediate versions, and `.docx` export.
* Directed all implementation through coding agents using specifications, staged roadmaps, bounded tasks, independent reviews, manual testing, and regression-first defect correction.
* Used unit, PostgreSQL integration, service, API, contract, migration, smoke, and e2e tests according to the invariant being verified.
* Deployed the system through GitHub Actions and Docker Compose to DigitalOcean, with CI gating, migrations, health checks, smoke tests, and later production hardening.

## Origin

Edulog hosted several internal and customer-facing applications. By 2025, I wanted to build a new technical platform for applications with richer client-side workflows.

During 2025, I explored a model in which I would build and operate a new technical platform that could support Edupower’s customer projects.

The work did not proceed as a commissioned Edupower project, so I began developing Tealab independently.

At approximately the same time, I was developing an AI-assisted report writer for an Edupower customer. The first delivered version used Python and Jupyter notebooks. The report-generation pipeline worked, but the interface was difficult to deliver and maintain for non-programmers. Installation required Python, Jupyter, dependency management, API keys, local files, and instruction on how to operate the notebooks.

This was the type of application I had intended the new platform to host.

I began implementing Tealab independently in November 2025. The first repository commit was made on 26 November 2025.

Tealab was designed as a general SaaS platform from the beginning. The report writer was integrated later as its first substantial application.

## Planning and architecture

Before implementation, I had several long discussions with ChatGPT about the requirements of a general SaaS platform. The discussions covered technology choices, service boundaries, tenancy, authentication, RBAC, entitlements, asynchronous jobs, backend integration, deployment, and operational visibility.

I also researched how similar systems were normally implemented and which existing libraries could provide the required mechanisms. The purpose was to avoid designing custom versions of established infrastructure without a reason.

The initial planning was substantial but not exhaustive. The main architecture and several important boundaries were defined before the first code was written. Other details were decided during implementation or changed when the initial design proved insufficient.

Tealab is a multi-tenant SaaS control plane. It uses a React and TypeScript SPA, a Go API and worker, PostgreSQL, Nginx, and external application backends.

The main architectural decision was to separate the common SaaS platform from application-specific execution. Tealab would provide shared mechanisms for identity, permissions, credits and usage, jobs, and operations. External backends would perform domain-specific work through a common adapter and job contract.

This allowed the browser and the shared platform to use the same job model across applications without requiring every backend to implement the platform mechanisms independently.

I selected Go because it is simple, typed, and well suited to network services. TypeScript was selected for its type system. React was selected mainly because coding agents are well trained on its ecosystem. These choices were purely practical, I did not have a strong preference between React and other established frontend frameworks.

## Implementation with coding agents

I wrote none of Tealab’s code manually.

Coding agents implemented the server, frontend, tests, migrations, infrastructure, scripts, and documentation. I directed the work through specifications, roadmaps, implementation discussions, reviews, and manual testing.

The amount of planning depended on the scope of the change.

For large mechanisms, I discussed how the feature fit into the existing architecture, how similar systems were implemented, which libraries were available, and what tradeoffs each design introduced. Plans were reviewed for missing cases, weak boundaries, and operational risks. This process could repeat several times before implementation began.

For smaller changes, I usually discussed the task directly with the agent that had been working in the repository. I asked it to explain its recommendation, list alternatives and tradeoffs, and then implement the selected approach.

Implementation was divided into staged roadmap items with defined scope and verification requirements. The repository documentation described architectural ownership, API contracts, development commands, testing policy, and constraints that agents were expected to follow.

I used two main review methods.

In the first, the implementing agent reviewed its own work using specialized instructions that presented the result as a completed system rather than a continuation of the implementation process.

In the second, a new agent read the relevant specifications and code before reviewing a commit, feature, or completed roadmap item. This gave the reviewer an independent perspective on the work.

Most review findings were fixed immediately. In some cases, an agent performed broad static review and produced a list of suspected defects. Another agent then verified each item independently before correcting defects.

I evaluated the product mainly through manual use. I also directed and relied on the automated verification and agent review process. I did not treat generated code as inherently correct.

The objective was a functioning product with defects that could be detected, reproduced, and fixed.

When a defect was found, the standard routine was to write a regression test first, run it and observe the failure, then apply the fix. The test remained in the suite afterward.

Tealab uses unit, integration, service, contract, migration, smoke, and e2e tests. The test type is selected according to the invariant being verified. Business logic is normally tested with unit tests. Database behavior is tested against PostgreSQL. Cross-layer behavior is tested through service, API, smoke, or e2e tests.

Coding agents made it practical to maintain substantially more automated verification than I could have produced manually at the same implementation speed.

## Platform capabilities

Tealab was already a functioning general SaaS platform before the report writer was integrated.

The platform includes tenant registration, authentication, sessions, password changes, user settings, tenant administration, invitations, RBAC, entitlements, packages, credits, audit events, analytics, telemetry information, and job infrastructure.

Tenant administrators can manage users and invitations, inspect audit events and analytics, view credit usage, and access tenant settings.

The platform also has a separate superuser area for cross-tenant administration and platform configuration.

Tealab also includes a general jobs interface. Users can view job state, metadata, progress, event history, and artifacts. Each job has a durable lifecycle record independent of the backend that performs the work.

Before the report writer was added, regular users could manage their account and inspect the system, but there was no substantial application-specific workflow for them to use.

## Interface design

I directed Tealab’s interface design through implementation discussions and repeated manual review.

UI work was usually specified less formally than server architecture. I described the intended page structure, information hierarchy, controls, and user workflow to the implementing agent.

An initial description might define how a page should be divided, where selectors and actions should appear, and whether data should use a table, form, editor, or another existing component.

The agent then implemented a first version. I inspected the running interface and requested changes until the layout, behavior, and visual treatment were satisfactory.

This process was iterative. It was not always efficient, but it allowed decisions to be made against a functioning interface rather than only against a written specification.

I placed particular emphasis on logical layout, compact information presentation, consistent behavior, and visual coherence between pages.

The report writer received the most UI work. Its workflows were developed as one application rather than as separate technical interfaces.

Tealab also has light, dark, high-contrast, and brutalist themes.

## Original report writer

The first report writer was developed for an Edupower customer working with technical due-diligence.

The customer provided source reports, research material, agreements, project documents, report templates, and examples of completed reports.

I designed a Python pipeline that accepted a source corpus and a template divided into sections. Each template section contained instructions describing the expected output.

The pipeline processed the report in several stages. It drafted sections in parallel, checked factual claims against the source material, revised the text, and applied later passes intended to improve coherence across the report.

The system also supported manual editing and `.docx` export using the customer's established report template.

The first delivered interface used Jupyter notebooks.

This created substantial delivery and support overhead. Python, Jupyter, dependencies, and API keys had to be configured on the user’s computer. The user needed to know which notebook cells to run, which fields to edit, and how to manage local files.

Updates had no automatic delivery mechanism. New Python files and notebooks had to be sent manually. Installing an update could require screen sharing, copying files into the correct directories, and running dependency-management commands such as `uv sync`.

The system was delivered and worked on the customer’s computer, but the interface was not suitable for routine use by non-programmers.

The delivered Jupyter system remained separate from Tealab, which I developed independently.

## Report writer application

I later implemented a dedicated report writer application within Tealab.

The application uses an evolved version of the Python report-generation system as an external backend. A Tealab adapter connects the platform’s general jobs interface to the report backend.

The report writer has separate interfaces for managing corpora, templates, prompts, and generated reports.

Users can upload source material and organize it into corpora. They can create and edit report templates, define the sections in each template, and configure the prompt associated with each section.

To generate a report, the user selects a corpus, template, and model, then starts the job.

The report view shows the report while it is being produced. Each section appears as it moves through drafting, fact-checking, revision, and cohesion stages. Progress indicators show the remaining work for the pipeline and its individual stages.

![Report workspace showing an in-progress report with drafting and critique complete, and revision in progress.](/images/articles/tealab/report-generation-progress.light.png)

After generation, each section can be edited manually or rewritten by the model using additional instructions from the user.

The application retains the intermediate versions produced during the pipeline. For each section, the user can inspect the original draft, fact-checking changes, later revisions, and the template section that produced it.

Generated reports remain available in a report list. Users can rename reports, edit their contents, and export the final result as a `.docx` file using the customer’s document template and styling.

The report view also links to the underlying Tealab job. The job detail view exposes the lower-level execution state, event history, timing, metadata, and artifacts.

Most of Tealab’s existing platform mechanisms did not require substantial changes for the report writer. The main implementation work was the application UI and the adapter to the Python backend.

The integration did expose assumptions in the credits and jobs systems that had previously been exercised mainly by demo jobs. I revised parts of those systems to support the requirements of a real application.

## Application backend boundary

For the report writer, Tealab owns the shared platform concerns.

These include authentication, sessions, tenants, users, roles, invitations, entitlements, packages, credits, job records, event history, audit events, analytics, health information, and administration.

The report backend is concerned only with report-specific work. It processes corpora, executes the report-generation pipeline, interacts with language models, and produces report data.

The browser does not connect directly to the report backend.

Tealab accepts the user action, checks permissions and credit availability, creates the job, and routes it through the configured adapter. The adapter translates between Tealab’s canonical job contract and the report backend’s API.

The backend emits job events through the adapter. Tealab persists those events and exposes them to the SPA.

The report backend therefore remains independent of Tealab’s user, tenant, permission, credit, usage, and operational systems. Tealab can use the same boundary for backends implemented in different languages and with different internal data models.

The report writer is the only application that was developed to a usable state.

## Credits, packages, and entitlements

Tealab assigns each tenant a package.

A package contains a set of feature permissions and a monthly credit allowance. A typical package might provide 5,000 credits per month.

Feature permissions use named keys such as `telemetry.view`. The entitlement system combines package permissions with tenant- and role-specific overrides.

The SPA uses entitlement decisions to hide or disable unavailable functions. The API performs the actual permission checks.

Applications can register chargeable actions with the credit system. Each action can use a fixed price or a linear price based on the amount of work requested.

In the report writer, corpus ingestion could use a fixed charge. Report generation could use a charge based on the number of template sections.

The superuser interface allows these prices to be configured without changing the application code.

When a user starts a chargeable action, Tealab reserves the required credits. The charge is committed after the backend provides durable acceptance evidence.

If the backend does not accept the work, the reservation is released.

This avoids charging for a request that never entered execution while also avoiding a dependency on successful completion. A job can consume resources and later fail after it has been durably accepted.

The credit system also supports manual grants. An administrator can use them to restore credits as a refund or compensation when a system defect consumes credits incorrectly.

## Deployment and operation

Tealab uses Docker Compose for both local development and production deployment.

The production system ran on a DigitalOcean host. The local and production environments used the same main services and container layout. Environment variables, hostnames, credentials, and database endpoints differed between environments.

A version tag pushed to GitHub triggered the deployment workflow.

The workflow first checked that the main CI run had completed successfully for the same commit. A failed CI run blocked deployment.

After the CI gate passed, the workflow connected to the production host through SSH, checked out the tagged version, validated the required environment variables, pulled external container images, and ran database migrations.

It then brought up the production stack and performed health and application smoke checks.

Tealab includes separate commands for normal unit tests, PostgreSQL integration tests, migration preflight checks, e2e tests, adapter contract checks, boundary checks, and production smoke tests.

DB-mutating integration and smoke tests use temporary PostgreSQL instances rather than the persistent local development database.

The deployed system was used for development and demonstrations. It did not process real customer data.

Tealab was not load-tested and did not receive an external security or technical review.

## Problems and technical debt

Tealab’s initial planning did not cover every mechanism equally well.

Data retention was added after the main platform architecture was already in place. The design process involved long discussions about tradeoffs between several approaches.

The implemented system used PostgreSQL partitioning. It was theoretically sound but operationally complex.

When the retention process first ran against the production database, its partition check-and-drop logic used too much memory and failed. I later revised the implementation so it could complete successfully.

The retention system works, but it is the part of Tealab I am least satisfied with. I would probably choose a different design if I implemented it again.

The production database also exposed connection constraints that were not visible in local development.

Some operations were unexpectedly slow after deployment. Investigation showed that the hosted PostgreSQL service allowed fewer concurrent connections than the local database. The server and supporting services had not been designed around that connection budget.

I revised the pooling and connection usage after identifying the cause. The repository now includes explicit connection-budget checks and separate rules for direct and pooled database endpoints.

The frontend accumulated a different kind of technical debt.

My early instructions to coding agents did not define frontend conventions precisely enough. Agents implemented repeated styles, controls, pagination behavior, and other UI mechanisms directly inside individual components.

This made later visual and behavioral changes unnecessarily expensive. Similar elements had to be found and updated in several places.

I later consolidated shared components and frontend patterns and added explicit UI conventions for future work.

The client-server transport layer also relies more on manually maintained API contracts than I would prefer in a new system.

The test suite also required substantial cleanup.

Agents had written many Go tests using SQL mocks. Some of these tests verified the sequence of internal database calls rather than the invariant or database behavior that mattered.

These tests were sensitive to harmless implementation changes and provided little confidence in the system.

After identifying the problem, I deleted approximately 30 percent of the backend unit test suite. I replaced the loose testing approach with a stricter policy that distinguishes unit tests, PostgreSQL integration tests, service and API tests, and e2e tests.

SQL mocks remain available for narrow driver and adapter error cases. They are not the default method for testing persistence behavior.

These problems were found after substantial implementation work. The planning, review, and testing process reduced some classes of defect but did not eliminate technical debt or production-specific failures.

## Development period and scale

The first Tealab commit was made on 26 November 2025.

The last commit was made on 11 May 2026. It contained retention hardening and miscellaneous bug fixes.

Development therefore continued for approximately five and a half months.

The work progressed through several overlapping phases:

1. initial planning;
2. repository and service scaffold;
3. implementation of the core platform infrastructure;
4. cleanup and refactoring;
5. report writer integration;
6. polish and hardening.

The repository contains approximately 166,800 lines of non-vendor source and test code across 1,121 files.

This includes approximately:

* 46,500 lines of frontend application code;
* 46,700 lines of Go server code;
* 34,500 lines of Go unit and service tests;
* 9,400 lines of Go integration and preflight tests;
* 13,900 lines of frontend unit, component, and e2e tests;
* 4,900 lines of adapter and demo-backend code and tests;
* 4,800 lines of shell and automation code;
* 4,300 lines of SQL migrations;
* 1,600 lines of infrastructure and configuration.

The repository also contains 122 Markdown and text files with approximately 12,200 content lines.

These figures do not establish its quality.

## Commercial outcome

I demonstrated the report writer to Edupower and the original customer, but no commercial arrangement was concluded and Tealab was not adopted for paid use.

I continued developing and operating the platform independently for a period, but no paying customer emerged. I eventually shut down the live service.

## Current state

The Tealab repository remains intact in its final development state. The codebase can still be run locally.

Tealab is not currently open source.

The platform does not include self-service subscription billing, transactional email delivery, or external identity integration such as Google sign-in. The retention system also has areas I would still revise.

If a suitable customer or application appeared, I would continue development from the existing codebase rather than rewrite it.

## Scope and limitations

Tealab resulted in a functioning product-sized system that I directed from initial planning through deployment and continued hardening.

It did not achieve commercial adoption. Its operation was not validated by real customers or production load.
