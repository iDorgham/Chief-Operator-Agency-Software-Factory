# Control Desk Implementation Plan

## Product slice

Build Demo mode first using synthetic fixtures. Show one project, queue, active run timeline, evidence, blockers, approvals, team ownership, capability registry and audit feed.

## Behavior

- Demo and Live are visually and semantically distinct.
- Approval cards show exact action, target, version and consequence.
- Progress derives from confirmed phase state, not model prose.
- ETA shows range, confidence and historical basis.
- Adapter success requires an observable receipt.
- Mobile prioritizes active work, blockers and approvals.

## Gate

Do not scaffold until Factory Core stack ADR is approved. Validate desktop/mobile accessibility and all empty/loading/error/blocked states.

