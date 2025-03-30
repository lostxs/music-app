import { Music, Play } from "lucide-react";

import { Button } from "~/shared/components/ui/button";

export function PlaylistSection() {
  return (
    <ul role="list" tabIndex={0}>
      <div
        className="relative contain-layout"
        style={
          {
            "--row-height": "64px",
          } as React.CSSProperties
        }
      >
        <li role="listitem" className="contain-layout">
          <PlaylistItem />
        </li>
      </div>
    </ul>
  );
}

function PlaylistItem() {
  return (
    <div
      role="group"
      className="group/playlist relative z-0 grid cursor-pointer auto-rows-[auto_1fr_auto] grid-cols-[auto_1fr] [grid-template-rows:48px] gap-x-2 gap-y-3 rounded-xs p-2"
    >
      <div className="[grid-column:1]">
        <div className="flex h-full items-center gap-3">
          <div className="relative">
            <div className="pointer-events-none flex size-12 items-end self-end overflow-hidden rounded-xs shadow-[0_4px_60px_rgba(0,0,0,0.5)]">
              <div className="bg-muted flex size-full items-center justify-center">
                <Music className="size-6" />
              </div>
            </div>

            <div className="bg-background/50 absolute top-0 size-full rounded-xs opacity-0 transition-opacity group-hover/playlist:opacity-100">
              <Button variant="ghost" size="icon" className="size-full">
                <Play className="size-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="[grid-column-end:-1] flex items-center justify-between gap-3 group-data-[collapsed=true]:hidden">
        <div className="flex flex-col items-start gap-0.5">
          <p className="text-sm font-medium">Playlist Name</p>
          <p className="text-muted-foreground text-xs">Playlist Description</p>
        </div>
      </div>
    </div>
  );
}
