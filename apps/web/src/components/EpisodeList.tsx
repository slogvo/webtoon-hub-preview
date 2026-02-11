import Link from "next/link";
import { Heart } from "lucide-react";
import { format, parseISO } from "date-fns";
import { SmartImage } from "./SmartImage";

export interface EpisodeListItem {
  id: string;
  title: string;
  number: number;
  date: string;
  thumbnail: string;
  likes: number;
}

interface EpisodeListProps {
  episodes: EpisodeListItem[];
  comicId: string;
}

const EpisodeList = ({ episodes, comicId }: EpisodeListProps) => {
  return (
    <div className="space-y-0">
      {episodes.map((episode) => (
        <Link
          key={episode.id}
          href={`/comic/${comicId}/episode/${episode.id}`}
          className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors border-b border-border group"
        >
          {/* Thumbnail */}
          <div className="shrink-0 w-20 h-14 rounded overflow-hidden relative bg-muted">
            <SmartImage
              src={episode.thumbnail}
              alt={episode.title}
              fill
              sizes="80px"
              className="object-cover group-hover:scale-105 transition-transform"
              unoptimized
            />
          </div>

          {/* Info */}
          <div className="grow min-w-0">
            <h3 className="font-medium text-foreground truncate">
              {episode.title}
            </h3>
          </div>

          {/* Meta */}
          <div className="shrink-0 text-right">
            <p className="text-sm text-muted-foreground">
              {episode.date ? format(parseISO(episode.date), "MMM dd, yyyy") : "N/A"}
            </p>
            <div className="flex items-center justify-end gap-1 text-sm text-muted-foreground mt-1">
              <Heart className="w-3 h-3" />
              <span>{episode.likes.toLocaleString()}</span>
            </div>
          </div>

          {/* Episode Number */}
          <div className="shrink-0 text-muted-foreground font-medium">
            #{episode.number}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default EpisodeList;
