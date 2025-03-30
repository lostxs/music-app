"use client";

import type { OverlayScrollbarsComponentProps } from "overlayscrollbars-react";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

import "overlayscrollbars/overlayscrollbars.css";

import { cn } from "~/shared/lib/utils";

const defaultOptions: OverlayScrollbarsComponentProps["options"] = {
  scrollbars: {
    autoHide: "leave",
    dragScroll: true,
    theme: "os-theme-main",
  },
};

export function Scrollbars({
  children,
  className,
  options,
  ...props
}: React.ComponentProps<typeof OverlayScrollbarsComponent> & {
  className?: string;
}) {
  return (
    <OverlayScrollbarsComponent
      defer
      options={{
        ...defaultOptions,
        ...options,
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </OverlayScrollbarsComponent>
  );
}
