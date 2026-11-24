import { router } from "./trpc.ts";
import { projectsRouter, type ProjectStore } from "./projects.ts";
import { tasksRouter, type TaskStore } from "./tasks.ts";
import { approvalsRouter, type ApprovalStore } from "./approvals.ts";

export interface FactoryCoreContextState {
  projects: Map<string, ProjectStore>;
  tasks: Map<string, TaskStore>;
  approvals: Map<string, ApprovalStore>;
}

export function createFactoryRouter(state?: Partial<FactoryCoreContextState>) {
  const projects = state?.projects || new Map<string, ProjectStore>();
  const tasks = state?.tasks || new Map<string, TaskStore>();
  const approvals = state?.approvals || new Map<string, ApprovalStore>();

  return router({
    projects: projectsRouter(projects),
    tasks: tasksRouter(tasks),
    approvals: approvalsRouter(approvals),
  });
}

export type AppRouter = ReturnType<typeof createFactoryRouter>;
export * from "./trpc.ts";
export * from "./projects.ts";
export * from "./tasks.ts";
export * from "./approvals.ts";
