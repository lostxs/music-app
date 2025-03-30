import { ulid } from "ulid";

import { db } from "~/shared/lib/db";
import {
  playlist_tracks_table,
  tracks_table,
} from "../schemas/playlist.schema";

const generateRandomDuration = () => {
  const minutes = Math.floor(Math.random() * 9) + 2; // 2-10 minutes
  const seconds = Math.floor(Math.random() * 60); // 0-59 seconds
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

const tracks = Array.from({ length: 100 }, (_, index) => ({
  title: `Track ${index + 1}`,
  duration: generateRandomDuration(),
}));

async function main() {
  console.log("Seeding tracks...");
  try {
    const values = tracks.map((track) => ({
      ...track,
      id: ulid(),
      artist: `Artist ${track.title.split(" ")[1]}`,
      image:
        "https://s3.twcstorage.ru/616807b3-realm-music/playlists/01JQ52AWA93VVKJ4YA5AZTXBZV/01JQA41E243JR1P2CSDT9XHF39.webp",
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await db.insert(tracks_table).values(values);

    await db.insert(playlist_tracks_table).values(
      values.map((track) => ({
        id: ulid(),
        playlistId: "01JQ52AWA93VVKJ4YA5AZTXBZV",
        trackId: track.id,
        addedAt: new Date(),
        updatedAt: new Date(),
      })),
    );

    console.log("Tracks seeded successfully");
  } catch (error) {
    console.error("Error seeding tracks:", error);
    process.exit(1);
  }
}

void main();
