---
owner: Operations, Analytics and Improvement Lead
status: canonical
version: 1.0.0
last_reviewed: 2026-11-24
---

# Memory Architecture

Memory is curated, scoped knowledge—not raw conversation history.

- `memory/operator/`: approved preferences and working conventions.
- `memory/organization/`: stable factory facts and decisions.
- `memory/projects/<id>/`: project decisions, summaries and open questions.
- `memory/clients/<id>/`: isolated approved client context.
- `memory/agents/<id>/`: role-specific working notes that do not duplicate canonical project facts.

Each entry records source, scope, owner, confidence, sensitivity, review date and revalidation/expiry rule. Explicit current instructions override memory. Secrets, raw logs, speculative claims and unrelated client information are prohibited.

