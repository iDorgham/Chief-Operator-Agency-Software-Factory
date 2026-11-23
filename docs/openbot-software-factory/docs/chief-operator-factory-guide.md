# Chief Operator Agency and Software Factory Guide

## Purpose

Build one professional AI organization with one front door. The operator normally communicates only with the **Chief Operator**. The Chief Operator classifies the request, creates or locates the project context, delegates bounded work to the right team, reconciles results, presents decisions, and requests approval for consequential actions.

The system covers:

- Product strategy, research, planning, management and client operations.
- Web, dashboard, API, desktop and mobile application delivery.
- Architecture, frontend, backend, database, security, DevOps, performance, QA and analytics.
- Brand, UI/UX, graphic design and design systems.
- Marketing strategy, SEO, AEO, GEO, advertising and social media.
- Text, image and video briefs, production, review and delivery.
- Automation and AI-enabled workflows.
- Evidence-based audits, reviews, reporting and process improvement.

Coverage does not imply that every specialty is a permanent bot. Use a small set of persistent leads and invoke specialist skills or temporary workers only when a project needs them.

## Organization

```text
Operator
`-- Chief Operator
    |-- Product and Delivery
    |   |-- Product Lead
    |   `-- Delivery Manager
    |-- Software Factory
    |   |-- Software Lead / Implementer
    |   `-- Quality, Security and Release Lead
    |-- Creative Studio
    |   `-- Design and Content Lead
    |-- Growth Studio
    |   `-- Marketing and Growth Lead
    `-- Operations and Intelligence
        `-- Operations, Analytics and Improvement Lead
