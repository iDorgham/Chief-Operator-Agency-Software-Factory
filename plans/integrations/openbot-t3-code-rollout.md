# OpenBot + T3 Code Rollout

Canonical product site: [https://t3.codes/](https://t3.codes/).

## Observed state

- OpenBot `0.76.1` Stable is installed on the local `OpenBot` server. Account, provider, storage, permissions and Marketplace behavior were audited in [`../../docs/09-integrations/openbot-live-audit-2026-11-24.md`](../../docs/09-integrations/openbot-live-audit-2026-11-24.md). Personal/noncommercial use is current; commercial use remains blocked until a valid commercial license is activated.
- Chief Operator import and its hardened read-only boundary were verified in [`../../docs/09-integrations/openbot-chief-operator-verification-2026-11-24.md`](../../docs/09-integrations/openbot-chief-operator-verification-2026-11-24.md). Its intended model is restored to Claude Haiku 5.5; the post-hardening regression used GPT-6-Luna because the Claude allowance was exhausted.
- T3 Code CLI is installed at `C:\Users\User\.t3\bin\t3.cmd`, version `0.1.9`.
- Codex CLI `0.166.0`, Claude Code `2.1.330`, OpenCode and Qoder `1.1.89` are present. OpenCode could not write its user log inside the current sandbox, so runtime readiness is unverified.
- This repository is registered as T3 Code project `Bots` (`5b308c28-81b9-4965-91ea-4cd735e87926`), workspace `D:\Work\AI\Projects\bots`, GitHub identity `iDorgham/Chief-Operator-Agency-Software-Factory`, added 2026-11-24 without remote access.
- The Codex restricted-token shell issue is resolved: portable PowerShell `7.7.0` is first on the user `PATH`, T3 Code was restarted, and read-only thread `mcp:86a00d59-2f7e-4370-aa40-d21a6336d1ea` successfully read `AGENTS.md` from isolated branch `t3/t3-002-smoke-rerun-readonly`. Evidence and rollback details are in [../../docs/09-integrations/t3-code-shell-verification-2026-11-24.md](../../docs/09-integrations/t3-code-shell-verification-2026-11-24.md).

## Rollout stages

1. **Complete:** record OpenBot version, server, license, provider, storage and Marketplace status.
2. **Complete:** import Chief Operator; run a read-only project-summary task and verify that no tools or connected applications are used.
3. **Complete:** start T3 Code locally on loopback and add this repository as project `Bots`.
4. **Complete:** run one synthetic Codex thread with no external GitHub write. The passing read-only re-run used an isolated worktree, returned the exact first heading of `AGENTS.md`, and left its branch clean.
5. Run one independent review thread and compare its result to the approved criteria.
6. Return evidence through OpenBot and verify the approval card stops before merge/deploy.
7. Add remaining team leads and reusable OpenBot workflows one at a time.
8. Add a weekly scheduled review only after manual runs pass.

## Acceptance

- The operator communicates through the Chief Operator.
- OpenBot handoff references exact project/task/spec versions.
- T3 Code thread uses an isolated approved workspace and one implementer.
- Result and review artifacts validate against repository contracts.
- No production, publish, spend, merge or delete action occurs.

