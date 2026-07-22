# Architecture

## 1. Project definition

The project is a compact personal CV and technical portfolio implemented as a single-page static website.

The site presents:

* professional experience;
* production capabilities;
* selected projects;
* working methodology;
* education and relevant background;
* contact information and external links.

The site is structured as a technical document with clear navigation and distinct sections. It prioritizes useful information, scanning, readability, and factual precision.

The site is built as a React application using strict TypeScript and Vite. The production build consists entirely of static HTML, CSS, JavaScript, and assets deployed through GitHub Pages.

No runtime server, database, authentication system, or backend service is required.

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

Do not add a client-side router unless the site later contains multiple independently useful pages. Use normal document sections and fragment links for the initial site.

Do not add a global state-management library. Static content is not application state. Use local state only for actual interface behavior such as expandable sections.

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

All substantial CV content must be concentrated in one canonical content module:

```text
src/content/cv.ts
```

The content module contains:

* identity and profile information;
* contact links;
* introductory content;
* capabilities;
* professional experience;
* project descriptions;
* education;
* working-methodology content;
* supporting links;
* reusable labels or factual fragments where appropriate.

Content types may be defined separately:

```text
src/content/types.ts
```

Components must import and render content from the canonical content module. Career facts, project facts, dates, links, claims, and substantial prose must not be duplicated inline across components.

When the same text or factual value appears in multiple places, those locations must reference the same canonical field.

Content should remain grouped by subject rather than being decomposed into a global dictionary of individual sentences. Shared fragments should be extracted only when they are genuinely reused.

The content module is the authority for wording and factual data. Components control presentation, layout, and interaction. Components do not reinterpret or rewrite the supplied material.

## 4. Layered content

Content may provide multiple levels of detail for the same subject.

Use additive layers such as:

```ts
type LayeredContent = {
  short?: string;
  summary: readonly string[];
  details?: readonly string[];
};
```

The layers serve different presentation contexts:

* `short` provides a compact description for metadata, overview text, or highly constrained layouts;
* `summary` provides the normal visible description;
* `details` provides additional material shown when the reader expands the section.

Expanded content consists of the summary followed by the additional details. Do not maintain a separate full version that duplicates the summary.

Example:

```ts
workflow: {
  short: "A concise approved description.",

  summary: [
    "The normal visible explanation.",
    "A second summary paragraph."
  ],

  details: [
    "Additional procedural detail.",
    "Further information for technical readers."
  ]
}
```

The interface may render this as:

```tsx
<ExpandableContent
  summary={cvContent.workflow.summary}
  details={cvContent.workflow.details}
/>
```

Do not generate compressed summaries automatically at runtime. Each content level must contain deliberately written and approved text.

Not every section requires every level. A small factual entry may contain only a summary. A substantial workflow or project description may contain short, summary, and detailed forms.

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

The initial site is one coherent document.

Use the following provisional section structure:

1. site header and primary navigation;
2. introduction and current professional focus;
3. production capabilities;
4. professional experience;
5. selected projects;
6. working methodology;
7. education and relevant background;
8. contact information and external links.

Each major section must have a stable fragment identifier.

Example:

```text
#capabilities
#experience
#projects
#methodology
#education
#contact
```

Primary navigation links directly to these sections.

Important information must remain available without modals, carousels, hover-only interactions, or mandatory progressive disclosure.

Expandable sections may be used for additional depth, but their collapsed state must retain a meaningful summary.

The initial viewport must contain actual identifying and professional information. It must not be occupied primarily by decorative layout, atmospheric text, or a large empty hero treatment.

## 7. Source structure

Use the following provisional source layout:

```text
src/
  content/
    cv.ts
    types.ts

  ui/
    Button.tsx
    Card.tsx
    DataTable.tsx
    Expandable.tsx
    Heading.tsx
    Inline.tsx
    Link.tsx
    Section.tsx
    Stack.tsx
    Tag.tsx

  components/
    SiteHeader.tsx
    IntroductionSection.tsx
    CapabilitiesSection.tsx
    ExperienceSection.tsx
    ExperienceCard.tsx
    ProjectsSection.tsx
    ProjectCard.tsx
    MethodologySection.tsx
    EducationSection.tsx
    ContactSection.tsx

  styles/
    site.css

  App.tsx
  main.tsx

scripts/
  check-ui-boundaries.mjs

tests/
  site.spec.ts

docs/
  architecture.md
```

