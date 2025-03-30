import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { cookies } from "next/headers";

import "~/styles/globals.css";

import { TRPCProvider } from "~/app/_providers/trpc-provider";
import { DesktopLayout } from "~/core/main/desktop/layouts/desktop-layout";
import { MobileLayout } from "~/core/main/mobile/layouts/mobile-layout";

export const metadata: Metadata = {
  title: "HiFly",
  description: "Create your own flight",
};

export default async function MainLayout({ children }: PropsWithChildren) {
  const cookieStore = await cookies();
  const viewport = cookieStore.get("viewport")?.value;
  const defaultOpen = cookieStore.get("left-sidebar-state")?.value === "true";

  return (
    <html lang="ru" className={`${viewport} dark`}>
      <TRPCProvider>
        {viewport === "desktop" ? (
          <body className="bg-background text-foreground flex size-full min-h-[600px] min-w-[800px] flex-col overflow-hidden antialiased">
            <DesktopLayout defaultOpen={defaultOpen}>{children}</DesktopLayout>
          </body>
        ) : (
          <body className="bg-background text-foreground flex">
            <MobileLayout>{children}</MobileLayout>
          </body>
        )}
      </TRPCProvider>
    </html>
  );
}
