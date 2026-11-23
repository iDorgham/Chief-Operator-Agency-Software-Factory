# Chief Operator Agency and Software Factory

A local-first, human-supervised operating system for software delivery, design, marketing, content production and agency operations. The operator uses one **Chief Operator**; professional team leads and bounded subagents perform specialist work behind structured handoffs and approval gates.

## Start here

1. Read [System Overview](docs/00-overview/system-overview.md).
2. Review the [Team Constitution](docs/01-governance/team-constitution.md).
3. Use [PLAN.md](PLAN.md) and [TASKS.md](TASKS.md) for implementation status.
4. Give work to the Chief Operator using [Project Brief](templates/project-brief.md).
5. Invoke reusable procedures from [`skills/`](skills) (the OpenBot operator skill is installed in [`.agents/skills`](.agents/skills)).

## Canonical map

- `docs/` — product, governance, architecture, organization, workflows and operations.
- `plans/` — decision-complete implementation plans and architecture decisions.
- `agents/` — eight persistent role definitions: the Chief Operator plus seven leads.
- `subagents/` — temporary specialist profiles and delegation policy.
- `skills/` — canonical project skill packages (18).
- `.agents/skills/` — installed project-local Codex skills (currently `openbot-run-operator`).
- `prompts/` — Chief Operator and factory bootstrap prompts.
- `rules/` — detailed policies referenced by `AGENTS.md`.
- `schemas/` and `templates/` — machine-readable contracts and human forms.
- `memory/` — scoped, source-grounded organizational and project memory.
- `fixtures/` — synthetic acceptance inputs, contract examples and expected invariants.
- `work/` — approved client/project working area (empty until real work is approved).
- `openbot/` — import-ready OpenBot package; not proof of live configuration.
- `scripts/` — validation tooling.
- `archive/` — recoverable pre-rebuild material.

## Validate

Requires PowerShell 7, Python 3 with `jsonschema` and `pyyaml`, and Git.

```powershell
pwsh -File scripts/validate-factory.ps1 -SkillValidator "$HOME/.codex/skills/.system/skill-creator/scripts/quick_validate.py"
```

This checks Markdown links, skill packages, JSON Schema validity, valid/invalid contract fixtures, the OpenBot manifest, agent skill references and archive hashes.

## Current state

Phase 1 provides the factory constitution, documentation, contracts, project-local Codex skills and synthetic validation assets. The Control Desk application and live integrations are intentionally deferred to later approved phases.

For the intended OpenBot + T3 Code operating model, read [OpenBot and T3 Code Guide](docs/09-integrations/openbot-and-t3-code.md).

