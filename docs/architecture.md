# Architecture

## 1. Project definition

The project is a compact personal CV and technical portfolio implemented as a small static multi-page website.

The site presents:

* professional experience;
* working methodology;
* education and relevant background;
* contact information and external links.

Application UI and workflow design is a core capability. It should be stated clearly and supported through professional experience rather than automatically becoming a separate capability grid.

Selected projects, technology inventories and deeper evidence surfaces are added only when they contribute material which is not already carried more effectively by the main CV.

The site is structured as a technical document with clear navigation and distinct sections. It prioritizes useful information, scanning, readability, and factual precision.

The site is built as a React application using strict TypeScript and Vite. The production build consists entirely of static HTML, CSS, JavaScript, and assets deployed through GitHub Pages.

No runtime server, database, authentication system, or backend service is required.

### Maintaining this document

This architecture records the current project contract, not an immutable initial design. When an accepted content or implementation decision supersedes provisional guidance, amend this document as part of the bounded change rather than preserving a known contradiction.

Do not use this rule to bypass the architecture silently. State the conflict, update the relevant rule deliberately and keep the remaining boundaries intact.

## 2. Core technical stack

Use the following stack:

* React;
* strict TypeScript;
* Vite;
* plain CSS;
* Biome for formatting and linting;
* Vitest for logic that warrants unit testing;
* Playwright for browser smoke tests;
* GitHub Actions for validation and deployment;
* GitHub Pages for hosting.

Do not use Next.js.

Do not use Tailwind initially. Styling must remain centrally controlled through the shared component system and the main stylesheet.

Do not add a client-side router. Vite HTML entry points provide the site's direct page URLs, and ordinary anchors perform complete document navigation.

Do not add a global state-management library. Static content is not application state. Use local state only for actual interface behavior such as theme controls.

### Dependency version policy

Use the newest compatible published version of every npm dependency that is at least seven days old when the lockfile is generated. Do not select older versions merely for familiarity.

Enforce the release-age gate from the repository root:

```ini
min-release-age=7
save-exact=true
engine-strict=true
```

Pin a Node and npm toolchain that supports this policy, pin direct dependencies exactly, commit the generated lockfile, and use `npm ci` in automated validation and deployment.

The seven-day gate applies to production, development, direct, and transitive dependency resolution. Do not add release-age exclusions or override the gate.

## 3. Content authority

Substantial site content must be centralized by subject and page, not duplicated across components. The current canonical content modules are:

```text
src/content/cv.ts
src/content/methodology.md
src/content/edupower.md
src/content/tealab.md
src/content/work-profile.ts
```

The CV content module contains:

* identity and profile information;
* contact links;
* introductory content;
* professional experience;
* education;
* supporting links;
* reusable labels or factual fragments where appropriate.

The methodology, Edupower and TeaLab Markdown documents contain the complete long-form content rendered on their dedicated pages. Their first paragraphs are reusable summaries. Future approved articles should use the same Markdown document model, but their canonical files must not be created until publishable content exists.

Capability groups, project descriptions, technology metadata and other optional structures belong in the canonical module only when an approved rendered surface or imminent evidence task uses them. Do not retain invisible duplicates of removed sections indefinitely.

Content types may be defined separately:

```text
src/content/types.ts
```

Components must import and render content from the appropriate canonical content module. Career facts, project facts, dates, links, claims, and substantial prose must not be duplicated inline across components.

When the same text or factual value appears in multiple places, those locations must reference the same canonical field.

Content should remain grouped by subject rather than being decomposed into a global dictionary of individual sentences. Shared fragments should be extracted only when they are genuinely reused.

The content modules are the authority for wording and factual data. Components control presentation, layout, and interaction. Components do not reinterpret or rewrite the supplied material.

