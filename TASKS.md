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
| OB-001 | ready | Chief Operator | Verify OpenBot version/license/account | Requires live app and operator account |
| OB-002 | ready | Chief Operator | Import and test Chief Operator agent | Depends on OB-001 |
| T3-001 | done | Software Lead | Verify local T3 Code CLI | `t3 v0.1.9`; help and control-plane commands inspected |
| T3-002 | ready | Software Lead | Add this repository as a T3 Code project and verify one harmless Codex thread | Requires starting local T3 Code UI |
| CORE-001 | deferred | Product/Software | Select and build Factory Core stack | Phase 3 approval and ADR |
| UI-001 | deferred | Design/Software | Build Control Desk | Phase 4 approval and tested Factory Core |
| GH-001 | deferred | Software/Quality | Connect test GitHub repository | Approved test repository and credentials |
| MKT-001 | deferred | Marketing/Design | Connect creative/growth services | Provider, rights, privacy and spend approvals |

