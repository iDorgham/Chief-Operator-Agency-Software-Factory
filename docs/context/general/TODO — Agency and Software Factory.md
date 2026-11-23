# TODO — Agency and Software Factory

This checklist tracks outcomes for Codex to implement on Dorgham’s PC. Nothing here is complete merely because starter documentation exists. Mark complete only with evidence in the intended repository/environment.

## 1. Improvements

- [ ] The factory records phase duration, approval wait, retries, conflicts/duplicate attempts, review rounds, CI outcomes, manual interventions, estimate error and operator feedback where observable.
- [ ] It creates evidence-linked improvement proposals with expected benefit, risk, owner, validation and rollback; the operator accepts or rejects.
- [ ] It never silently changes model/provider routing, agent prompts, permissions, privacy/retention, merge/CI/publication rules or credentials.

## 2. Settings

- [ ] Codex reports actual PC OS, workspace/repository, branch/status/remotes, existing files/user changes, installed tools and account-visible capabilities without exposing credentials.
- [ ] Current provider/model selectors and usage indicators are checked; exact model IDs, limits and costs are not assumed from plan names or public docs.
- [ ] OpenBot commercial-use license and applicable provider/client-data terms are resolved before commercial/client use.
- [ ] Tool boundaries, role model tiers/fallbacks and optional-tool policies are documented; no new paid service is enabled without operator approval.
- [ ] Secrets remain outside prompts, code, logs, browser storage and client-facing responses.

## 3. Backend and workflow

- [ ] A local/file-based synthetic workflow works even if OpenBot, T3, model APIs or GitHub connectors are unavailable.
- [ ] Dashboard has clearly separated Demo/Live state, client/project isolation, work queue, phases, progress denominator, ETA assumptions, approvals, evidence links and audit events.
- [ ] Software state machine is sequential and resumable with per-repository lock, stable IDs, idempotency, duplicate branch/PR detection and timeout reconciliation.
- [ ] Required CI checks are read from the real PR head SHA; missing, pending, stale, cancelled, failed or ambiguous checks block merge.
- [ ] Merge and exact merged-feature-branch deletion require separate, specific human approvals; no force push or base-branch writes.
- [ ] Content workflow separates draft/review/approval/schedule/publish; external send, publish, spend and deployment remain approval-gated.
- [ ] Recovery, export/backup and incident instructions exist and are exercised on synthetic state.

## 4. Marketing, design and content

- [ ] Agency flow supports intake, positioning, strategy, planning, brand brief/version, UX/design handoff, text/image/video content briefs, scripts/storyboards and delivery review.
- [ ] SEO/AEO/GEO, audit, analytics and advertising outputs cite source data, date range, definitions and provenance; unavailable data is labeled rather than fabricated.
- [ ] Creative drafts identify asset rights/source, claims requiring evidence, accessibility/channel requirements and approval owner.
- [ ] Publishing/ad-spend workflows cannot execute without explicit approval of exact copy/asset/channel/timing/budget.

## 5. Delivery and quality

- [ ] Operator guide, model/tool guide, Codex master prompt, workflow, safety/privacy, integrations and recovery docs match the implemented behavior.
- [ ] Role prompts, skills, prompts, templates and schemas are versioned; only recurring non-overlapping roles are activated.
- [ ] One synthetic end-to-end agency task and one software spec→branch/workflow/review cycle are completed without real client data or external publication/merge.
- [ ] Existing tests, lint/typecheck/build pass or confirmed blockers are reported accurately; desktop/mobile layouts are checked where available.
- [ ] Final report separates completed, scaffolded, blocked and unverified items and lists exact next human steps.