Static page metadata belongs in `src/site/metadata.ts`. It derives page titles, descriptions, canonical URLs, structured profile data, and social-preview values from the canonical CV and Markdown metadata. Public metadata assets are limited to `public/favicon.svg` and the generated `public/social-preview.png`, whose source is `public/social-preview.svg`.

The non-rendered Work Profile source belongs in `src/content/work-profile.ts`. It reuses existing CV facts and contains only approved compatibility fields. Its empty `primaryCapabilities` and `engagementConstraints` arrays deliberately indicate that no profile-specific values have been supplied; do not infer entries from the CV title, experience, or technology mentions.

## 4. Content allocation

Content structures must match their actual rendered jobs. TypeScript remains appropriate for CV records and factual fields. Long-form articles use ordinary Markdown so their prose can be edited as documents rather than as TypeScript object literals.

An article Markdown document follows three structural conventions:

* it begins with exactly one level-one heading, which supplies the page title;
* its first paragraph is the deliberately written summary reused by compact surfaces such as the CV;
* its level-two headings define the article sections and generate the page's section navigation.

The summary is part of the complete article and is not duplicated in metadata. Build-time Markdown processing extracts the title, first paragraph, any unordered list immediately following that paragraph, and level-two heading labels and identifiers as typed metadata. Compact consumers import that metadata through the Vite `?metadata` virtual module, which derives it from the canonical Markdown source without including the renderable document module. Article entries use ordinary Markdown imports for the complete rendered document. Components consume the generated metadata; they do not scan the rendered DOM or maintain a parallel hand-authored table of contents.

Article source remains plain Markdown. Do not require frontmatter, custom delimiters, embedded JSX, exports or a homegrown metadata syntax for ordinary article structure. GitHub-Flavored Markdown is supported. Build validation must reject documents that do not satisfy the title, summary and section conventions.

Do not generate or compress the summary from later prose. The first paragraph is itself the approved summary.

Ordinary CV entries should use direct fields that correspond to their visible structure rather than a universal layered-content abstraction.

## 5. Self-descriptive writing policy

For now, you are forbidden from writing or rewriting any self-descriptive prose. Do not invent taglines, hero copy, summaries, positioning statements, section introductions, calls to action or connective copy. Do not paraphrase the source material into more conventional professional language. Use the existing text verbatim or use obvious neutral placeholders where the final compressed text has not yet been written.

The following patterns are specifically forbidden:

* “It is not X. It is Y.”
* “I do not just X. I Y.”
* “Beyond X.”
* “Where X meets Y.”
* “Proof, not promises.”
* Slogan-like sentence fragments.
* Oversized claims presented as visual statements.
* Generic startup, agency, portfolio or LinkedIn language.
* Attempts to reassure the reader that AI is only an assistant.
* Attempts to make the prose punchier, cleaner, calmer or more memorable.
* Editing dense or repetitive procedural prose merely because it violates conventional copywriting style.

Do not create a giant hero section. Do not use enormous headings, decorative statement cards, excessive whitespace or a sequence of one-sentence marketing sections. The first screen should contain actual useful information rather than atmospheric positioning.

Treat the site as a compact technical document with navigation, not as a marketing landing page.

Neutral interface labels such as `Experience`, `Projects`, `Education`, `Details`, `Expand`, `Collapse`, and `Contact` may be written during implementation.

## 6. Information architecture

The main CV remains one coherent document within a four-page site:

```text
/
/methodology/
/work/edupower/
/work/tealab/
```

The methodology and work routes render their canonical Markdown documents with generated section navigation.

Use the following section structure:

1. site header, primary navigation and immediately available contact details;
2. introduction and current professional focus;
3. professional experience;
4. working methodology;
5. education and relevant background;
6. availability, contact information and external links.

Application UI design must be understandable during initial orientation and supported through the professional-experience evidence. It does not require a separate section if the introduction and experience already carry that job clearly.

Do not restore the removed production-capabilities or selected-project sections without new material which gives them a unique purpose. Projects should return as evidence only when publishable artifacts or additional context justify them.

