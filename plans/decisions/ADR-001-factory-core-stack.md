# ADR-001 — Factory Core Application Stack

Status: accepted. Ratified on 2026-11-24 for Phase 3 (Factory Core implementation).

## Context

Legacy documents in the archive presented conflicting prototypes (React + Express + tRPC + Drizzle + MySQL vs. Next.js + tRPC + Prisma + Tailwind). Phase 1 established canonical JSON Schemas and file-based task tracking (`scripts/factory.py`). To scale Factory Core beyond flat-file state and support the future Control Desk (Phase 4), a unified, robust, type-safe application stack is required.

The system must satisfy:
1. Complete end-to-end TypeScript type safety from database models to client components.
2. Direct conformance to canonical JSON Schemas (`work-item`, `approval`, `event`, `capability`, `result`, `review`).
3. An append-only audit event store ensuring state transitions and approval actions are immutable and auditable.
4. Idempotent adapter interfaces for external tools, coding agents (T3 Code, Codex, Claude), and orchestrators (OpenBot).
5. Clean local development and self-hosted deployment flexibility without vendor lock-in.

## Decision

The Factory Core stack is ratified as:

1. **Framework & API:** **Next.js (App Router)** with **TypeScript** and **tRPC** (with TanStack Query).
   - Provides unified full-stack TypeScript, server actions, API routes, and end-to-end typed procedures for both Control Desk UI and programmatic agent callers.
2. **Persistence & Database:** **PostgreSQL** with **Drizzle ORM**.
   - PostgreSQL provides robust relational integrity, native JSONB support for payload validation, transaction isolation, and row-level locking for concurrency control.
   - Drizzle ORM provides lightweight, SQL-like type safety, zero runtime overhead, direct schema-to-TypeScript mapping, and fully reproducible migration management.
3. **Validation & Contracts:** **Zod** schema definitions mirroring the canonical JSON Schemas in `schemas/`.
   - All tRPC inputs/outputs and database mutations validate against these strict schema definitions.
4. **Event Store & State Machine:**
   - Append-only `audit_events` table recording all status changes, approvals, adapter invocations, and idempotency keys.
   - Explicit state machine guards enforcing ownership, distinct reviewers, and non-bypassable operator approvals.
5. **Styling & UI Foundation:** **Tailwind CSS** with accessible component primitives (Radix UI / shadcn patterns).

## Core Domain Models

- `projects`: Project boundaries, client attribution, repository links, and execution policies.
- `tasks` (`work_items`): Stable ID (`<PROJECT>-<NUM>`), lane (`standard` | `fast`), owner, reviewer, objective, acceptance criteria, exclusions, and status lifecycle.
- `runs`: Bounded execution attempts linked to tasks, capturing agent provider, model, isolated workspace path, and exit status.
- `audit_events`: Immutable log of domain events with idempotency keys and receipt references.
- `approvals`: Formal approval requests with explicit decider, scope, blast radius, and decision rationale.
- `artifacts` & `evidence`: Versioned outputs, test logs, diffs, and verification transcripts.
- `locks`: Scoped leases preventing overlapping concurrent modifications on the same task, file scope, or branch.

## Constraints Kept

- **Operator Authority:** Approvals requiring exact human decision (merge, deploy, publish, spend, delete, credential operations) cannot be automated.
- **Separation of Duties:** Task owner and task reviewer must be distinct actors; no self-review.
- **Isolation:** Coding tasks run in distinct workspaces/worktrees managed via T3 Code adapters.
- **Zero Secret Exposure:** Credentials, keys, and tokens remain outside persistent domain records and logs.

## Validation & Verification

1. Unit and contract test suite checking Drizzle schema constraints against `schemas/*.schema.json`.
2. Concurrency and idempotency test verifying that repeated adapter actions with the same idempotency key return identical cached receipts without duplicate side-effects.
3. Migration integrity verification ensuring clean up/down schema transitions.

## Rollback Plan

If PostgreSQL/Drizzle infrastructure encounters unresolvable operational issues, domain models and event records can be dumped to canonical JSON/JSONL format compatible with `scripts/factory.py` file-based storage. Reversion requires an approved amendment ADR.
