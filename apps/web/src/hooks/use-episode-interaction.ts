"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

export const useEpisodeInteraction = (comicSlug: string, episodeId: string) => {
  const [isLiked, setIsLiked] = useState(false);
  
  // Create a unique key for localStorage
  const likeKey = `like_${comicSlug}_${episodeId}`;

  useEffect(() => {
    // Check initial state from localStorage
    const savedLike = localStorage.getItem(likeKey) === "true";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLiked((prev) => (prev !== savedLike ? savedLike : prev));
  }, [likeKey]);

  const toggleLike = () => {
    const newState = !isLiked;
    setIsLiked(newState);
    
    if (newState) {
      localStorage.setItem(likeKey, "true");
      toast.success("Added to Liked Episodes! ❤️");
    } else {
      localStorage.removeItem(likeKey);
      toast.info("Removed from Liked Episodes");
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    const title = document.title;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: `Check out this episode on 4HumAI!`,
          url,
        });
        toast.success("Shared successfully!");
      } catch (error) {
        // Ignore abort errors (user cancelled share)
        if ((error as Error).name !== 'AbortError') {
          console.error("Error sharing:", error);
          copyToClipboard(url);
        }
      }
    } else {
      copyToClipboard(url);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Link copied to clipboard! 📋");
    }).catch(() => {
      toast.error("Failed to copy link");
    });
  };

  return {
    isLiked,
    toggleLike,
    handleShare
  };
};
