import type { PropsWithChildren } from "react";

export function MobileLayout({ children }: PropsWithChildren) {
  return <main className="z-0 size-full">{children}</main>;
}