```

Start with eight persistent roles. Keep specialties such as mobile engineering, database optimization, motion design, paid-media buying, accessibility, localization and legal review as skills or human-expert gates until repeated usage justifies a persistent role.

### Chief Operator

Owns intake, routing, project-wide priorities, shared context, approval requests, conflict resolution and consolidated reporting. It does not silently expand scope or approve its own work.

### Product Lead

Owns discovery, business requirements, user journeys, product strategy, architecture decisions, specifications, acceptance criteria and change control.

### Delivery Manager

Owns milestones, dependencies, tickets, estimates, handoffs, risk tracking, progress, blockers and release coordination. It does not edit implementation code.

### Software Lead

Owns bounded implementation across web, API, desktop and mobile stacks. It follows the approved specification and repository conventions. Only one implementer edits an overlapping code scope at a time.

### Quality, Security and Release Lead

Independently maps acceptance criteria to evidence; reviews correctness, security, privacy, performance, accessibility, tests, CI and release readiness. It does not approve work it implemented.

### Design and Content Lead

Owns brand direction, UX, UI, design systems, accessibility, creative briefs, copy, image and video production plans. Generated media must retain source, rights, prompt/model and review provenance where applicable.

### Marketing and Growth Lead

Owns audience, positioning, campaigns, SEO/AEO/GEO, social media, advertising, channel plans, analytics requirements and performance interpretation. It must not invent market, search, audience or performance data.

### Operations, Analytics and Improvement Lead

Owns project records, dashboards, capability inventory, metrics definitions, audits, retrospectives and evidence-linked improvement proposals. It cannot silently change prompts, routing, permissions or approval policy.

## Authority and handoff rules

The authoritative governance document is [Team Constitution](team-constitution.md). Role prompts, skills and workflows must conform to it.

1. The operator sets business priority and approves consequential actions.
2. The Chief Operator is the only normal front door and project-wide router.
3. Every artifact has one accountable owner and a version.
4. Every handoff names the project, task, approved input, output contract, allowed scope, exclusions, evidence and return path.
5. No implementation starts without testable acceptance criteria.
6. No public claim, publish, send, spend, production deployment, merge, deletion or access expansion occurs without explicit approval of the exact action.
7. Use parallel workers primarily for read-heavy exploration, independent review, tests and research. Do not allow parallel edits to overlapping files or artifacts.
8. Failed or uncertain external writes are reconciled before retrying.
9. A model recommendation is not proof that the model is available, affordable, licensed or permitted for client data.

## Tool roles

The tools are complementary; installing more coding assistants does not improve the factory by itself.

| Tool | Recommended role |
| --- | --- |
| Codex | Primary factory architect, repository implementer, verifier and builder of the factory system. |
| OpenBot.run | Persistent Chief Operator/team workspaces, conversations, channels, routines, workflows and operator interaction, subject to commercial licensing. |
| Claude | Independent architecture, security, specification or high-impact code review; optionally implementation instead of Codex, never concurrently on the same scope. |
| OpenCode | Provider-flexible fallback or isolated implementation/review lane when its selected provider and data policy are approved. |
| Qoder | IDE/CLI exploration, large-context repository analysis and bounded implementation; inspect its live model list. |
| GitHub Copilot | Inline completion, local explanation, small edits, tests and developer assistance; not the authoritative project manager. |
| Kilo Code | Optional IDE task surface or fallback; use only for a distinct bounded lane and verify its provider/model and permissions. |
| GitHub | Canonical code collaboration, issues, branches, pull requests, CI evidence and protected merge policy. |

Do not send the same implementation task to Codex, Claude, OpenCode, Qoder, Copilot and Kilo simultaneously. That produces conflicts and duplicated cost. Assign one implementer; use another provider for independent review only when risk justifies it.

## Model-routing policy

Maintain a capability registry populated from the model selectors visible in each installed tool. Record provider, exact model ID, availability, reasoning/vision/tool support, context limit where shown, cost/credit indicator, client-data policy and last verification time.

Route by capability tier:

| Work | Preferred tier | Starting choice when available |
| --- | --- | --- |
| Chief Operator, consequential architecture, cross-system debugging | Highest reasoning | GPT-6.2 Astra or current Claude Opus; use one as primary and the other for selective independent review. |
| Normal coding, planning, product, marketing strategy and writing | Balanced | GPT-6.2 Sol or current Claude Sonnet. |
| Visual UI inspection and computer interaction | Visual/computer | GPT-6.1 Terra or another verified vision-capable model. |
| Repetitive extraction, formatting, classification and routine summaries | Fast/economical | GPT-6 Luna, current Claude Haiku or a verified economical OpenCode/Qoder model. |
| Image generation | Specialized image model | Use the connected image-generation capability selected for quality, rights and cost. |
| Video generation | Specialized video model | Use the connected video capability only from an approved brief and with provenance. |

These are starting preferences, not hard dependencies. Verify live selectors before assigning them. Keep the lightest model that meets the measured quality bar, and retest routing when models or prices change.

## Additional capabilities worth adding

Add connectors only when the associated workflow is ready and authorized:

- GitHub connector or GitHub App with least privilege.
- Design source such as Figma or an equivalent design workspace.
- Image and video generation providers with commercial-use terms and provenance tracking.
- Analytics connectors for the actual platforms in use; never synthesize missing metrics.
- SEO/search-console and advertising connectors when the operator has authorized the account and spend boundary.
- Social scheduling/publishing connectors with draft, reviewed, approved and published states.
- Secret manager for production credentials.
- Error monitoring and observability for deployed applications.
- Backup/export storage for factory state and artifacts.

Avoid adding a new orchestration framework until the file contracts, state model and synthetic workflow work reliably.

## Build sequence

1. **Inventory:** inspect the PC, repository, installed tools, visible model selectors, accounts, licenses, data policies and integration capabilities without exposing credentials.
2. **Constitution:** create the Chief Operator charter, team hierarchy, role boundaries, routing rules, artifact ownership and approval matrix.
3. **Contracts:** version the project, brief, specification, ticket, handoff, result, review, approval, event and improvement schemas.
4. **Portable factory:** prove file-based workflows without OpenBot or live external connectors.
5. **OpenBot team:** configure the Chief Operator and persistent leads; install only relevant skills and test bounded handoffs.
6. **Software factory:** prove one synthetic spec through implementation and independent review without merging or deploying.
7. **Creative/growth factory:** prove one synthetic campaign through strategy, copy, image/video briefs, review and approval without publishing or spending.
8. **Control desk:** build the durable state machine, audit feed, approvals inbox, evidence links, Demo/Live separation and recovery.
9. **Live integrations:** connect one test repository and other services individually, with least privilege and harmless verification.
10. **Improvement:** measure cycle time, failure, review and operator feedback; propose reversible changes for approval.

## Acceptance tests

The factory is ready for initial use only when:

- One operator request is routed through the Chief Operator without the operator contacting specialists directly.
- Every delegated task has a bounded handoff and structured result.
- A synthetic web/app task completes specification, implementation and independent evidence review.
- A synthetic campaign completes strategy, design/content production and approval review without external publication.
- A failed or interrupted run resumes without creating duplicate work.
- Demo and live data are visibly distinct.
- Exact configured tools and models are reported; unavailable integrations are marked unverified.
- No agent can approve its own output or perform a consequential external action without operator approval.