This structure is provisional. Add files only when the implementation requires them.

The responsibilities are:

* `content/` contains canonical content and its types;
* `ui/` contains standardized reusable interface primitives;
* `components/` contains CV-specific document sections and assemblies;
* `styles/site.css` contains the central visual system;
* `scripts/` contains lightweight architectural policy checks;
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
* expandable regions;
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
* direct imports of `site.css` outside the application entry point;
* raw `<button>` elements outside the shared button component;
* independent disclosure controls outside the shared expandable component;
* repeated local implementations of standardized controls.

The check may use straightforward source scanning. It does not require a custom compiler, complex AST framework, or dedicated lint plugin unless simple scanning proves inadequate.

Run this check as part of the standard validation command.

The purpose of this check is to preserve centralized styling and behavior as agents modify the site.

## 13. Expandable content

Use a shared expandable component for optional detail.

The component owns:

* the disclosure button;
* expanded and collapsed labels;
* `aria-expanded`;
* keyboard behavior;
* focus behavior;
* icon treatment;
* spacing;
* animation;
* reduced-motion behavior.

Example usage:

```tsx
<Expandable
  summary={<RichText paragraphs={entry.summary} />}
>
  <RichText paragraphs={entry.details} />
</Expandable>
```

Do not build independent expand-and-collapse controls inside experience, project, or methodology sections.

Expandable content must remain understandable in its collapsed state.

Printed output should render the content level selected by the print design. It may show summaries only or include expanded details where this remains readable.

## 14. Content types

Use TypeScript to enforce the content structure.

A provisional model may include:

```ts
type TextBlock = readonly string[];

type LayeredContent = {
  short?: string;
  summary: TextBlock;
  details?: TextBlock;
};

type Link = {
  label: string;
  href: string;
};

type Experience = {
  id: string;
  organization: string;
  role: string;
  start: string;
  end: string | null;
  content: LayeredContent;
  highlights?: readonly string[];
  technologies?: readonly string[];
  links?: readonly Link[];
};

type Project = {
  id: string;
  name: string;
  status?: string;
  content: LayeredContent;
  technologies?: readonly string[];
  links?: readonly Link[];
};

type CvContent = {
  identity: {
    name: string;
    title?: string;
    location?: string;
  };

  contact: {
    email?: string;
    links: readonly Link[];
  };

  introduction: LayeredContent;
  capabilities: readonly CapabilityGroup[];
  workflow: LayeredContent;
  experience: readonly Experience[];
  projects: readonly Project[];
  education: readonly EducationEntry[];
};
```

The exact model should follow the real content rather than attempting to anticipate every future entry.

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
* correct expanded and collapsed states;
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
* UI boundary enforcement;
* page-load smoke test;
* primary navigation checks;
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
* expandable controls;
* external links;
* print output;
* comparison against the approved canonical content.

## 19. Build and deployment

Use GitHub Actions to validate and deploy the site.

The production pipeline must:

1. check out the repository;
2. install dependencies from the lockfile;
3. run the standard validation command;
4. build the Vite application;
5. publish the generated `dist/` directory to GitHub Pages.

Deploy only from a passing build on the designated production branch.

The deployed artifact contains static files only.

Repository configuration must account for the GitHub Pages base path used by the site. The user site at `mikko-finell.github.io` uses the root path.

Do not store secrets, private credentials, or confidential information in frontend source or build-time environment variables included in the client bundle.

## 20. Completion boundary

The initial implementation is complete when:

* all approved content is represented through the canonical content module;
* no substantial content is duplicated inline across components;
* the page structure is complete;
* primary navigation works;
* expandable sections work consistently;
* shared visual elements use the standardized component system;
* global style changes can be made through central tokens or shared component definitions;
* desktop, mobile, and print layouts are usable;
* accessibility and browser smoke checks pass;
* the production build deploys reproducibly to GitHub Pages;
* no known defect materially obstructs reading, navigation, or contact.

Do not add infrastructure, abstractions, pages, interactions, or testing machinery beyond what the actual site requires.
