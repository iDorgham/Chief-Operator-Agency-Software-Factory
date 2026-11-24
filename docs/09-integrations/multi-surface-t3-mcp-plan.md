---
owner: Chief Operator
status: proposed
version: 1.0.0
last_reviewed: 2026-11-24
---

# Multi-Surface T3 MCP Plan

## MCP-001 task contract

- **Objective:** safely operate T3 Code through Codex, Claude and OpenBot.run without duplicate implementation or uncontrolled writes.
- **Owner:** Chief Operator.
- **Approved inputs:** the operator's report that T3 MCP was added with full access to all three surfaces, existing T3/Codex smoke-test evidence and canonical factory policy.
- **Acceptance criteria:** assign one lane to each surface; distinguish reported, observed and validated capability; define a synthetic verification matrix; define steady-state least privilege; preserve one implementer and exact approval gates; provide rollback.
- **Exclusions:** no permission change, provider connection, thread creation, code edit through T3, merge, deployment, credential operation, remote exposure or real client data.
- **Evidence:** this plan, existing T3 verification records and future per-surface test records.

## Current capability state

| Surface | Reported state | Observed evidence | Promotion state |
| --- | --- | --- | --- |
| Codex | T3 MCP connected with full access | T3 Code plugin is visible in Codex; no callable T3 tools were exposed to the inspecting chat; an earlier local Codex/T3 smoke thread passed through the T3 control plane | partially verified |
| Claude | T3 MCP connected with full access | none recorded in this repository | unverified |
| OpenBot.run | T3 MCP connected with full access | OpenBot and its providers were previously inspected, but this new T3 MCP connection has not been tested | unverified |

User-reported access is not proof of tool availability, permission scope or successful execution. Each surface is promoted independently.

## Steady-state routing

| Lane | Default responsibility | Write authority |
| --- | --- | --- |
| Dot / Chief Operator | Intake, task contracts, routing, consolidated results and exact approval requests | Factory records only when explicitly assigned; no implementation |
| OpenBot.run | Persistent organization, workflows, task queue and provider visibility | Orchestration records; no unattended consequential actions |
| Codex through T3 | Primary software implementer | One approved code scope in one isolated workspace |
| Claude through T3 | Independent review; alternate implementer only after formal reassignment | Read-only for review; code write only when it becomes the sole assigned implementer |
| T3 Code | Project, thread, workspace and provider control plane | Executes only the permissions granted to the selected lane |
| Repository | Canonical policy, specifications, task state and evidence | Controlled by the assigned task owner/implementer |

Codex and Claude must never edit the same scope concurrently. OpenBot must not silently start a second implementation when a T3 thread already owns the task.

## Verification sequence

Run the following with synthetic data and stop on the first permission or identity discrepancy:

1. **Inventory:** list T3 projects and identify `Bots`; no changes.
2. **Read:** read one known project/thread record; no changes.
3. **Create bounded thread:** create one read-only synthetic thread with a stable task ID and explicit exclusions.
4. **Evidence:** require the thread to read `AGENTS.md` and return its first heading plus provider/thread identity.
5. **Reconciliation:** verify the actual T3 thread state before retrying or declaring completion.
6. **Role boundary:** confirm Codex acts as implementer, Claude as reviewer and OpenBot as orchestrator.
7. **Negative tests:** confirm none of the surfaces can merge, deploy, delete, alter credentials or expand permissions without a fresh exact operator approval.

Record each surface as `unverified`, `configured`, `validated`, `blocked` or `revoked`. A pass on one surface does not promote another.

## Permission target

After verification, replace full access with the smallest supported scope:

- list/read approved T3 projects;
- list/read approved threads and their results;
- create a bounded thread in an approved project;
- send a prompt to an assigned thread;
- read status, provider identity and evidence;
- optional isolated-workspace creation for the sole assigned implementer.

Keep merge, deployment, deletion, archive destruction, credential management, provider-account changes, remote exposure and permission expansion disabled. If T3 MCP cannot express granular permissions, keep full access only behind per-action confirmation and do not use it for unattended OpenBot routines.

## Failure and rollback

- On identity, project or permission mismatch: stop and record the observed state.
- On timeout: reconcile the real thread state before retrying.
- On duplicate implementation: pause both lanes, preserve artifacts and reassign one owner.
- On unexpected write: disconnect the affected MCP surface, preserve logs and inspect repository/T3 state.
- Rollback: revoke the T3 MCP connection from the affected surface and return to manual, human-visible handoffs. Repository policy and task records remain authoritative.

## Promotion gate

Real software work may begin only after the chosen implementation surface passes its synthetic test and the operator approves the task's exact scope. Real client or confidential data remains blocked until provider terms, retention and commercial-use conditions are approved.

Synthetic verification may continue while `LIC-001` is open. Company work, paid work, client work, internal business operations and hosting for third parties through OpenBot remain blocked until the appropriate commercial license is activated and the Billing screen is recorded as current. With one human user, the current recommended target is the one-seat Starter License; AI agents do not consume seats. A hosted server is a separate product and is not required for the local factory.
