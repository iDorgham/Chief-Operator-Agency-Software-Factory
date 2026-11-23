---
owner: Operations, Analytics and Improvement Lead
status: canonical
version: 1.0.0
last_reviewed: 2026-11-24
---

# Fast Lane

The fast lane lets small, safe internal tasks skip the separate approval step so they finish in minutes instead of waiting for a review cycle. Decision record: [ADR-002](../../plans/decisions/ADR-002-fast-lane-and-work-automation.md).

## Eligibility (all must hold)

- Internal to the factory or a project's own repository. No client message, publish, spend, deploy, merge, delete, purchase, credential or permission change. Those always follow [Authority and Approvals](../01-governance/authority-and-approvals.md).
- Reversible with one revert, and small: one bounded scope with no overlapping implementer.
- Uses synthetic or already-approved inputs. No new protected or client data.
- Has testable acceptance criteria that automated checks can verify, such as factory validation, tests or lint.

If any condition is unclear, use the standard lane.

## What changes

| Step | Standard lane | Fast lane |
| --- | --- | --- |
| Start | `draft -> approved -> active` | `draft -> active` |
| Review | Named lead reviewer | `automated-checks` (green CI or validator run) or a named lead |
| Completion | Reviewer, never the owner | Reviewer, never the owner |
| Evidence | Required before review | Required before review |

Every transition is still logged as an event, and `scripts/factory.py check` verifies the records in CI.

## Commands

```powershell
python scripts/factory.py new-task work/projects/<project> --lane fast --title "Fix doc typo" --owner software-lead --reviewer automated-checks --criteria "Factory validation passes"
python scripts/factory.py move <TASK-ID> active --actor software-lead
python scripts/factory.py move <TASK-ID> review --actor software-lead --evidence "validate-factory green"
python scripts/factory.py move <TASK-ID> completed --actor automated-checks
```

## Guardrail

`retro` compares fast-lane and standard cycle times. If a fast-lane task causes a rollback or incident, the Operations Lead proposes tightening eligibility through the normal [improvement loop](improvement-loop.md).
