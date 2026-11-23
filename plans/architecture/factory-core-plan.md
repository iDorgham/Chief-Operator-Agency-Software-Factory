# Factory Core Architecture Plan

Factory Core will expose projects, tasks, runs, phase transitions, artifacts, approvals, capabilities, locks and audit events. Commands validate current state and append events atomically. External adapters use idempotency keys and reconcile observed state after uncertainty.

Minimum interfaces:

- Create/update project and approved specification.
- Queue, start, pause, resume, block and complete a run.
- Record artifact, evidence and review.
- Request/decide an exact approval.
- Acquire/release scoped lock.
- Record adapter request, receipt and reconciliation.
- Query active work, approval inbox and audit history.

Implementation waits for ADR-001. Secrets remain outside domain records.

