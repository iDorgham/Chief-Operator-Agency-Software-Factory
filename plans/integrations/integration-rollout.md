# Integration Rollout Plan

For each integration: define workflow, owner, data classification, scopes, cost, failure/retry behavior, revocation and acceptance test. Verify read-only status first, then one bounded synthetic write if necessary, then operator-approved live use.

Order: OpenBot -> test GitHub -> design -> image/video -> analytics/search -> social publishing -> advertising. Failure in one adapter must not block file-based operation.

