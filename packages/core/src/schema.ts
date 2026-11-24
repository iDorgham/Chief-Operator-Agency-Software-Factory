import {
  pgTable,
  varchar,
  text,
  integer,
  timestamp,
  jsonb,
  uniqueIndex,
} from "drizzle-orm/pg-core";

/**
 * Projects table: represents bounded project scopes and repository ties.
 */
export const projects = pgTable("projects", {
  id: varchar("id", { length: 64 }).primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  clientId: varchar("client_id", { length: 64 }),
  workspaceRoot: text("workspace_root").notNull(),
  gitRemote: text("git_remote"),
  status: varchar("status", { length: 32 }).notNull().default("active"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

/**
 * Tasks (Work Items) table: represents discrete, stable-ID work tasks.
 * Matches schemas/work-item.schema.json (1.1.0).
 */
export const tasks = pgTable("tasks", {
  id: varchar("id", { length: 64 }).primaryKey(),
  projectId: varchar("project_id", { length: 64 })
    .notNull()
    .references(() => projects.id),
  clientId: varchar("client_id", { length: 64 }),
  title: varchar("title", { length: 255 }).notNull(),
  objective: text("objective").notNull(),
  status: varchar("status", { length: 32 }).notNull().default("draft"),
  lane: varchar("lane", { length: 16 }).notNull().default("standard"),
  owner: varchar("owner", { length: 64 }).notNull(),
  reviewer: varchar("reviewer", { length: 64 }),
  version: varchar("version", { length: 32 }).notNull().default("1.0.0"),
  acceptanceCriteria: jsonb("acceptance_criteria").$type<string[]>().notNull(),
  allowedScope: jsonb("allowed_scope").$type<string[]>().default([]).notNull(),
  exclusions: jsonb("exclusions").$type<string[]>().default([]).notNull(),
  dependencies: jsonb("dependencies").$type<string[]>().default([]).notNull(),
  approvedInputRefs: jsonb("approved_input_refs").$type<string[]>().default([]).notNull(),
  evidenceRefs: jsonb("evidence_refs").$type<string[]>().default([]).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

/**
 * Runs table: represents bounded execution attempts by agent providers.
 */
export const runs = pgTable("runs", {
  id: varchar("id", { length: 64 }).primaryKey(),
  taskId: varchar("task_id", { length: 64 })
    .notNull()
    .references(() => tasks.id),
  ordinal: integer("ordinal").notNull().default(1),
  provider: varchar("provider", { length: 64 }).notNull(),
  model: varchar("model", { length: 64 }).notNull(),
  workspacePath: text("workspace_path").notNull(),
  status: varchar("status", { length: 32 }).notNull().default("preparing"),
  exitCode: integer("exit_code"),
  summary: text("summary"),
  startedAt: timestamp("started_at", { withTimezone: true }).defaultNow().notNull(),
  completedAt: timestamp("completed_at", { withTimezone: true }),
});

/**
 * Audit Events table: immutable event ledger with idempotency support.
 * Matches schemas/event.schema.json (1.0.0).
 */
export const auditEvents = pgTable(
  "audit_events",
  {
    id: varchar("id", { length: 64 }).primaryKey(),
    projectId: varchar("project_id", { length: 64 })
      .notNull()
      .references(() => projects.id),
    taskId: varchar("task_id", { length: 64 }).references(() => tasks.id),
    runId: varchar("run_id", { length: 64 }).references(() => runs.id),
    eventType: varchar("event_type", { length: 64 }).notNull(),
    actor: varchar("actor", { length: 64 }).notNull(),
    occurredAt: timestamp("occurred_at", { withTimezone: true }).defaultNow().notNull(),
    summary: text("summary").notNull(),
    previousStatus: varchar("previous_status", { length: 32 }),
    newStatus: varchar("new_status", { length: 32 }),
    idempotencyKey: varchar("idempotency_key", { length: 128 }),
    receiptRef: text("receipt_ref"),
    payload: jsonb("payload").$type<Record<string, unknown>>().default({}).notNull(),
  },
  (table) => [
    uniqueIndex("audit_events_idempotency_key_idx").on(table.idempotencyKey),
  ]
);

/**
 * Approvals table: formal gated approvals for high-impact actions.
 * Matches schemas/approval.schema.json (1.0.0).
 */
export const approvals = pgTable("approvals", {
  id: varchar("id", { length: 64 }).primaryKey(),
  taskId: varchar("task_id", { length: 64 })
    .notNull()
    .references(() => tasks.id),
  action: varchar("action", { length: 64 }).notNull(),
  scope: text("scope").notNull(),
  blastRadius: text("blast_radius").notNull(),
  status: varchar("status", { length: 32 }).notNull().default("pending"),
  requester: varchar("requester", { length: 64 }).notNull(),
  decider: varchar("decider", { length: 64 }),
  rationale: text("rationale"),
  decidedAt: timestamp("decided_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

/**
 * Scoped Locks table: prevents overlapping concurrent modifications.
 */
export const locks = pgTable("locks", {
  resourceId: varchar("resource_id", { length: 255 }).primaryKey(),
  holderRunId: varchar("holder_run_id", { length: 64 })
    .notNull()
    .references(() => runs.id),
  acquiredAt: timestamp("acquired_at", { withTimezone: true }).defaultNow().notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
});
