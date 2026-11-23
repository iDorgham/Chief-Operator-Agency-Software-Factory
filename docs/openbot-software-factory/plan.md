# Agency and Software Factory — Starter Implementation Plan

## Goal

Build a local-first, human-supervised factory for Dorgham’s solo agency. It must coordinate software delivery, client operations, marketing, design, content production, analytics and improvement. This package defines the operating system and Codex-on-PC build instructions; it does not assert that external products have been configured or that a dashboard is finished.

## 1. Improvements

Capture phase time, waits, retries, duplicate/conflict attempts, review rounds, CI failures, manual interventions, quality feedback and model route where observable. Generate evidence-backed improvement proposals after completed or blocked work. Require operator acceptance; version, test and make changes reversible. Never self-edit model routing, prompts, privacy, permissions, publication/merge gates or branch policy.

## 2. Settings

Discover actual PC, target repository, available software, logins, model selectors, plan/cost indicators, licensing and privacy terms before setup. Keep route by role/task/cost as configurable policy; exact model availability is determined by signed-in selectors, not this plan. Default one code implementer (Codex), selective independent Claude review, OpenCode as approved fallback, Copilot for inline completion, and Qoder/Kilo/Antigravity/T3 as optional distinct lanes. OpenBot commercial-use permission must be verified. Use local canonical files and no-secret config. Demo/offline mode is clearly marked; integrations default disabled until verified and authorized.

## 3. Backend

Begin with canonical local files and portable schemas. Add the dashboard and durable backend only in the selected PC repository after Codex verifies existing conventions and architecture. Model projects, clients, work items/specs, approvals, artifact references, phase events, integration capability/status, CI/PR snapshots and improvement proposals. Keep secrets outside database and client code. GitHub state machine is sequential and idempotent, with per-repository lock, duplicate detection, timeout reconciliation, audit log, bounded retries and explicit merge/delete approvals. Content automation separates draft, reviewed, approved, scheduled and published states; publishing, sending and ad spend require specific approval.

## 4. Marketing

Support the agency workflow for positioning, campaigns, social calendars, SEO/AEO/GEO, audits, analytics and content in text/image/video. Require approved brief, brand version, source data, asset provenance/rights, channel specifications and human approval. Integrate analytics or publishing sources only when Dorgham explicitly authorizes and tool access is verified. Never invent performance, search or audience data. Treat internal onboarding/help as factory product copy; do not publish public claims as part of setup.

## 5. Delivery

Deliver updated operator guide and model routing, Codex master prompt, role prompts, reusable skills, templates, schemas, plan/TODO, setup, safety/privacy, recovery, synthetic fixtures and a minimal useful dashboard in the authorized PC workspace. First prove one synthetic agency task and one software spec-to-review cycle. Report exact files, tools truly configured, checks, blockers and human actions. Do not merge, delete, publish, deploy, spend or send without exact approval.

## Intended scope phases

1. **Foundation:** inspect environment, preserve user work, verify license/privacy/cost, establish canonical folder/source-of-truth, write plan/TODO and capability inventory.
2. **Portable factory:** role files, skills, handoff contracts, templates, synthetic client/project example, file-based fallback.
3. **Dashboard:** task/phases/progress/ETA, approvals inbox, audit feed, Demo/Live separation, recovery/export.
4. **GitHub delivery:** least-privilege integration, state machine, duplicate prevention, CI/review gates, exact merge and branch cleanup approvals.
5. **Creative and marketing workflows:** briefs, calendar, claim/asset review, draft approvals, optional authorized connectors.
6. **Improvement:** observed time/cost/quality metrics and human-approved reversible proposals.

## Safety and operating defaults

Sequential by default; one active code task per repository. No force push. No duplicate branch/PR. No credential in prompt, client/browser storage, repo or logs. No merging with missing, pending, stale or failed required checks. No external publish/send/spend/deploy without approval. No real client content in setup tests. Worktree/client boundaries must be explicit.

## Project structure

```text
README.md
plan.md
TODO.md
agents/                 canonical role prompts
skills/                 repeatable multi-role procedures
prompts/                one-shot prompts and Codex master prompt
templates/               client, spec, design, content, handoff, review, retro
schemas/                 portable artifact contracts
docs/                    operator, tool/model, safety, workflow, integration, recovery
settings/                example non-secret routing and preferences
work/clients/<id>/projects/<id>/    client artifacts, isolated by ID
app/ or repository-native application folders/ dashboard and backend (Codex chooses after inspection)
```

Preserve any existing repository structure and user files; this tree is an intent map, not permission to relocate or overwrite existing project assets.

## Completion evidence

Codex must distinguish starter documentation from implemented/configured functionality. Dashboard is done only when runnable in the target project and its checks pass. A provider is connected only when a harmless test verifies it. GitHub integration is live only when actual repo identity/status is read. A workflow is proven only with synthetic data or an explicitly approved test repo, and every claimed action has evidence.
