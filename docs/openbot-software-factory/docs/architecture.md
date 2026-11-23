# Architecture
The repository holds canonical prompts, policies, templates, schemas and client/project artifacts. A simple dashboard presents status and human decisions. The system remains useful with local files when integrations are unavailable.

OpenBot.run may coordinate persistent role workspaces and file handoffs if the installed product supports the required actions and its license permits the intended agency use. Codex is the default single code implementer. Claude Code may substitute or independently review; OpenCode is a cost-conscious fallback; Copilot is primarily in-editor assistance; Qoder/Kilo/Antigravity are optional task surfaces; T3 Code is used only where its actual account supports the action. No provider handoff or branch access is assumed.

Pass bounded, approved files—not broad chat history. A single implementer reports actual edits and tests. A reviewer compares the diff and evidence with the exact spec. Required current-head CI and human approvals gate merge. Publishing, external messages, ad spend, production deployment and branch deletion are separately approved actions. Do not run concurrent edits on overlapping files.

## Related
- [Master System](master-system.md)
- [Codex](codex-layer.md)
