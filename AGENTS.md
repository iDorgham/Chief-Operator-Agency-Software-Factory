# Factory Repository Instructions

## Source of truth

- `README.md`, `PLAN.md`, `TASKS.md` and `docs/` are canonical.
- `archive/` is immutable historical material. Do not edit or treat it as current policy.
- Read `docs/01-governance/team-constitution.md` before changing roles, authority, approvals or workflows.
- Read the relevant file under `rules/` before handling code, client data, external actions, creative assets, marketing claims or memory.

## Work rules

- Preserve one Chief Operator as the normal front door.
- Give every task a stable ID, one accountable owner, approved inputs, acceptance criteria, exclusions and evidence.
- Use one implementer for overlapping code or artifact scope. Parallelize read-heavy investigation and independent review only.
- Do not claim configuration or completion without observable evidence.
- Do not send, publish, spend, deploy, merge, delete, purchase, create credentials or broaden permissions without explicit approval of the exact action.
- Never expose secrets or mix client contexts.
- Use synthetic data for factory tests unless real data is explicitly authorized.

## Skills and validation

- The installed OpenBot operator workflow lives in `.agents/skills/openbot-run-operator/`. Other canonical project skill packages live in `skills/<name>/SKILL.md` because this managed workspace currently protects creation of additional `.agents` siblings; read the matching package when its description applies.
- Validate changed skills with the installed skill validator.
- Validate JSON Schemas, Markdown links and synthetic workflow invariants before reporting completion.
- Report changed files, checks, limitations and remaining human actions.

