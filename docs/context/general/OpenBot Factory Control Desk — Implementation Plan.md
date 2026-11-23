# OpenBot Factory Control Desk — Implementation Plan

## Goal
Build a responsive, solo-operator dashboard that runs one approved software specification at a time through a safe, observable GitHub delivery loop, then learns from completed runs without silently changing process rules.

## 1. Improvements
The system records phase transitions, elapsed time, CI failures, review rounds, conflicts, approval waits, and operator feedback. After each loop it proposes a small improvement (for example clearer acceptance criteria, a missing preflight, or a better estimate). Proposals are reviewable and versioned; the system must not self-edit prompts, policies, branch protections, or merge settings. Each next spec starts only after the current loop reaches a terminal state and cleanup is confirmed.

## 2. Settings
Settings include owner/repository, base branch, issue/spec sequence, branch pattern, labels, duplicate-PR policy, required check names, CI polling/backoff policy, review/revision policy, merge method, branch deletion policy, and human approval gates. A repository status panel shows connection, permissions, default branch, open PRs, latest commit and CI availability. Secrets are backend-only; credentials are entered via the protected configuration card, never browser storage or source. Demo mode works without credentials and is clearly labeled.

**Safety defaults:** one active spec per repository; branch `factory/<spec-id>-<slug>`; search for an existing branch/PR before creation; reuse only when the spec ID and base SHA match, otherwise pause. Open PRs as drafts or with a configured non-conflicting title/body; never force-push; resolve review feedback in the same feature branch; CI must be green and required reviews satisfied before merge. Human approval is required before merge and branch deletion. Branch deletion is limited to the exact merged feature branch, never the base branch.

## 3. Backend
Use the initialized React/Express/tRPC/Drizzle/MySQL stack. Persist projects/repository settings (excluding secrets), specs, phase status, event/audit records, estimates, approvals, CI snapshots and improvement proposals. The server performs GitHub API calls with least privilege and validates repo/branch/PR identity on every mutation. Idempotency keys and a per-repository lock prevent duplicate concurrent runs. A resumable state machine drives: Spec → Preflight → Create branch → Commit/Push → Find-or-create PR → Review/resolve loop → CI monitor → Green gate → Approval → Merge → Delete feature branch → Retro → next spec.

## 4. Marketing
This is an internal control desk, not a public marketing site. Onboarding copy explains the loop, demo/live status, permission needs, approval gates, estimate confidence and recovery. No public SEO or customer-facing claims are in scope.

## 5. Delivery
Dashboard sections: project/repo health; active spec and phase timeline; completed specs; phase and overall progress; ETA range with confidence and measured historical basis; PR/review/CI state; pending human approvals; activity/audit trail; and a post-run improvement inbox. Demo data supports immediate preview. Live GitHub execution stays unavailable until repository settings and protected credentials are configured and tested.

## Application structure
- `client/src/pages/Home.tsx`: dashboard, tabs/views, modals, action gates.
- `client/src/components/`: reusable phase timeline, progress, status, approval and activity UI.
- `client/src/lib/`: types, workflow metadata, estimator and state presentation helpers.
- `server/routers.ts`: authenticated project/spec/workflow/GitHub procedures.
- `server/github.ts`: server-only GitHub client and safe idempotent operations.
- `server/workflow.ts`: phase state machine and run/resume/approval transitions.
- `drizzle/schema.ts` plus migrations: durable operational data; no credential values.
- `docs/`: operator workflow, policy defaults, safety and setup guidance.

## Design direction
Clean premium operator console: warm near-white canvas, ink/navy text, restrained cobalt for active state, emerald for green checks, amber for waiting, red for blocked. Dense but calm left rail plus broad workspace; strong hierarchy, compact data cards, direct labels and a clear approval queue. Responsive for desktop and mobile. No decorative imagery.

## User-visible loop
1. Create/review a spec with acceptance criteria and estimate.
2. Run preflight: repository access, base branch, clean state, duplicate detection, check/review policies.
3. Create one feature branch; commit and push only the spec-approved changes.
4. Create or reuse the matching PR safely; expose link and summary.
5. Track review comments; pause for operator decisions or apply a requested revision only within the same spec/branch and bounded criteria.
6. Check required CI; report each check and pause on failures or missing/ambiguous status.
7. When green and review-complete, request human approval (default), then merge; delete only the merged feature branch after a separate approval (default).
8. Record outcome and proposed improvement; start the next queued spec only after cleanup/terminal state.

## Boundaries
A dashboard cannot grant GitHub permissions the token lacks. Avoidance means no duplicate PR, branch, concurrent run, or unsafe merge. Automated CI polling is bounded and resumable. Never claim a GitHub action succeeded without an API receipt. The first delivery ships dashboard + demo mode and the live integration scaffold; credentials/repository must be connected to operate on a real repo.
