---
owner: Operations, Analytics and Improvement Lead
status: canonical
version: 1.0.0
last_reviewed: 2026-11-24
---

# Improvement Loop

Record phase time, waits, retries, failures, conflicts, review rounds, manual intervention, model route, visible usage/cost, estimate error and operator feedback. Propose one small evidence-linked change with expected benefit, risk, validation and rollback. Apply only after approval; preserve the prior version.


## Automation

[`scripts/factory.py`](../../scripts/factory.py) records every task transition as an event in `events.jsonl`. `python scripts/factory.py retro --write` computes cycle time, review rework and blocked time from those events, then drafts evidence-linked proposals under `work/improvements/` with status `proposed`. Thresholds are listed at the top of the script. The [weekly retro workflow](../../.github/workflows/retro.yml) publishes the same report as a CI artifact. Nothing is applied until the operator approves a proposal.
