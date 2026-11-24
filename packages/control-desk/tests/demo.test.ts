import test from "node:test";
import assert from "node:assert/strict";
import { createDemoRouter } from "../src/server/demo.ts";
import { handleDemoRequest } from "../src/server/handler.ts";

test("demo uses Core data, confirmed progress, and independent ownership", async () => {
  const caller = createDemoRouter().createCaller({ actor: "demo-operator" });
  const snapshot = await caller.desk.snapshot();
  assert.equal(snapshot.mode, "demo");
  assert.deepEqual(snapshot.projects, await caller.core.projects.list());
  assert.deepEqual(snapshot.tasks, await caller.core.tasks.list());
  assert.deepEqual(snapshot.approvals, await caller.core.approvals.listPending());
  assert.equal(snapshot.tasks.filter(task => task.status === "completed").length, 1);
  assert(snapshot.tasks.every(task => task.owner !== task.reviewer));
});

test("bounded decisions log no external receipt, reject duplicates and isolate sessions", async () => {
  const first = createDemoRouter().createCaller({ actor: "untrusted-client" });
  const second = createDemoRouter().createCaller({ actor: "demo-operator" });
  const decision = { id: "SYN-APR-001" as const, version: "synthetic-commit-7c21e90" as const, status: "approved" as const, rationale: "Reviewed exact fixture" };
  await assert.rejects(first.desk.decide({ ...decision, version: "wrong-version" as typeof decision.version }));
  const result = await first.desk.decide(decision);
  assert.equal(result.decision.decider, "demo-operator");
  assert.equal(result.event.receipt, null);
  assert.match(result.event.summary, /No external action executed/);
  assert.equal((await first.desk.snapshot()).approvals.length, 0);
  assert.equal((await second.desk.snapshot()).approvals.length, 1);
  await assert.rejects(first.desk.decide(decision), /already decided/);
});

test("HTTP boundary rejects generic writes and cross-origin or missing-session decisions", async () => {
  const origin = "http://localhost:3000";
  for (const procedure of ["core.projects.create", "core.tasks.transition", "core.approvals.decide", "desk.decide,core.tasks.create"]) {
    const response = await handleDemoRequest(new Request(`${origin}/api/trpc/${procedure}`, { method: "POST", headers: { origin } }));
    assert.equal(response.status, 403);
  }
  assert.equal((await handleDemoRequest(new Request(`${origin}/api/trpc/desk.decide`))).status, 403);
  assert.equal((await handleDemoRequest(new Request(`${origin}/api/trpc/desk.decide`, { method: "POST", headers: { origin: "https://other.example" } }))).status, 403);
  assert.equal((await handleDemoRequest(new Request(`${origin}/api/trpc/desk.decide`, { method: "POST", headers: { origin } }))).status, 409);
});

test("HTTP requests keep decisions within their cookie session and survive refresh", async () => {
  const base = "http://localhost:3000/api/trpc/";
  const initial = await handleDemoRequest(new Request(`${base}desk.snapshot`));
  assert.equal(initial.status, 200);
  assert.equal(initial.headers.get("cache-control"), "no-store");
  const setCookie = initial.headers.get("set-cookie")!;
  assert.match(setCookie, /HttpOnly; SameSite=Strict/);
  const cookie = setCookie.split(";")[0];
  const response = await handleDemoRequest(new Request(`${base}desk.decide`, { method: "POST", headers: { host: "127.0.0.1:3000", origin: "http://127.0.0.1:3000", cookie, "content-type": "application/json" }, body: JSON.stringify({ id: "SYN-APR-001", version: "synthetic-commit-7c21e90", status: "rejected", rationale: "Need more evidence" }) }));
  assert.equal(response.status, 200);
  const refreshed = await (await handleDemoRequest(new Request(`${base}desk.snapshot`, { headers: { cookie } }))).json();
  assert.equal(refreshed.result.data.approvals.length, 0);
  const other = await (await handleDemoRequest(new Request(`${base}desk.snapshot`))).json();
  assert.equal(other.result.data.approvals.length, 1);
});
