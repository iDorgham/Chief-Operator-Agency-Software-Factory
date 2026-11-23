# Validation Record

Date: 2026-11-24

Command: `scripts/validate-factory.ps1` with the installed Codex skill validator.

## Structural checks

- Passed: 18 skill packages passed `quick_validate.py`.
- Passed: 11 JSON Schema documents parse as JSON.
- Passed: all local Markdown links resolve (`BROKEN_LINKS=0`).
- Passed: requested capabilities map to persistent leads and delivery mechanisms in the capability map.
- Passed: synthetic scenarios contain no authorized live external action.
- Passed: pre-rebuild archive contains 74 SHA-256 entries and is recoverable from commit `e31ed81`.
- Passed: the consolidated factory validation script completed successfully.

## Audit re-run — 2026-11-24

Command: `pwsh -File scripts/validate-factory.ps1 -SkillValidator <quick_validate.py>` (exit 0).

- Correction: 19 skill packages were validated (18 under `skills/` plus `.agents/skills/openbot-run-operator`); the "18" above omitted the installed package.
- Passed: 11 schemas pass Draft 2020-12 meta-schema validation, not only JSON parsing.
- Passed: 12 valid contract fixtures validate and 5 invalid fixtures are rejected (`fixtures/contracts/`).
- Passed: OpenBot manifest role sources exist, channel members are declared roles, and roles match `agents/`.
- Passed: every skill named in `agents/*/AGENT.md` exists as a package.
- Passed: all 74 archive SHA-256 entries match content at `e31ed81`. The sums were generated from a `core.autocrlf=true` checkout, so text files hash in their CRLF form; the validator accepts either form.
- Verified: a deliberately invalid fixture makes the script exit 1 and report every failure.

## Behavioral status

Fixtures are prepared. File-level structural validation passed. Live OpenBot, behavioral agent execution, Factory Core and Control Desk application behavior are unverified and intentionally deferred by the approved Phase 1 scope.

