# ADR-002 — Fast Lane and Work Automation

Status: accepted. The operator requested faster, automated and self-improving workflows on 2026-11-24.

## Context

Every task followed the full standard lane, and task status, events and retrospectives were kept by hand. That slowed small internal tasks and left the improvement loop without data.

## Decision

1. Add `scripts/factory.py` to create projects and tasks with stable IDs, move tasks through an enforced state machine, log every transition to `events.jsonl`, list ready work, and validate all records.
2. Add a fast lane for internal, reversible tasks with no external effects. These tasks may go `draft -> active`, and automated checks may act as reviewer. See [Fast Lane](../../docs/04-workflows/fast-lane.md).
3. Add `factory.py retro`, which computes cycle time, rework and blocked time from events and drafts improvement proposals with status `proposed`. A weekly CI job publishes the report.
4. Bump `work-item.schema.json` to 1.1.0, adding optional `lane`, `reviewer`, `created_at` and `updated_at` fields, and require evidence on completed tasks. 1.0.0 records remain valid.

## Constraints kept

- The owner can never complete their own task, and the reviewer must differ from the owner.
- Approval-gated actions in the [authority matrix](../../docs/01-governance/authority-and-approvals.md) are never eligible for the fast lane.
- Retro proposals are never applied automatically. Adopting one still needs operator approval.

## Validation

`scripts/test_factory.py` covers the state machine and its guards. `factory.py check` runs over `fixtures/work/` and `work/` in CI.

## Rollback

Create tasks without `--lane fast`, remove the `retro.yml` workflow, and revert this ADR. Records at work-item 1.1.0 stay readable.
