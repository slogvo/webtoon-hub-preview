"use client";

import Link from "next/link";
import { ArrowLeft, Heart, MessageSquare, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Comic, Episode } from "@/data/mockData";

interface EpisodeHeaderProps {
  slug: string;
  comic: Comic;
  episode: Episode;
}

export const EpisodeHeader = ({ slug, comic, episode }: EpisodeHeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Left */}
          <div className="flex items-center gap-4">
            <Link
              href={`/comic/${slug}`}
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="font-semibold text-sm truncate max-w-[200px] md:max-w-none">
                {comic.title}
              </h1>
              <p className="text-xs text-muted-foreground">
                Ep. {episode.number} - {episode.title}
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Heart className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MessageSquare className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
