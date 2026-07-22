# AGENTS.md

## Project authority

Read `docs/architecture.md` before planning or modifying the implementation.

`docs/architecture.md` defines the project structure, content authority, component boundaries, styling architecture, validation requirements, accessibility expectations, deployment model, and writing policy. Treat it as authoritative.

When implementation details conflict with the architecture, follow the architecture or report the conflict before proceeding. Do not silently reinterpret the project contract.

## Repository overview

This repository contains a compact personal CV and technical portfolio.

The site is a single-page static React application built with strict TypeScript and Vite and deployed through GitHub Pages.

The intended source structure is:

```text
src/
  content/
  ui/
  components/
  styles/
  App.tsx
  main.tsx

scripts/
tests/
docs/
```

The major responsibilities are:

* `src/content/` contains canonical CV content and content types.
* `src/ui/` contains standardized reusable interface primitives.
* `src/components/` contains CV-specific sections and assemblies.
* `src/styles/` contains the central styling system.
* `scripts/` contains lightweight project-policy checks.
* `tests/` contains focused automated tests.
* `docs/architecture.md` contains the authoritative project architecture.

Inspect the existing repository before adding files or dependencies. Preserve established structures that conform to the architecture.

## Working procedure

Before making changes:

1. Read `docs/architecture.md`.
2. Inspect the relevant content, components, shared UI primitives, styles, and tests.
3. Identify the existing canonical source for the behavior or content being changed.
4. Prefer modifying the existing central definition over introducing a local exception.
5. Keep the change limited to the requested scope.

During implementation:

* Follow existing naming and structural patterns.
* Keep content, presentation, and reusable UI responsibilities separate.
* Reuse existing components and design tokens.
* Add abstractions only when a real repeated need exists.
* Keep dependencies minimal.
* Preserve static GitHub Pages compatibility.
* Do not introduce a backend, runtime server, database, router, state-management framework, or styling framework without an explicit architectural change.

Before reporting completion:

1. Run the checks relevant to the change.
2. Run the project’s standard validation command when available.
3. Inspect the final diff.
4. Confirm that canonical content has not been duplicated.
5. Confirm that shared UI components have not been bypassed or locally restyled.
6. Confirm that no self-descriptive prose was invented or rewritten.
7. Report any check that could not be run and the reason.

## Canonical content

All substantial CV content belongs in:

```text
src/content/cv.ts
```

Supporting content types belong in:

```text
src/content/types.ts
```

Career facts, experience descriptions, project descriptions, dates, links, capabilities, methodology descriptions, education details, and other substantial prose must be rendered from the canonical content module.

Do not place substantial CV prose or duplicated factual data directly inside React components.

When the same wording or value is used in more than one location, reference the same canonical field.

Keep content grouped under the subject it describes. Do not decompose every sentence into a global string dictionary merely for structural uniformity.

Use additive content levels where appropriate:

* `short` for compact contexts;
* `summary` for the normal visible presentation;
* `details` for additional expandable material.

Expanded content consists of `summary` followed by `details`. Do not maintain separate full copies that repeat the summary.

Do not automatically generate or compress one content level from another. Each level contains deliberately supplied text.

Components control rendering and interaction. They do not reinterpret, paraphrase, improve, or rewrite the content.

Use obvious neutral placeholders when required content has not yet been supplied.

## Shared UI components

Recurring visual and interactive elements must be implemented through shared components in `src/ui/`.

Examples include:

* buttons;
* links;
* headings;
* cards;
* tags;
* tables;
* sections;
* expandable regions;
* vertical stacks;
* horizontal groups.

A shared component owns its:

* semantic markup;
* appearance;
* spacing;
* supported variants;
* interactive states;
* accessibility behavior;
* responsive behavior.

Call sites provide content and select supported semantic variants.

Preferred usage:

```tsx
<Card variant="outlined">
  ...
</Card>

<Heading level={2} size="section">
  Experience
</Heading>

<Stack gap="large">
  ...
</Stack>
```

Do not redesign shared components at their call sites.

Shared UI components must not normally expose arbitrary styling escape hatches such as:

```ts
className?: string;
style?: React.CSSProperties;
```

Do not pass local utility classes, custom borders, padding, radii, shadows, colors, or inline styles into shared components.

When a recurring design distinction is required:

1. determine whether it belongs in a design token, the shared component definition, or a meaningful component variant;
2. update that central definition;
3. reuse the resulting standard everywhere it applies.

Do not create one-off variants to disguise local styling.

Document-specific components in `src/components/` may define unique structural layout, but they must use shared primitives for recurring surfaces, controls, headings, links, tags, tables, and disclosure behavior.

Do not independently recreate an existing UI primitive inside a document component.

## Styling

