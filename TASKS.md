# Factory Task Register

Statuses: `done`, `ready`, `blocked`, `deferred`.

| ID | Status | Owner | Outcome | Evidence |
| --- | --- | --- | --- | --- |
| FND-001 | done | Chief Operator | Preserve legacy documentation | Commit `e31ed81`; archive manifest |
| FND-002 | done | Product Lead | Establish canonical information architecture | Root navigation and categorized docs |
| GOV-001 | done | Chief Operator | Ratify hierarchy and authority | Team constitution and authority matrix |
| CON-001 | done | Product/Delivery | Define core contracts | JSON Schemas and templates |
| SKL-001 | done | Operations Lead | Install project-local skills | `.agents/skills/` validation |
| TST-001 | done | Quality Lead | Create synthetic acceptance suite | `fixtures/acceptance/` and validation report |
| OB-001 | done | Chief Operator | Verify OpenBot version/license/account | `docs/09-integrations/openbot-live-audit-2026-11-24.md`; commercial use remains blocked until a valid license is activated |
| OB-002 | done | Chief Operator | Import and test Chief Operator agent | `docs/09-integrations/openbot-chief-operator-verification-2026-11-24.md`; post-hardening read-only boundary passed on GPT, Claude parity rerun remains optional after quota reset |
| AUT-001 | done | Operations Lead | Automate task tracking, fast lane and retro proposals | `scripts/factory.py`, ADR-002, CI checks |
| T3-001 | done | Software Lead | Verify local T3 Code CLI | `t3 v0.1.9`; help and control-plane commands inspected |
| T3-002 | done | Software Lead | Add this repository as a T3 Code project and verify one harmless Codex thread | Project `Bots` registered; read-only Codex smoke thread `mcp:86a00d59` passed 2026-11-24T06:08Z after the portable PowerShell 7.7.0 + `PATH` remedy, a T3 Code restart, and the Codex quota reset - it read `AGENTS.md` and returned its first heading via a shell command with no `CreateProcessAsUserW` error, staying read-only - `docs/09-integrations/t3-code-shell-verification-2026-11-24.md` |
| RT-001 | done | Chief Operator | Make the factory team selectable through ChatGPT, Codex role chats or OpenBot.run | `docs/09-integrations/runtime-choice.md`; `codex/team-manifest.yaml`; both runtime manifests validated against canonical roles; Codex chats are explicitly distinguished from Dot agents |
| DT3-001 | done | Chief Operator | Define one Dot as the factory front door and T3 Code as the software execution plane | `docs/09-integrations/dot-and-t3-code.md`; `dot/CHIEF_OPERATOR.md`; live Dot configuration remains a separate exact-approval action |
| MCP-001 | done | Chief Operator | Validate and harden T3 MCP across Codex, Claude and OpenBot.run | `docs/09-integrations/multi-surface-t3-mcp-inventory-2026-11-24.md`; Codex validated as implementer, Claude validated as reviewer via isolated worktree thread `mcp:9d217eee`, OpenBot boundary audited |
| LIC-001 | ready | Chief Operator | Activate and verify an OpenBot commercial license before commercial factory use | Recommended target is one-seat Starter while there is one human user; official terms/pricing reviewed 2026-11-24; purchase requires exact operator approval and completion requires Billing evidence showing the license current |
| CORE-001 | done | Software Lead | Specify Factory Core architecture, relational schemas, event store, and adapter contracts | `plans/decisions/ADR-001-factory-core-stack.md`; `plans/architecture/CORE-001-factory-core-spec.md`; ratified Next.js + tRPC + Drizzle + PostgreSQL domain models and state guards |
| CORE-002 | done | Software Lead | Implement Drizzle schema, migrations, and event store in Factory Core | `packages/core/`; Drizzle schema, Zod contracts, state machine with tests, and migration `0000_loving_blindfold.sql` generated and verified |
| CORE-003 | done | Software Lead | Implement Factory Core tRPC routers and service handlers | `packages/core/src/trpc/`; type-safe routers for `projects`, `tasks`, and `approvals` with context actor, state guards, and 3/3 passing unit tests |
| UI-001 | ready | Software Lead | Demo Control Desk implemented; awaiting independent acceptance | `packages/control-desk/`; `plans/dashboard/UI-001-control-desk.md`; `docs/06-control-desk/UI-001-validation.md`; Live disabled |
| GH-001 | deferred | Software/Quality | Connect test GitHub repository | Approved test repository and credentials |
| MKT-001 | deferred | Marketing/Design | Connect creative/growth services | Provider, rights, privacy and spend approvals |

