# Edupower Oy

I worked with Edupower Oy from 2020 to 2026, first as an employee and then as an independent contractor. For most of the engagement, I worked independently as the company’s only software developer. I developed and operated its internal CRM, related business tools, customer applications and an AI-assisted due-diligence report writer.

* Migrated Edupower’s shared Excel and VBA CRM into a database-backed Django web application and maintained it in operational use for several years.
* Designed the CRM’s data model, sales workflows, and interfaces for companies, contacts, communications, tasks, follow-ups, and funnel management.
* Handled backend and frontend development, UI design, integrations, deployment, database administration, backups, security maintenance, production support, and incident handling.
* Built Phonelog, Maillog, a web replacement for another spreadsheet-based process, and several internal and customer-facing applications on the same platform.
* Added LLM-assisted communication summaries, relationship overviews, and follow-up suggestions directly to the CRM workflows.
* Designed and delivered a Python and Jupyter due-diligence report-writer pilot with source checking, revision, manual editing, targeted rewrites, and styled `.docx` export.

## Company context

Edupower was a small Lean consulting company. The team usually consisted of approximately five people, although the number varied over time. Its core business was Lean consulting; software supported internal operations, consulting work, and a small number of customer projects.

The company had substantial experience with Excel. Internally, it used Excel-based systems for customer relationship management and other business processes. Externally, it also helped customers improve spreadsheets, macros, and related workflows.

Edupower also maintained a Django application called Edulog. Edulog hosted several small business applications with conventional form-based interfaces. One example was Initiatives, which was used to track responsibilities and progress in business improvement projects.

## Initial role

I joined Edupower while I was still studying. The previous Edulog developer left at approximately the same time.

My initial work consisted mainly of maintaining Edulog and adding small features to its existing applications. I also worked on the VBA code used by the company’s Excel-based CRM.

At this stage, I was given specific implementation tasks. I had limited influence over technical direction because I was new to the company and had not yet established a record as a developer.

Early in the engagement, I recommended replacing the Excel CRM with a web application. The company initially chose to continue extending the spreadsheet system. During the following year, I worked on several approaches for connecting the workbook to a database, including synchronization through VBA.

## Existing Excel CRM

The CRM was implemented as a shared Excel workbook with a large amount of VBA code and macros. It was stored in OneDrive and was intended for use by several people.

As the system grew, the workbook became difficult to use concurrently and time-consuming to maintain. Its VBA implementation also made routine operation and modification dependent on specialized knowledge.

The workbook combined company, contact, sales-project, communication, relationship, and follow-up data in one structure.

The main record was based on what Edupower called a sales round. Information related to companies, contacts, communications, status, history, and future actions was stored around this record.

Migrating the workbook required interpreting the existing structure and separating the information into database tables and relationships.

## Feasibility prototype

I built a prototype to demonstrate that the CRM could be migrated to Edulog.

The first part was implemented as a Jupyter notebook. It read the Excel workbook, processed its contents, converted the data into relational structures, connected to the SQL database already used by Edulog, and stored the converted data.

I then added an initial CRM interface to Edulog. The first version had limited functionality, but it demonstrated that the existing data could be presented and managed through a web application.

Initial users found the web interface easier to use than the spreadsheet. The prototype established that a full migration was technically possible.

The company retained the Excel system during development to reduce migration risk.

I implemented synchronization in both directions. Data could be imported from Excel into the Edulog database and written from the database back into the workbook.

This allowed the web application to be developed while the spreadsheet remained available as a fallback.

## Incremental replacement

The web CRM was developed incrementally.

The users identified individual workflows and described what they needed to see or do. I implemented the required data models, backend processing, frontend behavior, and interface changes.

Users described individual workflows and interface needs. I implemented the corresponding data models, backend processing, frontend behavior, and interface changes. Over time, I took more responsibility for interaction design.

The system gained enough functionality to support the company’s normal sales work. The transition from Excel took place over approximately a few months.

After the required workflows had been implemented, the web application became the primary source of CRM data. The Excel version was retired, and the temporary synchronization system was removed.

The web CRM remained in operational use until the end of my work with Edupower in 2026.

## Mature CRM workflows

