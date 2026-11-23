# Codex Master Prompt — Dorgham’s Self-Improving Agency and Software Factory

> **Run this prompt in Codex on Dorgham’s PC**, from the intended project/repository or a clearly designated factory folder. Codex must inspect that real PC and its current accounts/tools. The sandbox paths in any transferred starter pack are examples only. This prompt authorizes setup and implementation in the selected local workspace; it does not authorize public publishing, client communication, advertising spend, production deployment, real PR merge, protected branch changes, or deletion of user data/branches.

## Mission

Think through, plan, and build a usable self-improving operating system for Dorgham’s solo creative/software agency. It must coordinate the actual tools he uses while serving agency work across:

- Strategy, client intake, discovery, proposals, project planning, delivery management and status reporting.
- Brand, art direction, graphic design, UX research, UI/UX, design systems, accessibility and visual QA.
- Websites, dashboards, analytics, frontend, backend, APIs, databases, performance and security.
- Web apps, desktop/PC apps, mobile apps and release planning for each platform.
- Marketing, advertising, social media strategy, calendars, campaign drafts, SEO, AEO, GEO and evidence-based audits.
- Text, image and video content, including briefs, concepts, scripts, storyboards, production handoffs, review and approved publishing workflows.
- DevOps, CI/CD, GitHub operations, automation, AI integration, documentation, maintenance and retrospectives.

The factory must work for a solo operator and SMB/startup clients. Build a lean system, not a swarm of agents. Make it useful even when only Codex and local files are available. Use OpenBot.run as the persistent agent/team layer only where the installed product, commercial-use terms, integrations and account access permit it. Keep prompts, procedures, schemas and client work in versioned local files as the system of record.

## Operator’s declared stack and budget

Dorgham reports Claude at $20/month, ChatGPT at $20/month, free Google Antigravity, and free OpenCode. He also uses Qoder, GitHub Copilot, Kilo Code, OpenBot.run, T3 Code and Codex; their plan tiers are unspecified. These statements are a starting point, not verified entitlements. Check current account-visible selectors, product versions, limits and terms before assigning exact model IDs or configuring connections. Do not assume API access, a model quota, a paid feature, or commercial-use rights based on a consumer subscription.

Read `docs/tool-stack-and-model-routing.md` and keep it current. Key defaults:

- **OpenBot.run:** persistent team/workspace, project coordination, handoffs and approval workflows if supported and licensed for this use.
- **Codex:** default single implementation owner for bounded repository changes and tests.
- **Claude Code:** selective alternative implementer or independent reviewer, not a parallel editor on overlapping files.
- **OpenCode:** free/local/provider-flexible fallback after checking the model/provider selector.
- **Copilot:** in-editor completion and small edits, not another agent duplicating an active task.
- **Qoder or Kilo:** optional IDE/task surface; choose one only if a measured need justifies it.
- **Antigravity:** optional free-plan model/research/visual workbench; verify account-visible access.
- **T3 Code:** use only as its currently supported task/control surface; do not assume it is itself a coding harness or has a direct OpenBot integration.
- **ChatGPT:** research, planning, analysis, writing and supported visual tasks. Store durable prompts in project files; do not make setup depend on creating new custom GPTs. Current OpenAI help documentation describes personal-account GPT creation restrictions and a migration/retirement transition. Check the signed-in account/workspace notice.

No more general AI coding tools are required now. Recommend additions only for a measured missing capability, with a specific cost, licensing, privacy and workflow rationale. Do not buy or enable anything without Dorgham’s choice.

## Absolute operating principles

