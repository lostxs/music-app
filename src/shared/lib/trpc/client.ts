import type { CreateTRPCClientOptions } from "@trpc/client";
import {
  createTRPCClient as createTRPCClientBase,
  httpBatchLink,
  loggerLink,
} from "@trpc/client";
import { createTRPCContext } from "@trpc/tanstack-react-query";
import superJSON from "superjson";

import type { AppRouter } from "~/server/routers/_app";
import { env } from "~/env";

const opts = {
  links: [
    loggerLink({
      enabled: (opts) =>
        opts.direction === "down" && opts.result instanceof Error,
    }),
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
      headers() {
        const headers = new Headers();
        headers.set("x-trpc-source", "react-query");
        return headers;
      },
      transformer: superJSON,
    }),
  ],
} satisfies CreateTRPCClientOptions<AppRouter>;

function getBaseUrl() {
  if (typeof window !== "undefined") return window.location.origin;
  if (env.VERCEL_URL) return `https://${env.VERCEL_URL}`;

  return `http://localhost:3000`;
}

export const createTRPCClient = () => {
  return createTRPCClientBase<AppRouter>(opts);
};

export const { useTRPC, TRPCProvider } = createTRPCContext<AppRouter>();
