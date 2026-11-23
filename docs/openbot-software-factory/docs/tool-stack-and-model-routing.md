# Tool Stack and Model Routing

**Prepared for Dorgham’s solo agency and software factory.** This document defines which tool owns which work, how to route jobs to models without paying twice for the same result, and what Codex should verify on the PC before configuring anything.

## Recommendation in one minute

Do not add another general-purpose coding agent right now. You already have more overlapping coding surfaces than this factory needs. Use **OpenBot.run as the team/workspace and handoff layer**, **Codex as the default implementation and repository-change agent**, and **Claude Code as a selective second implementer or independent reviewer**. Keep **OpenCode** as the low-cost/local/provider-flexible fallback. Use **Copilot** primarily for in-editor completion and small edits, and choose **one** of Qoder or Kilo for interactive IDE work only if it is clearly better in your actual daily workflow. Treat **Antigravity** as an optional free-plan Google model/workbench and visual/browser research alternative, not as a required factory dependency. Treat **T3 Code** as a task/control surface only to the extent its current, logged-in product supports the needed feature; do not assume it is a coding harness or an OpenBot integration.

The default job path is: **OpenBot role produces an approved artifact → one chosen coding agent implements it in one isolated branch/worktree → one reviewer checks evidence → CI and the operator control merge/release**. Use a second model only for genuinely independent review, a failed first attempt, or an explicitly high-risk decision.

## Tool boundaries

| Tool | Assign it this job | Avoid using it for |
|---|---|---|
| **OpenBot.run** | Persistent role workspaces, project coordination, inter-agent handoffs, shared files, reusable workflows, and approval steps. Store authoritative prompts and procedures in the repo and copy them into the app only when supported. | Unbounded implementation loops or acting as the canonical source of project state when files/repository can own it. |
| **OpenAI Codex** | Default bounded implementation in a repository/worktree; code understanding, edits, tests, diffs, branch/PR prep; complex cross-file work when its actual account model is available. | Autonomous merging, deleting branches, changing production, or declaring external checks green without evidence. |
| **Claude Code** | Selective complex implementation, architecture reasoning, or independent final review. A good second opinion when it will add evidence rather than duplicate work. | Routine tasks already handled well by Codex/OpenCode, or running concurrently on overlapping files. |
| **OpenCode** | Free or local/provider-flexible fallback; small bounded code changes, test generation, documentation, or a fallback when a paid plan hits a limit. Select only models that `/models` shows as enabled for this project. | Assuming every catalog model is free or usable, or placing credentials in repository config. |
| **GitHub Copilot** | Inline completion, small in-editor transformations, and GitHub-native code assistance when available. Pick a model from the current account selector for chat/agent work. | A separate autonomous implementation on the same branch while Codex/Claude is editing. |
| **Qoder** | Optional IDE workspace for codebase-aware tasks, with Auto/Fast/Efficient or a specific model if shown. Use its displayed credit multiplier before sending. | Routing a task through multiple expert agents by default; expert/subagent usage may consume separately. |
| **Kilo Code** | Optional IDE/CLI pair programmer, Plan/Debug/Code mode, or one-off interactive fallback; use its current provider/model selector. | Adding Kilo as a mandatory layer if Copilot or Qoder already meets the need. |
| **Google Antigravity** | Free-plan model access for modest experiments, visual/browser tasks, and second opinions; select only models visible in the signed-in plan. | Designing the core system around paid-only models, planner/executor orchestration, or an account entitlement not verified in the UI. |
| **T3 Code** | Use as the route/control surface Dorgham already has, if it supports the required repository/task action in his actual account. Pass the approved, bounded handoff into its supported coding agent. | Assuming a direct API, OpenBot connector, branch transfer, or coding runtime exists without checking. |
| **ChatGPT** | Research, planning, structured analysis, visual interpretation, drafts, and model-supported image generation. Keep prompts and knowledge in versioned files/Projects as permitted. | Making the factory depend on creating new custom GPTs. OpenAI’s current help documentation says new GPT creation is unavailable on personal accounts and that custom GPT retirement/migration is in progress; verify the account/workspace notice. |

