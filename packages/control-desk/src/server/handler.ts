import { randomUUID } from "node:crypto";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createContext } from "../../../core/src/trpc/trpc.ts";
import { createDemoRouter } from "./demo.ts";

const lifetime = 60 * 60 * 1000;
const sessions = new Map<string, { expires: number; router: ReturnType<typeof createDemoRouter> }>();
const reads = new Set(["desk.snapshot", "core.projects.list", "core.projects.getById", "core.tasks.list", "core.tasks.getById", "core.approvals.listPending"]);

export async function handleDemoRequest(request: Request) {
  const url = new URL(request.url);
  const paths = decodeURIComponent(url.pathname.replace("/api/trpc/", "")).split(",");
  const allowed = request.method === "GET" ? paths.every(path => reads.has(path)) : request.method === "POST" && paths.length === 1 && paths[0] === "desk.decide";
  if (!allowed) return new Response("Only bounded Demo procedures are available. Live writes are disabled.", { status: 403 });
  // Next can normalize request.url to localhost while the browser uses 127.0.0.1.
  // Compare against the original Host, never a client-provided forwarded host.
  const expectedOrigin = `${url.protocol}//${request.headers.get("host") ?? url.host}`;
  if (request.method === "POST" && request.headers.get("origin") !== expectedOrigin) return new Response("Same-origin Demo decisions required.", { status: 403 });
  const now = Date.now();
  for (const [id, session] of sessions) if (session.expires <= now) sessions.delete(id);
  const incoming = request.headers.get("cookie")?.match(/(?:^|;\s*)factory-demo=([a-f0-9-]{36})(?:;|$)/)?.[1];
  let session = incoming ? sessions.get(incoming) : undefined;
  // Never silently apply a decision to freshly reseeded state after expiry.
  if (!session && request.method === "POST") return new Response("Demo session expired. Refresh the desk before deciding.", { status: 409 });
  const id = session ? incoming! : randomUUID();
  if (!session) {
    if (sessions.size >= 200) return new Response("Demo capacity reached. Try again later.", { status: 503 });
    session = { expires: now + lifetime, router: createDemoRouter() };
    sessions.set(id, session);
  }
  const response = await fetchRequestHandler({ endpoint: "/api/trpc", req: request, router: session.router, createContext: () => createContext({ actor: "demo-operator" }) });
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("Set-Cookie", `factory-demo=${id}; HttpOnly; SameSite=Strict; Path=/api/trpc; Max-Age=${Math.max(0, Math.floor((session.expires - now) / 1000))}${url.protocol === "https:" ? "; Secure" : ""}`);
  return response;
}
