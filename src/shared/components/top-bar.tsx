import { cn } from "~/shared/lib/utils";

export function TopBar({
  className,
  ...props
}: React.ComponentProps<"header">) {
  return (
    <header
      className={cn(
        "absolute z-1 flex h-16 w-full items-center contain-content",
        className,
      )}
      {...props}
    />
  );
}

export function TopBarBackground({
  className,
  backgroundColor,
  ...props
}: React.ComponentProps<"div"> & {
  backgroundColor?: string;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 -z-1 overflow-hidden bg-(--background-base) whitespace-nowrap opacity-0",
        className,
      )}
      style={
        {
          "--background-base": backgroundColor ?? "var(--background)",
        } as React.CSSProperties
      }
      {...props}
    >
      <div className="bg-background/60 h-full" />
    </div>
  );
}

export function TopBarContentWrapper({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("pointer-events-none min-w-0 grow", className)}
      {...props}
    />
  );
}

export function TopBarContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "pointer-events-none flex items-center gap-2 opacity-0 transition-opacity duration-300",
        className,
      )}
      {...props}
    />
  );
}
