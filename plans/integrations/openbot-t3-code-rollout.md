# OpenBot + T3 Code Rollout

Canonical product site: [https://t3.codes/](https://t3.codes/).

## Observed state

- OpenBot UI is present with Workflows, Tasks, Schedule, Usage, Library and Providers; exact version/license/server remains unverified.
- T3 Code CLI is installed at `C:\Users\User\.t3\bin\t3.cmd`, version `0.1.9`.
- Codex CLI `0.166.0`, Claude Code `2.1.330`, OpenCode and Qoder `1.1.89` are present. OpenCode could not write its user log inside the current sandbox, so runtime readiness is unverified.

## Rollout stages

1. Record OpenBot About/version, server, license and provider status.
2. Import Chief Operator; run a read-only project-summary task.
3. Start T3 Code locally on loopback and add this repository.
4. Run one synthetic Codex implementation thread with no external GitHub write.
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

