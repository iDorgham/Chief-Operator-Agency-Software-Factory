import { z } from "zod";
import { router, publicProcedure } from "./trpc.ts";

export interface ProjectStore {
  id: string;
  title: string;
  workspaceRoot: string;
  gitRemote?: string | null;
  status: string;
}

// In-memory or database-backed project interface
export const projectsRouter = (dbProjects: Map<string, ProjectStore>) =>
  router({
    list: publicProcedure.query(async () => {
      return Array.from(dbProjects.values());
    }),

    getById: publicProcedure
      .input(z.object({ id: z.string().min(1) }))
      .query(async ({ input }) => {
        return dbProjects.get(input.id) || null;
      }),

    create: publicProcedure
      .input(
        z.object({
          id: z.string().min(1),
          title: z.string().min(1),
          workspaceRoot: z.string().min(1),
          gitRemote: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const project: ProjectStore = {
          id: input.id,
          title: input.title,
          workspaceRoot: input.workspaceRoot,
          gitRemote: input.gitRemote || null,
          status: "active",
        };
        dbProjects.set(input.id, project);
        return project;
      }),
  });
