---
name: retrospective-improvement
description: Analyze completed or blocked work and propose one evidence-linked reversible improvement without silently changing policy, prompts, routing, or permissions.
---

# Retrospective Improvement

Gather time, waits, retries, failures, conflicts, review rounds, intervention, model route, visible usage/cost, estimate error and feedback. Propose one exact change with benefit, risk, validation and rollback. Keep status proposed until approval.


Start from data: run `python scripts/factory.py retro` (add `--root <dir>` for another work root) to get cycle time, rework rounds and blocked time per task, plus draft proposals. Review each draft against the evidence, keep or reword the strongest one, and save it with `--write`. Never move a proposal past `proposed` yourself.
