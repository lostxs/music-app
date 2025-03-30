import type { QueryClientConfig } from "@tanstack/react-query";
import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from "@tanstack/react-query";
import superjson from "superjson";

const config = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      staleTime: 30 * 1000,
    },
    dehydrate: {
      serializeData: superjson.serialize,
      shouldDehydrateQuery: (query) =>
        defaultShouldDehydrateQuery(query) || query.state.status === "pending",
      shouldRedactErrors: () => {
        // We should not catch Next.js server errors
        // as that's how Next.js detects dynamic pages
        // so we cannot redact them.
        // Next.js also automatically redacts errors for us
        // with better digests.
        return false;
      },
    },
    hydrate: {
      deserializeData: superjson.deserialize,
    },
  },
} satisfies QueryClientConfig;

export function createQueryClient() {
  return new QueryClient(config);
}
