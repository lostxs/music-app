"use server";

import { cache } from "react";
import { headers } from "next/headers";

import { auth } from "./server";

export const getServerSession = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
});