**A note on licensing:** OpenBot’s official site currently describes its personal use as free but says commercial use requires a license. Dorgham is using this system for agency work, so Codex must stop and verify the applicable OpenBot commercial-use terms before enabling it for client/commercial activity. Do not treat “free for personal use” as permission for commercial agency use. The client’s data is also sent to whichever provider/model receives an agent’s prompt; OpenBot says local workspace data stays on the computer running it, but the selected AI provider receives prompts and the pages opened use the network. [1]

## Model policy: capability tiers, not fixed promises

Model rosters and plan access change. Keep model **roles** stable and resolve the exact current model in the provider’s selector at runtime. Never hard-code an unavailable ID or promise that a $20 subscription includes a particular model, quota, API access, or IDE integration. Subscription access and API billing are separate. Record provider, displayed model name, selected effort, date, and whether access is subscription, free tier, local, or API-paid in `settings/model-routing.yml` (no secrets).

For CLI-configured models, the UI/CLI catalog wins. OpenCode says its selector lists only enabled models whose provider is available in the current project, and project credentials/config do not automatically carry across projects. [2] Qoder says its model choices, names, and credit multipliers can vary by client version/account and that the selector’s current values are authoritative. [3] GitHub Copilot also makes model availability depend on plan and surface. [4]

Use these generic tiers:

- **Economy / routine:** small focused extraction, format conversion, first draft, checklist, simple code patch, test scaffolding. Prefer the free/local model or the lowest-cost model that passes a small representative quality check.
- **Balanced / default:** most specs, standard implementation, common UI/backend work, SEO/content outlines, and ordinary review. Prefer one balanced model available through a subscription already paid for.
- **Frontier / escalation:** difficult architecture, security-sensitive analysis, ambiguous scope, high-impact campaign claims, or a repeatedly failing task. Escalate only the disputed decision or changed files; do not replay the entire project context.
- **Independent reviewer:** a different provider/model from the implementer, only where independent review has meaningful value. A reviewer should read the spec, diff, test evidence and risks—not redo the whole implementation.

### Suggested starting routes

