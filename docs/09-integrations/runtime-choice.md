---
owner: Chief Operator
status: canonical
version: 1.0.0
last_reviewed: 2026-11-24
---

# Agent Runtime Choice

## RT-001 task contract

- **Objective:** make the same factory team launchable through ChatGPT, Codex role chats or OpenBot.run, with a separate single-Dot Chief Operator option.
- **Owner:** Chief Operator.
- **Approved inputs:** canonical repository roles, policies, prompts and existing OpenBot package.
- **Acceptance criteria:** all eight roles map to canonical role files; the Chief Operator remains the front door; each runtime has a documented launch path; task identity and evidence survive runtime changes; validation checks both team manifests.
- **Exclusions:** no external chat creation, provider connection, credential change, OpenBot import, scheduling, publication, deployment or permission expansion.
- **Evidence:** `codex/team-manifest.yaml`, `codex/ROLE_BOOTSTRAP.md`, `codex/README.md`, `openbot/team-manifest.yaml` and the factory validation result.

## Selection rule

| Need | Choose | Launch path |
| --- | --- | --- |
| One conversational front door, planning or lightweight work | ChatGPT | Paste `prompts/CHIEF_OPERATOR.md`; attach only approved context |
| One proactive personal front door for the factory | Single Dot | Use `dot/CHIEF_OPERATOR.md`; route approved software handoffs to T3 Code |
| Repository work, coding, isolated technical contexts or separate visible role chats | Codex role chats | Use `codex/team-manifest.yaml` and `codex/ROLE_BOOTSTRAP.md` |
| Persistent team identity, cross-role workflows, schedules and provider management | OpenBot.run | Use `openbot/team-manifest.yaml` after the verification checklist |

The runtime is a replaceable execution surface. It does not own governance, approvals or canonical role instructions.

## Handoff portability

When work changes runtime, carry the same task ID, accountable owner, approved inputs, acceptance criteria, exclusions, permissions, evidence requirements and return path. Record the selected provider/model for material outputs. Never duplicate implementation across runtimes; use another runtime only for an independent review or a formally reassigned task.

Commercial or client work in OpenBot remains blocked until its license and provider data terms are approved. Real client data remains excluded from runtime setup tests unless explicitly authorized.
