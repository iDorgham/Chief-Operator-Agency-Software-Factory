import { randomUUID } from "node:crypto";
import { z } from "zod";
import { createFactoryRouter, type FactoryCoreContextState } from "../../../core/src/trpc/index.ts";
import { router, publicProcedure, createContext, TRPCError } from "../../../core/src/trpc/trpc.ts";

export const approvalDetails = {
  "SYN-APR-001": {
    version: "synthetic-commit-7c21e90",
    target: "synthetic/factory-demo · preview branch",
    evidence: ["SYN-EVD-001", "SYN-EVD-002"],
    consequence: "A real merge would change the preview branch. This demo only records a simulated decision.",
  },
};
export const team = [
  ["Chief Operator", "One front door · routing & consolidation", "Coordinating"],
  ["Product Lead", "Briefs, specifications & architecture", "Available"],
  ["Delivery Manager", "Planning, dependencies & handoffs", "Available"],
  ["Software Lead", "SYN-002 · receipt page", "Active"],
  ["Quality Lead", "Independent review & release evidence", "Reviewing"],
  ["Design & Content Lead", "SYN-003 · receipt layout", "Blocked"],
  ["Marketing & Growth Lead", "Campaigns, claims & research", "Available"],
  ["Operations Lead", "Analytics & improvement proposals", "Available"],
];
export const evidence = [
  { id: "SYN-EVD-001", title: "Signup form review", taskId: "SYN-001", kind: "Review", summary: "Synthetic review record: labels, validation and keyboard flow accepted by Quality Lead.", version: "fixture-v1" },
  { id: "SYN-EVD-002", title: "Synthetic test report", taskId: "SYN-001", kind: "Tests", summary: "Illustrative fixture: 8 of 8 checks passed. This is demo data, not an actual CI receipt.", version: "fixture-v1" },
];
export const phases = [
  { title: "Brief approved", status: "completed", detail: "Approved synthetic input · fixture-v1" },
  { title: "Implementation", status: "active", detail: "Software Lead · SYN-002" },
  { title: "Independent review", status: "queued", detail: "Quality Lead · waiting for evidence" },
  { title: "Operator decision", status: "queued", detail: "Exact approval required before any real external action" },
];
export type DemoEvent = { id: string; at: string; actor: string; summary: string; receipt: string | null };

export function createDemoState(): FactoryCoreContextState {
  const projectId = "syn-factory-demo";
  return {
    projects: new Map([[projectId, { id: projectId, title: "Factory demonstration", workspaceRoot: "synthetic/factory-demo", status: "active" }]]),
    tasks: new Map([
      { id: "SYN-001", title: "Build synthetic signup form", status: "completed" as const, owner: "Software Lead", evidenceRefs: ["SYN-EVD-001", "SYN-EVD-002"] },
      { id: "SYN-002", title: "Build receipt page", status: "active" as const, owner: "Software Lead", evidenceRefs: [] },
      { id: "SYN-003", title: "Review receipt layout", status: "blocked" as const, owner: "Design & Content Lead", evidenceRefs: [] },
      { id: "SYN-004", title: "Verify release evidence", status: "queued" as const, owner: "Quality Lead", evidenceRefs: [] },
    ].map(task => [task.id, { ...task, projectId, objective: task.title, lane: "standard" as const, reviewer: task.owner === "Quality Lead" ? "Chief Operator" : "Quality Lead", acceptanceCriteria: ["Synthetic output has observable evidence", "Independent review before completion"] }])),
    approvals: new Map([["SYN-APR-001", { id: "SYN-APR-001", taskId: "SYN-001", action: "git.merge", scope: "synthetic/factory-demo preview @ synthetic-commit-7c21e90", blastRadius: "Synthetic preview branch only", status: "pending", requester: "Software Lead" }]]),
  };
}

export function createDemoRouter() {
  const state = createDemoState();
  const core = createFactoryRouter(state);
  const events: DemoEvent[] = [
    { id: "SYN-EVT-003", at: "2026-11-24T06:15:00Z", actor: "Design & Content Lead", summary: "SYN-003 blocked: waiting for receipt implementation.", receipt: null },
    { id: "SYN-EVT-002", at: "2026-11-24T06:10:00Z", actor: "Software Lead", summary: "SYN-002 implementation started in the synthetic run.", receipt: null },
    { id: "SYN-EVT-001", at: "2026-11-24T06:00:00Z", actor: "Quality Lead", summary: "SYN-001 completed with synthetic review evidence.", receipt: "SYN-EVD-001" },
  ];
  return router({
    core,
    desk: router({
      snapshot: publicProcedure.query(async ({ ctx }) => {
        const caller = core.createCaller(ctx);
        return {
          mode: "demo" as const,
          projects: await caller.projects.list(),
          tasks: await caller.tasks.list({ projectId: "syn-factory-demo" }),
          approvals: await caller.approvals.listPending(),
          approvalDetails, evidence, phases, team, events: [...events],
        };
      }),
      decide: publicProcedure.input(z.object({ id: z.literal("SYN-APR-001"), version: z.literal("synthetic-commit-7c21e90"), status: z.enum(["approved", "rejected"]), rationale: z.string().trim().min(1).max(500) })).mutation(async ({ input }) => {
        const request = state.approvals.get(input.id);
        if (request?.requester === "demo-operator") throw new TRPCError({ code: "FORBIDDEN", message: "Requester cannot decide their own request." });
        // Fixed synthetic identity. This is deliberately not a Live authentication mechanism.
        const decision = await core.createCaller(createContext({ actor: "demo-operator" })).approvals.decide(input);
        const event: DemoEvent = { id: `SYN-EVT-${randomUUID()}`, at: new Date().toISOString(), actor: "Demo operator", summary: `Simulated ${input.status}: ${input.id} @ ${input.version}. No external action executed.`, receipt: null };
        events.unshift(event);
        return { decision, event };
      }),
    }),
  });
}
export type DeskRouter = ReturnType<typeof createDemoRouter>;