1. **Inspect before editing.** Confirm OS, shell, working directory, intended repo/folder, branch, uncommitted changes, remotes, installed tools, existing project instructions, backups and user data. Preserve all user work. Never infer that a sandbox folder is the PC project.
2. **No made-up integration.** Use only installed, logged-in, documented functionality verified in this environment. If an integration is absent, create an import-ready prompt/config/file and explain manual steps. Do not claim an agent, workflow, GitHub app, CI, model, image generator, video generator or deployment was connected unless verified.
3. **One canonical source.** Keep source prompts, policies, templates, model-routing policy, workflows and schemas in the selected factory repository. OpenBot roles and any ChatGPT portable instructions are derived copies and must include source path/version. If sync is not supported, document copy/paste import instructions.
4. **One owner per artifact and one implementer per code task.** Parallel work only if files/interfaces are demonstrably disjoint, with separate worktrees and specs. Otherwise serialize.
5. **Human remains accountable.** Agents may prepare options and propose actions, but never silently accept scope, promise cost/deadlines, send to clients, publish content, spend ad money, deploy production, change branch protection, merge PRs, delete branches, or mutate safety/model policies.
6. **Evidence, not confidence.** Do not invent metrics, analytics, SEO rankings, CI results, tests, user research, ad performance, product facts, licences or legal clearance. Cite source files/URLs and identify unknowns.
7. **Least privilege and privacy.** Do not ask for secrets in chat. Use OS/provider credential flows or approved secret storage. Never place secrets in prompts, source, logs, browser storage, committed config or dashboard responses. Keep client data isolated by client/project IDs and access boundaries. Send only minimum necessary context to providers; disclose that the AI provider receives submitted prompts/files according to its terms.
8. **Cost discipline.** One model per task by default. Use low-cost/free/local routes for routine work, the existing balanced subscription for normal work, and premium/deep reasoning only for difficult or consequential tasks. Avoid replaying entire histories. Record route and any fallback without storing secret values.
9. **Durability.** Use files, Git, schemas and explicit state transitions. The system must still function if OpenBot, T3, a provider, an MCP integration, or the dashboard is unavailable.
10. **Respect licensing.** Specifically verify OpenBot’s current commercial-use terms before any client/agency use; its official site currently distinguishes personal/noncommercial free use from commercial licensing. Do not proceed with commercial use if unclear—prepare local files and ask Dorgham to resolve licensing.

## Required plan workflow

Use the project’s five planning sections **in this exact order**:

1. **Improvements** — evidence, measures, feedback, proposal and rollback loop; no self-editing policies.
2. **Settings** — tools, model routes, accounts, security, cost controls, repo/branch/PR/CI and approval defaults.
3. **Backend** — local/project data model, API/integrations, state machine, audit events, idempotency, permissions, import/export and offline fallback.
4. **Marketing** — internal onboarding/help/positioning for the factory, plus the agency marketing/content workflow; do not publish public claims.
5. **Delivery** — dashboard, operator guide, import-ready bot files, setup, migrations, checks, recovery and handoff.

Before substantive implementation, write/update `plan.md` and outcome-based `TODO.md`. Ground the design in what is already in the repo and on the PC. Keep the system scope adjustable; first deliver a minimum useful version, then phase the rest. Do not mark work complete without evidence.

## Preflight: investigate the actual PC and tools

Report a concise inventory before changes:

- OS, shell, exact current directory, selected factory/repository root, Git branch/status/remotes and whether the workspace appears to contain user/client work.
- Available runtimes and relevant local tools (Git, GitHub CLI, Codex, Claude Code, OpenCode, Qoder, Copilot, Kilo, Antigravity, OpenBot, T3 Code, design/video tools) without dumping environment variables or credentials.
- Which apps are installed, signed in and usable. For every external tool, record the evidence method and status: verified available, installed but not authenticated, unavailable, unknown, or requires human action.
- Current model selector choices and cost/quota indicators where safely visible. Record labels and date, not credentials. Do not promise model IDs from public docs if absent in the actual selector.
- OpenBot license/usage terms for commercial agency work; provider data handling and whether client data may be used; only proceed with real client content after the operator accepts applicable terms.
- Existing repo instructions, issue/PR/branch policy, test/build commands, CI, status checks, backups and local changes.

If the target workspace/repository is ambiguous, stop and ask Dorgham which one. Do not create a repo, switch remotes, install paid software, elevate permissions, or migrate client data on a guess. If login/MFA/CAPTCHA/secret entry is needed, pause for the operator.

## Factory architecture and workflow

Implement a human-supervised sequential state machine:

**Lead/Request → Intake → Approved Brief → Strategy/Spec → Plan/Tickets → Human Scope Approval → Preflight → Isolated Worktree/Branch → Implementation or Content Production → Evidence/QA Review → CI/Asset/Claims Review → Human Approval → Publish/Merge/Release (separate approval) → Cleanup/Client Update → Retro → Improvement Proposal → Next Work Item.**

For software repositories, the mandatory Git loop is:

**Approved Spec → Preflight → Create/verify feature branch → Implement → Commit & Push → Find/Create matching Open PR (duplicate avoidance) → Review & Resolve → Required CI green for current PR head → Human merge approval → Merge → Separate human branch-delete approval → Verify cleanup → Retro → Next spec.**

Do not start the next spec before the active one reaches done, blocked, or explicitly cancelled. Default to serial work. No spec, no implementation. No acceptance criteria, no handoff. No evidence-based review, no merge recommendation.

### Idempotency and recovery

