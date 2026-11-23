# Design Decisions

## 1. Jobs-to-be-done inventory
Sales/client: qualify leads, discover needs, scope proposals, onboard, update status, control changes, close out. Software: triage ideas/bugs, specify, decide architecture, slice tickets, hand off, implement, test, review PR, document, launch, retro. Brand/content: brief, identity direction, strategy, calendar, draft, review claims, publish with approval, report. Operations: prioritize, monitor blockers, audit tokens, maintain system, isolate clients.

## 2. Classification
| Work | Type | Why |
|---|---|---|
| Intake/spec/QA/brand/calendar/content/status | Agent | Weekly distinct artifact owners. |
| Ticket-handoff, evidence review, content production | Skill | Deterministic, multi-invoker procedures. |
| Mobile reply/spec check/PR description/voice check | Prompt/Dot | One-shot portable tasks. |
| Daily/weekly checks | Routine | Cadenced operator work. |
| Output forms | Template | Fixed shape. |
| Code execution | T3/Codex | Execution layer. |

## 3. Roster
Eight agents: Intake Lead T0/T1; Product Architect T2/T1; Delivery Planner T1/T0; QA Reviewer T2/T1; Brand Lead T1/T0; Content Strategist T1/T0; Content Producer T0/T1; Client Partner T1/T0. Exact roles, inputs, outputs and boundaries are in `../agents/`. This meets the target with no agents beyond 10; disable any not used weekly. Tier 2 only for consequential ambiguity, high-stakes copy or final QA.

## 4. Other artifacts
Skills: spec-to-handoff (Architect + Planner), PR review (QA + Architect), content production (Producer + Client Partner)—all pass the ≥2-invoker test. Prompts/Dots: mobile reply, spec check, PR description, voice check. Routines: daily 15/10 minutes, weekly audit. Templates: spec, ticket, handoff, result, review, brand, calendar, update, weekly review.

## 5. Rejections
Proposal agent (rare; prompt); social listening (data integration unknown); designer (operator craft); SEO specialist (irregular); analytics agent (no data source); release manager (checklist); security agent (specialist review); per-client agents (duplicate cost); mobile-app agent (same pipeline); meeting bot (not needed for async solo).

## 6. Token economics
Prompt overhead varies by platform; keep role prompts compact and load skills only when called. Target T0 60–75%, T1 20–30%, T2 5–10%. Approximate input: prompt <1k; skill 1–3k; spec 3–8k; review 3–10k based on diff. These are not subscription limits/prices. Savings: eight roles; bounded file context; cheaper tiers/templates by default.

## 7. Risks
Over-escalation: require written uncertainty. Drift: version specs. Overlap: one owner. Idle threads: invoke on demand. Quota: safe fallback. Client mix-up: IDs in every artifact. Unsupported feature: shared files.

## 8. Alternatives
Mega-agent blurs artifact ownership and loads broad context. LangGraph/CrewAI adds build/maintenance overhead. Three-layer file contract preserves human gates and fits the stated stack/budget.

## Related
- [Structure](file-structure.md)
- [Operator Guide](operator-guide.md)
