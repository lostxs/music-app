import type { BetterAuthOptions } from "better-auth";
import type { DrizzleAdapterConfig } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { env } from "~/env";
import { db } from "../db";
import * as schema from "../db/schema";

const adapter = drizzleAdapter(db, {
  provider: "pg",
  schema: schema,
} satisfies DrizzleAdapterConfig);

export const auth = betterAuth({
  database: adapter,
  socialProviders: {
    google: {
      enabled: true,
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google"],
    },
  },
  advanced: {
    cookiePrefix: "hifly",
  },
} satisfies BetterAuthOptions);
