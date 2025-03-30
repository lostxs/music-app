"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Plus } from "lucide-react";

import { Button } from "~/shared/components/ui/button";
import { useTRPC } from "~/shared/lib/trpc/client";

export function CreatePlaylistButton() {
  const router = useRouter();
  const trpc = useTRPC();

  const { mutate: createPlaylist, isPending } = useMutation(
    trpc.main.createPlaylist.mutationOptions(),
  );

  const handleCreatePlaylist = () => {
    createPlaylist(undefined, {
      onSuccess: (data) => {
        router.push(`/playlist/${data.id}`);
      },
    });
  };

  return (
    <Button
      variant="default"
      className="rounded-full"
      onClick={handleCreatePlaylist}
      disabled={isPending}
    >
      <Plus className="size-6" />
      <span>New Playlist</span>
    </Button>
  );
}
