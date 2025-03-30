import { cn } from "../lib/utils";

export function MainViewContainer({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("isolate scroll-smooth pb-8", className)}
      style={{
        minHeight: "calc(-673px + 100vh)",
      }}
      {...props}
    >
      <main
        tabIndex={-1}
        className="w-full @min-[0px]/main-view-grid-area:[--main-view-grid-width:100cqw]"
        style={
          {
            "--content-spacing":
              "clamp(16px, 16px + (var(--main-view-grid-width) - 600px) / 424* 8, 24px)",
          } as React.CSSProperties
        }
      >
        {children}
      </main>
    </div>
  );
}