| Factory role/work | Primary route | Low-cost or fallback route | Escalation condition |
|---|---|---|---|
| Intake and lead qualification | OpenBot role on a balanced model; ask for missing facts and a structured brief | OpenCode free model or available fast tier | High-stakes scope, sensitive client data, or conflicting requirements → Claude or GPT frontier model, operator decides. |
| Product/spec architect | Codex/ChatGPT reasoning model for the initial spec, with bounded repo evidence; Claude for an independent architecture review if needed | Antigravity free-plan model or OpenCode model visible in catalog | Security/privacy, migrations, major architecture, or unresolved tradeoff. |
| Delivery planner / handoff | Economy or balanced model using fixed template and criteria | Deterministic template/manual assembly | Escalate only if dependency or sequencing risk is unclear. |
| Software implementation | **Codex** default; use its normal/default reasoning first and raise effort only for cross-system or hard debugging | OpenCode free/local model; optionally Qoder/Kilo for interactive small task | Two failed attempts, high-risk migration/security work, or a materially novel architecture → Claude Code / Claude Sonnet-or-current balanced frontier; settle on one implementation owner. |
| Code review / QA | Reviewer from a different provider than implementer: Claude if Codex implemented; Codex if Claude implemented | Copilot/Qoder/Kilo selected model for narrow checklist when permitted | Security-sensitive findings or ambiguous evidence → a higher reasoning tier plus human review. Model review is not an approval gate substitute. |
| Security / privacy | Static analyzers, dependency scanners, secret scanning, CI and specialist checklist first; balanced model to explain findings | Open-source local/static tools | High-impact vulnerability or personal data → qualified human expert. An LLM cannot certify compliance or security. |
| Frontend / UI implementation | Codex for repo work; balanced model | Copilot inline completion, Qoder/Kilo for a single IDE task | Visual result is materially wrong → screenshot/interaction evidence, then one targeted fix. |
| Design / art direction | ChatGPT/Claude for brief, critique, concept writing; use image-generation product already accessible for original artwork | Existing design software and manual craft | Client identity / production asset: operator approves concept, rights, likeness, typography and final exports. A text LLM is not a design deliverable. |
| UX research / usability | Balanced vision-capable model for supplied screenshots/prototypes; structured research questions | Antigravity/ChatGPT vision option that is actually enabled | User research claims require real participant evidence; do not fabricate user testing. |
| Brand strategy | Balanced Claude or ChatGPT model; choose one, not both by default | Reusable questions/template | Positioning with legal, regulated, or market claims → verify sources and operator review. |
| Content strategy / calendar | Balanced model with client-approved brand and goals | Economy model/template | Competitor/current trend claims require browsing and sources. |
| Text content / social drafts | Economy or balanced model, fixed brand voice and channel constraints | OpenCode model/other account-visible low-cost tier | Claims, offers, regulated topics, or external publishing → source check and human approval. |
| SEO/AEO/GEO audits | Research-capable model with source links and actual GSC/GA4/SEO exports; use one analysis model | Spreadsheet rules and lower-cost model for normalization | Never invent traffic, rankings, search volume or analytics; high impact recommendations require data provenance. |
| Analytics / performance | Deterministic SQL/Python/Sheets first; model to interpret normalized numbers | Local scripts / ordinary spreadsheet | Double-check units, date range, attribution and denominator; no model-generated numbers without underlying data. |
| Images | Existing licensed assets or the image generator included in an already-used product; evaluate before using | In-house design software / free assets with documented license | For products/places/real people, use accurate supplied/search assets rather than generated lookalikes. |
| Video | Use existing video editor/creator account and licensed footage; model creates script/storyboard/prompt package | Free editor only if operator already wants one | Do not add a paid media subscription automatically; generation/editing access and commercial rights must be checked. |
| Project management / client updates | Template plus balanced model draft | Manual/status template | Operator verifies facts, dates, commitments and sends. No agent sends externally by default. |
| Automation / operations | Deterministic state machine, scheduled job/CI and audit logs; model helps draft/configure | Manual checklist | External side effects (publish, spend, deploy, merge, delete, client contact) require scoped approval. |

### Current first-party model examples to look for

These are examples observed in official documentation on **November 24, 2026**, not entitlements. Use only if they appear in Dorgham’s selector and are included in his plan or otherwise approved. Avoid hard-coded use in prompts.

- **OpenAI Codex/ChatGPT:** current Codex documentation recommends GPT-6.2 Astra for demanding cross-codebase work and GPT-6.2 Sol for everyday coding/planning; GPT-6.1 Terra is described for fast writing/visual understanding and Luna for focused repeatable tasks. Availability and usage depend on the plan/client; GPT-6.2 access is restricted to supported plans and clients. Start with the account’s normal default, use Sol-like balanced model for routine work, and reserve Astra-like model for hard work. [5]
- **Anthropic Claude:** current model documentation distinguishes Claude Sonnet 5.5 as a speed/intelligence balance, Opus 5.5 for long-running agentic coding/knowledge work, Fable 5.2 for demanding reasoning/long-horizon work, and Haiku 5.5 for high-volume routing/extraction. API token prices are not the cost of a Claude subscription; do not infer one from the other. Use whichever available model Claude Code’s live selector exposes under the existing subscription. [6]
- **Google Antigravity:** docs show Gemini 3.8 Flash and Claude Sonnet 4.6 / Opus 4.6 in the Free & Plus selector table, while higher-tier models and Orchestrator are plan-limited. Because the user reports free Antigravity, treat it as an optional experimental/secondary route and check current five-hour/weekly usage display. Do not rely on paid-only Orchestrator or newer premium Gemini models. [7]
- **OpenCode:** the `/models` selector is the source of truth. It can connect free models, subscriptions, API providers or local models depending on configuration; “free” is specific to the provider/route. Do not assume a named model is free just because OpenCode is installed. [2]
- **Qoder:** use Auto for routine tasks if it is within budget; its docs give illustrative tier multipliers but mark rates as changeable and account-dependent. Use Fast/Efficient/other available models based on actual displayed cost. Ultimate/expert-style orchestration is not the everyday default. [3]
- **GitHub Copilot:** choose from the current supported-model list in the actual product surface; model inventory is broad and plan-dependent. Favor its inline completion workflow rather than paying for duplicate agent work. [4]
- **Kilo Code:** supports IDE/terminal/browser work with Code, Ask, Plan and Debug agents and connections to user-chosen AI providers; model choice and cost are provider/config-dependent. Kilo’s own docs point to its model-selection and provider pages; use the selector, not promotional model names as a guarantee. [8]

