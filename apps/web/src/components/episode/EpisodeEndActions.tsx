"use client";

import Link from "next/link";
import { ChevronRight, Heart, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EpisodeEndActionsProps {
  slug: string;
  currentEpisodeNumber: number;
  nextEpisodeId: string | null;
}

export const EpisodeEndActions = ({
  slug,
  currentEpisodeNumber,
  nextEpisodeId,
}: EpisodeEndActionsProps) => {
  return (
    <div className="bg-background py-8 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4">
          <h3 className="text-lg font-semibold">
            End of Episode {currentEpisodeNumber}
          </h3>
          <div className="flex gap-4 justify-center">
            <Button variant="outline" className="flex items-center gap-2 font-semibold">
              <Heart className="w-4 h-4" />
              Like
            </Button>
            <Button variant="outline" className="flex items-center gap-2 font-semibold">
              <MessageSquare className="w-4 h-4" />
              Comment
            </Button>
          </div>
          {nextEpisodeId && (
            <div className="pt-4">
              <Link href={`/comic/${slug}/episode/${nextEpisodeId}`}>
                <Button className="px-10 h-12 text-base font-bold bg-primary text-primary-foreground hover:bg-primary/90 rounded-full shadow-lg shadow-primary/20">
                  Next Episode
                  <ChevronRight className="w-5 h-5 ml-1" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