The methodology page contains the complete currently approved procedural account. The work pages may later connect claims to inspectable artifacts after their content has been deliberately allocated and the available material inventoried.

Each main-CV section must retain a stable identifier for document semantics and possible direct references.

Example:

```text
#introduction
#experience
#methodology
#education
#contact
```

Primary navigation links to the four pages from the canonical route configuration. The current page is indicated with `aria-current="page"`.

Important information must remain available without modals, carousels, hover-only interactions, or mandatory progressive disclosure.

The initial viewport must contain actual identifying and professional information. It must not be occupied primarily by decorative layout, atmospheric text, or a large empty hero treatment.

## 7. Source structure

Use the following provisional source layout:

```text
src/
  app/
    mountPage.tsx
    staticPages.tsx

  entries/
    cv.tsx
    methodology.tsx
    edupower.tsx
    tealab.tsx

  pages/
    ArticlePage.tsx
    CvPage.tsx
    EdupowerPage.tsx
    MethodologyPage.tsx
    TealabPage.tsx

  site/
    markdown.ts
    metadata.ts
    routes.ts

  content/
    cv.ts
    edupower.md
    methodology.md
    tealab.md
    types.ts
    work-profile.ts

  ui/
    Button.tsx
    Card.tsx
    Heading.tsx
    Inline.tsx
    Link.tsx
    Section.tsx
    Stack.tsx
    ThemeControls.tsx
    theme.ts

  components/
    MarkdownDocument.tsx
    SiteShell.tsx
    SiteHeader.tsx
    Paragraphs.tsx
    IntroductionSection.tsx
    ExperienceSection.tsx
    ExperienceCard.tsx
    MethodologySummarySection.tsx
    MethodologySection.tsx
    EducationSection.tsx
    ContactSection.tsx

  styles/
    site.css

scripts/
  check-discovery-output.mjs
  check-llms-output.mjs
  check-metadata-output.mjs
  check-ui-boundaries.mjs
  check-pdf-output.mjs
  check-static-output.mjs
  check-work-profile-output.mjs
  generate-pdf.mjs
  markdown-document.mjs
  markdown-document.d.mts
  static-render.mjs

tests/
  site.e2e.ts

docs/
  architecture.md
  cv-content-allocation.md

index.html
methodology/index.html
work/edupower/index.html
work/tealab/index.html
```

This structure is provisional. Add files only when the implementation requires them.

The responsibilities are:

* `content/` contains canonical content and its types;
* `site/` contains canonical route identifiers, labels, paths, and derived static metadata;
* `app/` centralizes React mounting, theme initialization, and the CSS import;
* `entries/` mount exactly one page each;
* `pages/` are thin compositions of document components;
* `ui/` contains standardized reusable interface primitives;
* `components/` contains CV-specific document sections and assemblies;
* `styles/site.css` contains the central visual system;
* `scripts/` contains lightweight architectural policy and static-output checks;
* `tests/` contains browser tests and any justified integration tests.

## 8. Component system

Reusable visual elements must be implemented as shared UI components.

Examples include:

* buttons;
* links;
* headings;
* cards;
* tags;
* tables;
* section containers;
* vertical and horizontal layout groups.

A UI component owns its standard:

* structure;
* semantics;
* visual appearance;
* spacing;
* states;
* accessibility behavior;
* responsive behavior;
* interaction behavior.

Call sites provide content and select predefined semantic variants.

Correct usage:

```tsx
<Card variant="standard">
  ...
</Card>

<Heading level={2} size="section">
  Experience
</Heading>

<Stack gap="large">
  ...
</Stack>

<Button variant="primary" size="medium">
  Contact
</Button>
```

Ordinary call sites must not redesign shared components.

Shared UI components must not generally accept arbitrary presentation overrides such as:

```ts
className?: string;
style?: React.CSSProperties;
```

Do not permit usage such as:

