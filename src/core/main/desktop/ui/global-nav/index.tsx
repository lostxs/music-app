import { headers } from "next/headers";
import Link from "next/link";

import { buttonVariants } from "~/shared/components/ui/button";
import { auth } from "~/shared/lib/auth/server";
import { cn } from "~/shared/lib/utils";
import { CreatePlaylistButton } from "./create-playlist-button";
import { LeftSidebarTrigger } from "./left-sidebar-trigger";
import { ProfileMenu } from "./profile-menu";

export async function GlobalNav() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="relative -m-(--panel-gap) flex h-[calc(48px+var(--panel-gap)*2)] items-center justify-between p-(--panel-gap) [grid-area:global-nav]">
      <div className="z-1 flex flex-nowrap items-center gap-2">
        <LeftSidebarTrigger />
      </div>

      <div className="flex gap-4">
        <div className="flex flex-nowrap items-center justify-end gap-2">
          {session ? (
            <>
              <CreatePlaylistButton />
              <ProfileMenu user={session.user} />
            </>
          ) : (
            <Link
              href="/auth/sign-in"
              className={cn(
                buttonVariants({ variant: "default" }),
                "rounded-full",
              )}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
