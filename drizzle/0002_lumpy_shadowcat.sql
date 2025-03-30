ALTER TABLE "playlists" ADD COLUMN "image" text;--> statement-breakpoint
ALTER TABLE "playlists" ADD COLUMN "extracted_color" text;--> statement-breakpoint
ALTER TABLE "playlists" DROP COLUMN "description";