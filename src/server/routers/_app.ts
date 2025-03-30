import { mainRouter } from "~/core/main/procedures/server";
import { playlistRouter } from "~/modules/playlist/procedures/server";
import { createCallerFactory, createRouter, publicProcedure } from "../trpc";

export const appRouter = createRouter({
  healthcheck: publicProcedure.query(() => {
    return {
      status: "ok",
    };
  }),
  main: mainRouter,
  playlist: playlistRouter,
});

export const createCaller = createCallerFactory(appRouter);

export type AppRouter = typeof appRouter;
