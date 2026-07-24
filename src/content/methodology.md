# Working methodology

My workflow methodology is AI-first. I use AI at every step from planning to implementation to testing and verification. I start by deeply planning the codebase architecture by having several frontier models adversarially duel about ideas to find the best, most robust and practical and radically innovative and accretive and cohesive ideas possible. We then iteratively refine those ideas over several rounds of critique and stress testing. The specifications which emerge from this process are then turned into roadmaps and plans which explain in detail how to convert the ideas into reality. We then turn those plans into concretely actionable implementation tasks which my agents start to work through.

## Delivery

Every round of implementation is followed by fresh-eyes corrective editorial code review by multiple agents. These reviews are not just there to check whether the task technically passed its tests, they look at whether the implementation actually fits the architecture, whether it introduced unnecessary complexity, whether it misunderstood the purpose of the feature, whether there are missing cases, whether the structure will remain usable as the system grows, and whether the agent solved the literal task in a way that damages the larger project.

Testing policy is equally rigorous. Every invariant is covered by tests at the appropriate level whether that is unit tests, integration tests or e2e, and implementation is not considered complete because one narrow test file happens to pass. The standard finalization procedure runs the full relevant verification stack, including strict type checking, static analysis, linting, compilation where applicable, architectural checks and the test suites which can expose interactions outside the immediately changed component.

My projects always use the strictest practical linting rules and every warning is mechanically treated as a hard error that must be fixed while finalizing a task before committing. On top of that we enforce architectural rules which are difficult to capture through standard linting by encoding them into scripts that are part of the same finalization procedure.

I also run agents whose sole task is searching the codebase for defects. They investigate the implementation without being constrained to the feature currently under development, identify behaviour which appears wrong or structurally dangerous, write regression tests to prove the bug is real, and then fix it. Refactoring and technical-debt work is handled as explicit work rather than something we vaguely intend to return to later, and agents are regularly sent through the system to find duplicated logic, weak abstractions, obsolete compatibility layers, accidental complexity and places where the implementation has drifted away from the architecture.

This is the process through which I produce software. I decide what we are trying to build, what properties it needs to have, which ideas are worth keeping, how the project should be structured, how much complexity is justified, what quality bar applies, and whether the result is actually done. The agents do most of the direct implementation, testing, investigation, review and correction work inside that process.

I have used this methodology to build substantial systems in Go, TypeScript/React, Python and Rust. It also lets me work effectively in unfamiliar technologies and existing codebases because the process is based on investigation, explicit reasoning, executable verification and repeated review rather than depending on memorized framework syntax.

## Application UI design

Application UI design is one of my strongest areas. I am very particular about information hierarchy, workflow structure, visual density, terminology, interaction details and whether the whole application feels logical when someone actually has to use it repeatedly. I tend to prefer compact interfaces which expose a lot of useful functionality without degenerating into clutter, but compact does not mean cramming controls together until the user has to decipher the screen.

I design application UIs and operational workflows, particularly systems where the user needs access to a lot of connected information and functionality without the interface becoming confusing or physically enormous.

Current agents are often good at implementing established HTML, CSS and component patterns, but they are still not reliably capable of looking at a rendered application and deciding whether it actually looks good, whether the hierarchy is wrong, whether the page wastes half the available space, whether related controls feel disconnected, whether the interaction flow is annoying, or whether the whole thing has the visual character of a generic admin template assembled by committee. I guide that work directly through repeated visual inspection and iteration.

During my time at Edupower I frequently received positive feedback specifically about the UIs I designed being logical, intuitive, compact and functional. This was not separate design work handed over to an implementation team. I worked out how the business process should map into screens and interactions and then built the systems around that.
