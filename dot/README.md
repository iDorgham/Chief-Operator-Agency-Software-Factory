# Single Dot Chief Operator

Status: configuration-ready; the live Dot profile has not been changed.

Use one Dot as the factory's Chief Operator and normal front door. The Dot handles intake, prioritization, routing, approval presentation and consolidated reporting. T3 Code handles coding-agent sessions and isolated workspaces. The repository remains the source of truth.

## Operating loop

1. Give the Dot an objective.
2. The Dot creates or updates a task contract with a stable ID, owner, approved inputs, acceptance criteria, exclusions, permissions and evidence requirements.
3. For software work, transfer the approved handoff to one T3 Code thread.
4. The coding thread reads `AGENTS.md`, implements only the approved scope and returns `templates/result.md` evidence.
5. Use a separate T3 thread for independent review when risk warrants.
6. Return implementation and review evidence to the Dot.
7. The Dot consolidates the result and asks for exact operator approval before merge or deployment.

There is no assumed native Dot-to-T3 automation. Until an adapter is observed and validated, the handoff is explicit and human-visible.

Use `dot/CHIEF_OPERATOR.md` as the proposed Dot instruction text. Preview and approve the exact text before changing the live Dot profile.
