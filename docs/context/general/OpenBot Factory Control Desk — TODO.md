# OpenBot Factory Control Desk — TODO

## 1. Project and repository dashboard
- [ ] Show configured repository identity, connection state, base branch, current GitHub reachability/permissions, latest repository status, open PR count, and last sync time; distinguish demo from live values.
- [ ] Show overall project progress, completed specs, active/queued/blocked specs, progress by phase, and estimated remaining time with confidence/assumptions.

## 2. Spec queue and phase workflow
- [ ] Create and edit specs with ID, title, scope, acceptance criteria, repo/base SHA, risk, estimated duration, and status.
- [ ] Run specs sequentially: Spec → Preflight → Create Branch → Commit & Push → Create/Find Open PR → Review & Resolve → Check CI → Green Gate → Human Approval → Merge → Delete Branch → Retro.
- [ ] Do not start the next spec until the active spec is terminal and cleanup is confirmed.
- [ ] Persist phases, transitions, timestamps, attempt counts, blockers, artifacts, and audit events so runs can resume safely after interruption.

## 3. GitHub and duplicate avoidance
- [ ] Keep GitHub credentials only on the server; never store them in browser local/session storage or database rows.
- [ ] Inspect repository, base branch, permissions, branch rules, open PRs and latest SHA before writes.
- [ ] Avoid duplicate branches, commits, workflows and PRs with stable spec identifiers, preflight lookup, per-repo single-run locking and idempotency keys.
- [ ] Create a spec-specific branch, commit and push only to that branch; never force-push or write to the base branch.
- [ ] Find/reuse a matching PR only when spec ID and branch/base identity match; otherwise pause and show conflict resolution options.
- [ ] Show GitHub PR, review and CI statuses with timestamps and source links; do not infer green from missing checks.

## 4. Review, CI, merge and cleanup gates
- [ ] Show review comments and decision status; support a human-in-loop decision/response from the dashboard.
- [ ] Allow bounded requested changes within the same branch/spec; require a new spec revision when scope changes.
- [ ] Poll required checks with bounded backoff and pause on failed, missing, cancelled, stale or ambiguous checks.
- [ ] Permit merge only after required checks are green and reviews satisfy repository policy; require explicit human approval by default.
- [ ] Delete only the exact merged feature branch; require a separate human approval by default; never delete base/unmerged branches.
- [ ] Record API receipts and errors for every write and provide resume/retry actions that are idempotent.

## 5. Self-improvement and estimates
- [ ] Record per-phase elapsed time, CI failures, review rounds, retries, conflicts, approval wait and manual interventions.
- [ ] Estimate completion using observed history when available; otherwise show a transparent baseline range and confidence label.
- [ ] After each completed loop, generate an improvement proposal with supporting evidence and expected impact.
- [ ] Require operator approval before applying any change to workflow policies, prompts, thresholds or automation settings.

## 6. User interface and project setup
- [ ] Create a responsive dashboard with project status, spec list, phase timeline, overall progress, ETA, approvals inbox, activity log and GitHub connection/settings.
- [ ] Include a clearly labeled demo mode so the dashboard is useful before connecting a repository.
- [ ] Include accessible status text/icons and mobile layouts; do not rely on color alone.
- [ ] Create supporting docs for workflow, approval/safety policies, GitHub setup and troubleshooting.
- [ ] Configure TypeScript/JavaScript diagnostics before application code; run type check, tests and production build; inspect desktop and mobile preview.
