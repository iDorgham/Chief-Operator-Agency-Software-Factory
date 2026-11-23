# Operator Guide — Dorgham’s Agency and Software Factory

## What this system does

This is a human-supervised operating system for a solo agency. It turns client requests into scoped work, then coordinates strategy, design, software, marketing, content and operations using reusable role prompts, skills, templates and a simple dashboard. It is designed to use the tools Dorgham already has rather than add another layer of subscriptions.

The repository is the durable source of truth. OpenBot.run is the persistent team/workspace layer when available and appropriately licensed. Codex is the default software implementer. Claude Code, OpenCode, Copilot, Qoder, Kilo Code, Antigravity, T3 Code and ChatGPT have distinct optional lanes; they do not all work on the same task. If an app integration is missing, the handoff remains a file that a human can move between tools.

Read the [tool-stack and model-routing guide](tool-stack-and-model-routing.md) before setting model defaults. It explains current official options, account-dependent availability, cost tiers, tool boundaries and the fact that OpenBot’s free personal-use terms may not cover commercial agency work. Resolve that licensing question before using OpenBot for client/commercial work. [1]

## Start with a safe setup

1. In Codex on Dorgham’s PC, open the intended local project/repository and use the [Codex master prompt](../prompts/CODEX_MASTER_PROMPT.md). Codex must inspect the actual machine and preserve existing work; it must not assume sandbox paths are PC paths.
2. Verify the target directory, repository/branch, clean or uncommitted status, backup, installed tools, signed-in accounts, model selectors, licensing and cost indicators. Never paste tokens into prompts or commit them.
3. Confirm the OpenBot commercial-use terms, provider privacy terms and client-data handling. Use synthetic data until the privacy and access model is clear.
4. Keep the canonical files in Git. Import persistent OpenBot roles only when the product supports the feature and the role is used often enough. ChatGPT custom GPT creation is account- and policy-dependent and currently in a retirement/migration transition, so keep portable prompts and knowledge files in the repo rather than depending on newly created GPTs. [2]
5. Configure the factory in layers: local file-based workflow first, dashboard second, GitHub connection third, optional content/analytics connectors last. Start with one synthetic client and one small task.

## Team and responsibility map

Keep the persistent team small. Roles own different artifacts; skills carry out repeatable procedures. Start with these roles and disable anything not used weekly:

- **Studio Intake & Client Partner:** client discovery brief, missing information, status/change-request drafts. It never commits to price, scope, dates or delivery.
- **Strategy & Product Architect:** strategy brief, design/product/software spec, risks and testable acceptance criteria. It does not code or approve its own specification.
- **Delivery Planner / Project Manager:** dependencies, work breakdown, estimates and bounded handoffs. It does not change scope or edit implementation.
- **Design & UX Lead:** art direction, UX flows, content structure, design-system requirements, accessibility and visual-review notes. It cannot claim real user research or legal clearance without evidence.
- **Marketing & Growth Strategist:** target audience, campaign/channel direction, SEO/AEO/GEO plans and reporting questions. It needs sourced data for performance claims and cannot publish.
- **Content Studio Producer:** text drafts, image and video briefs, scripts, storyboards and delivery variants using an approved brand brief. It does not publish or invent claims.
- **Software Implementer:** Codex by default, one bounded spec in one branch/worktree; it reports exact edits, tests and unresolved risks. It does not change scope or merge.
- **QA, Security & Performance Reviewer:** evidence-based review of code/content/UX, requirements, tests and risks. It cannot merge or certify safety/compliance.
- **Data & Analytics Analyst:** normalizes supplied reports and explains metrics with date range, units, attribution and source. It never fabricates data.
- **Ops & Automation Steward:** integrations, CI/DevOps, backups, runbooks, workflow health and improvement proposals. It cannot silently weaken controls or change policies.

Security, accessibility, legal, performance, platform-specific mobile/desktop release and regulated marketing are specialties invoked through procedures and, when needed, qualified humans—not claims of certification. A role is justified only if it has a distinct artifact, is used regularly and has a safe handoff. Otherwise use a skill, template, prompt or manual review.

## Choose a model without paying twice

