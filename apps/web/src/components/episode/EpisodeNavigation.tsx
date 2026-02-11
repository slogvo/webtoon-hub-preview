"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EpisodeNavigationProps {
  slug: string;
  currentEpisodeTitle: string;
  currentEpisodeNumber: number;
  totalEpisodes: number;
  prevEpisodeId: string | null;
  nextEpisodeId: string | null;
}

export const EpisodeNavigation = ({
  slug,
  currentEpisodeNumber,
  totalEpisodes,
  prevEpisodeId,
  nextEpisodeId,
}: Omit<EpisodeNavigationProps, "currentEpisodeTitle">) => {
  return (
    <div className="sticky bottom-0 bg-background border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {prevEpisodeId ? (
            <Link href={`/comic/${slug}/episode/${prevEpisodeId}`}>
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

          <div className="flex items-center gap-4 text-center">
            <span className="text-sm font-medium">
              Episode {currentEpisodeNumber} of {totalEpisodes}
            </span>
          </div>

          {nextEpisodeId ? (
            <Link href={`/comic/${slug}/episode/${nextEpisodeId}`}>
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