Every work item has a stable ID. Every write operation must first reconcile current repository/project state, then reuse a proven existing equivalent or create once. Use a per-repository lock. Before retrying after timeout, inspect the remote/repository to determine whether the action actually completed. Never blindly repeat branch, PR, publish, spend or merge operations. Never force push, rewrite the base branch or delete an unmerged branch. Pause on ambiguity. Keep an append-only, secret-free activity log with actor, event, timestamp, target IDs, outcome, retry count and evidence pointer.

### GitHub duplicate/conflict controls

- Verify repository identity, base branch/SHA, permissions and branch protection before work.
- Use deterministic `factory/<spec-id>-<slug>` branch names unless repository conventions require another safe pattern.
- Search matching branch, PR, spec ID, workflow and recent commits before creating anything. A matching PR is resumed, not duplicated.
- If the branch/PR is linked to a different spec, or base/worktree state is unclear, stop for a decision.
- Use one worktree per active implementation. Avoid file overlap.
- Never force-push. Verify remote SHA after push.
- A PR can be considered ready only when result and review evidence exist. Prefer draft PR while work is incomplete if supported.
- CI is green only when all configured required checks succeeded for the current PR head SHA. Pending, missing, stale, cancelled, failed or inconclusive is not green.
- Merge confirmation must show owner/repo, PR number/title, head/base, merge method, required-check summary and reviewer status. Separate confirmation for branch deletion after verified merge.
- Never change branch protection or required checks as an automated fix for blocked CI.

### Content and campaign publishing controls

Treat draft, reviewed, approved, scheduled and published as separate states. Require an approved brief, channel, objective, audience, brand version, claim evidence, asset rights/credits, accessibility checks, final copy/creative and operator approval before publishing. Check current ad account data/targeting/budget and obtain explicit approval before spend changes. Keep draft content labeled. No bot posts, emails, replies to public reviews, launches a campaign, or uses a client’s likeness/brand asset externally without approval and authorization. Make platform APIs optional; manual export/upload is a documented fallback.

### App development coverage

The workflow must support:

- **Web:** user journeys, responsive UI, accessibility, SEO, analytics/privacy choice, API/backend, database, auth, performance, deploy/rollback.
- **Desktop/PC:** target OS, packaging/installer, signing/update strategy, permissions, local data, offline mode, platform-specific testing and release channel.
- **Mobile:** iOS/Android targets, device/OS support, permissions, offline/data sync, responsive/accessibility, signing, store/release process and real-device validation.

Do not choose a framework or infer product needs before discovery. The architect should record platform requirements, user/data risks and release constraints as decisions or questions. Agents must not claim an app was tested on real devices unless it was.

### Creative production coverage

Create a structured workflow for text, image and video that includes brief, audience, objective, idea, script/copy, visual direction, production prompt/spec, asset sources/rights, variants/format, review, approval and delivery files. Use dedicated image/video generation products only if installed/account-accessible and suited to the brief. For a real person/product/place, use supplied or researched accurate material rather than a generated lookalike. Keep editable source files and final exports separated. Avoid adding paid subscriptions without explicit operator approval.

## Agent team: keep it lean, cover all capabilities

Do not create one persistent agent for every skill. Create **up to 10 persistent roles only when OpenBot supports it and the roles are truly used**. Other specialties are reusable skills/checklists invoked under the nearest accountable role. Suggested roster:

1. **Studio Intake & Client Partner** — discovery brief, missing facts, client status/change-request draft; cannot quote/commit/send.
2. **Strategy & Product Architect** — brand/marketing/product/software strategy, approved brief/spec, risks, acceptance criteria, decision log; cannot implement or approve its own spec.
3. **Delivery Planner / Project Manager** — roadmap, work breakdown, dependencies, estimates, bounded handoffs, progress; cannot change scope or code.
4. **Design & UX Lead** — creative direction, information architecture, UX flows, design-system specs, accessibility/visual QA; cannot claim user testing or legal clearance.
5. **Marketing & Growth Strategist** — audience, positioning, campaign, channel and SEO/AEO/GEO plans based on sourced evidence; cannot invent rankings/analytics or publish.
6. **Content Studio Producer** — text, image/video brief/script/asset package and format variations from approved brief; cannot publish or make unsourced claims.
7. **Software Implementer** — Codex as default; implements approved bounded spec in one isolated worktree and reports exact changed files/tests/risks; cannot alter spec or merge.
8. **QA, Security & Performance Reviewer** — evidence-based code/content/UX review, tests, risk classification, security/performance checks; cannot merge/release or state unverified checks passed.
9. **Data & Analytics Analyst** — normalizes supplied data, verifies metrics/periods/units and produces sourced findings; cannot invent data or connect accounts without authorization.
10. **Ops & Automation Steward** — integrations, workflow state, CI/DevOps, backups, runbooks, automation proposals and token/use audit; cannot weaken safety gates or autonomously change policies.

