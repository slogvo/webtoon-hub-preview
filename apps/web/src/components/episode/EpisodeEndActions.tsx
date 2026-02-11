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
            <Link href={`/comic/${slug}/episode/${currentEpisode + 1}`}>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Next Episode
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
