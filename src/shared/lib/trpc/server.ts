import "server-only";

import { cache } from "react";
import { headers } from "next/headers";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";

import { appRouter, createCaller } from "~/server/routers/_app";
import { createTRPCContext } from "~/server/trpc/context";
import { createQueryClient } from "../query-client";

const createRSCContext = cache(async () => {
  const heads = new Headers(await headers());
  heads.set("x-trpc-source", "react-server-component");

  return createTRPCContext({
    headers: heads,
  });
});

export const caller = createCaller(createRSCContext);
export const getQueryClient = cache(createQueryClient);

export const trpc = createTRPCOptionsProxy({
  ctx: createRSCContext,
  router: appRouter,
  queryClient: getQueryClient,
});
