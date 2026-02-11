"use client";

import { useState, useCallback, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import ComicCard from "./ComicCard";
import { comics } from "@/data/mockData";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";

const trendingComics = comics.map((comic, index) => ({
  ...comic,
  rankChange: [2, 7, -2, 21, 2, -2, 1][index % 7],
  isNew: index === 0,
}));

const popularComics = [...comics].reverse().map((comic, index) => ({
  ...comic,
  rankChange: [0, 1, -1, 3, 0, 2, -1][index % 7],
  isNew: index === 3,
}));

const TrendingSection = () => {
  const [activeTab, setActiveTab] = useState<"trending" | "popular">(
    "trending",
  );
  
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback((emblaApi: any) => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  const displayComics =
    activeTab === "trending" ? trendingComics : popularComics;

  return (
    <section className="py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Trending & Popular</h2>
        <a href="#" className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
          View all
          <ChevronRight className="w-4 h-4" />
        </a>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab("trending")}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
            activeTab === "trending" 
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          Trending
        </button>
        <button
          onClick={() => setActiveTab("popular")}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
            activeTab === "popular" 
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          Popular
        </button>
      </div>

      {/* Carousel */}
      <div className="relative group">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {displayComics.map((comic, index) => (
              <div key={comic.id} className="flex-none w-[calc(50%-8px)] sm:w-[calc(33.333%-10.666px)] lg:w-[calc(25%-12px)]">
                <ComicCard
                  rank={index + 1}
                  title={comic.title}
                  genre={comic.genre}
                  image={comic.image}
                  rankChange={comic.rankChange}
                  isNew={comic.isNew}
                  slug={comic.slug}
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        {prevBtnEnabled && (
          <Button
            variant="secondary"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-opacity z-10 hidden sm:flex"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        )}
        {nextBtnEnabled && (
          <Button
            variant="secondary"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-opacity z-10 hidden sm:flex"
            onClick={scrollNext}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        )}
      </div>
    </section>
  );
};

export default TrendingSection;
