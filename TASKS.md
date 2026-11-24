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
| CORE-001 | deferred | Product/Software | Select and build Factory Core stack | Phase 3 approval and ADR |
| UI-001 | deferred | Design/Software | Build Control Desk | Phase 4 approval and tested Factory Core |
| GH-001 | deferred | Software/Quality | Connect test GitHub repository | Approved test repository and credentials |
| MKT-001 | deferred | Marketing/Design | Connect creative/growth services | Provider, rights, privacy and spend approvals |

