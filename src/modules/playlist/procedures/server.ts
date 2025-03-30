import { TRPCError } from "@trpc/server";
import { and, desc, eq, lt, or } from "drizzle-orm";
import { z } from "zod";

import {
  createRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/trpc";
import { user as usersSchema } from "~/shared/lib/db/schemas/auth.schema";
import {
  playlist_tracks_table,
  playlists_table as playlistsSchema,
  playlistsSelectSchema,
  playlistsUpdateSchema,
  tracks_table,
} from "~/shared/lib/db/schemas/playlist.schema";

export const playlistRouter = createRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string().ulid() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const { db } = ctx;

      const playlist = await db
        .select({
          id: playlistsSchema.id,
          title: playlistsSchema.title,
          image: playlistsSchema.image,
          extractedColor: playlistsSchema.extractedColor,
          owner: {
            id: usersSchema.id,
            name: usersSchema.name,
            image: usersSchema.image,
          },
        })
        .from(playlistsSchema)
        .innerJoin(usersSchema, eq(playlistsSchema.userId, usersSchema.id))
        .where(eq(playlistsSchema.id, id))
        .limit(1);

      if (playlist.length === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Playlist not found",
        });
      }

      return playlist[0];
    }),
  getTracks: publicProcedure
    .input(
      z.object({
        playlistId: z.string().ulid(),
        cursor: z
          .object({
            trackId: z.string().ulid(),
            updatedAt: z.date(),
          })
          .nullish(),
        limit: z.number().min(1).max(100),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { playlistId, cursor, limit } = input;
      const { db } = ctx;

      const data = await db
        .select({
          trackMeta: {
            id: tracks_table.id,
            title: tracks_table.title,
            artist: tracks_table.artist,
            duration: tracks_table.duration,
            image: tracks_table.image,
          },
          playlistTrackMeta: {
            playlistId: playlist_tracks_table.playlistId,
            trackId: playlist_tracks_table.trackId,
            updatedAt: playlist_tracks_table.updatedAt,
          },
        })
        .from(playlist_tracks_table)
        .innerJoin(
          tracks_table,
          eq(playlist_tracks_table.trackId, tracks_table.id),
        )
        .where(
          and(
            eq(playlist_tracks_table.playlistId, playlistId),
            cursor
              ? or(
                  lt(playlist_tracks_table.updatedAt, cursor.updatedAt),
                  and(
                    eq(playlist_tracks_table.updatedAt, cursor.updatedAt),
                    lt(playlist_tracks_table.trackId, cursor.trackId),
                  ),
                )
              : undefined,
          ),
        )
        .orderBy(
          desc(playlist_tracks_table.updatedAt),
          desc(playlist_tracks_table.trackId),
        )
        .limit(limit + 1);

      const hasMore = data.length > limit;
      const items = hasMore ? data.slice(0, -1) : data;
      const lastItem = items[items.length - 1];
      const nextCursor = hasMore
        ? {
            trackId: lastItem.playlistTrackMeta.trackId,
            updatedAt: lastItem.playlistTrackMeta.updatedAt,
          }
        : null;

      return {
        items,
        nextCursor,
      };
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string().ulid(),
        data: playlistsUpdateSchema.pick({
          title: true,
          image: true,
          extractedColor: true,
        }),
      }),
    )
    .output(playlistsSelectSchema)
    .mutation(async ({ ctx, input }) => {
      const { db, user } = ctx;
      const { id, data } = input;

      const [playlist] = await db
        .update(playlistsSchema)
        .set(data)
        .where(
          and(eq(playlistsSchema.id, id), eq(playlistsSchema.userId, user.id)),
        )
        .returning();

      return playlist;
    }),
});
