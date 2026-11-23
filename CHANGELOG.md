# Changelog

## 2026-11-24

- Preserved the pre-rebuild documentation in Git commit `e31ed81`.
- Rebuilt the project around one Chief Operator and seven persistent leads (eight persistent roles).
- Added categorized documentation, plans, rules, memory policy, schemas, templates, project-local skills, OpenBot import assets and synthetic acceptance fixtures.
- Audit: corrected the lead count across docs (seven leads plus the Chief Operator, not "eight leads").
- Audit: `approval.schema.json` 1.1.0 adds optional `expires_at` and requires `decided_by`/`decided_at` once an approval is approved, rejected or executed; 1.0.0 records remain readable.
- Audit: added `scripts/validate_contracts.py` (meta-schema, valid/invalid contract fixtures, OpenBot manifest, agent skill references, archive hashes at `e31ed81`) and wired it into `scripts/validate-factory.ps1`, which now reports all failures instead of stopping at the first.
- Audit: README now points to `skills/` as the canonical skill location and documents how to run validation.
- CI: added `.github/workflows/validate.yml` (Windows runner, full history for the archive check) running `scripts/validate-factory.ps1` on push and pull request; pinned validator dependencies in `scripts/requirements.txt`.
- CI: `scripts/validate_contracts.py` now checks every `SKILL.md` frontmatter (allowed keys, hyphen-case name matching its directory, bounded description without angle brackets, no TODO placeholders, unique names), with rejection cases in `fixtures/skills/invalid/`, so skills are validated in CI.
- Automation: added `scripts/factory.py` (init-project, new-task, move, next, status, check, retro). It assigns stable task IDs, enforces the status state machine (owner cannot self-complete, evidence before review, dependencies before start), and logs every transition to `events.jsonl`.
- Automation: added the fast lane (`docs/04-workflows/fast-lane.md`, ADR-002) for internal reversible tasks, and `work-item.schema.json` 1.1.0 (optional `lane`, `reviewer`, timestamps; completed tasks require evidence).
- Self-improvement: `factory.py retro` measures cycle time, review rework and blocked time and drafts `proposed` improvements. `.github/workflows/retro.yml` publishes the report weekly as a read-only artifact.
- CI: `validate-factory.ps1` now runs `scripts/test_factory.py` and `factory.py check` over `fixtures/work/` and `work/`. Added an optional `.githooks/pre-commit` gate.

