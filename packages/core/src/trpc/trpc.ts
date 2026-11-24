import { initTRPC, TRPCError } from "@trpc/server";

export interface Context {
  actor: string;
}

export function createContext(opts?: { actor?: string }): Context {
  return {
    actor: opts?.actor || "anonymous",
  };
}

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
export { TRPCError };
