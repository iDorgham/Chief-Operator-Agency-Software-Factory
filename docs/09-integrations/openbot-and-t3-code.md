---
owner: Chief Operator
status: canonical
version: 1.0.0
last_reviewed: 2026-11-24
---

# OpenBot.run and T3 Code Operating Guide

OpenBot and T3 Code solve different layers and should be used together rather than made to compete.

Official T3 Code source: [t3.codes](https://t3.codes/). Treat similarly named domains as untrusted unless the official site or its source repository links to them.

## Product roles

### OpenBot.run: organization and business orchestration

Use OpenBot for persistent agents, team identity, conversations, reusable business workflows, queued tasks, recurring schedules, provider management, usage visibility and shared library items.

The observed OpenBot navigation contains:

- **Workflows:** repeatable multi-step processes with triggers, agent/model steps, conditions and approval points. Use for spec-to-handoff, campaign production, review and other cross-role processes.
- **Tasks:** bounded delegated work and parallel independent investigation. Every task needs an owner, output contract and return path; do not parallelize overlapping edits.
- **Schedule:** recurring routines such as daily blocker checks or weekly reviews. Keep external publishing, spend, merge and deployment out of unattended schedules unless a human approval gate blocks execution.
- **Usage:** monitor provider/model consumption and detect expensive or failing routes. Usage does not replace project outcome metrics.
- **Library:** reusable agents and workflows. Canonical source remains this repository; imported items are deployed copies.
- **Providers:** runtime connections such as Codex, Claude Code and OpenCode. Provider availability belongs to the machine/server running the agent.

OpenBot is not the authoritative code workspace or sole operational database. Verify version, active server, permissions, commercial license and data policy before client use.

### T3 Code: coding-agent control plane

T3 Code is a local MIT-licensed control plane for coding agents. It manages projects, coding threads/sessions, Git workspaces and approvals while the selected coding agent performs the work. It is not an AI model and is not Create T3 App.

Use T3 Code for:

- Opening an approved repository as a coding project.
- Running Codex as the primary implementer.
- Running Claude Code as an alternative implementer or independent reviewer.
- Running OpenCode as a provider-flexible fallback after its provider/data policy is approved.
- Separating concurrent non-overlapping coding tasks into distinct Git workspaces/threads.
- Reviewing per-thread changes and continuing approved coding sessions from desktop/web/mobile.

Do not use T3 Code as project governance, client memory, marketing orchestration or the source of approval policy. Work stops when the host/server is unavailable; remote access must use a trusted network and deliberate pairing.

## End-to-end division of work

```text
Operator
  -> OpenBot Chief Operator
      -> OpenBot Product/Delivery workflow creates approved spec + handoff
          -> T3 Code project/thread runs one coding agent in an isolated workspace
              -> tests + result artifact
          -> independent T3 Code review thread when risk warrants
      -> OpenBot Quality Lead checks evidence
  -> Operator approves merge/deploy
```

OpenBot owns who/why/what/approval. T3 Code owns the coding session/workspace. GitHub owns branches, pull requests and CI evidence. The repository owns canonical rules, specifications and results.

## Best-practice setup

1. Verify OpenBot version/license/server and T3 Code version/status.
2. Import only the Chief Operator and test a harmless task.
3. Add the repository to T3 Code without enabling remote access.
4. Start one Codex thread from an approved synthetic specification.
5. Require the agent to read `AGENTS.md`, follow the handoff and return `templates/result.md` evidence.
6. Use another provider/reviewer only for an independent review, not simultaneous edits.
7. Return the review to OpenBot and request exact operator approval for any merge/deploy.
8. Add schedules only after the manual workflow is reliable.

## Recommended first workflows

- **Software feature:** intake -> spec approval -> T3 Code implementation -> evidence review -> approval request.
- **Bug fix:** reproduce -> bounded handoff -> T3 Code fix/test -> independent review.
- **Marketing campaign:** OpenBot-only strategy/creative workflow; use T3 Code only if a website/application change is required.
- **Weekly factory review:** scheduled OpenBot routine reads completed artifacts and proposes, but does not apply, one improvement.

## Safety defaults

- One active implementer per overlapping repository scope.
- Separate workspaces for truly independent changes.
- No automatic production merge/deploy from a schedule.
- No provider credentials in OpenBot agent prompts or repository files.
- No remote T3 Code exposure until authentication/network trust is verified.
- Reconcile Git state before retrying an interrupted action.
- Treat full T3 MCP access as temporary bootstrap access. Validate OpenBot separately, then reduce to read/list, bounded thread creation, status and evidence permissions where supported.
- OpenBot may orchestrate Codex implementation and Claude review, but it must not start both as competing implementers on the same scope.

