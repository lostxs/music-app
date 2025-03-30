"use client";

import type { OverlayScrollbars } from "overlayscrollbars";
import { useCallback, useMemo, useRef } from "react";

import { useLeftSidebar } from "~/app/_providers/left-sidebar-provider";
import { Scrollbars } from "~/shared/components/scrollbars";
import { MainSection } from "./main-section";
import { PlaylistSection } from "./playlist-section";

export function LeftSidebar() {
  const { state, width } = useLeftSidebar();
  const headerRef = useRef<HTMLDivElement>(null);

  // TODO: Check performance with setState instead of inline styles
  const handleScroll = useCallback((instance: OverlayScrollbars) => {
    const update = () => {
      const viewport = instance.elements().viewport;
      headerRef.current?.style.setProperty(
        "z-index",
        String(viewport.scrollTop > 1 ? 1 : 0),
      );
      headerRef.current?.style.setProperty(
        "box-shadow",
        String(viewport.scrollTop > 1 ? "0 6px 10px rgba(0,0,0,0.6)" : "none"),
      );
    };
    requestAnimationFrame(update);
  }, []);

  const scrollEvents = useMemo(() => {
    return {
      scroll: handleScroll,
    };
  }, [handleScroll]);

  return (
    <div
      data-state={state}
      data-collapsed={state === "collapsed"}
      data-slot="left-sidebar"
      style={
        {
          "--left-sidebar-width": `${width}px`,
        } as React.CSSProperties
      }
      className="bg-background group relative z-4 flex min-h-0 w-(--left-sidebar-width) flex-col rounded-md [grid-area:left-sidebar]"
    >
      <nav className="flex h-full min-h-0 flex-col gap-(--panel-gap)">
        <div className="bg-background-panel relative flex min-h-0 w-full flex-1 flex-col overflow-x-hidden rounded-md select-none">
          <div className="flex size-full min-h-0 flex-1 flex-col overflow-x-hidden pt-0">
            <div
              ref={headerRef}
              className="z-0 shadow-none transition-[box-shadow] duration-300"
            >
              <MainSection />
            </div>

            <Scrollbars
              className="h-full overscroll-y-contain"
              events={scrollEvents}
            >
              <div className="@container/ylx-contents flex min-h-full flex-col gap-2 p-1">
                <PlaylistSection />
                <h1 className="h-[1000px]">Hello</h1>
              </div>
            </Scrollbars>
          </div>
        </div>
      </nav>
    </div>
  );
}
