"use server";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
import { ulid } from "ulid";
import { z } from "zod";

import { env } from "~/env";
import { getServerSession } from "~/shared/lib/auth/actions";
import { createS3Client } from "~/shared/lib/storage/s3-client";
import { extractImageColor } from "./extract-image-color";

const imageSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, "Max file size is 5MB"),
  ownerId: z.string().min(1),
  playlistId: z.string().min(1),
});

export async function uploadPlaylistImage(params: z.infer<typeof imageSchema>) {
  const session = await getServerSession();
  const { file, playlistId, ownerId } = imageSchema.parse(params);

  if (!session || session.user.id !== ownerId) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const buffer = await sharp(await file.arrayBuffer())
      .webp({ quality: 80 })
      .toBuffer();

    const colors = await extractImageColor(await file.arrayBuffer());

    const id = ulid();
    const key = `playlists/${playlistId}/${id}.webp`;

    const s3Client = createS3Client();
    await s3Client.send(
      new PutObjectCommand({
        Bucket: env.S3_BUCKET_NAME,
        Key: key,
        Body: buffer,
        ACL: "public-read",
        ContentType: "image/webp",
      }),
    );

    return {
      success: true,
      uri: key,
      extractedColor: colors[0].hex,
    };
  } catch (error) {
    console.error("Upload failed:", error);
    return { success: false, error: "Image upload failed" };
  }
}
