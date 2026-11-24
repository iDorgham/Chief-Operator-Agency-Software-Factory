# Codex Role Chats

Status: launch-ready; chats are not created automatically.

This package represents the eight persistent factory roles as separate Codex project chats. These chats are not Dot agents and do not appear under **Your dot**. The role definitions in `agents/` remain canonical. A Codex chat is only a runtime copy of one role.

## Recommended layout

1. Create the **Chief Operator** chat first and keep it as the normal front door.
2. Create a lead chat only when that role needs durable, separate context.
3. Name each chat from `team-manifest.yaml` so its role is visible.
4. Start the chat with `ROLE_BOOTSTRAP.md`, replacing `<role-id>` with the manifest role ID.
5. Give each delegation a task ID, approved inputs, acceptance criteria, exclusions, evidence requirements and return path.
6. Return lead results to the Chief Operator. Do not ask two chats to edit overlapping artifacts.

Codex chats do not grant new authority. Sending, publishing, spending, deploying, merging, deleting, purchasing, credential changes and permission expansion still require exact operator approval.

## Runtime choice

- Use **ChatGPT** for a simple single conversation or planning session. Paste `prompts/CHIEF_OPERATOR.md`; add a lead role only for a bounded handoff.
- Use **Codex role chats** when roles need repository access, isolated coding threads or durable technical context.
- Use the **single Dot** as the Chief Operator by following `dot/README.md`.
- Use **OpenBot.run** when you need persistent team identity, workflows, schedules or provider management, after its license and data terms are approved.

Do not run competing implementers on the same scope. A task may move between runtimes, but its stable ID, owner, inputs, criteria, exclusions and evidence must travel with it.
