---
owner: Product Lead
status: canonical
version: 1.0.0
last_reviewed: 2026-11-24
---

# System Architecture

```text
Operator
  -> Chief Operator and Teams
      -> Versioned Factory Contracts
          -> Factory Core (future authoritative state)
              -> Control Desk (future interface)
              -> Adapters (GitHub, OpenBot, media, analytics, publishing)
```

## Boundaries

- OpenBot supplies persistent conversations, agents, channels and workflows when verified; it is not the sole transaction store.
- Factory Core will own project/task/run/event/approval/artifact state and idempotency.
- Control Desk reads and commands Factory Core; it does not hold secrets in browser storage.
- Adapters isolate external APIs and return receipts, observed state and retry classification.
- Files and schemas remain the portable fallback.

No application stack is selected in Phase 1. Stack selection requires [ADR-001](../../plans/decisions/ADR-001-factory-core-stack.md) after target environment and deployment constraints are known.

