"use client";

import Link from "next/link";
import { ChevronRight, Heart, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EpisodeEndActionsProps {
  slug: string;
  currentEpisode: number;
  hasNextEpisode: boolean;
}

export const EpisodeEndActions = ({
  slug,
  currentEpisode,
  hasNextEpisode,
}: EpisodeEndActionsProps) => {
  return (
    <div className="bg-background py-8 border-t border-border">
      <div className="container mx-auto px-4 max-w-xl">
        <div className="text-center space-y-4">
          <h3 className="text-lg font-semibold">
            End of Episode {currentEpisode}
          </h3>
          <div className="flex gap-4 justify-center">
            <Button variant="outline" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Like
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Comment
            </Button>
          </div>
          {hasNextEpisode && (
            <div className="pt-4">
              <Link href={`/comic/${slug}/episode/${currentEpisode + 1}`}>
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
