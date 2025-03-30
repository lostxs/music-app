import { initTRPC, TRPCError } from "@trpc/server";
import superJSON from "superjson";
import { ZodError } from "zod";

import type { TRPCContext } from "./context";

const trpc = initTRPC.context<TRPCContext>().create({
  errorFormatter: ({ shape, error }) => ({
    ...shape,
    data: {
      ...shape.data,
      zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
    },
    code: error.code,
  }),
  transformer: superJSON,
});

export const createRouter = trpc.router;
export const createCallerFactory = trpc.createCallerFactory;

export const publicProcedure = trpc.procedure;
export const protectedProcedure = trpc.procedure.use(async ({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      ...ctx,
      user: ctx.session.user,
    },
  });
});