Use the central stylesheet defined by the architecture.

The styling system must centralize:

* typography;
* spacing;
* widths;
* colors;
* borders;
* corner radii;
* control dimensions;
* component states;
* responsive behavior;
* print behavior.

Use CSS custom properties for shared design values.

Changing a shared token or component definition must update every relevant instance.

Do not scatter equivalent literal values through unrelated selectors.

Do not use inline `style` attributes.

Do not import the central stylesheet from individual components.

Do not add Tailwind, CSS-in-JS, CSS modules, or another styling system unless the architecture is deliberately revised.

Use layout primitives such as `Stack` and `Inline` instead of repeatedly implementing local flexbox and spacing combinations.

Section-specific CSS may define genuinely unique document layout. It must not redefine the appearance or behavior of shared UI components.

## Component design

Create components for meaningful concepts.

Good component boundaries include:

* `ExperienceCard`;
* `ProjectCard`;
* `ExperienceSection`;
* `MethodologySection`;
* `Expandable`;
* `DataTable`.

Avoid abstraction layers made primarily from vague wrappers such as:

* `Box`;
* `Wrapper`;
* `ContainerInner`;
* `GenericPanel`;
* `TextElement`.

Do not build a universal component with a large collection of presentation props intended to support every possible layout.

Use this hierarchy:

```text
design tokens
    ↓
shared UI primitive
    ↓
document component
    ↓
canonical content
```

Keep ordinary component call sites simple and declarative.

## Self-descriptive writing policy

Do not write or rewrite self-descriptive prose.

Do not invent:

* taglines;
* hero copy;
* summaries;
* positioning statements;
* section introductions;
* calls to action;
* connective marketing copy.

Do not paraphrase supplied material into more conventional professional language.

Do not make supplied prose punchier, cleaner, calmer, more memorable, more reassuring, or more marketable.

Use existing approved wording verbatim or use an obvious neutral placeholder.

The following patterns are forbidden:

* “It is not X. It is Y.”
* “I do not just X. I Y.”
* “Beyond X.”
* “Where X meets Y.”
* “Proof, not promises.”
* slogan-like sentence fragments;
* oversized claims presented as visual statements;
* generic startup, agency, portfolio, or LinkedIn language;
* language that reassures the reader that AI is only an assistant.

Do not create a giant hero section.

Do not use enormous headings, decorative statement cards, excessive whitespace, or a sequence of one-sentence marketing sections.

The initial viewport must contain useful identifying and professional information.

Treat the site as a compact technical document with navigation, not as a marketing landing page.

Neutral interface labels may be written where needed. Examples include:

* `Experience`;
* `Projects`;
* `Education`;
* `Contact`;
* `Details`;
* `Expand`;
* `Collapse`.

## Accessibility and interaction

Use semantic HTML and native browser behavior where appropriate.

Maintain:

* correct heading order;
* keyboard-accessible controls;
* visible focus states;
* meaningful link labels;
* sufficient contrast;
* correct accessible names;
* correct expanded and collapsed states;
* reduced-motion support;
* usable narrow-screen behavior;
* usable print output.

Use the shared expandable component for optional detail. Do not create independent disclosure implementations in individual sections.

Important information must remain meaningful when expandable details are collapsed.

Do not hide substantive content behind hover-only interactions, carousels, modals, or decorative effects.

## Testing and validation

The intended standard validation command is:

```sh
npm run check
```

Once established, it must cover the applicable project checks, including:

* UI-boundary policy checks;
* formatting and linting;
* strict TypeScript checking;
* focused unit tests;
* production build;
* browser smoke tests;
* automated accessibility checks.

During initial scaffolding, use the commands that actually exist and establish the standard validation command as part of the project setup.

Add unit tests only for genuine logic such as:

* date formatting;
* sorting;
* filtering;
* content validation;
* derived navigation;
* layered-content transformations.

Do not add tests that merely assert that fixed text renders.

Do not add full-page snapshot tests.

Do not introduce a coverage target.

Browser tests should focus on consequential behavior:

* page loading;
* primary navigation;
* expandable controls;
* critical links;
* browser console errors;
* basic accessibility scanning.

Run the smallest relevant checks during iteration and the complete available validation suite before completion.

## Dependencies and scope

Use existing platform and project capabilities before adding dependencies.

Before adding a dependency:

1. identify the concrete requirement;
2. confirm that the requirement is not already covered by React, TypeScript, Vite, the browser platform, or an installed package;
3. choose the smallest appropriate dependency;
4. avoid packages that introduce a second competing architecture.

Do not add infrastructure or abstractions for hypothetical future requirements.

Do not introduce:

* Next.js;
* Tailwind;
* a client-side router;
* a global state library;
* a component framework;
* a CMS;
* runtime schema validation for trusted TypeScript content;
* visual regression infrastructure;
* backend services;

unless the project architecture is explicitly revised to require them.

## Commit messages

When a commit implements a bead, start the subject with its exact ID:

```text
cv-123: add the initial application scaffold
```

For work without a bead, use `feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `build:`, `ci:`, `chore:`, or `perf:`.

Use a concise, lowercase imperative summary without a final period. Prefer one bead per commit.

## Completion reports

Completion reports must state:

* what changed;
* which central content, component, or style definitions were modified;
* which checks were run and their results;
* any checks that could not be run;
* any remaining limitations or unresolved issues.

Do not claim completion when required checks are failing.

Do not conceal architectural deviations. Report them clearly.

<!-- bv-agent-instructions-v2 -->

---

## Beads Workflow Integration

### Using bv as an AI sidecar

bv is a graph-aware triage engine for Beads projects (.beads/beads.jsonl). Instead of parsing JSONL or hallucinating graph traversal, use robot flags for deterministic, dependency-aware outputs with precomputed metrics (PageRank, betweenness, critical path, cycles, HITS, eigenvector, k-core).

**Scope boundary:** bv handles *what to work on* (triage, priority, planning). `br` handles creating, modifying, and closing beads.

**CRITICAL: Use ONLY --robot-* flags. Bare bv launches an interactive TUI that blocks your session.**

#### The Workflow: Start With Triage

**`bv --robot-triage` is your single entry point.** It returns everything you need in one call:
- `quick_ref`: at-a-glance counts + top 3 picks
- `recommendations`: ranked actionable items with scores, reasons, unblock info
- `quick_wins`: low-effort high-impact items
- `blockers_to_clear`: items that unblock the most downstream work
- `project_health`: status/type/priority distributions, graph metrics
- `commands`: copy-paste shell commands for next steps

```bash
bv --robot-triage        # THE MEGA-COMMAND: start here
bv --robot-next          # Minimal: just the single top pick + claim command

# Token-optimized output (TOON) for lower LLM context usage:
bv --robot-triage --format toon
```

Before claiming, verify current state with `br show <id> --json` or `br ready --json`. `recommendations` can include graph-important blocked or assigned work; only `quick_ref.top_picks` and non-empty `claim_command` fields represent claimable work.

#### Other bv Commands

| Command | Returns |
|---------|---------|
| `--robot-plan` | Parallel execution tracks with unblocks lists |
| `--robot-priority` | Priority misalignment detection with confidence |
| `--robot-insights` | Full metrics: PageRank, betweenness, HITS, eigenvector, critical path, cycles, k-core |
| `--robot-alerts` | Stale issues, blocking cascades, priority mismatches |
| `--robot-suggest` | Hygiene: duplicates, missing deps, label suggestions, cycle breaks |
| `--robot-diff --diff-since <ref>` | Changes since ref: new/closed/modified issues |
| `--robot-graph [--graph-format=json\|dot\|mermaid]` | Dependency graph export |

#### Scoping & Filtering

```bash
bv --robot-plan --label backend              # Scope to label's subgraph
bv --robot-insights --as-of HEAD~30          # Historical point-in-time
bv --recipe actionable --robot-plan          # Pre-filter: ready to work (no blockers)
bv --recipe high-impact --robot-triage       # Pre-filter: top PageRank scores
```

### br Commands for Issue Management

```bash
br ready              # Show issues ready to work (no blockers)
br list --status=open # All open issues
br show <id>          # Full issue details with dependencies
br create --title="..." --type=task --priority=2
br update <id> --status=in_progress
br close <id> --reason="Completed"
br close <id1> <id2>  # Close multiple issues at once
br sync --flush-only  # Export DB to JSONL
```

### Workflow Pattern

1. **Triage**: Run `bv --robot-triage` to find the highest-impact actionable work
2. **Claim**: Use `br update <id> --status=in_progress`
3. **Work**: Implement the task
4. **Complete**: Use `br close <id>`
5. **Sync**: Always run `br sync --flush-only` at session end

### Key Concepts

- **Dependencies**: Issues can block other issues. `br ready` shows only unblocked work.
- **Priority**: P0=critical, P1=high, P2=medium, P3=low, P4=backlog (use numbers 0-4, not words)
- **Types**: task, bug, feature, epic, chore, docs, question
- **Blocking**: `br dep add <issue> <depends-on>` to add dependencies

### Session Protocol

```bash
git status              # Check what changed
git add <files>         # Stage code changes
br sync --flush-only    # Export beads changes to JSONL
git commit -m "..."     # Commit everything
git push                # Push to remote
```

<!-- end-bv-agent-instructions -->