The CRM developed into Edupower’s main internal system for sales work.

The main views included Todos, Sales Rounds, Companies, Contacts, and Sales Funnel.

The Todos view was used to manage concrete sales actions and follow-ups. Tasks could be assigned a priority and date and linked to a company or sales round.

The Sales Rounds view was the main sales-project interface. Items were shown in an order based partly on urgency. Users could search by company or other identifying information and open a detailed view for an individual sales round.

The detailed sales-round view combined the company, contact, communication, activity, and follow-up information needed for each sales project.

The Companies view supported search and normal create, read, update, and delete operations. It showed associated contacts, sales rounds, locations, and other company information. I integrated Google Maps for location display.

I later added an external company-information lookup and import workflow. Users searched for a company, reviewed candidate matches, and selected the record to import.

The Contacts view stored people connected to companies and sales work. It included names, contact details, company relationships, and role history.

The Sales Funnel view presented active sales rounds in a Kanban-style interface. Sales rounds were grouped according to their current funnel stage, from initial contact through later sales stages.

The sales team used the CRM daily. It managed several thousand company, contact, and sales-project records.

## AI-assisted CRM features

I later added several LLM-assisted functions to the CRM.

One feature generated summaries of sales communications and relationship history. Another generated structured overviews from the information stored for a sales round.

I also implemented a follow-up suggestion function. The system used communication summaries and other CRM information to suggest concrete next actions. A user could review a suggestion and accept it as a new todo.

These features were built directly into existing workflows.

## Technical scope

I was the sole developer and primary technical owner of the CRM.

My responsibilities included:

* database and data-model design;
* Django backend implementation;
* frontend development;
* UI and interaction design;
* data migration;
* external integrations;
* deployment and hosting;
* database administration;
* backups;
* security-related maintenance;
* production support;
* incident handling;
* long-term feature development.

The CRM contained approximately 24,300 lines of custom code.

The approximate distribution was:

* 9,500 lines of JavaScript;
* 9,300 lines of Python;
* 4,800 lines of HTML;
* 650 lines of CSS.

The project also contained approximately 120 Django migrations.

These figures exclude generated and third-party code.

## Development conditions

The CRM was built manually without coding agents.

I learned Python, Django, JavaScript, and Vue while maintaining and extending Edulog.

Development was driven by operational use and incremental requirements. Features were added as the company identified new workflows and customer needs.

The project predates my current planning, testing, and agent-assisted development methods. Development capacity was concentrated on features, maintenance, support, and customer work, and the CRM did not have an automated test suite.

The system developed into one coherent operational application. It replaced the Excel workflow and remained in active use when my contract ended in 2026.

## Related internal tools

I developed several tools that used the same Edulog database or supported related internal processes.

### Phonelog

Phonelog was an Android app for recording selected call and message activity in the CRM.

Users associated an activity with a sales round and added a short summary.

### Maillog

Maillog was an Outlook add-in for recording selected emails in the CRM communication history. Users associated each email with the relevant company or sales round.

### DRM

Edupower also used an Excel-based DRM system.

I developed a web-based replacement within Edulog. Its scope was smaller than the CRM, but the migration followed the same general direction: replacing an internal spreadsheet workflow with a database-backed web application.

## Other Edulog applications

I also implemented several smaller internal and customer-facing applications.

One was a customer-specific inventory or ERP-like system based on the customer’s product catalogue.

Another was a Lean-related weekly meeting and calendar application. I implemented it from operational instructions supplied by Edupower.

I also implemented a small coaching chat prototype within Edulog. It was intended to support a proposed Lean and personal coaching service and remained in limited internal use.

These were limited-scope applications developed alongside the main Edulog systems.

## Machine-learning work

Around 2022, Edupower began exploring machine-learning projects.

One project explored anomaly detection using vibration-sensor data from the engine room of a cruise ship.

I also implemented interface work and explored possible applications for AINA, a general AI concept within Edulog.

Both initiatives remained exploratory.

During this period, I demonstrated machine-learning workflows to Edupower staff. These demonstrations included:

* assembling and labelling training data;
* training neural networks;
* monitoring training loss;
* adjusting hyperparameters;
* evaluating models on test data;
* applying trained models to new inputs.

