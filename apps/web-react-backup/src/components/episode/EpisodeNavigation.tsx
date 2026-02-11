import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EpisodeNavigationProps {
  currentEpisode: number;
  totalEpisodes: number;
  hasPrevEpisode: boolean;
  hasNextEpisode: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export const EpisodeNavigation = ({
  currentEpisode,
  totalEpisodes,
  hasPrevEpisode,
  hasNextEpisode,
  onPrev,
  onNext,
}: EpisodeNavigationProps) => {
  return (
    <div className="sticky bottom-0 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Button
            variant="ghost"
            onClick={onPrev}
            disabled={!hasPrevEpisode}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Previous</span>
          </Button>

          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">
              Episode {currentEpisode} of {totalEpisodes}
            </span>
          </div>

          <Button
            variant="ghost"
            onClick={onNext}
            disabled={!hasNextEpisode}
            className="flex items-center gap-2"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
