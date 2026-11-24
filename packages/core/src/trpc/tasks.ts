import { z } from "zod";
import { router, publicProcedure, TRPCError } from "./trpc.ts";
import {
  TaskStatusSchema,
  TaskLaneSchema,
  type TaskStatus,
  type TaskLane,
} from "../types.ts";
import { validateStateTransition } from "../state-machine.ts";

export interface TaskStore {
  id: string;
  projectId: string;
  title: string;
  objective: string;
  status: TaskStatus;
  lane: TaskLane;
  owner: string;
  reviewer?: string | null;
  acceptanceCriteria: string[];
  evidenceRefs: string[];
}

export const tasksRouter = (dbTasks: Map<string, TaskStore>) =>
  router({
    list: publicProcedure
      .input(z.object({ projectId: z.string().optional() }).optional())
      .query(async ({ input }) => {
        const all = Array.from(dbTasks.values());
        if (input?.projectId) {
          return all.filter((t) => t.projectId === input.projectId);
        }
        return all;
      }),

    getById: publicProcedure
      .input(z.object({ id: z.string().min(1) }))
      .query(async ({ input }) => {
        return dbTasks.get(input.id) || null;
      }),

    create: publicProcedure
      .input(
        z.object({
          id: z.string().min(1),
          projectId: z.string().min(1),
          title: z.string().min(1),
          objective: z.string().default(""),
          lane: TaskLaneSchema.default("standard"),
          owner: z.string().min(1),
          acceptanceCriteria: z.array(z.string().min(1)).min(1),
        })
      )
      .mutation(async ({ input }) => {
        if (dbTasks.has(input.id)) {
          throw new TRPCError({
            code: "CONFLICT",
            message: `Task with id '${input.id}' already exists.`,
          });
        }

        const task: TaskStore = {
          id: input.id,
          projectId: input.projectId,
          title: input.title,
          objective: input.objective,
          status: "draft",
          lane: input.lane,
          owner: input.owner,
          reviewer: null,
          acceptanceCriteria: input.acceptanceCriteria,
          evidenceRefs: [],
        };
        dbTasks.set(input.id, task);
        return task;
      }),

    transition: publicProcedure
      .input(
        z.object({
          taskId: z.string().min(1),
          targetStatus: TaskStatusSchema,
          reviewer: z.string().optional(),
          evidenceRef: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const task = dbTasks.get(input.taskId);
        if (!task) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: `Task '${input.taskId}' not found.`,
          });
        }

        const updatedEvidence = input.evidenceRef
          ? [...task.evidenceRefs, input.evidenceRef]
          : task.evidenceRefs;

        const effectiveReviewer = input.reviewer || task.reviewer;

        const check = validateStateTransition({
          currentStatus: task.status,
          targetStatus: input.targetStatus,
          lane: task.lane,
          actor: ctx.actor,
          owner: task.owner,
          reviewer: effectiveReviewer,
          evidenceRefs: updatedEvidence,
        });

        if (!check.allowed) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: check.reason || "Transition rejected by state machine.",
          });
        }

        task.status = input.targetStatus;
        if (input.reviewer) task.reviewer = input.reviewer;
        task.evidenceRefs = updatedEvidence;
        dbTasks.set(task.id, task);

        return task;
      }),
  });
