"use client";

import { useState, useEffect } from "react";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { cn } from "@/lib/utils";

interface ReadingProgressProps {
  panelsCount: number;
  seriesId: string;
  episodeId: string;
}

export const ReadingProgress = ({
  panelsCount,
  seriesId,
  episodeId,
}: ReadingProgressProps) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const storageKey = `reading-progress:${seriesId}:${episodeId}`;
  const { isVisible } = useScrollDirection();

  // 1. Initial Load & Scroll
  useEffect(() => {
    const savedIndex = localStorage.getItem(storageKey);
    if (savedIndex) {
      const index = parseInt(savedIndex, 10);
      if (!isNaN(index) && index > 1) {
        // Find the panel element and scroll to it
        const element = document.getElementById(`panel-${index - 1}`);
        if (element) {
          element.scrollIntoView({ behavior: "instant", block: "start" });
        }
      }
    }
  }, [storageKey]);

  // 2. Track Visibility
  useEffect(() => {
    // We use a "Center Line" strategy. 
    // rootMargin values shrink the viewport bounding box.
    // '-50% 0px -50% 0px' creates a 0px high line exactly in the middle of the viewport.
    // Any panel crossing this line is considered "active".
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry that is intersecting and closest to the center? 
        // Actually with a 0px line, usually only 1 intersects. 
        // If 2 intersect (exact border), we pick the one with higher ID? Or just the first one.
        
        // Better yet: keep track of all intersecting panels in a Set/Map if needed, 
        // but for a simple "current page", usually just taking the intersecting one works.
        // We filter for isIntersecting=true.
        const visibleEntries = entries.filter(e => e.isIntersecting);
        
        if (visibleEntries.length > 0) {
          // If multiple intersect (rare with 0px line but possible if gaps are negative?), 
          // we can sort by intersection ratio or just pick the first.
          // Let's pick the one with the smallest index to be safe (top-most).
          // Actually, if scrolling down, the incoming one is usually desired.
          
          // Let's just grab the last one in the list or sort. 
          // Sorting by index ensures stability.
          const sorted = visibleEntries.map(e => ({
            entry: e,
            index: parseInt(e.target.getAttribute("data-panel-index") || "0", 10)
          })).sort((a, b) => a.index - b.index);

          // The problem usually is that 'entries' contains ALL changes. 
          // A panel leaving (-50%) and a panel entering (-50%).
          // We only care about isIntersecting=true (entering/staying).
          
          // Let's iterate and update.
          // Since we want the "current" one, we can just take the first visible one.
          if (sorted.length > 0) {
             setCurrentIndex(sorted[0].index);
          }
        }
      },
      {
        threshold: 0, 
        rootMargin: "-50% 0px -50% 0px", // Strict center line
      }
    );

    const panels = document.querySelectorAll("[data-panel-index]");
    panels.forEach((p) => observer.observe(p));

    return () => observer.disconnect();
  }, []);

  // 3. Save Progress
  useEffect(() => {
    if (currentIndex > 1) {
      localStorage.setItem(storageKey, currentIndex.toString());
    }
  }, [currentIndex, storageKey]);

  return (
    <div 
      className={cn(
        "fixed bottom-20 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-6 z-50 flex items-center justify-center pointer-events-none transition-transform duration-300 ease-in-out",
         !isVisible && "translate-y-32"
      )}
    >
      <div className="bg-background/80 backdrop-blur-md border border-border shadow-lg px-4 py-2 rounded-full text-xs font-semibold tabular-nums text-foreground/80 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <span className="text-primary">{currentIndex}</span>
        <span className="opacity-40">/</span>
        <span>{panelsCount}</span>
        <div className="ml-2 w-16 h-1 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${(currentIndex / panelsCount) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
