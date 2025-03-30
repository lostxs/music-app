"use client";

import { Suspense } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

import {
  TopBar,
  TopBarBackground,
  TopBarContent,
  TopBarContentWrapper,
} from "~/shared/components/top-bar";
import { useTRPC } from "~/shared/lib/trpc/client";
import { usePlaylistView } from "../context/playlist-view-context";

export function PlaylistTopBar({
  topBarBackgroundRef,
  topBarContentRef,
}: {
  topBarBackgroundRef?: React.RefObject<HTMLDivElement | null>;
  topBarContentRef?: React.RefObject<HTMLDivElement | null>;
}) {
  const { playlistId } = usePlaylistView();
  const trpc = useTRPC();

  const { data: playlist } = useSuspenseQuery(
    trpc.playlist.getById.queryOptions({ id: playlistId }),
  );

  return (
    <TopBar>
      <ErrorBoundary fallback={<PlaylistTopBarSkeleton />}>
        <Suspense fallback={<PlaylistTopBarSkeleton />}>
          <TopBarBackground
            ref={topBarBackgroundRef}
            backgroundColor={playlist.extractedColor ?? undefined}
          />
          <div className="contentSpacing mx-auto flex items-center justify-between gap-2 whitespace-nowrap">
            <TopBarContentWrapper>
              <TopBarContent ref={topBarContentRef}>
                <span className="line-clamp-1 overflow-hidden text-2xl font-bold text-ellipsis">
                  {playlist.title}
                </span>
              </TopBarContent>
            </TopBarContentWrapper>
          </div>
        </Suspense>
      </ErrorBoundary>
    </TopBar>
  );
}

function PlaylistTopBarSkeleton() {
  return (
    <TopBar>
      <TopBarBackground />
    </TopBar>
  );
}
