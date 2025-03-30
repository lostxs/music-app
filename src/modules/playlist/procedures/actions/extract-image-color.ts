"use server";

import { extractColors } from "extract-colors";
import sharp from "sharp";

export async function extractImageColor(imageBuffer: ArrayBuffer) {
  try {
    const { data, info } = await sharp(imageBuffer)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const colors = await extractColors({
      data: [...data],
      width: info.width,
      height: info.height,
    });

    return colors;
  } catch (error) {
    console.error("Error extracting colors:", error);
    return [];
  }
}
