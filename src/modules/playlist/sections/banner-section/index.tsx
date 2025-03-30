"use client";

import Image from "next/image";
import Link from "next/link";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Music, Pencil } from "lucide-react";

import { useModalStore } from "~/app/_providers/modal-store-provider";
import { getPublicImageUrl } from "~/shared/lib/storage/utils";
import { useTRPC } from "~/shared/lib/trpc/client";
import { cn } from "~/shared/lib/utils";
import { usePlaylistView } from "../../context/playlist-view-context";

export function BannerSection() {
  const modalStore = useModalStore((state) => state);
  const trpc = useTRPC();
  const { playlistId } = usePlaylistView();
  const { data: playlist } = useSuspenseQuery(
    trpc.playlist.getById.queryOptions({ id: playlistId }),
  );

  return (
    <>
      <div
        style={{
          backgroundColor: playlist.extractedColor ?? "var(--background)",
        }}
        className="absolute top-0 left-0 block size-full"
      />
      <div className="to-background-panel/50 absolute top-0 left-0 block size-full bg-gradient-to-b from-transparent" />

      <div className="contentSpacing mx-auto mt-(--content-spacing) flex">
        <div
          className={cn(
            "z-0 mr-(--content-spacing) flex shrink-0 items-end self-end rounded-sm",
            "size-[clamp(128px,128px_+_(var(--main-view-grid-width)_-_600px)_/_424*104,232px)]",
          )}
        >
          <div className="relative flex size-[inherit]">
            <div className="size-full rounded-sm">
              {playlist.image ? (
                <Image
                  src={getPublicImageUrl(playlist.image)}
                  alt={playlist.title}
                  fill
                  loading="eager"
                  sizes="100%"
                  className="rounded-sm object-cover object-center shadow-[0_4px_60px_rgba(0,0,0,0.5)]"
                />
              ) : (
                <div className="bg-muted text-muted-foreground flex size-full items-center justify-center rounded-sm shadow-[0_4px_60px_rgba(0,0,0,0.5)]">
                  <Music className="size-16" />
                </div>
              )}
            </div>

            <div className="absolute inset-0">
              <div className="group size-full">
                <button
                  className="bg-muted flex size-full flex-col items-center justify-center gap-2 rounded-sm opacity-0 transition-opacity group-hover:opacity-100"
                  onClick={() => modalStore.open("edit-playlist")}
                >
                  <Pencil className="mt-4 size-12" />
                  <span>Pick image</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="z-0 flex flex-1 flex-col flex-nowrap justify-end">
          <span className="text-sm">Плейлист</span>
          <span className="line-clamp-1 w-full text-left break-words">
            <h1 className="w-full text-6xl leading-normal font-extrabold text-balance whitespace-normal">
              {playlist.title}
            </h1>
          </span>

          <div className="mt-2 flex flex-wrap items-center">
            <div className="text-foreground/90 whitespace-nowrap">
              <Link
                href={`/user/${playlist.owner.id}`}
                className="text-sm font-bold hover:underline"
              >
                {playlist.owner.name}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
