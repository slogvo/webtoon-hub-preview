"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EpisodeNavigationProps {
  slug: string;
  currentEpisode: number;
  totalEpisodes: number;
  hasPrevEpisode: boolean;
  hasNextEpisode: boolean;
}

export const EpisodeNavigation = ({
  slug,
  currentEpisode,
  totalEpisodes,
  hasPrevEpisode,
  hasNextEpisode,
}: EpisodeNavigationProps) => {
  return (
    <div className="sticky bottom-0 bg-background border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {hasPrevEpisode ? (
            <Link href={`/comic/${slug}/episode/${currentEpisode - 1}`}>
              <Button variant="ghost" className="flex items-center gap-2">
                <ChevronLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Previous</span>
              </Button>
            </Link>
          ) : (
            <Button
              variant="ghost"
              disabled
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Previous</span>
            </Button>
          )}

          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">
              Episode {currentEpisode} of {totalEpisodes}
            </span>
          </div>

          {hasNextEpisode ? (
            <Link href={`/comic/${slug}/episode/${currentEpisode + 1}`}>
              <Button variant="ghost" className="flex items-center gap-2">
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-5 h-5" />
              </Button>
            </Link>
          ) : (
            <Button
              variant="ghost"
              disabled
              className="flex items-center gap-2"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
