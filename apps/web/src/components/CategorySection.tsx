"use client";

import { useState, useCallback, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { SeriesIndex } from "@/lib/bucket/types";
import ComicCard from "./ComicCard";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";

const categories = [
  "Adventure",
  "Comedy",
  "Crime",
  "Drama",
  "Mystery",
  "Thriller",
  "Fantasy",
  "Action",
  "Slice of life",
];

const CategorySection = ({ series }: { series: SeriesIndex["series"] }) => {
  const [activeCategory, setActiveCategory] = useState("Adventure");
  
  const categoryComics = series
    .filter(item => item.genres.includes(activeCategory))
    .map((item, index) => ({
      ...item,
      isNew: index % 3 === 1,
    })).slice(0, 12);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 2,
    containScroll: "trimSnaps",
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback((emblaApi: any) => {
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    
    // Defer initialization to avoid synchronous setState inside effect
    Promise.resolve().then(() => onSelect(emblaApi));

    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("reInit", onSelect);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect, activeCategory]); // Reset on category change

  return (
    <section className="py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Browse by Category</h2>
        <a href="#" className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
          View all
          <ChevronRight className="w-4 h-4" />
        </a>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              activeCategory === category 
                ? "bg-foreground text-background" 
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Carousel */}
      <div className="relative group">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {categoryComics.map((item, index) => (
              <div key={item.id} className="flex-none w-[calc(50%-8px)] sm:w-[calc(33.333%-10.666px)] lg:w-[calc(16.666%-13.333px)]">
                <ComicCard
                  title={item.title || item.id.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                  genres={item.genres}
                  cover={item.cover}
                  id={item.id}
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

export default CategorySection;
