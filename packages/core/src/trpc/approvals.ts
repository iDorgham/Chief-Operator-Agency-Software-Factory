import { z } from "zod";
import { router, publicProcedure, TRPCError } from "./trpc.ts";
import { ApprovalStatusSchema, type ApprovalStatus } from "../types.ts";

export interface ApprovalStore {
  id: string;
  taskId: string;
  action: string;
  scope: string;
  blastRadius: string;
  status: ApprovalStatus;
  requester: string;
  decider?: string | null;
  rationale?: string | null;
}

export const approvalsRouter = (dbApprovals: Map<string, ApprovalStore>) =>
  router({
    listPending: publicProcedure.query(async () => {
      return Array.from(dbApprovals.values()).filter(
        (a) => a.status === "pending"
      );
    }),

    request: publicProcedure
      .input(
        z.object({
          id: z.string().min(1),
          taskId: z.string().min(1),
          action: z.string().min(1),
          scope: z.string().min(1),
          blastRadius: z.string().min(1),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const approval: ApprovalStore = {
          id: input.id,
          taskId: input.taskId,
          action: input.action,
          scope: input.scope,
          blastRadius: input.blastRadius,
          status: "pending",
          requester: ctx.actor,
          decider: null,
          rationale: null,
        };
        dbApprovals.set(input.id, approval);
        return approval;
      }),

    decide: publicProcedure
      .input(
        z.object({
          id: z.string().min(1),
          status: z.enum(["approved", "rejected"]),
          rationale: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const approval = dbApprovals.get(input.id);
        if (!approval) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: `Approval request '${input.id}' not found.`,
          });
        }

        if (approval.status !== "pending") {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `Approval request '${input.id}' is already decided (${approval.status}).`,
          });
        }

        approval.status = input.status;
        approval.decider = ctx.actor;
        approval.rationale = input.rationale || null;
        dbApprovals.set(input.id, approval);

        return approval;
      }),
  });
