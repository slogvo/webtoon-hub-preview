"use client";

import { useState, useEffect } from "react";

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(null);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > prevScrollY ? "down" : "up";

      if (
        direction !== scrollDirection &&
        Math.abs(currentScrollY - prevScrollY) > 10 // Threshold to avoid jitter
      ) {
        setScrollDirection(direction);
      }

      // Hide if scrolling down and not at the top
      // Show if scrolling up or at the top
      if (currentScrollY < 50) {
         setIsVisible(true);
      } else if (direction === "down") {
         setIsVisible(false);
      } else if (direction === "up") {
         setIsVisible(true);
      }

      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollDirection, prevScrollY]);

  return { scrollDirection, isVisible };
}
