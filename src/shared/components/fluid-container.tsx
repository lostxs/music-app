import type { ComponentProps, CSSProperties } from "react";

import { cn } from "~/shared/lib/utils";

export function FluidContainer({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "relative flex h-[min(30vh,var(--fluid-height))] max-h-[336px] min-h-(--min-fluid-height) w-full pb-(--content-spacing)",
        className,
      )}
      style={
        {
          "--fluid-height":
            "clamp(186px, 186px +(var(--main-view-grid-width) - 600px) / 424* 150, 336px)",
          "--min-fluid-height":
            "clamp(186px, 186px +(var(--main-view-grid-width) - 600px) / 424* 90, 276px)",
          "--min-fluid-height-large-header":
            "clamp(216px, 216px +(var(--main-view-grid-width) - 600px) / 424* 60, 276px)",
          "--min-fluid-height-xlarge-header":
            "clamp(286px, 286px +(var(--main-view-grid-width) - 600px) / 424* 50, 336px)",
        } as CSSProperties
      }
      {...props}
    />
  );
}
