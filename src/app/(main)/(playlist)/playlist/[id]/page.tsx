import { notFound } from "next/navigation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { ModalStoreProvider } from "~/app/_providers/modal-store-provider";
import { PlaylistViewProvider } from "~/modules/playlist/context/playlist-view-context";
import { EditPlaylistModal } from "~/modules/playlist/modals/edit-playlist-modal";
import { PlaylistView } from "~/modules/playlist/views/playlist-view";
import { caller, getQueryClient, trpc } from "~/shared/lib/trpc/server";

export default async function PlaylistPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const queryClient = getQueryClient();
  const dehydratedState = dehydrate(queryClient);

  const initialData = await caller.playlist.getById({ id }).catch(() => null);
  if (!initialData) notFound();

  await Promise.all([
    queryClient.prefetchQuery(
      trpc.playlist.getById.queryOptions({ id }, { initialData }),
    ),
    queryClient.prefetchInfiniteQuery(
      trpc.playlist.getTracks.infiniteQueryOptions({
        playlistId: id,
        limit: 50,
      }),
    ),
  ]);

  return (
    <HydrationBoundary state={dehydratedState}>
      <PlaylistViewProvider playlistId={id}>
        <ModalStoreProvider>
          <PlaylistView />
          <EditPlaylistModal />
        </ModalStoreProvider>
      </PlaylistViewProvider>
    </HydrationBoundary>
  );
}
