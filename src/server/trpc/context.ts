import { auth } from "~/shared/lib/auth/server";
import { db } from "~/shared/lib/db";

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const session = await auth.api.getSession({
    headers: opts.headers,
  });

  return {
    db,
    session,
    opts,
  };
};

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;
