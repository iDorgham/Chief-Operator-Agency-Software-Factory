# UI-001 — Control Desk web interface

Owner: Software Lead (single implementer). Reviewer: Quality Lead / operator.
Status: implemented and locally validated on 2026-11-24; independent acceptance pending.

## Approved inputs and scope

- Operator instruction: proceed with UI-001.
- [Control Desk plan](control-desk-plan.md), [product design](../../docs/06-control-desk/product-design.md), [information architecture](../../docs/06-control-desk/information-architecture.md), and [design plan](../design/factory-design-plan.md).
- Accepted [ADR-001](../decisions/ADR-001-factory-core-stack.md) and existing Core tRPC routers.
- Implement a local Next.js App Router application in `packages/control-desk`, using tRPC, TanStack Query and Tailwind. Preserve existing Core code and unrelated working changes.
- Design choice: warm neutral canvas, navy type, cobalt navigation, compact rail, responsive workspace. No remote font or decorative media dependency.

## Acceptance criteria

1. Default Demo mode is unmistakable on every screen; Live is unavailable with a stated reason.
2. Synthetic project, searchable/filterable queue, task ownership/detail, run timeline, evidence, blockers, approvals, team, capabilities, audit and improvement/settings views are usable.
3. Data passes through Factory Core tRPC project/task/approval routers. Server stores are synthetic, ephemeral and isolated by browser session; no database or external adapters are connected.
4. Approval review exposes action, exact target/version, evidence and consequence. Explicit approve/reject simulation updates the pending inbox and audit, but never runs an adapter or claims a real receipt. Duplicate decisions fail.
5. Progress comes from confirmed task and phase records; ETA states unavailable when historical data is absent.
6. Keyboard focus, semantic landmarks, status text, reduced motion and mobile layout work. Loading, empty, error/retry and blocked states are visible and testable.
7. Typecheck, production build, synthetic integration/browser checks, JSON Schema, Markdown links and repository workflow invariants pass, or failures are disclosed.

## Exclusions

No Live authentication, durable PostgreSQL wiring, real clients, credentials, deployments, external writes, policy changes or modification of archive material. No approval for publishing, merging or spending is inferred. Demo decisions expire with the server session and are never human authorization for real actions.

## Evidence

Implementation and check results will be recorded in [UI-001 validation](../../docs/06-control-desk/UI-001-validation.md). The implementer does not grant independent acceptance.
