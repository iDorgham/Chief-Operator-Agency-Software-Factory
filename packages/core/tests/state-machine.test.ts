import test from "node:test";
import assert from "node:assert/strict";
import { validateStateTransition } from "../src/state-machine.ts";
import { WorkItemContractSchema } from "../src/types.ts";

test("state machine allows standard legal draft -> approved transition", () => {
  const result = validateStateTransition({
    currentStatus: "draft",
    targetStatus: "approved",
    lane: "standard",
    actor: "Chief Operator",
    owner: "Software Lead",
    evidenceRefs: [],
  });
  assert.equal(result.allowed, true);
});

test("state machine rejects completion without evidence", () => {
  const result = validateStateTransition({
    currentStatus: "review",
    targetStatus: "completed",
    lane: "standard",
    actor: "Quality Lead",
    owner: "Software Lead",
    reviewer: "Quality Lead",
    evidenceRefs: [],
  });
  assert.equal(result.allowed, false);
  assert.match(result.reason!, /at least one evidence/);
});

test("state machine rejects self-review completion", () => {
  const result = validateStateTransition({
    currentStatus: "review",
    targetStatus: "completed",
    lane: "standard",
    actor: "Software Lead",
    owner: "Software Lead",
    reviewer: "Software Lead",
    evidenceRefs: ["docs/evidence.md"],
  });
  assert.equal(result.allowed, false);
  assert.match(result.reason!, /Owner cannot complete their own task/);
});

test("state machine allows fast lane draft -> active", () => {
  const result = validateStateTransition({
    currentStatus: "draft",
    targetStatus: "active",
    lane: "fast",
    actor: "Operations Lead",
    owner: "Operations Lead",
    evidenceRefs: [],
  });
  assert.equal(result.allowed, true);
});

test("Zod contract schema validates valid work item", () => {
  const valid = {
    schema_version: "1.1.0",
    task_id: "CORE-002",
    project_id: "bots",
    title: "Implement Core Schemas",
    status: "active",
    owner: "Software Lead",
    acceptance_criteria: ["Passes unit tests"],
  };
  assert.doesNotThrow(() => WorkItemContractSchema.parse(valid));
});