```tsx
<Card className="custom-card rounded-large extra-padding">
```

or:

```tsx
<Button style={{ borderRadius: 0, marginTop: 17 }}>
```

When a genuinely repeated visual or behavioral distinction exists, add a deliberate named variant to the shared component.

Example:

```tsx
<Card variant="outlined">
```

Variants must represent meaningful recurring designs. Do not create one-off variants as a disguised replacement for inline styling.

## 9. Component boundaries

Use two component levels.

### UI primitives

UI primitives define the common interface language.

Examples:

```text
Card
Button
Heading
Link
Tag
Expandable
DataTable
Stack
Inline
Section
```

Create a primitive only when the site uses or clearly requires that abstraction.

### Document components

Document components assemble UI primitives around CV-specific content.

Examples:

```text
ExperienceCard
ProjectCard
ExperienceSection
ProjectsSection
MethodologySection
```

Document components may define section-specific structure. They must still rely on shared primitives for recurring controls and visual surfaces.

Typography must be determined by the semantic type of content, not by whichever container happens to surround it. `Paragraphs` owns the standard prose measure, line height, and paragraph rhythm through `.document-prose`. Standard document lists own their list measure and rhythm through `.document-list`. `Card` owns only its surface, border, card spacing, and print-breaking behavior; it must not style descendant paragraphs or otherwise infer prose typography from containment.

Normal body-text arrays must render through `Paragraphs` whether they appear in the introduction, experience, methodology summary or education. Authored Markdown must render through `MarkdownDocument`, which maps document headings, links and lists to the shared UI primitives and applies the same `.document-prose` boundary. Do not introduce a prose variant until a demonstrated recurring difference requires one.

Components should correspond to meaningful concepts. Do not create abstraction layers consisting primarily of generic wrappers such as:

```text
Box
Wrapper
ContainerInner
ContentBlock
GenericPanel
TextElement
```

unless a real repeated need justifies them.

Do not attempt to make one universal component support every arrangement through a large set of styling props.

Prefer:

```text
visual tokens
    ↓
UI primitive
    ↓
document component
    ↓
canonical content
```

For example:

```text
--radius-surface
    ↓
Card
    ↓
ExperienceCard
    ↓
cvContent.experience
```

## 10. Central styling

Use one central stylesheet initially:

```text
src/styles/site.css
```

Import it once from the application entry point.

Organize the stylesheet using CSS layers:

```css
@layer reset, tokens, base, layout, components, utilities;
```

The stylesheet must define a small shared set of design tokens using CSS custom properties.

These should include the values that require consistent global control:

* fonts;
* font sizes;
* line heights;
* spacing;
* content widths;
* colors;
* borders;
* corner radii;
* control dimensions;
* transition durations;
* responsive breakpoints where required.

Example:

```css
@layer tokens {
  :root {
    --font-body: system-ui, sans-serif;
    --font-mono: ui-monospace, monospace;

    --text-sm: 0.875rem;
    --text-md: 1rem;
    --text-lg: 1.25rem;
    --text-xl: 1.6rem;

    --space-1: 0.25rem;
    --space-2: 0.5rem;
    --space-3: 0.75rem;
    --space-4: 1rem;
    --space-6: 1.5rem;
    --space-8: 2rem;

    --radius-control: 0.35rem;
    --radius-surface: 0.5rem;

    --border-width: 1px;

    --page-width: 72rem;
    --text-width: 48rem;
  }
}
```

Shared component styles must be defined once.

Example:

```css
@layer components {
  .ui-card {
    padding: var(--space-6);
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-surface);
    background: var(--color-surface);
  }

  .ui-card[data-variant="subtle"] {
    background: var(--color-surface-subtle);
  }

  .ui-button {
    display: inline-flex;
    align-items: center;
    min-height: 2.5rem;
    padding-inline: var(--space-4);
    border-radius: var(--radius-control);
    font: inherit;
  }
}
```