The main result was internal education. Staff gained hands-on familiarity with training data, model evaluation, and applying models to new inputs.

## Intern supervision

Edupower occasionally had a small number of software interns, including students from Novia University of Applied Sciences.

I acted as their practical team lead.

The interns usually worked on small changes to Edulog or Phonelog. I divided the work into tasks, explained the relevant parts of the system, reviewed their implementation, and discussed corrections with them.

## Adoption of language models

I introduced ChatGPT and Claude to Edupower when they became useful for practical work.

I demonstrated how to prompt language models, provide relevant context, structure requests, and refine the resulting output.

I also regularly identified tasks where language models could reduce manual work. These included writing, summarization, information structuring, software-related tasks, and other routine business work.

This happened informally and continuously, as part of day-to-day work.

## AI-assisted report writer

In late 2025, Edupower received a customer project related to technical due-diligence reporting.

The customer wanted a repeatable workflow for generating reports from project documents using its required structure and style.

The customer provided:

* collections of source reports;
* research material;
* agreements and other project documents;
* templates describing the required report structure;
* examples of completed reports.

I translated the customer’s reporting process, templates, and example reports into the technical design and implemented the resulting workflow.

## Report-generation pipeline

The first version was implemented using Python libraries, Jupyter-based tooling, and the OpenAI API.

The system accepted a corpus of project material and a report template.

The template defined the report sections and described the expected content of each section.

The system processed the material through a multi-stage pipeline. The pipeline included:

* preparing and organizing the source material;
* generating individual report sections;
* checking factual claims against the source material;
* revising generated content;
* combining the sections into a structured report;
* allowing manual editing as well as surgical AI rewrites of a given section;
* exporting the result as a `.docx` file using the customer's official report style and structure;

I designed the pipeline structure, prompts, model interactions, processing logic, editing model, and export workflow.

The system was designed around a defined reporting process, producing structured output for expert review at each stage.

## Customer involvement

I participated directly in customer meetings and held technical responsibility for the system.

The customer described the reporting process, supplied templates and example reports, and reviewed the results. I converted those materials into the pipeline design and working implementation.

## Delivered result

The Jupyter version was delivered as a functional pilot.

It generated structured reports from the supplied material and supported source checking, revision, manual editing, and Word export.

The interface and report configuration still required refinement. The initial templates and prompts were derived from customer materials and review. A planned next phase would have compared generated reports with expert-written reports and used the results to improve the templates, prompts, and pipeline. That phase did not take place.

The delivered system therefore remained an unbenchmarked pilot. It demonstrated that substantial parts of the reporting process could be automated, while leaving validation and production refinement incomplete.

## Tealab version

After delivering the Jupyter version, I built Tealab as an independent project.

Tealab was intended as a platform for hosting internal business applications and AI-assisted tools.

I implemented a new web-based report-writer interface within Tealab.

The web version used an evolved form of the Python report-generation code as a backend component. It retained the same general pipeline but replaced the Jupyter interface with a dedicated application.

The new interface provided a more usable way to:

* upload and manage source material;
* configure report templates;
* run report-generation stages;
* inspect individual sections;
* edit generated content;
* review the report as a structured document;
* export the finished report.

I developed the Tealab version independently after delivering the original pilot.

## Tealab discussions

I proposed using Tealab as the basis for further report-writer work and similar customer projects.

Edupower and I did not proceed with that arrangement. I continued developing Tealab independently.

## Summary of the engagement

My work with Edupower included internal product development, customer projects, maintenance, and support.

The change from employee to independent contractor in 2022 was mainly contractual. My practical responsibilities remained broadly similar.

For most of the engagement, I worked independently as Edupower’s only software developer. I converted operational needs and customer requirements into working software. This included data modelling, backend development, frontend development, interface design, deployment, maintenance, and user support.

The strongest completed result was the CRM replacement. I developed it incrementally from a migration prototype into an operational system that replaced the Excel workflow and remained in active use for several years.

My development process has since expanded to include systematic planning, explicit architectural constraints, automated testing, and agent-assisted implementation and review.

The engagement demonstrates that I can take a business need through technical design, implementation, deployment, and long-term operation.
