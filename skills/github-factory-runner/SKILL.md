---
name: github-factory-runner
description: Safely inspect or operate a specification-to-PR GitHub workflow with duplicate prevention, current-head CI evidence, reconciliation, and approval gates.
---

# GitHub Factory Runner

Verify repository, permissions, base/SHA, rules, open branches/PRs and checks. Use stable run IDs, repository lock and idempotency key. Never force-push or write base. Reconcile uncertain writes before retry. Reuse only matching spec/head/base identity. Missing, pending, stale, cancelled, failed or ambiguous checks are not green. Merge and exact branch deletion require their configured approvals and receipts.

