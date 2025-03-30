import type { PropsWithChildren } from "react";

import { LeftSidebarProvider } from "~/app/_providers/left-sidebar-provider";
import { GlobalNav } from "../ui/global-nav";
import { LeftSidebar } from "../ui/left-sidebar";

export function DesktopLayout({
  children,
  defaultOpen,
}: PropsWithChildren<{
  defaultOpen?: boolean;
}>) {
  return (
    <main className="relative isolate z-0 size-full">
      <div
        className="relative grid h-full min-h-full w-full gap-(--panel-gap) p-(--panel-gap)"
        style={
          {
            gridTemplateAreas: `
            "global-nav global-nav global-nav"
            "left-sidebar main-view right-sidebar"
            "now-playing-bar now-playing-bar now-playing-bar"`,
            gridTemplateColumns: "auto 1fr",
            gridTemplateRows: "auto 1fr auto",
            "--panel-gap": "calc(var(--spacing) * 2)",
          } as React.CSSProperties
        }
      >
        <LeftSidebarProvider defaultOpen={defaultOpen}>
          <GlobalNav />
          <LeftSidebar />
        </LeftSidebarProvider>
        <div className="bg-background-panel @container/main-view-grid-area relative flex min-h-0 w-full flex-col overflow-hidden rounded-md [grid-area:main-view]">
          {children}
        </div>
      </div>
    </main>
  );
}
