---
owner: Software Lead
status: canonical
task_id: CORE-001
version: 1.0.0
last_reviewed: 2026-11-24
---

# CORE-001: Factory Core Architecture & Domain Specification

## Task Contract

- **Objective:** Design the authoritative domain model, event store, and adapter interface contracts for Factory Core as ratified in [ADR-001](../decisions/ADR-001-factory-core-stack.md).
- **Owner:** Software Lead / Product Lead.
- **Approved Inputs:**
  - [ADR-001: Factory Core Application Stack](../decisions/ADR-001-factory-core-stack.md)
  - [Team Constitution](../../docs/01-governance/team-constitution.md) & [Authority Matrix](../../docs/01-governance/authority-and-approvals.md)
  - Canonical Schemas: `schemas/work-item.schema.json`, `schemas/approval.schema.json`, `schemas/event.schema.json`, `schemas/project.schema.json`
- **Acceptance Criteria:**
  1. Detailed relational and event-store schema definition adhering to canonical contracts.
  2. State machine specifications with validation rules (preventing self-review, unapproved fast lane transitions, or bypass of operator gates).
  3. Adapter contract for execution plane integration (T3 Code, Codex, Claude, OpenBot).
  4. Concurrency control and scoped lease/lock model.
  5. Complete traceability from task creation to approval, run execution, and evidence registration.
- **Exclusions:**
  - No deployment to remote cloud infrastructure or external production database.
  - No credential or secret storage in application models.
  - No bypass of human approval gates.
- **Evidence:** This specification document, schema definitions, and contract validation report.

---

## 1. Domain Architecture & Relational Model

```text
+-------------------+       1:N       +-------------------+
|     projects      | <------------- |       tasks       |
+-------------------+                 +-------------------+
          |                                     |
          | 1:N                                 | 1:N
          v                                     v
+-------------------+                 +-------------------+
|   audit_events    |                 |       runs        |
+-------------------+                 +-------------------+
          ^                                     |
          |                                     | 1:N
          | 1:N                                 v
+-------------------+       1:1       +-------------------+
|     approvals     | <------------- |     artifacts     |
+-------------------+                 +-------------------+
```

### 1.1 Tables Specification (Drizzle / PostgreSQL)

#### `projects`
- `id`: `varchar(64)` primary key (e.g. `bots`, `gateflow`).
- `title`: `varchar(255)` not null.
- `client_id`: `varchar(64)` nullable.
- `workspace_root`: `text` not null.
- `git_remote`: `text` nullable.
- `status`: `varchar(32)` not null default `'active'` (`active`, `paused`, `archived`).
- `created_at`: `timestamp with time zone` default `now()`.
- `updated_at`: `timestamp with time zone` default `now()`.

#### `tasks` (`work_items`)
- `id`: `varchar(64)` primary key (stable task ID, e.g. `CORE-001`).
- `project_id`: `varchar(64)` references `projects(id)` not null.
- `title`: `varchar(255)` not null.
- `objective`: `text` not null.
- `status`: `varchar(32)` not null (`draft`, `approved`, `queued`, `active`, `blocked`, `review`, `completed`, `cancelled`).
- `lane`: `varchar(16)` not null default `'standard'` (`standard`, `fast`).
- `owner`: `varchar(64)` not null.
- `reviewer`: `varchar(64)` nullable.
- `version`: `varchar(32)` not null default `'1.0.0'`.
- `acceptance_criteria`: `jsonb` not null (array of strings).
- `allowed_scope`: `jsonb` not null default `'[]'::jsonb`.
- `exclusions`: `jsonb` not null default `'[]'::jsonb`.
- `dependencies`: `jsonb` not null default `'[]'::jsonb`.
- `approved_input_refs`: `jsonb` not null default `'[]'::jsonb`.
- `evidence_refs`: `jsonb` not null default `'[]'::jsonb`.
- `created_at`: `timestamp with time zone` default `now()`.
- `updated_at`: `timestamp with time zone` default `now()`.

