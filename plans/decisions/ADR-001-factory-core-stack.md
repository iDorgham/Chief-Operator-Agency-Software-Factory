# ADR-001 — Factory Core Application Stack

Status: proposed; decision intentionally deferred.

## Context

Legacy documents conflict between React/Express/tRPC/Drizzle/MySQL and Next.js/tRPC/Prisma/Tailwind. No target hosting, existing application repository or database constraint is currently verified.

## Decision criteria

Choose after confirming deployment target, authentication, persistence, job execution, expected integrations, backup/restore, operator devices and maintenance preference. Prefer one TypeScript stack with schema validation, migrations, accessible UI and testable adapter boundaries.

## Default candidate

Next.js App Router + TypeScript + tRPC + Drizzle + PostgreSQL + Tailwind, subject to verification. Do not implement from this default without operator approval of this ADR.

