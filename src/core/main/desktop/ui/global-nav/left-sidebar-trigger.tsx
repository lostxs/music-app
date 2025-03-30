"use client";

import { Menu } from "lucide-react";

import { useLeftSidebar } from "~/app/_providers/left-sidebar-provider";
import { Button } from "~/shared/components/ui/button";

export function LeftSidebarTrigger() {
  const { toggleSidebar } = useLeftSidebar();

  return (
    <Button size="icon" className="rounded-full" onClick={toggleSidebar}>
      <Menu />
    </Button>
  );
}