## Minimal daily routing rules

1. A task has one accountable owner and one primary model/provider. Write the chosen route in the handoff, but allow the operator to change it when availability/cost changes.
2. Routine task? Use the least costly enabled route that passed the representative quality check. Do not invoke premium models to write another checklist or reformat content.
3. Is the task code-changing? Choose exactly one implementer (Codex by default). Other IDE tools stay idle on that task until the implementer reports a result.
4. Is the work high-impact? Use a different model/provider for a bounded evidence-based review, and require the normal human approval gate.
5. Did the provider fail or reach a limit? Stop and save state. Route to an approved fallback only if the handoff is portable and the data policy permits it. Record the provider switch. Never silently lower security or QA expectations.
6. Is fresh factual knowledge required? Browse authoritative sources or use approved data exports. Model choice does not substitute for research.
7. Is the operation external or irreversible? Human approval remains required regardless of model confidence.

## Tool additions: what to add only when there is a measured gap

For the build/agent orchestration problem, the existing stack is enough. Do not add a second multi-agent platform, a new general coding subscription, or a self-hosted orchestration framework yet.

Potential gaps are workflow-specific rather than “more AI”:

- **Visual production:** if existing ChatGPT/image/video tools cannot deliver the needed client-ready formats, test the design/video product already available to Dorgham. Add Canva, Adobe, Figma, or a video editor only when a real deliverable requires it and cost/rights are understood. They are production tools, not agents to put on every workflow.
- **Search/analytics evidence:** connect approved Search Console, GA4, ad-account and CRM exports/connectors when those services are actually used. The factory must work with imported CSVs and manual source links when no connector is authorized.
- **Quality gates:** prioritize GitHub branch protections, CI checks, dependency/security scanning, secret scanning, and a working backup before buying another AI agent. Keep permissions scoped to the intended repository.
- **Model/API costs:** do not route through paid APIs merely because a tool accepts keys. Subscription login access, API usage, credit systems and commercial licenses differ. Verify the plan’s terms and actual usage screen first.

## Account and privacy checklist for Codex

Before configuring the team, record (without secrets): product/version, signed-in account confirmation, visible provider/model choices, usage/cost indication, available integration scopes, commercial-use/license status, and test result. Never store tokens in prompts, chat logs, browser local storage, a DB row, or Git. Keep credentials in the provider's supported OS credential manager or environment secret store. Limit every bot to the folders and tools it actually needs. Do not give automatic merge, deletion, advertising-spend, publish or client-send permission.

## References

[1]: https://openbot.run/ "OpenBot official product page"
[2]: https://opencode.ai/docs/models/ "OpenCode model selection documentation"
[3]: http://docs.qoder.com/user-guide/chat/model-tier-selector "Qoder model tier selector documentation"
[4]: https://docs.github.com/en/copilot/reference/ai-models/supported-models "GitHub Copilot supported AI models"
[5]: https://developers.openai.com/codex/models/ "OpenAI Codex model selection documentation"
[6]: https://platform.claude.com/docs/en/models/overview "Anthropic Claude models overview"
[7]: https://antigravity.google/docs/models/ "Google Antigravity model selection documentation"
[8]: https://kilocode.ai/docs/code-with-ai "Kilo Code documentation"
[9]: https://help.openai.com/en/articles/8554397-creating-a-gpt "OpenAI GPT creation and migration documentation"