#### `runs`
- `id`: `varchar(64)` primary key (e.g. `run_01j7...`).
- `task_id`: `varchar(64)` references `tasks(id)` not null.
- `ordinal`: `integer` not null default 1.
- `provider`: `varchar(64)` not null (e.g. `codex`, `claudeAgent`, `antigravity`).
- `model`: `varchar(64)` not null.
- `workspace_path`: `text` not null.
- `status`: `varchar(32)` not null (`preparing`, `running`, `completed`, `failed`, `cancelled`).
- `exit_code`: `integer` nullable.
- `summary`: `text` nullable.
- `started_at`: `timestamp with time zone` default `now()`.
- `completed_at`: `timestamp with time zone` nullable.

#### `audit_events`
- `id`: `varchar(64)` primary key (UUID / CUID2).
- `project_id`: `varchar(64)` references `projects(id)` not null.
- `task_id`: `varchar(64)` references `tasks(id)` nullable.
- `run_id`: `varchar(64)` references `runs(id)` nullable.
- `event_type`: `varchar(64)` not null (e.g. `task.status_changed`, `approval.requested`, `adapter.invoked`).
- `actor`: `varchar(64)` not null.
- `occurred_at`: `timestamp with time zone` default `now()`.
- `summary`: `text` not null.
- `previous_status`: `varchar(32)` nullable.
- `new_status`: `varchar(32)` nullable.
- `idempotency_key`: `varchar(128)` unique nullable.
- `receipt_ref`: `text` nullable.
- `payload`: `jsonb` not null default `'{}'::jsonb`.

#### `approvals`
- `id`: `varchar(64)` primary key.
- `task_id`: `varchar(64)` references `tasks(id)` not null.
- `action`: `varchar(64)` not null (e.g. `git.merge`, `deploy.production`, `spend.budget`).
- `scope`: `text` not null.
- `blast_radius`: `text` not null.
- `status`: `varchar(32)` not null default `'pending'` (`pending`, `approved`, `rejected`, `cancelled`).
- `requester`: `varchar(64)` not null.
- `decider`: `varchar(64)` nullable.
- `rationale`: `text` nullable.
- `decided_at`: `timestamp with time zone` nullable.
- `created_at`: `timestamp with time zone` default `now()`.

#### `locks`
- `resource_id`: `varchar(255)` primary key (e.g. `task:CORE-001`, `branch:main`).
- `holder_run_id`: `varchar(64)` references `runs(id)` not null.
- `acquired_at`: `timestamp with time zone` default `now()`.
- `expires_at`: `timestamp with time zone` not null.

---

## 2. Invariants & State Machine Enforcement

1. **Owner-Reviewer Separation:** `reviewer != owner`. An owner cannot move their own task from `review` to `completed`.
2. **Evidence Precondition:** A task cannot reach `completed` unless `evidence_refs` contains at least one verified artifact reference.
3. **Approval Gating:** High-impact actions (`merge`, `deploy`, `publish`, `spend`, `delete`, `credentials`) require a corresponding row in `approvals` with `status = 'approved'` and a verified human operator `decider`.
4. **Idempotency Guarantee:** Adapters invoking external systems must supply an `idempotency_key`. If an event with the same key exists, the cached receipt is returned without re-executing.
5. **Lock Acquisition:** Before starting a run with write intent, the runner must acquire an exclusive lock on `resource_id`. If held, execution waits or fails gracefully.

---

## 3. Execution Plane & Adapter Boundaries

- **T3 Code Adapter:**
  - Manages creation and teardown of isolated worktrees for coding agents.
  - Interacts with T3 Code via CLI (`t3 thread start`) or local RPC.
  - Reports run progress, exit codes, and diff artifacts back to Factory Core.
- **OpenBot Adapter:**
  - Provides workflow status sync and receives high-level tasks.
  - Ensures OpenBot cannot bypass Factory Core's state machine or launch conflicting implementation runs.
- **Repository / File Sync:**
  - Factory Core emits `events.jsonl` and updates task markdown/JSON mirrors to maintain full offline readability in Git.
