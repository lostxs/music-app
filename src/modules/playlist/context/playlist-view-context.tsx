"use client";

import type { OverlayScrollbars } from "overlayscrollbars";
import type { PropsWithChildren } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface PlaylistViewContextValue {
  playlistId: string;
  topBarBackgroundRef: React.RefObject<HTMLDivElement | null>;
  topBarContentRef: React.RefObject<HTMLDivElement | null>;
  fluidContainerRef: React.RefObject<HTMLDivElement | null>;
  handleScroll: (instance: OverlayScrollbars) => void;
  handleInitialized: () => void;
}

export const PlaylistViewContext =
  createContext<PlaylistViewContextValue | null>(null);

export function PlaylistViewProvider({
  children,
  playlistId,
}: PropsWithChildren<{ playlistId: string }>) {
  const [isScrollInitialized, setIsScrollInitialized] = useState(false);
  const topBarBackgroundRef = useRef<HTMLDivElement>(null);
  const topBarContentRef = useRef<HTMLDivElement>(null);
  const fluidContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback((instance: OverlayScrollbars) => {
    const update = () => {
      const viewport = instance.elements().viewport;
      const opacity = Math.min(viewport.scrollTop / 200, 1);
      topBarBackgroundRef.current?.style.setProperty(
        "opacity",
        String(opacity),
      );
    };
    requestAnimationFrame(update);
  }, []);

  const handleInitialized = useCallback(() => {
    setIsScrollInitialized(true);
  }, []);

  useLayoutEffect(() => {
    if (!isScrollInitialized) return;

    const fluidContainerNode = fluidContainerRef.current;
    const topBarContentNode = topBarContentRef.current;
    if (!fluidContainerNode || !topBarContentNode) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        topBarContentNode.style.setProperty(
          "opacity",
          isIntersecting ? "0" : "1",
        );
        topBarContentNode.style.setProperty(
          "pointer-events",
          isIntersecting ? "none" : "auto",
        );
      },
      { threshold: 0.1 },
    );

    observer.observe(fluidContainerNode);

    return () => observer.disconnect();
  }, [isScrollInitialized]);

  const contextValue = useMemo<PlaylistViewContextValue>(
    () => ({
      playlistId,
      topBarBackgroundRef,
      topBarContentRef,
      fluidContainerRef,
      handleScroll,
      handleInitialized,
    }),
    [
      handleInitialized,
      handleScroll,
      fluidContainerRef,
      playlistId,
      topBarBackgroundRef,
      topBarContentRef,
    ],
  );

  return (
    <PlaylistViewContext.Provider value={contextValue}>
      {children}
    </PlaylistViewContext.Provider>
  );
}

export function usePlaylistView() {
  const context = useContext(PlaylistViewContext);
  if (!context) {
    throw new Error(
      "usePlaylistView must be used within a PlaylistViewProvider",
    );
  }

  return context;
}
