"use client";

import { useMemo } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { ActionBar } from "~/shared/components/action-bar";
import { FluidContainer } from "~/shared/components/fluid-container";
import { MainViewContainer } from "~/shared/components/main-view-container";
import { Scrollbars } from "~/shared/components/scrollbars";
import { useTRPC } from "~/shared/lib/trpc/client";
import { usePlaylistView } from "../context/playlist-view-context";
import { BannerSection } from "../sections/banner-section";
// import { TrackListSection } from "../sections/track-list-section";
import { PlaylistTopBar } from "../ui/playlist-top-bar";

export function PlaylistView() {
  const {
    handleScroll,
    handleInitialized,
    topBarBackgroundRef,
    topBarContentRef,
    fluidContainerRef,
  } = usePlaylistView();

  const scrollEvents = useMemo(
    () => ({
      scroll: handleScroll,
      initialized: () => {
        console.log("initialized");
        handleInitialized();
      },
    }),
    [handleScroll, handleInitialized],
  );

  const trpc = useTRPC();
  const { playlistId } = usePlaylistView();
  const { data: playlist } = useSuspenseQuery(
    trpc.playlist.getById.queryOptions({ id: playlistId }),
  );

  return (
    <>
      <PlaylistTopBar
        topBarBackgroundRef={topBarBackgroundRef}
        topBarContentRef={topBarContentRef}
      />
      <div className="relative min-h-0 flex-1">
        <Scrollbars className="h-full" events={scrollEvents}>
          <MainViewContainer>
            <section role="presentation">
              <FluidContainer ref={fluidContainerRef}>
                <BannerSection />
              </FluidContainer>
              <div className="bg-background-panel isolate">
                <div
                  style={{
                    backgroundColor:
                      playlist.extractedColor ?? "var(--background)",
                  }}
                  className="from-background/60 to-background-panel absolute -z-1 h-60 w-full bg-gradient-to-b"
                />
                <Scrollbars>
                  <ActionBar />
                </Scrollbars>
                <div className="contentSpacing mx-auto">
                  {/* <TrackListSection /> */}
                </div>
              </div>
            </section>
          </MainViewContainer>
        </Scrollbars>
      </div>
    </>
  );
}
