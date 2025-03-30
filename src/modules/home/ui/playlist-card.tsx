"use client";

import Image from "next/image";
import Link from "next/link";
import { PlayIcon } from "lucide-react";

import { Button } from "~/shared/components/ui/button";
import { cn } from "~/shared/lib/utils";

export function PlaylistCard({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      role="card"
      className={cn(
        "hover:bg-foreground/5 group/card relative z-0 inline-flex w-48 flex-col gap-2 overflow-hidden rounded-md p-3",
        className,
      )}
      {...props}
    >
      <Link href="/playlist/1" className="absolute inset-0 z-0 w-full" />

      <div className="pointer-events-none relative">
        <div
          className="relative w-full rounded-md bg-(--card-color,var(--background)) pb-[100%] shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
          style={
            {
              "--card-color": "rgba(0, 0, 0, 1)",
            } as React.CSSProperties
          }
        >
          <Image
            loading="lazy"
            src="/placeholder.jpg"
            alt="Playlist 1"
            fill
            sizes="100%"
            className="animate-fade-in rounded-md object-cover object-center"
          />
        </div>
        <div className="pointer-events-none absolute right-2 bottom-2 z-2 translate-y-2 rounded-full opacity-0 shadow-[0_8px_8px_rgba(0,0,0,0.3)] transition-all group-hover/card:pointer-events-auto group-hover/card:translate-y-0 group-hover/card:opacity-100">
          <Button
            size="icon"
            tabIndex={-1}
            className="size-10 rounded-full hover:scale-105 active:scale-100"
          >
            <PlayIcon className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
