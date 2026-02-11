"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { cn } from "@/lib/utils";

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
  const { isVisible } = useScrollDirection();

  return (
    <div 
      className={cn(
        "sticky bottom-0 bg-background border-t border-border transition-transform duration-300 ease-in-out z-40",
        !isVisible && "translate-y-full"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center h-16">
          {/* Previous Button (Left) */}
          <div className="flex justify-start">
            {prevEpisodeId ? (
              <Link href={`/comic/${slug}/episode/${prevEpisodeId}`}>
                <Button variant="ghost" className="flex items-center gap-2 pl-2">
                  <ChevronLeft className="w-5 h-5" />
                  <span className="hidden sm:inline">Previous</span>
                </Button>
              </Link>
            ) : (
              <Button
                variant="ghost"
                disabled
                className="flex items-center gap-2 pl-2 opacity-50"
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Previous</span>
              </Button>
            )}
          </div>

          {/* Episode Info (Center on Desktop, Hidden on Mobile if needed, or repurposed) */}
          <div className="flex justify-center">
             {/* On mobile, we want the Next button here if we strictly follow "Center Next Button".
                 But usually, centering the Next button means it takes prominence.
                 Let's try a hybrid approach:
                 - Mobile: Next Button is in the center column. Info hidden?
                 - Desktop: Info is in center. Buttons are sides.
                 
                 WAIT: The user said "Center Next Episode button on Mobile/Tablet". 
                 So on Mobile: Prev (Left), Next (Center), Info (Hidden/?).
              */}
              
               {/* Mobile: Next Button Center */}
               <div className="sm:hidden w-full flex justify-center">
                  {nextEpisodeId ? (
                    <Link href={`/comic/${slug}/episode/${nextEpisodeId}`} className="w-full max-w-[140px]">
                      <Button className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground">
                        <span>Next</span>
                        <ChevronRight className="w-5 h-5" />
                      </Button>
                    </Link>
                  ) : (
                     <Button disabled className="w-full max-w-[140px] opacity-50">
                        <span>End</span>
                     </Button>
                  )}
               </div>

               {/* Desktop: Info Text */}
               <div className="hidden sm:flex items-center gap-4 text-center">
                 <span className="text-sm font-medium">
                   Episode {currentEpisodeNumber} of {totalEpisodes}
                 </span>
               </div>
          </div>

          {/* Next Button (Right on Desktop, Empty on Mobile) */}
          <div className="flex justify-end">
             <div className="sm:hidden">
                {/* Mobile: Maybe Info Icon or List Icon? Or just empty to balance grid */}
                <div className="w-10" /> 
             </div>

             <div className="hidden sm:block">
                {nextEpisodeId ? (
                  <Link href={`/comic/${slug}/episode/${nextEpisodeId}`}>
                    <Button variant="ghost" className="flex items-center gap-2 pr-2">
                      <span className="hidden sm:inline">Next</span>
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </Link>
                ) : (
                  <Button
                    variant="ghost"
                    disabled
                    className="flex items-center gap-2 pr-2 opacity-50"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