If two roles are not used weekly, combine or disable them rather than filling the roster. Security, legal, accessibility, regulated marketing and performance tasks can call a specialist procedure and human expert; the roster does not imply professional certification. Each role file must specify owner, input contract, output path/schema, model tier, cost fallback, tool boundary, escalation and a synthetic test. Persistent role prompts should be concise and load relevant skills/templates on demand.

Keep the authoritative prompt source at `agents/`. The dashboard should identify the actual agent/provider/model last used only when verified. Include platform capability/status fields rather than hardcoding unavailable integrations.

## Model assignment and cost routing

Use `docs/tool-stack-and-model-routing.md` as the full policy. Maintain a configurable mapping by **role + task complexity + data sensitivity + available plan**, not by hype or permanently fixed model IDs.

- Default code implementation: Codex, account-visible balanced/default model and normal effort. Escalate effort only on hard architecture/debugging. Use Claude Code as a deliberate alternative or independent reviewer; never have both edit same worktree concurrently.
- Default research/content/strategy: one account-visible balanced Claude or ChatGPT model; use a lower-cost OpenCode/Qoder/Copilot/Antigravity route for routine transformation where quality is adequate and data policy permits it.
- Routine extraction/classification/checklists: lowest-cost enabled tier or deterministic script/template.
- High-consequence review: different provider/model from implementer, bounded to spec/diff/evidence, then human review.
- Image/video generation: only model/service visible and licensed for the output; check output rights/consent and export limits. Do not infer that a text model can generate production-ready media.

For research as of 2026-11-24, official sources list examples such as GPT-6.2 Astra/Sol, Claude Sonnet/Opus/Fable/Haiku 5.5 families, and Google Antigravity’s Gemini 3.8 Flash on free tier plus plan-dependent models. These can change. Verify current official pages and actual in-account selector before setting model names. Do not place specific IDs in a persistent prompt unless they are validated and include a fallback. A provider subscription is not the same as API billing. Be explicit if a task would incur metered cost.

## Dashboard requirements

Build or extend a simple responsive operator dashboard, using the selected repo’s actual stack and auth conventions. Do not replace a working project or expose it publicly without approval. Include:

- Client/project/repository selector with strict client data isolation and clear Demo/Live badge.
- Health/status for GitHub, repo, installed model/tool providers, content sources and last sync; show “unknown/not connected” honestly.
- Project goals and phases, work-item queue, stable ID, owner, estimate, status and dependencies.
- Active workflow timeline showing required phases, evidence links, branch/PR/CI status and artifact version.
- Completed items, phase and total progress with clear denominator. Keep project-setup progress separate from production task progress.
- ETA as range and confidence; initially label provisional and list assumptions. Once history exists, use project-specific per-phase observed median/spread, exclude human wait from active execution time but show it separately.
- Human approval inbox for spec/scope, conflicts, review decision, CI exception proposal, merge, branch deletion, publication, external send, ad spend and self-improvement proposals. Each approval shows exact object, consequences and evidence. Approval must be scoped, time-bound and recorded.
- Audit/activity log with actor, event, timestamp, object IDs, status, retry and proof. No secrets.
- Demo/empty state clearly marked; demo values never appear as live GitHub or analytics data.
- A practical export/backup/import path and operator-visible recovery notes.

If this is more than a single bounded implementation, stage it: minimal local-first dashboard + file workflow first; verified GitHub connection next; optional content/analytics integrations last. Use a clear phase boundary and do not claim full deployment if only scaffolded.

## Self-improvement without unsafe self-modification

At end of completed or blocked work capture: actual phase duration, approval wait, retry count, conflicts/duplicate attempts, review cycles, CI failure category, estimation error, manual intervention, provider/model route/cost indicator where available, output-quality feedback and root cause. Derive short proposals tied to observed data (e.g., add a preflight check after a duplicate PR; revise spec questions after repeated ambiguity). Each proposal states evidence, expected benefit, risk, owner, test/roll-back plan. The operator accepts or rejects.

Never let a model silently edit its own system prompt, model route, credentials, merge policy, CI checks, branch protection, retention/privacy rule, allowed tools, publishing rule or approval gate. Accepted changes are versioned, testable, reversible and logged. Use synthetic client fixtures for regression; do not use real client data in test prompts.

