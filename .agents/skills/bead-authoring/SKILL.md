---
name: bead-authoring
description: Create, materially update, review, close, or normalize Beads issues for this CV and portfolio repository. Use for any bead mutation that needs a clear bv-visible working brief, accurate project references, proportional acceptance criteria, or protection of canonical CV content and approved wording.
---

# Bead Authoring

## Core rule

Make `description` the primary working brief. Keep it sufficient for triage,
planning, implementation, review, and handoff when viewed in `bv`.

Do not hide critical decisions or instructions only in `design`, `notes`, or
`acceptance_criteria`. Those fields may add detail, but losing them must not
make the description misleading.

Keep the brief proportional. A small documentation or implementation task may
need only a few compact sections. Use longer briefs only when the scope,
constraints, dependencies, or decision surface genuinely require them.

## Preserve project and content authority

Read `docs/architecture.md` before authoring a bead that affects
implementation, content structure, styling, validation, accessibility, or
deployment. Treat it as authoritative.

Discover other context with `rg --files docs` followed by targeted heading and
content searches. Do not assume a documentation index exists and do not read
every document when focused discovery is sufficient.

Beads describe work; they do not own CV wording or factual content.

- Do not invent, rewrite, compress, or improve self-descriptive prose in a
  bead.
- Reference approved source material or the relevant canonical field in
  `src/content/cv.ts` once it exists.
- Quote only the minimum exact wording required to define the task.
- Use an obvious neutral placeholder when approved wording is unavailable.
- Do not copy substantial canonical CV content into a bead merely to make the
  brief self-contained. Make the work and authority boundary self-contained
  instead.

## Field roles

- `description`: visible working brief containing the goal or question,
  relevant approved context, scope, constraints, non-goals, validation or
  completion conditions, and references needed to understand the work.
- `design`: extended rationale, alternatives, tradeoffs, examples, and edge
  cases. Never make it the only source of marching orders.
- `acceptance_criteria`: compact, concrete completion checks. Prefer observable
  outcomes over implementation choreography.
- `notes`: commit links, historical context, implementation notes, review
  evidence, and closure bookkeeping.

If losing `design` or `acceptance_criteria` would make the bead misleading,
strengthen `description`.

## References

When durable context governs the work, include a `References:` section in the
description. Use exact repository paths and state why each source matters.

```text
References:
- docs/architecture.md: component boundaries and validation requirements.
- src/content/cv.ts: canonical content fields rendered by the affected section.
```

References supplement an adequate working brief. They do not replace it, and
the bead does not replace the referenced authority.

## Titles and metadata

- Use action-oriented titles for tasks, bugs, and documentation work.
- Use explicit questions for unresolved design or content decisions.
- Choose the narrowest accurate issue type and a priority justified by impact
  and sequencing.
- Add labels only when they improve filtering or planning.
- Add dependencies only for genuine prerequisites. Record tentative
  relationships in the description instead of over-constraining the graph.

## Templates

Use only the headings that improve the bead. Omit empty or redundant sections.

### Project or workstream epic

Use sparingly for a durable grouping that will contain multiple bounded
outcomes.

```text
Purpose:
Durable direction:
Constraints:
Unresolved questions:
Candidate outcomes:
Selection criteria:
References:
```

Avoid status summaries that will quickly become stale.

### Outcome epic

Use for a bounded, completable site or repository outcome.

```text
Outcome:
Relevant foundation:
Approved scope:
Constraints:
Non-goals:
Completion shape:
References:
```

### Design or content decision

Use issue type `question` while the decision is unresolved.

```text
Question:
Decision surface:
Approved decisions:    # add or update once settled
Authority or source boundary:
Constraints:
Non-goals:
Follow-up implications:
References:
```

Before closing, update the description so the approved decision is visible in
`bv`. Put deeper rationale in `design` only after the visible brief is
adequate. A content decision may select supplied wording, but must not author
new self-descriptive prose.

### Implementation task

```text
Goal:
Relevant approved context:
Scope:
Non-goals:
Expected validation:
Completion criteria:
References:
```

Use `npm run check` when the standard validation command exists. During
iteration, name the smallest relevant checks. Include manual accessibility,
responsive, print, link, or canonical-content comparison only when applicable.

### Documentation or content-source task

```text
Goal:
Authority or supplied source:
Scope:
Non-goals:
Review / validation:
Completion criteria:
References:
```

Describe content movement, selection, structure, or missing input without
rewriting the content itself.

### Bug

```text
Observed behavior:
Expected behavior:
Evidence or reproduction:
Scope and constraints:
Non-goals:
Validation / completion criteria:
References:
```

Record observed facts separately from suspected causes until the cause is
verified.

## Status and dependency policy

- Keep accepted roadmap work `open`, including work waiting on a real
  prerequisite.
- Represent prerequisites with dependencies; never use `deferred` merely to
  curate `br ready`.
- Reserve `deferred` for speculative, unselected, or explicitly parked work.
- When deferred work is selected, normalize its brief and change it to `open`.
- Use epics only when the grouping adds real planning value; do not create an
  elaborate hierarchy for a compact task list.

## Workflow

1. Start routine work selection with `br ready --json`.
2. Use `bv --robot-*` only when graph-aware prioritization, dependency context,
   or planning diagnostics add value. Never launch bare `bv` from an agent
   session.
3. Inspect a selected bead with `br show <id> --json` before changing it.
4. Read the relevant authority and source material before authoring or
   materially updating the brief.
5. Normalize an inadequate important bead before implementation or design
   work. Normalize on touch; do not mass-rewrite historical beads without an
   explicit request.
6. After planning or dependency changes, run `br ready --json` and verify that
   the intended next work is actionable.
7. Run `br sync --flush-only` after bead mutations.

When closing a design or content decision, record the approved outcome in the
description before closing. When closing any bead, use a concise factual close
reason and preserve the bead as a useful historical record.
