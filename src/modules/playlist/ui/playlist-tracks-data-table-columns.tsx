"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import { Timer } from "lucide-react";

import type { playlistRouter } from "../procedures/server";

export const playlistTracksDataTableColumns: ColumnDef<
  Awaited<ReturnType<typeof playlistRouter.getTracks>>["items"][number]
>[] = [
  {
    header: "#",
    accessorKey: "index",
    cell: ({ row }) => {
      return (
        <div className="relative inline-block size-4 min-h-4 min-w-4">
          <span className="pointer-events-none absolute -top-1 right-[.25em] tabular-nums">
            {row.index + 1}
          </span>
        </div>
      );
    },
  },
  {
    header: "Название",
    accessorKey: "title",
    cell: ({ row }) => {
      return (
        <>
          <div className="relative me-3 size-10">
            <Image
              src={row.original.trackMeta.image ?? ""}
              alt="Track Image"
              loading="lazy"
              fill
              sizes="100%"
              className="bg-background rounded-sm object-cover object-center"
            />
          </div>
          <div
            className={`grid items-center gap-0.5 pe-2 [grid-template:"title_title"_"badges_subtitle"_/_auto_1fr]`}
          >
            <Link
              href={`/track/`}
              tabIndex={-1}
              className="justify-self-start [grid-area:title] hover:underline"
            >
              <div className="whitespace-[unset] line-clamp-1 justify-self-start break-all text-ellipsis">
                {row.original.trackMeta.title}
              </div>
            </Link>
            <span className="text-muted-foreground whitespace-[unset] ![grid-column-start:badges] line-clamp-1 text-sm break-all text-ellipsis [grid-area:subtitle]">
              <Link href={`/artist/`} className="hover:underline">
                {row.original.trackMeta.artist}
              </Link>
            </span>
          </div>
        </>
      );
    },
  },
  {
    header: () => {
      return <Timer className="mr-3 size-4" />;
    },
    accessorKey: "duration",
    cell: ({ row }) => {
      return (
        <div className="text-muted-foreground text-sm">
          {row.original.trackMeta.duration}
        </div>
      );
    },
  },
];
