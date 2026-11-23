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