The React component applies the standard class and exposes only supported variants:

```tsx
type CardProps = {
  variant?: "standard" | "subtle" | "outlined";
  children: React.ReactNode;
};

export function Card({
  variant = "standard",
  children,
}: CardProps) {
  return (
    <article className="ui-card" data-variant={variant}>
      {children}
    </article>
  );
}
```

Changing a shared design token must update all relevant instances.

For example, changing:

```css
--radius-surface: 0;
```

must change the corners of every card and equivalent surface that uses the shared surface radius.

The stylesheet may be split later only when a single file becomes materially harder to navigate. A possible later structure is:

```text
src/styles/
  tokens.css
  base.css
  components.css
  print.css
  site.css
```

The central design values and component definitions must remain authoritative after any split.

## 11. Styling boundaries

Do not distribute arbitrary style classes across component call sites.

Avoid patterns such as:

```tsx
<Card className="rounded-xl border px-6 py-8 shadow-sm">
```

or:

```tsx
<div className="flex gap-4 items-center mt-6">
```

when the same layout can be expressed through a standardized component:

```tsx
<Inline gap="medium" align="center">
```

or:

```tsx
<Stack gap="large">
```

Section-specific classes may be used when a section has a genuinely unique document layout. These classes must remain limited to structural layout and must not redefine shared components such as cards, buttons, headings, links, tags, or tables.

Do not define local versions of shared visual elements inside section components.

Do not use inline `style` attributes.

Do not import the main stylesheet from individual components.

## 12. UI boundary enforcement

Add a lightweight architectural policy check:

```text
scripts/check-ui-boundaries.mjs
```

The check should reject clear violations such as:

* inline `style={{ ... }}` attributes;
* arbitrary `className` overrides passed to shared UI components;
* direct imports of `site.css` outside `src/app/mountPage.tsx`;
* raw `<button>` elements outside the shared button component;
* raw React anchors outside the shared link component;
* raw primary headings outside the shared heading component;
* repeated local implementations of standardized controls.

The check may use straightforward source scanning. It does not require a custom compiler, complex AST framework, or dedicated lint plugin unless simple scanning proves inadequate.

Run this check as part of the standard validation command.

The purpose of this check is to preserve centralized styling and behavior as agents modify the site.

## 13. Page composition and mounting

Each HTML entry document links the central stylesheet in its head, so the page background and layout are available before the React module loads. A small inline bootstrap script applies the saved theme preference before that stylesheet can paint. Each entry also supplies browser-native prerender rules for the other three canonical routes. Prerendering is a progressive performance enhancement: the browser may decline it to preserve device resources or data, and unsupported browsers retain ordinary document navigation. After Vite writes the production entries, the static-render script loads the existing page compositions through Vite's SSR pipeline, writes their semantic output into each root element, and generates root `robots.txt`, `sitemap.xml`, `llms.txt`, and `work-profile.v1.json` from their canonical sources. Every entry then loads one trivial TypeScript entry file, which calls `mountPage` to reconcile the theme preference, validate the root element, and hydrate the static markup under `StrictMode`. Development entries retain an empty root and use client rendering.

`SiteShell` and `SiteHeader` own shared page chrome. The full identity, professional facts, contact links, navigation, and theme controls remain present on every page for visual and informational continuity. On the CV, the name is the document `h1`; on supporting pages it is a normal link to the CV so the page title remains the single `h1`. The print action remains CV-only.

Page components choose major sections and their order without duplicating navigation, mount behavior, content-rendering logic, or shared controls.

`SiteShell` owns one explicit main-content boundary. That boundary determines the shared page width and horizontal centering for every page; its behavior must not depend on whether the page's first child happens to be a `Stack`, `MarkdownDocument` or another document component. The sidebar and main content use the same responsive block-start spacing token so their first content aligns when presented as columns. `Stack` owns only arrangement and gaps between its children.

