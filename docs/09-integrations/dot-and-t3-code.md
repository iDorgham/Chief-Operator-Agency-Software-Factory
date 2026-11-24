---
owner: Chief Operator
status: canonical
version: 1.0.0
last_reviewed: 2026-11-24
---

# Single Dot and T3 Code Operating Plan

## DT3-001 task contract

- **Objective:** establish one Dot as the Chief Operator and T3 Code as the software execution control plane.
- **Owner:** Chief Operator.
- **Approved inputs:** canonical repository policy, the observed local Bots project in T3 Code and the existing verified Codex smoke test.
- **Acceptance criteria:** correct Dot/Codex terminology; define responsibilities and a portable handoff loop; preserve one front door and one implementer; identify live configuration as a separate exact-approval action; pass factory validation.
- **Exclusions:** no live Dot-profile edit, automatic T3 invocation, coding task, external service, credential change, merge, deployment or permission expansion.
- **Evidence:** `dot/CHIEF_OPERATOR.md`, `dot/README.md`, this plan and the factory validation result.

## Responsibility boundary

| Component | Responsibility |
| --- | --- |
| Single Dot | Intake, priorities, task contracts, routing, consolidated status and exact approval requests |
| Repository | Canonical governance, roles, task state, specifications, handoffs and evidence |
| T3 Code | Coding threads, provider selection, isolated workspaces and session continuity |
| Coding agent | One approved implementation scope plus tests and result evidence |
| Review thread | Independent criterion-to-evidence review when warranted |
| Operator | Final authority for consequential actions |

## First controlled run

After the operator approves the exact live Dot instruction change:

1. Configure the Dot with `dot/CHIEF_OPERATOR.md`.
2. Give it one synthetic, read-only intake task.
3. Require a handoff matching `schemas/handoff.schema.json` and `templates/handoff.md`.
4. Transfer that handoff into one local T3 Code thread.
5. Require a read-only evidence result; do not merge, deploy or change permissions.
6. Return the result to the Dot and verify that it reports evidence without claiming unobserved actions.

Automation between Dot and T3 is a later adapter decision. It must not be inferred from the presence of both products.

## Multiple MCP surfaces

When T3 MCP is connected to Codex, Claude and OpenBot.run, follow the [multi-surface MCP plan](multi-surface-t3-mcp-plan.md). Connection presence and full-access settings are not validation. Promote each surface independently and reduce permissions after the synthetic tests.
