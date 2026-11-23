# Working Area

Create `work/clients/<client-id>/projects/<project-id>/` only for approved work, using `python scripts/factory.py init-project <project-id> --client <client-id> --name "..."`. Internal factory work goes under `work/projects/<project-id>/`.

Each project holds `project.json`, `tasks/<TASK-ID>.json`, an append-only `events.jsonl`, and references to briefs, specifications, handoffs, results, reviews, approvals and memory. `work/improvements/` holds retro proposals. Change task status only with `scripts/factory.py move`, so that every change is logged and passes `factory.py check` in CI.

Never store secrets here. Synthetic work uses [`fixtures/work/`](../fixtures/work).
