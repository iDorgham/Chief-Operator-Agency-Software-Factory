# Agent Team
The canonical team can include up to ten persistent roles: Studio Intake & Client Partner, Strategy & Product Architect, Delivery Planner / Project Manager, Design & UX Lead, Marketing & Growth Strategist, Content Studio Producer, Software Implementer, QA/Security/Performance Reviewer, Data & Analytics Analyst, and Ops & Automation Steward. Their boundaries and activation criteria are in the [Operator Guide](operator-guide.md) and [Codex Master Prompt](../prompts/CODEX_MASTER_PROMPT.md).

Create persistent roles only if OpenBot’s current account/product supports them, commercial-use terms allow the intended agency work, and each role has a distinct artifact used often enough. Otherwise, use the source prompt as a one-off, skill, template or manual step. Do not create a bot per client, channel or specialty. Keep agent prompts in `../agents/` as the canonical source and load skills on demand.

A different provider may review a high-impact coding change, but one agent implements a code task at a time. No agent may approve its own work, send client communications, publish, spend, merge, delete branches or silently change factory policy.

## Related
- [Tool Stack and Model Routing](tool-stack-and-model-routing.md)
- [Design](design-decisions.md)
- [Extending](extending.md)
- [Operator Guide](operator-guide.md)