All approved prose is visible in normal document flow. The site does not use expandable content, accordions, tabs, or another disclosure replacement.

## 14. Content types

Use TypeScript to enforce the content structure.

A provisional model may include:

```ts
type TextBlock = readonly string[];

type ContentLink = {
  label: string;
  href: string;
};

type Experience = {
  id: string;
  organization: string;
  role: string;
  start: string;
  end: string | null;
  summary: TextBlock;
  highlights: readonly string[];
  links?: readonly ContentLink[];
};

type CvContent = {
  identity: {
    name: string;
    title?: string;
    location?: string;
  };

  contact: {
    email?: string;
    links: readonly ContentLink[];
  };

  introduction: TextBlock;
  experience: readonly Experience[];
  education: readonly EducationEntry[];
};
```

The exact model should follow the real content rather than attempting to anticipate every future entry.

Do not preserve fields for removed sections merely because an earlier model included them. Add evidence or project types when a real rendered surface requires them.

Preserve explicit content ordering through arrays.

Use optional fields where entries legitimately differ.

Keep dates and links structured.

Do not force substantial prose into unnecessarily small fragments merely to increase structural purity.

Do not add runtime schema validation while content remains trusted TypeScript stored in the repository. Reconsider runtime validation only if content later moves to JSON, YAML, a CMS, or another external source.

## 15. Accessibility and document semantics

Use semantic document elements:

* `header`;
* `nav`;
* `main`;
* `section`;
* `article`;
* `footer`;
* correctly ordered heading levels.

Use native elements where they provide the required behavior.

Requirements include:

* keyboard-accessible navigation;
* visible focus states;
* meaningful link text;
* sufficient contrast;
* no information communicated only through color;
* correct accessible names for controls;
* support for reduced-motion preferences;
* useful document structure without reliance on visual layout alone.

Automated accessibility checks are the routine validation baseline. Focused
manual keyboard or visual inspection is required only when a change affects
behavior automation cannot establish, evidence suggests a defect, or an
explicit release review requires it.

## 16. Responsive behavior

Support narrow mobile layouts and ordinary desktop widths.

Use normal document flow wherever possible.

Preserve readable line lengths.

Avoid horizontal overflow except where a deliberate data table requires controlled scrolling.

Navigation may adapt for narrow screens, but access to primary sections must remain direct and keyboard accessible.

Do not hide substantive content solely because the viewport is narrow.

Responsive breakpoints must follow real layout needs rather than a large predefined device scale.

## 17. Print behavior

Include print styling from the initial implementation.

Printed output must:

* preserve readable typography;
* remove navigation controls and irrelevant decorative elements;
* avoid clipped content;
* avoid unnecessary backgrounds;
* show contact information clearly;
* prevent awkward page breaks where practical;
* produce a usable CV when printed or saved as PDF.

The print layout does not need to reproduce the screen layout exactly.

The production build generates `dist/Mikko-Finell-CV.pdf` from the static CV HTML through Playwright Chromium using the same central print stylesheet. The generated PDF uses A4 pages, exposes the full GitHub and LinkedIn URLs only in print, and enables Chromium's tagged-PDF output. Chromium uses the canonical HTML document title for the PDF title; its PDF API does not expose author or subject fields, so no unsupported metadata claim is made. The PDF must remain text-extractable in the same logical document order and contain the visible CV contact information.

## 18. Validation

Provide one standard validation command:

```text
npm run check
```

It should run the relevant checks in a stable order:

1. UI boundary policy check;
2. formatting and linting;
3. TypeScript type checking;
4. unit tests;
5. production build;
6. browser smoke tests where appropriate for the execution environment.

Required automated validation includes:

* Biome formatting and linting;
* strict TypeScript checking;
* successful Vite production build;
* generated PDF presence, A4 page count, text extraction, title metadata, and tagged-PDF output;
* UI boundary enforcement;
* page-load smoke test;
* primary navigation and current-page checks on every page;
* successful direct navigation and reload for every production path;
* absence of unexpected browser console errors;
* automated accessibility scan.

