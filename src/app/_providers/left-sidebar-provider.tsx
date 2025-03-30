"use client";

import type { PropsWithChildren } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const SIDEBAR_COOKIE_NAME = "left-sidebar-state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH_EXPANDED = 280;
const SIDEBAR_WIDTH_COLLAPSED = 72;

interface LeftSidebarContext {
  state: "expanded" | "collapsed";
  open: boolean;
  width: number;
  setOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

const LeftSidebarContext = createContext<LeftSidebarContext | null>(null);

export function useLeftSidebar() {
  const context = useContext(LeftSidebarContext);
  if (!context) {
    throw new Error(
      "useLeftSidebar must be used within a LeftSidebarProvider.",
    );
  }

  return context;
}

export function LeftSidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  children,
}: PropsWithChildren & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [_open, _setOpen] = useState(defaultOpen);

  const open = openProp ?? _open;
  const state = open ? "expanded" : "collapsed";
  const width = open ? SIDEBAR_WIDTH_EXPANDED : SIDEBAR_WIDTH_COLLAPSED;

  const setOpen = useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }
    },
    [setOpenProp, open],
  );

  useEffect(() => {
    document.cookie = `${SIDEBAR_COOKIE_NAME}=${open}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
  }, [open]);

  const toggleSidebar = useCallback(() => {
    setOpen((open) => !open);
  }, [setOpen]);

  const contextValue = useMemo<LeftSidebarContext>(
    () => ({
      state,
      open,
      width,
      setOpen,
      toggleSidebar,
    }),
    [state, open, width, setOpen, toggleSidebar],
  );

  return (
    <LeftSidebarContext.Provider value={contextValue}>
      {children}
    </LeftSidebarContext.Provider>
  );
}
