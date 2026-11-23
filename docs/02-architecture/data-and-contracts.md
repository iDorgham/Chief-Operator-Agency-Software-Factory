---
owner: Product Lead
status: canonical
version: 1.0.0
last_reviewed: 2026-11-24
---

# Data and Contract Architecture

Core entities are Client, Project, Brief, Spec, Task, Handoff, Result, Review, Approval, Run, Event, Artifact, Capability, MemoryEntry and ImprovementProposal.

All material records include stable ID, version, owner, status, timestamps, source references and project/client scope. Mutable workflow state produces append-only audit events. External mutations use a stable idempotency key and preserve request/response receipts without secrets.

Machine-readable schemas live in `schemas/`; human forms live in `templates/`. Schema version changes must remain backward-readable or include an explicit migration plan.