Use the lowest-cost route that reliably meets the task. Treat public model names as examples, not entitlements. The selector in the signed-in product determines what Dorgham can actually use. Subscription access, API billing, product credits and commercial terms are different things.

- **Routine formatting, extraction, checklists and first drafts:** a free/local or low-cost selector option, deterministic script or template.
- **Normal planning, copy, analysis and implementation:** one balanced model from an existing subscription/tool. Codex is the default implementation owner for code.
- **Hard architecture, difficult debugging, high-risk security or consequential strategy:** increase reasoning effort or use a stronger available model for that specific decision. Avoid resending the entire history.
- **Independent review:** use a different provider from the implementer only when the additional opinion matters. Give the reviewer the approved spec, diff, test evidence and decision question.
- **Provider limit/outage:** stop, save state and switch only to an approved fallback that accepts the same data and handoff. Record the change; do not silently lower the quality bar.

Start from [Tool Stack and Model Routing](tool-stack-and-model-routing.md) for role-specific recommendations. A simple initial route is Codex for implementation, Claude Code as selective alternative/reviewer, OpenCode for free/local/provider-flexible fallback, Copilot for inline completion, Qoder or Kilo for one optional IDE workflow, Antigravity for optional free-tier work, and OpenBot for persistent roles/handoffs if licensing allows. Do not run overlapping coding agents concurrently.

## The agency work loop

**Request → Intake → Brief → Strategy/Spec → Plan → Operator scope approval → Production → QA → Operator approval → Delivery/Publish → Status update → Retro.**

### New client or project

1. Assign a non-identifying client ID and project ID. Confirm scope, audience, objective, channels/platforms, deadline constraints, data access, approval owner and what is not included.
2. Write a client/project brief with supplied facts, assumptions clearly marked, unanswered questions, privacy restrictions and source references.
3. Strategy & Product Architect develops the appropriate strategy/requirements. The operator confirms scope, timing and price through their normal business process; the model must not promise any of these.
4. Create a distinct client root, e.g. `work/clients/<client-id>/projects/<project-id>/`. Check all IDs before each handoff.

### Website, dashboard or web app

1. Discover audience, goals, content, user roles, integrations, analytics/privacy expectations, accessibility needs, success measures and deployment environment.
2. Write spec and acceptance criteria before code. Confirm responsive behavior, security, backend/database, performance, SEO and analytics requirements where applicable.
3. Planner issues one bounded handoff to Codex. Codex works in a dedicated branch/worktree, reports exact files changed and runs available checks.
4. Reviewer compares each acceptance criterion with code/test evidence and calls out untested behavior. Human reviews the outcome before merge/deployment.

### PC/desktop software

Capture Windows/macOS/Linux target, install/package format, code signing, updater/release channel, permissions, local storage, offline behavior, migration/backup and update rollback requirements. Architect records any unknowns as questions. Test only the platforms actually available and clearly list unverified OS/version combinations.

### Mobile apps

Capture iOS and Android targets, minimum OS/device needs, permissions, offline behavior, data sync, accessibility, privacy disclosures, push notifications if needed, signing credentials, store requirements and real-device test plan. Keep signing secrets out of files and agents. A successful simulator/build is not evidence of real-device or app-store approval.

### Branding and design

1. Intake gathers audience, category, personality, references, constraints, deliverables, use cases and existing assets.
2. Design & UX Lead writes a draft direction with options and questions. It must be labeled draft until the client approves it.
3. Produce concepts and source/editable files using Dorgham’s existing design tools. Review legibility, color contrast, responsive/use-context behavior, asset provenance, likeness/rights and export formats.
4. Record approved brand version. Only then use that brand version as the source for marketing and content.

### Text, images and video

Create an approved creative brief before production. Include target audience, objective, channel, message, tone, format/dimensions/duration, CTA, required and prohibited claims, source evidence, brand version, asset rights and approval owner. For video, include script, scene/shot outline, on-screen text, audio/music/voice needs, captions, aspect ratio, final length and edit/source-file requirements. Keep scripts/storyboards separate from generated footage and final exports. Use tools already available first; add a paid media product only when there is a measured need and Dorgham approves the cost. Never generate a lookalike of a real person or product when accuracy is required; use supplied or verified source assets.

