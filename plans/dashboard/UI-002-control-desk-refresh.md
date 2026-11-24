# UI-002 — Minimal Control Desk refresh

Owner / single implementer: Software Lead. Reviewer: operator / Quality Lead.
Status: implementation authorized by the operator's UI/UX refresh request; independent acceptance pending.

## Inputs and intended result

- Approved input: operator request to simplify Control Desk into a modern minimal web application with simple animation.
- Existing [UI-001 scope](UI-001-control-desk.md), synthetic data and workflows remain the functional baseline.
- Design choice: pale neutral canvas, white surfaces, forest-green accents, grouped navigation, more readable spacing and consistent outline icons. No new dependencies, remote fonts or generated assets.

## Acceptance criteria

1. Overview prioritizes pending decisions and work, with a compact run summary linking to the detailed timeline.
2. All eleven views, task search/filter/detail, evidence and explicit simulated decisions remain reachable and functional.
3. Mobile navigation uses an explicit menu with an expanded state; layouts fit narrow screens.
4. Page entry, progress and interaction transitions are restrained and disabled for reduced motion. Keyboard navigation, focus and accessible contrast remain usable.
5. Typecheck, build, existing integration/browser scenarios, responsive/accessibility checks and factory schema/link/workflow validation pass, or limitations are recorded.

## Exclusions and rollback

No backend, policy, Live integration, authentication, dependency, skill, publishing or deployment changes. Demo remains explicit. Revert the UI-002 component and stylesheet changes to restore the previous presentation.

## Evidence

See [UI-002 validation](../../docs/06-control-desk/UI-002-validation.md) for observed results. Independent acceptance remains a human/reviewer action.
