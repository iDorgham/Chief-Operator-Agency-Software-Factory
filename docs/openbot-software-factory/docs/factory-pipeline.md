# Software Factory Pipeline

| Stage | Owner | Exit evidence |
|---|---|---|
| Request and discovery | Operator / Studio Intake | Brief, identity, unknowns, data/access needs |
| Spec and design | Architect / Design & UX | Approved scope, risks, testable criteria, design brief/version |
| Planning and handoff | Planner | Bounded task, repo/base, allowed files, tests and result path |
| Preflight and isolated branch | Operator / implementation system | Verified repo/base, clean worktree, no duplicate, branch/worktree linked to spec |
| Implementation | One selected coding agent | Diff, commit/push status, actual tests and limitations |
| PR and review | Implementer / QA reviewer | Matching PR, evidence-based findings, no unresolved scope change |
| CI and approval | GitHub / operator | Required checks green for current head, human merge approval |
| Merge and cleanup | Operator / GitHub | Confirmed merge, separately approved exact branch deletion |
| Retro | Ops steward / operator | Recorded outcome and human-approved improvement proposal |

For every action, reconcile existing branch/PR state before retrying; resume a matching PR rather than creating a duplicate. Pending, missing, failed, stale or inconclusive checks are not green. Never force-push or merge/delete without exact approval.

The same discipline applies to non-code work: content and campaigns pass from approved brief to draft, evidence/rights review, operator approval and delivery. Public publishing, client messaging and ad spend are separate external actions requiring specific approval.

## Related

- [Handoff Protocol](handoff-protocol.md)
- [Agency Pipeline](agency-pipeline.md)
- [Operator Guide](operator-guide.md)