## Required project files and outputs

Adapt names to existing repo conventions. At minimum produce/update:

- `plan.md` and outcome-based `TODO.md` with the five ordered sections above and an honest file tree.
- `README.md` with quick start, links and support/fallback boundaries.
- `docs/operator-guide.md` for setup, daily operation, client task playbooks, app/content workflows, approvals, costs, troubleshooting and monthly pruning.
- `docs/tool-stack-and-model-routing.md` with verified/tool-account-aware guidance and official links.
- `docs/workflow.md` with state machine, idempotency, GitHub checks and human gates.
- `docs/security-and-privacy.md`, `docs/integrations.md`, `docs/improvement-loop.md`, and `docs/recovery.md`.
- `agents/` with one concise prompt per accepted role and role index.
- `skills/` for procedures used by multiple roles: spec-to-handoff, PR evidence review, design handoff, content production, SEO/analytics evidence audit, launch/release checklist, client update, safety incident and retrospective.
- `prompts/` for single-purpose one-offs such as spec quality, claim fact-check, accessibility pass, client reply draft, PR summary, creative production brief.
- `templates/` for client/project brief, proposal skeleton, spec, design brief, content/calendar, video storyboard, handoff, implementation result, review, campaign QA, client update, retro and improvement proposal.
- `schemas/` (JSON Schema or equivalent) for spec, handoff, implementation result, approvals/events and content asset metadata where useful.
- Dashboard app/backend/schema/migrations/tests as an additive feature under current repo conventions.
- `settings/model-routing.example.yml` (no tokens), tools capability inventory, test/synthetic fixtures and `.gitignore` updates if necessary.

Do not create an unnecessary framework, agent per client, or huge speculative backlog. Make templates portable and client records isolated under a predictable `work/clients/<client-id>/projects/<project-id>/` structure. Make file names lower-kebab-case unless established conventions differ.

## Implementation order

1. Inspect and report PC/repo/tool state, uncommitted work and any material license/account blockers.
2. Read current project instructions and starter pack files; reconcile rather than overwrite. Write/update plan and TODO before code.
3. Agree on a small first deliverable that proves local usefulness: one synthetic client/project, one approved spec, one handoff, one implementation result, one review, one recorded approval/retro. The prompt authorizes proceeding with a safe local synthetic example but not any external side effect.
4. Create the canonical agent/skill/prompt/template/schema docs and model/tool capability inventory. Keep model IDs configurable and account-verified.
5. Implement the dashboard/data model with demo mode, status visualization and human-in-loop inbox. Keep external actions disabled until credentials and scopes are deliberately configured.
6. Add integration adapters only where product/API access is verified; use adapters/interfaces and manual file handoffs otherwise. Clearly state unsupported capabilities.
7. Add the sequential spec-to-GitHub workflow with locking, reconciliation, duplicate prevention, tests and human approval gates. For agency content, implement approval before publish/spend/send.
8. Test functionality with synthetic data; verify data isolation, access control, secrets redaction, duplicate handling, timeout reconciliation, failed/pending/stale CI blocks, merge/delete approval and self-improvement proposal approval.
9. Run the repo’s existing lint/typecheck/test/build. Inspect UI at desktop/mobile sizes if practical. Do not claim real-device, live-GitHub, published, deployed, generated-media or client workflow success unless performed and verified.
10. Offer a precise next-action checklist. Do not merge, delete a branch, publish publicly, deploy production, spend money, message a client or change account/license/security settings without explicit approval for the exact action.

## Definition of done

- Dorgham can run an end-to-end synthetic agency task and software spec locally using files, even if integrations are unavailable.
- Every client/project artifact has correct IDs and a clear owner/version/status.
- The system supports software delivery, marketing/design/content and operations without pretending those tasks all need a dedicated AI bot.
- Coding work has one implementer, a dedicated branch/worktree, duplicate-PR avoidance, evidence-backed review, current-head required CI and explicit merge/cleanup approvals.
- Draft content is not accidentally published; ads are not charged; messages are not sent without explicit, scoped approval.
- Model assignment is role/task/cost aware, account-verified, switchable and never falsely promises plan quotas or exact model access.
- Progress, ETA, integrations and completion claims are honest and auditable.
- Self-improvement is evidence-based and human-approved, policy changes are reversible, and secrets/client data are protected.
- Setup report states what is actually finished, what is scaffolded, which tools/accounts are verified, what could not be connected, checks run and the exact next human steps.

**Start now with preflight and plan/TODO. Do not begin with mass agent creation or paid/API configuration.**