import Link from "next/link";

import type { User } from "~/shared/lib/auth/types";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/shared/components/ui/avatar";
import { Button } from "~/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/shared/components/ui/dropdown-menu";

export function ProfileMenu({ user }: { user: User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" className="bg-muted size-12 rounded-full">
          <Avatar className="size-10">
            {user.image ? (
              <AvatarImage src={user.image} />
            ) : (
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-44">
        <DropdownMenuItem>
          <Link href={`/profile/${user.id}`}>Профиль</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/auth/sign-out">Выйти</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
