import { env } from "~/env";

export const getPublicImageUrl = (key: string) => {
  return `${env.NEXT_PUBLIC_S3_URI}/${key}`;
};
