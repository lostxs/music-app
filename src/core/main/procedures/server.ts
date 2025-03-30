import { ulid } from "ulid";

import { createRouter, protectedProcedure } from "~/server/trpc";
import {
  playlistsInsertSchema,
  playlists_table as playlistsSchema,
} from "~/shared/lib/db/schemas/playlist.schema";

export const mainRouter = createRouter({
  createPlaylist: protectedProcedure.mutation(async ({ ctx }) => {
    const { user, db } = ctx;

    const [playlist] = await db
      .insert(playlistsSchema)
      .values(
        playlistsInsertSchema.parse({
          id: ulid(),
          userId: user.id,
          title: "New Playlist",
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      )
      .returning();

    return playlist;
  }),
});
