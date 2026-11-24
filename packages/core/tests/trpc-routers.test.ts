import test from "node:test";
import assert from "node:assert/strict";
import { createFactoryRouter } from "../src/trpc/index.ts";
import { createContext } from "../src/trpc/trpc.ts";

test("tRPC projectsRouter allows creating and listing projects", async () => {
  const appRouter = createFactoryRouter();
  const caller = appRouter.createCaller(createContext({ actor: "Software Lead" }));

  const project = await caller.projects.create({
    id: "test-project",
    title: "Test Project",
    workspaceRoot: "D:/Work/Test",
  });
  assert.equal(project.id, "test-project");

  const list = await caller.projects.list();
  assert.equal(list.length, 1);
  assert.equal(list[0].title, "Test Project");
});

test("tRPC tasksRouter enforces state machine transitions and guards", async () => {
  const appRouter = createFactoryRouter();
  const caller = appRouter.createCaller(createContext({ actor: "Software Lead" }));

  await caller.tasks.create({
    id: "TASK-001",
    projectId: "test-project",
    title: "Unit Test Task",
    owner: "Software Lead",
    acceptanceCriteria: ["Must pass tests"],
  });

  // Draft -> Approved by Chief Operator
  const operatorCaller = appRouter.createCaller(createContext({ actor: "Chief Operator" }));
  const approvedTask = await operatorCaller.tasks.transition({
    taskId: "TASK-001",
    targetStatus: "approved",
  });
  assert.equal(approvedTask.status, "approved");

  // Approved -> Queued
  await caller.tasks.transition({
    taskId: "TASK-001",
    targetStatus: "queued",
  });

  // Queued -> Active
  await caller.tasks.transition({
    taskId: "TASK-001",
    targetStatus: "active",
  });

  // Active -> Review
  await caller.tasks.transition({
    taskId: "TASK-001",
    targetStatus: "review",
    reviewer: "Quality Lead",
  });

  // Review -> Completed attempted by Software Lead (owner) should throw TRPCError BAD_REQUEST
  await assert.rejects(
    async () => {
      await caller.tasks.transition({
        taskId: "TASK-001",
        targetStatus: "completed",
        evidenceRef: "fixtures/evidence.md",
      });
    },
    (err: any) => {
      assert.match(err.message, /Owner cannot complete their own task/);
      return true;
    }
  );

  // Review -> Completed executed by Quality Lead (reviewer) should succeed
  const reviewerCaller = appRouter.createCaller(createContext({ actor: "Quality Lead" }));
  const completedTask = await reviewerCaller.tasks.transition({
    taskId: "TASK-001",
    targetStatus: "completed",
    evidenceRef: "fixtures/evidence.md",
  });
  assert.equal(completedTask.status, "completed");
  assert.equal(completedTask.evidenceRefs.length, 1);
});

test("tRPC approvalsRouter tracks pending approvals and operator decisions", async () => {
  const appRouter = createFactoryRouter();
  const requesterCaller = appRouter.createCaller(createContext({ actor: "Software Lead" }));
  const operatorCaller = appRouter.createCaller(createContext({ actor: "Chief Operator" }));

  const approval = await requesterCaller.approvals.request({
    id: "APP-001",
    taskId: "TASK-001",
    action: "git.merge",
    scope: "main branch",
    blastRadius: "Production repository",
  });
  assert.equal(approval.status, "pending");

  const pending = await operatorCaller.approvals.listPending();
  assert.equal(pending.length, 1);

  const decided = await operatorCaller.approvals.decide({
    id: "APP-001",
    status: "approved",
    rationale: "Synthetic tests verified",
  });
  assert.equal(decided.status, "approved");
  assert.equal(decided.decider, "Chief Operator");

  const afterPending = await operatorCaller.approvals.listPending();
  assert.equal(afterPending.length, 0);
});
