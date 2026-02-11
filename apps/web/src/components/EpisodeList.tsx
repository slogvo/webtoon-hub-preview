import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Episode } from "@/data/mockData";
import { format } from "date-fns";

interface EpisodeListProps {
  episodes: Episode[];
  comicSlug: string;
}

const EpisodeList = ({ episodes, comicSlug }: EpisodeListProps) => {
  return (
    <div className="space-y-0">
      {episodes.map((episode) => (
        <Link
          key={episode.id}
          href={`/comic/${comicSlug}/episode/${episode.number}`}
          className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors border-b border-border group"
        >
          {/* Thumbnail */}
          <div className="flex-shrink-0 w-20 h-14 rounded overflow-hidden relative">
            <Image
              src={episode.thumbnail}
              alt={episode.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform"
            />
          </div>

          {/* Info */}
          <div className="flex-grow min-w-0">
            <h3 className="font-medium text-foreground truncate">
              Ep. {episode.number} - {episode.title}
            </h3>
          </div>

          {/* Meta */}
          <div className="flex-shrink-0 text-right">
            <p className="text-sm text-muted-foreground">
              {episode.date.includes('T') ? format(new Date(episode.date), "MMM dd, yyyy") : episode.date}
            </p>
            <div className="flex items-center justify-end gap-1 text-sm text-muted-foreground mt-1">
              <Heart className="w-3 h-3" />
              <span>{episode.likes.toLocaleString()}</span>
            </div>
          </div>

          {/* Episode Number */}
          <div className="flex-shrink-0 text-muted-foreground font-medium">
            #{episode.number}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default EpisodeList;
