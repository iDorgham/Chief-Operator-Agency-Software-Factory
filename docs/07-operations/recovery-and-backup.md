---
owner: Operations, Analytics and Improvement Lead
status: canonical
version: 1.0.0
last_reviewed: 2026-11-24
---

# Recovery and Backup

Git preserves versioned factory assets. Future Factory Core backups must include database, artifact references, configuration without secrets, schema version and restore instructions. Test restoration with synthetic state before live use.

After interruption, reload the last durable run state, reconcile external systems, acquire the repository/resource lock and resume from the first unconfirmed transition. Never repeat an uncertain external write blindly.

