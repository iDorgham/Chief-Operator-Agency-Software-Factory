# Self-Improvement Loop

The factory learns from completed or blocked work, but it does not change its own operating rules. The purpose of this loop is to reduce rework and improve estimates without weakening privacy, review or approval gates.

## What to record

For each work item, capture start/end time by phase, active execution time, human approval wait, estimate versus actual, attempts/retries, branch/PR conflicts, review rounds, CI failure category, manual interventions, output-quality feedback and the selected tool/model route when the product exposes it. Record cost only when it is visible from a reliable usage source; do not estimate token bills from a subscription plan. Do not record secret values or unnecessary client content.

## How to propose a change

After a task completes or becomes blocked, the responsible role may create a short proposal with: the observed evidence and sample size; the problem and likely cause; the specific change; expected benefit; safety/privacy impact; affected files/policies; a synthetic validation case; an owner; and a rollback method. Prefer a small change to one template, checklist or dashboard measure rather than a new agent or service.

Examples include adding a repository identity check after a conflict, making an acceptance-criteria field more observable after repeated review failures, or adjusting an ETA range after enough phase-duration observations. A proposal must distinguish correlation from a proven cause and say when the sample is too small.

## Approval and application

The operator accepts or rejects the proposal in the dashboard or a recorded decision file. No proposal may be applied automatically. Changes to system prompts, model routing, provider permissions, client-data access, retention, security settings, branch protection, required CI checks, merge/delete rules, publishing, external messages or ad spend need explicit approval and should receive a focused review. Version approved changes, run the relevant synthetic regression test, and keep a rollback path.

## ETA and progress rules

Initially, ETA is a provisional range with explicit assumptions. Once enough comparable work has completed, estimate each remaining phase from project-specific observations, such as median and spread, and show sample size. Exclude human approval wait from active execution time but report it separately. Do not mix completed spec counts with phase checklist counts; show the denominator for each progress figure. Recalculate only when new evidence is recorded and identify the basis for the new range.

## Monthly operator review

Review whether tools and roles changed outcomes, whether premium reasoning was warranted, whether any role was idle, whether repeated context or retries wasted usage, and whether external integrations still have the minimum required permission. Disable unused roles and integrations. Change one model route or workflow element at a time and retest with synthetic input.