### Marketing, social and advertising

1. Confirm goal, audience, offer, budget ceiling, flight dates, geography, channel and conversion event. Use actual analytics/ad-account data or mark planning assumptions explicitly.
2. Marketing Strategist creates channel plan and calendar. Producer creates drafts and asset specs from the approved brand/offer.
3. QA verifies links, spelling, dates, discount terms, claim evidence, image rights, accessibility, tracking and platform constraints.
4. Operator approves the exact final creative/copy/channel/timing. Publishing and ad spend are separate actions requiring explicit approval. Record what actually published and the resulting URL/ID.

### SEO/AEO/GEO, audits and analytics

Start from the source data: site crawl, Search Console, GA4, ad platform, CRM, SEO tool export or cited public sources. Record domain, country, date range, definitions and freshness. Normalize the data with scripts/spreadsheets before interpreting it. Keep facts, estimates and recommendations distinct. Never invent rankings, traffic, conversions, keyword difficulty, AI citations or competitor findings. If data is unavailable, produce a clearly labeled methodology/questions—not a fake audit.

## Software delivery loop: spec to merged PR

1. **Approved spec:** stable ID, problem, scope/non-scope, dependency/risk, repo/base SHA, testable acceptance criteria, estimate and approval.
2. **Preflight:** verify repository identity, permissions, base branch/SHA, worktree cleanliness, branch protection, CI requirements, active workflow lock, existing branch/PR/spec and recent commits.
3. **Branch/worktree:** create deterministic `factory/<spec-id>-<slug>` branch from verified base. Reuse only if proven to match the same spec. Never work on base branch.
4. **Implement:** give only the bounded context pack: spec version, repo/worktree, acceptance criteria, allowed files, do-not-touch list, test commands, result path. Do not send entire chat history or other clients’ details.
5. **Commit/push:** intended files only; no force push. Verify the resulting remote SHA. If timeout or concurrent change occurs, reconcile first.
6. **PR:** search by spec ID, branch and base before creating. Resume a matching PR; stop on conflict. Keep draft until ready where supported.
7. **Review/resolve:** reviewer writes evidence, findings and recommendation. Route narrow changes to the same branch. Version the spec if scope/criteria change. After two failed review cycles, stop for operator resolution.
8. **CI:** required checks must succeed on current PR head SHA. Missing, pending, stale, failed, cancelled or inconclusive status is not green.
9. **Merge:** show repository, PR, title, head/base, merge method, review and CI evidence. Obtain explicit operator approval for the exact merge action.
10. **Delete branch:** only after verified merge and separate explicit approval. If already deleted, record evidence. Never delete base branch.
11. **Retro:** record actual timing, retries, review rounds, conflicts, CI categories, approvals and quality feedback. Propose—not self-apply—system changes.

All operations must be resumable and idempotent. Use one repository lock. On uncertain outcomes, inspect GitHub before retrying. No duplicate PRs or branches. Do not merge just because a provider reports “mergeable.”

## Dashboard: your control point

The dashboard should show project/client/repository, a clear Demo or Live badge, live GitHub/repo status, last sync, base branch, latest commit, open PRs, required CI checks, task/spec queue, phase timeline, progress, blocked work, approvals and activity/audit log. Each status must have an evidence link or say unknown/not connected. Demo data must never resemble live account data without a visible label.

Progress should show its denominator. Separate completed specs from phase checklist counts and from initial setup work. ETA begins as a provisional range with assumptions. After sufficient project history, use observed phase durations (median and spread); show operator approval wait separately from execution time. Dashboard confirmations must show the exact object/action and its consequence. A dashboard button is not permission to bypass GitHub branch protection or a provider’s own approval step.

## Self-improvement and weekly pruning

At the end of each completed or blocked job, record: phase durations, approval wait, estimate vs actual, retries, duplicate/conflict attempts, CI failures, review rounds, manual interventions, model/provider route and operator feedback. Keep cost figures only where the provider exposes them; do not fabricate a token bill from subscription usage.

