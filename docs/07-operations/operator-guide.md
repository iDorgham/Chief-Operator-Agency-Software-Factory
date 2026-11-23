---
owner: Chief Operator
status: canonical
version: 1.0.0
last_reviewed: 2026-11-24
---

# Operator Guide

Start work by giving the Chief Operator an outcome, relevant project/client, constraints, deadline and desired approval level. Review briefs and specifications before implementation. Treat approval cards as exact actions, not general consent.

Use `TASKS.md` for factory build status and project task registers under `work/`. Review capability status before relying on a provider. Use synthetic data for setup. Escalate contradictory advice through the Chief Operator, which must show evidence and trade-offs.


## Daily commands

[`scripts/factory.py`](../../scripts/factory.py) keeps task records, events and checks in sync, so status never has to be updated by hand.

| Goal | Command |
| --- | --- |
| Start a project | `python scripts/factory.py init-project <id> --name "<name>" [--client <client-id>]` |
| Add a task | `python scripts/factory.py new-task <project-dir> --title ... --owner ... --reviewer ... --criteria ... [--lane fast] [--depends <ID>]` |
| What can start now | `python scripts/factory.py next` |
| Board overview | `python scripts/factory.py status` |
| Move a task | `python scripts/factory.py move <ID> <status> --actor <role> [--evidence <ref>]` |
| Validate records | `python scripts/factory.py check` |
| Learn from history | `python scripts/factory.py retro --write` |

Use the [fast lane](../04-workflows/fast-lane.md) for small internal reversible tasks. Enable the local pre-commit gate once per clone with `git config core.hooksPath .githooks`.
