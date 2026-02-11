"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export function useScrollDirection() {
  const [isVisible, setIsVisible] = useState(true);
  
  // Use refs for tracking scroll state to avoid re-renders on every scroll event
  const prevScrollY = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Auto-hide after 3 seconds of inactivity (reduced from 5s for better UX)
    timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
    }, 3000);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > prevScrollY.current ? "down" : "up";

      // Threshold to avoid jitter on small scroll movements
      if (Math.abs(currentScrollY - prevScrollY.current) > 10) {
        if (currentScrollY < 50) {
           // At top, always show
           setIsVisible(true);
           if (timeoutRef.current) clearTimeout(timeoutRef.current);
        } else if (direction === "down") {
           // Scrolling down, hide immediately
           setIsVisible(false);
           if (timeoutRef.current) clearTimeout(timeoutRef.current);
        } else if (direction === "up") {
           // Scrolling up, show temporarily
           setIsVisible(true);
           // Start/Reset idle timer
           resetTimer();
        }
      }

      prevScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [resetTimer]); // Dependency array minimal, won't re-run on scroll

  return { isVisible };
}