The system proposes changes tied to evidence—for example, adding a repository identity check after a conflict or clarifying spec questions after repeated review failures. The operator accepts/rejects. Accepted changes are versioned, tested on synthetic examples and reversible. Never allow an agent to edit its own policies, permissions, routing, privacy rules, merge gates or credentials without approval.

Weekly, prune unused roles, close stale handoffs, audit failed jobs, verify backups and check that client IDs are correct. Monthly, compare model routes to output quality and actual usage, change one route at a time and retest the synthetic workflow.

## Safety, privacy and approvals

- No API tokens or client secrets in source control, model prompts, dashboard client code or logs.
- Use per-client workspace boundaries and minimum necessary context. Never reuse one client’s confidential material for another client.
- Confirm AI-provider data handling before sending sensitive content. Synthetic fixtures are the default for setup/testing.
- Do not let agents approve their own work. An implementer is not its own QA reviewer.
- Require explicit approval before scope acceptance, client send, public posting, ad spend, deployment, PR merge, branch deletion or safety-policy changes.
- Pause on a legal, security, financial, health, identity or account-access decision; provide options and request the qualified human decision.

## Troubleshooting

| Situation | Operator action |
|---|---|
| Tool or model is absent | Use a documented file handoff or approved fallback; mark the connection unavailable. Do not claim it is connected. |
| Quota/cost limit is reached | Save state, stop noncritical work, check displayed usage, then choose a permitted fallback. Keep high-risk QA standards intact. |
| Duplicate branch or PR might exist | Stop. Search by spec ID, branch, base and recent commit. Resume only a confirmed matching item. |
| CI is red, pending or stale | Do not merge. Refresh the current head status, diagnose the actual required check and resolve or ask the operator. |
| Spec has no testable criteria | Return it to the Architect for clarification. No coding handoff. |
| Review cycle fails twice | Stop the loop and ask the operator to resolve ambiguity or scope. |
| OpenBot commercial terms unclear | Do not use it for client/commercial work yet. Keep operating from local prompts/files and ask Dorgham to resolve license terms. |
| Client/project identity mismatch | Stop, isolate files and verify IDs across brief/spec/handoff/result/review before continuing. |
| Content has unsupported claims or asset rights unclear | Do not publish. Find primary evidence or replace the claim/asset; request human approval. |
| Dashboard says connected but status is old | Show last sync and refresh result. Never imply current GitHub truth from stale cached data. |

## First-day acceptance run

Use synthetic data and a test repository/worktree. Create one fictional client/project, draft and approve a tiny spec with one observable criterion, issue one bounded handoff, make one harmless code/documentation change, save the result, review it against the criterion, record a human approval decision and generate a retro proposal. Confirm that no PR is duplicated, no real client data is used, no secret is written, no merge/publish occurs and the dashboard distinguishes demo from live state. Only after that round-trip works should you connect real GitHub permissions or add content/analytics sources.

## Files and quick navigation

- [Skill Library Index](../skills/INDEX.md) — original agency procedures across strategy, design, content, software, analytics, security and operations.
- [Reviewed Upstream Skills](../upstream-skills/README.md) — downloaded copies, license/provenance notes, dependencies and link-only candidates. The package does not install them into any external platform.
- [Codex master prompt](../prompts/CODEX_MASTER_PROMPT.md) — copy into Codex on the PC.
- [Tool stack and model routing](tool-stack-and-model-routing.md) — cost-aware tool boundaries and model-selection policy.
- [Cheatsheet](cheatsheet.md) — quick daily decisions.
- [Install and connect](install-connect.md) — setup sequence and account checks.
- [Master system](master-system.md) — global rules and handoffs.
- [Agent team](agent-team.md) — role index.
- [Workflow](factory-pipeline.md) — software factory phases.
- [Improvement loop](improvement-loop.md) — metrics, proposals and rollback (create/update as part of Codex setup).

## References

[1]: https://openbot.run/ "OpenBot official product page and commercial-use note"
[2]: https://help.openai.com/en/articles/8554397-creating-a-gpt "OpenAI GPT creation and migration documentation"
[3]: https://developers.openai.com/codex/models/ "OpenAI Codex model selection documentation"
[4]: https://platform.claude.com/docs/en/models/overview "Anthropic Claude models overview"
