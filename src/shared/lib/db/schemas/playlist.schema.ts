import { pgTable, primaryKey, text, timestamp } from "drizzle-orm/pg-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";

import { user } from "./auth.schema";

export const playlists_table = pgTable("playlists", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  image: text("image"),
  extractedColor: text("extracted_color"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});
export const playlistsSelectSchema = createSelectSchema(playlists_table);
export const playlistsInsertSchema = createInsertSchema(playlists_table);
export const playlistsUpdateSchema = createUpdateSchema(playlists_table);
export type Playlist = typeof playlists_table.$inferSelect;

export const tracks_table = pgTable("tracks", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  artist: text("artist").notNull(),
  duration: text("duration").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});
export const tracksSelectSchema = createSelectSchema(tracks_table);
export const tracksInsertSchema = createInsertSchema(tracks_table);
export const tracksUpdateSchema = createUpdateSchema(tracks_table);
export type Track = typeof tracks_table.$inferSelect;

export const playlist_tracks_table = pgTable(
  "playlist_tracks",
  {
    playlistId: text("playlist_id")
      .notNull()
      .references(() => playlists_table.id, { onDelete: "cascade" }),
    trackId: text("track_id")
      .notNull()
      .references(() => tracks_table.id, { onDelete: "cascade" }),
    addedAt: timestamp("added_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
  },
  (t) => [primaryKey({ columns: [t.playlistId, t.trackId] })],
);
export const playlistTracksSelectSchema = createSelectSchema(
  playlist_tracks_table,
);
export const playlistTracksInsertSchema = createInsertSchema(
  playlist_tracks_table,
);
export const playlistTracksUpdateSchema = createUpdateSchema(
  playlist_tracks_table,
);
export type PlaylistTrack = typeof playlist_tracks_table.$inferSelect;
