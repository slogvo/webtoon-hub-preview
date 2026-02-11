"use client";

import { useState, useEffect } from "react";

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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-panel-index") || "1", 10);
            setCurrentIndex(index);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the panel is visible
        rootMargin: "-20% 0px -70% 0px", // Focus on the upper center area of the viewport
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
    <div className="fixed bottom-20 right-6 z-50 flex items-center justify-center pointer-events-none">
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
