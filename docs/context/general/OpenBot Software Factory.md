# Dorgham’s Self-Improving Agency and Software Factory

A local-first, human-supervised operating system for software delivery, marketing, design, text/image/video production, analytics and agency operations. The repository contains canonical prompts, role files, skills, templates, schemas and operating guidance. It is a starter pack—not a claim that Codex has configured Dorgham’s PC, connected an account, or created external agents.

## Start here

1. Read the [Operator Guide](docs/operator-guide.md).
2. Review the [Tool Stack and Model Routing](docs/tool-stack-and-model-routing.md) guide, including OpenBot’s commercial-use licensing caveat and account-dependent model access.
3. Open the intended local workspace in Codex on Dorgham’s PC and paste the [Codex Master Prompt](prompts/CODEX_MASTER_PROMPT.md).
4. Let Codex inspect the real environment, write/update plan and TODO, then build a synthetic end-to-end test before connecting client data or enabling external actions.

## Core safety contract

One accountable owner and one implementer per task. No implementation without an approved spec and testable criteria. Avoid duplicate branches/PRs with idempotent preflight and reconciliation. Required checks and evidence-based review gate merge; human approval gates merge, branch deletion, publishing, client sends, ad spend and production deployment. Models can propose improvements but cannot silently change policies or permissions.

## Package map

- `docs/` — operator guide, model/tool routing, setup and workflow material.
- `agents/` — compact role prompts for import where supported.
- `skills/` — [skill index](skills/INDEX.md) and reusable factory-native procedures.
- `upstream-skills/` — selected downloaded source skills with provenance, license notices, and dependency cautions; these are not installed into an external agent platform.
- `prompts/` — single-purpose prompts and the Codex implementation brief.
- `templates/` and `schemas/` — portable work artifacts/contracts.
- `work/` — client/project working structure guide; do not place secrets here.
- `plan.md`, `TODO.md` — starter implementation plan and outcome checklist.

All integrations and model availability must be verified on the target PC/account. Use file-based handoffs when a product integration is unavailable.
