"use client";

import type { CSSProperties } from "react";
import {
  createContext,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "~/shared/lib/utils";

interface CarouselContextProps {
  carouselRef: React.RefObject<HTMLDivElement | null>;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
}

const CarouselContext = createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

export function Carousel({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const scrollPrev = () => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({ left: -100, behavior: "smooth" });
  };

  const scrollNext = () => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({ left: 100, behavior: "smooth" });
  };

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollPrev(scrollLeft > 0);
    setCanScrollNext(scrollLeft + clientWidth < scrollWidth);
  };

  useLayoutEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("scroll", handleScroll);
      handleScroll(); // Инициализация состояния кнопок
    }
    return () => {
      if (carousel) {
        carousel.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        canScrollPrev,
        canScrollNext,
        scrollPrev,
        scrollNext,
      }}
    >
      <div
        role="region"
        className={cn(
          "group/carousel relative ms-(--margin-start) me-(--margin-end) overflow-hidden before:opacity-0 after:opacity-0",
          canScrollPrev &&
            "before:from-background-panel before:pointer-events-none before:absolute before:[inset-inline-start:0] before:top-0 before:bottom-0 before:z-2 before:h-full before:w-32 before:bg-gradient-to-r before:to-transparent before:opacity-100 before:transition-opacity before:duration-500",
          canScrollNext &&
            "after:from-background-panel after:pointer-events-none after:absolute after:[inset-inline-end:0] after:top-0 after:bottom-0 after:z-2 after:h-full after:w-32 after:bg-gradient-to-l after:to-transparent after:opacity-100 after:transition-opacity after:duration-500",
          className,
        )}
        style={
          {
            "--encore-cards-margin": "-12px",
            "--margin":
              "calc(40px + var(--encore-cards-margin) + max(0px, (var(--home-full-width) - var(--content-max-width))* 0.5))",
            "--margin-start":
              "calc(var(--encore-cards-margin) + var(--shelf-carousel-margin-start-mul, 0)* var(--margin))",
            "--margin-end":
              "calc(var(--encore-cards-margin) + var(--shelf-carousel-margin-end-mul, 0)* var(--margin))",
          } as CSSProperties
        }
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

export function CarouselContent({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const { carouselRef } = useCarousel();

  return (
    <div
      ref={carouselRef}
      role="list"
      className="flex w-auto min-w-full snap-x snap-mandatory scroll-p-[0px_var(--margin,_0px)] items-center overflow-x-scroll overscroll-x-contain scroll-smooth whitespace-nowrap will-change-transform"
      style={{
        scrollbarWidth: "none",
      }}
    >
      <div
        role="presentation"
        className={cn(
          "grid grid-flow-col grid-rows-1 ps-[calc((var(--margin-start)-var(--encore-cards-margin))*-1)]",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}

export function CarouselNavigation({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } =
    useCarousel();

  return (
    <div
      className={cn(
        "pointer-events-none absolute top-0 right-2 bottom-0 left-2 flex justify-between",
        className,
      )}
      {...props}
    >
      <button
        className={cn(
          "bg-background pointer-events-none relative top-1/2 z-3 -mt-4 flex size-8 items-center justify-center rounded-full opacity-0 transition-all",
          canScrollPrev &&
            "pointer-events-auto group-hover/carousel:translate-x-2 group-hover/carousel:opacity-100",
        )}
        onClick={scrollPrev}
        disabled={!canScrollPrev}
      >
        <ChevronLeft />
      </button>
      <button
        className={cn(
          "bg-background pointer-events-none relative top-1/2 z-3 -mt-4 flex size-8 items-center justify-center rounded-full opacity-0 transition-all",
          canScrollNext &&
            "pointer-events-auto group-hover/carousel:-translate-x-2 group-hover/carousel:opacity-100",
        )}
        onClick={scrollNext}
        disabled={!canScrollNext}
      >
        <ChevronRight />
      </button>
    </div>
  );
}
