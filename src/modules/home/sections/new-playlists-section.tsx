"use client";

import type { CSSProperties } from "react";

import { cn } from "~/shared/lib/utils";
import { Carousel, CarouselContent, CarouselNavigation } from "../ui/carousel";
import { PlaylistCard } from "../ui/playlist-card";
import { SectionHeader } from "../ui/section-header";

export function NewPlaylistsSection() {
  return (
    <section
      className={cn(
        "flex min-w-full flex-[0_1_auto] flex-col",
        "data-[shelf=carousel]:[--shelf-carousel-margin-end-mul:-1] data-[shelf=carousel]:[--shelf-carousel-margin-start-mul:-1]",
      )}
      data-shelf="carousel"
      style={
        {
          "--carousel-shelf-element-width":
            "calc(var(--content-max-width) / var(--regular-shelf-max-count))",
          "--carousel-shelf-min-items": "1.5",
        } as CSSProperties
      }
    >
      <SectionHeader title="Новые плейлисты" href="/playlists" />

      {/* Carousel */}
      <Carousel>
        <CarouselContent>
          {Array.from({ length: 12 }).map((_, index) => (
            <PlaylistCard
              key={index}
              className="w-(--carousel-shelf-element-width) snap-start"
            />
          ))}
        </CarouselContent>
        <CarouselNavigation />
      </Carousel>
    </section>
  );
}
