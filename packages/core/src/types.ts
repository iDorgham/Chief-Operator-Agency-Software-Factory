import { z } from "zod";

export const TaskStatusSchema = z.enum([
  "draft",
  "approved",
  "queued",
  "active",
  "blocked",
  "review",
  "completed",
  "cancelled",
]);
export type TaskStatus = z.infer<typeof TaskStatusSchema>;

export const TaskLaneSchema = z.enum(["standard", "fast"]);
export type TaskLane = z.infer<typeof TaskLaneSchema>;

export const ApprovalStatusSchema = z.enum([
  "pending",
  "approved",
  "rejected",
  "cancelled",
]);
export type ApprovalStatus = z.infer<typeof ApprovalStatusSchema>;

export const RunStatusSchema = z.enum([
  "preparing",
  "running",
  "completed",
  "failed",
  "cancelled",
]);
export type RunStatus = z.infer<typeof RunStatusSchema>;

export const WorkItemContractSchema = z
  .object({
    schema_version: z.enum(["1.0.0", "1.1.0"]),
    task_id: z.string().min(1),
    project_id: z.string().min(1),
    client_id: z.string().nullable().optional(),
    title: z.string().min(1),
    objective: z.string().optional(),
    status: TaskStatusSchema,
    lane: TaskLaneSchema.optional().default("standard"),
    owner: z.string().min(1),
    reviewer: z.string().min(1).optional(),
    version: z.string().min(1).default("1.0.0"),
    approved_input_refs: z.array(z.string()).default([]),
    acceptance_criteria: z.array(z.string().min(1)).min(1),
    allowed_scope: z.array(z.string()).default([]),
    exclusions: z.array(z.string()).default([]),
    dependencies: z.array(z.string()).default([]),
    evidence_refs: z.array(z.string()).default([]),
    created_at: z.string().datetime().optional(),
    updated_at: z.string().datetime().optional(),
  })
  .refine(
    (data) => {
      if (data.status === "completed") {
        return data.evidence_refs && data.evidence_refs.length > 0;
      }
      return true;
    },
    {
      message: "Completed task must have at least one evidence_ref",
      path: ["evidence_refs"],
    }
  );

export const AuditEventContractSchema = z.object({
  schema_version: z.literal("1.0.0"),
  event_id: z.string().min(1),
  project_id: z.string().min(1),
  task_id: z.string().nullable().optional(),
  run_id: z.string().nullable().optional(),
  event_type: z.string().min(1),
  actor: z.string().min(1),
  occurred_at: z.string().datetime(),
  summary: z.string().min(1),
  previous_status: z.string().nullable().optional(),
  new_status: z.string().nullable().optional(),
  idempotency_key: z.string().nullable().optional(),
  receipt_ref: z.string().nullable().optional(),
  payload: z.record(z.unknown()).default({}),
});
