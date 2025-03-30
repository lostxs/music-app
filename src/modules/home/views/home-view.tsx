import { MainViewContainer } from "~/shared/components/main-view-container";
import { Scrollbars } from "~/shared/components/scrollbars";
import { cn } from "~/shared/lib/utils";
import { NewPlaylistsSection } from "../sections/new-playlists-section";

export function HomeView() {
  return (
    <div className="relative min-h-0 flex-1">
      <Scrollbars className="h-full">
        <MainViewContainer>
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
            <section className="@container/homepage isolate pt-1 [--home-full-width:100cqi]">
              <div
                className={cn(
                  "contentSpacing mx-auto flex flex-wrap gap-x-6 gap-y-(--shelf-gap-vertical) px-10 [--shelf-gap-vertical:24px]",
                  "@max-[1024px]/main-view-grid-area:[--regular-shelf-max-count:11] @max-[1024px]/main-view-grid-area:[--shelf-gap-vertical:16px]",
                  "@max-[2300px]/main-view-grid-area:[--regular-shelf-max-count:10]",
                )}
              >
                <NewPlaylistsSection />
                {/* Other sections.. */}
              </div>
            </section>
          </main>
        </MainViewContainer>
      </Scrollbars>
    </div>
  );
}