Add unit tests only for genuine logic such as:

* date formatting;
* sorting;
* filtering;
* content validation;
* derived navigation;
* transformation of layered content.

Tests must cover durable invariants and observable behavior, not implementation choreography. Assert public outcomes and accessibility semantics rather than component trees, internal helper calls, incidental DOM nesting, class names, source substrings, or intermediate steps unless that detail is itself an explicit contract.

Dedicated architectural policy checks may inspect source boundaries when source enforcement is their stated purpose.

Do not add tests that merely assert that fixed text appears in a static component.

Do not add broad snapshot tests of the complete page.

Do not impose a coverage target.

Routine changes rely on the automated validation contract and do not require a
duplicate manual browser pass. Do not use browser inspection merely to
reconfirm passing automated assertions.

Focused manual inspection is appropriate when a change materially affects
visual layout or print presentation in a way automation cannot establish, or
when evidence suggests a visual defect. Limit the inspection to the affected
surface.

A full manual release review is performed only for an explicit
release-candidate task or when requested by the user. It includes:

* desktop layout;
* narrow mobile layout;
* keyboard navigation;
* external links;
* print output;
* comparison against the approved canonical content.

## 19. Build and deployment

Use GitHub Actions to validate and deploy the site.

The production pipeline must:

1. check out the repository;
2. install dependencies from the lockfile;
3. run the standard validation command;
4. build the Vite application, static-render every canonical route, and generate the CV PDF;
5. publish the generated `dist/` directory to GitHub Pages.

Deploy only from a passing build on the designated production branch.

The deployed artifact contains static files only.

The root `robots.txt` permits every crawler through `User-agent: *` and `Allow: /`, and includes the absolute sitemap URL. Its comment records that AI systems are welcome to crawl the public site for search, retrieval, user-directed assistance, and model training; the wildcard allow directive remains the operative protocol instruction. The root XML sitemap is generated from the canonical routes and lists only their absolute canonical URLs. It omits `lastmod`, `changefreq`, and `priority` because no reliable significant-content timestamp is available and the latter fields add no useful signal.

The root `work-profile.v1.json` is a deterministic, current Work Profile artifact with schema `work-profile/v1`, a numeric profile revision, provenance, and a SHA-256 content digest. Consumers fetch and validate it, then store an exact snapshot together with the artifact URL, revision, and digest in their own workflow state. Resume work from that snapshot without re-fetching; the public artifact remains a current source rather than a mutable replacement for historical records.

The root `llms.txt` is an experimental Markdown resource index generated from the canonical identity, route metadata, discovery URLs, and PDF path. It expresses the owner's public-access preference but does not guarantee crawler behavior, ranking, attribution, or training ingestion. It complements rather than replaces `robots.txt`, the sitemap, or the statically rendered pages; no `llms-full.txt`, `agents.txt`, or `ai.txt` artifact is published without an approved scope change.

Repository configuration must account for the GitHub Pages base path used by the site. The user site at `mikko-finell.github.io` uses the root path.

Do not store secrets, private credentials, or confidential information in frontend source or build-time environment variables included in the client bundle.

## 20. Completion boundary

The multi-page implementation is complete when:

* all approved content is represented through the appropriate canonical content module;
* no substantial content is duplicated inline across components;
* the page structure is complete;
* every direct page route and primary navigation link works;
* shared visual elements use the standardized component system;
* global style changes can be made through central tokens or shared component definitions;
* desktop, mobile, and print layouts are usable;
* accessibility and browser smoke checks pass;
* the production build deploys reproducibly to GitHub Pages;
* no known defect materially obstructs reading, navigation, or contact.

Do not add infrastructure, abstractions, pages, interactions, or testing machinery beyond what the actual site requires.
