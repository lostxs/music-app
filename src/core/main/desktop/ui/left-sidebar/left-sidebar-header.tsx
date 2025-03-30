"use client";

import { Home, Library, Plus } from "lucide-react";

import { useLeftSidebar } from "~/app/_providers/left-sidebar-provider";
import { Button } from "~/shared/components/ui/button";

export function LeftSidebarHeader() {
  const { toggleSidebar } = useLeftSidebar();

  return (
    <div>
      <header className="relative z-1 flex flex-col gap-2 px-4 pt-3 pb-2 group-data-[collapsed=true]:gap-4">
        <div className="flex flex-row items-center gap-2 group-data-[collapsed=true]:flex-col">
          {/* <div className="me-auto flex min-w-0 flex-row items-center gap-1 group-data-[collapsed=true]:flex-col group-data-[collapsed=true]:gap-2">
            <Button
              onClick={toggleSidebar}
              variant="ghost"
              className="hover:text-foreground text-foreground/80 h-10 justify-start rounded-full px-2 py-1 text-base font-bold hover:bg-transparent"
            >
              <Library className="size-6" />
              <span className="sr-only">Toggle sidebar</span>
              <span className="group-data-[collapsed=true]:hidden">
                Библиотека
              </span>
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              size="icon"
              className="bg-muted text-muted-foreground size-8 rounded-full"
            >
              <Plus className="size-4" />
            </Button>
          </div> */}
        </div>
      </header>
    </div>
  );
}
