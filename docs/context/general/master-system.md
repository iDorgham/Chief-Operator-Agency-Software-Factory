# Master System

```text
Request → intake/approved brief → strategy/spec/design/content plan → operator scope approval → one bounded owner/implementer → evidence review → operator approval → deliver/merge/publish only with explicit authorization → retrospective → improvement proposal
```

For code, Codex is the default single implementer. Claude Code may be a selective alternative or independent reviewer. OpenCode is an approved fallback when its current model selector and data policy permit. Copilot is primarily inline completion; Qoder and Kilo are optional IDE/task surfaces; Antigravity is optional and account-dependent; T3 Code is used only for verified supported functions. OpenBot is the persistent team/handoff layer if access and commercial-use terms allow. Store canonical prompts, procedures, schemas and templates in the repo; use files when integrations do not exist.

The team supports client intake, strategy/product, project planning, design/UX, marketing/growth, text/image/video production, software, QA/security/performance, analytics and operations. Do not create one bot per client or specialty. Reusable skills and human experts fill infrequent specialist needs.

## Non-negotiable controls

No implementation without approved scope and observable criteria. One artifact owner and one code editor per active task. No duplicate branch/PR; reconcile after uncertain writes. Required CI must be green for the current PR head and evidence review must be complete before merge approval. Merge and branch deletion are separate explicit human decisions. Publishing, client sends, production deployment and ad spend require exact approval. Never put credentials in prompts, source, browser storage or logs. An AI agent cannot approve its own work or silently change policy.

## Model tiers

Use the lowest-cost enabled option for routine work, one balanced model for normal tasks and a higher reasoning tier only for consequential uncertainty. Independent review is from a different provider only when useful. Account selectors determine availability; plans, API pricing and commercial rights are not interchangeable. See [Tool Stack and Model Routing](tool-stack-and-model-routing.md).

## Related

- [Operator Guide](operator-guide.md)
- [Architecture](architecture.md)
- [Handoff Protocol](handoff-protocol.md)
- [Improvement Loop](improvement-loop.md)
