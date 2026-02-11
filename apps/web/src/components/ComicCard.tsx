import Link from "next/link";
import { ArrowUp, ArrowDown } from "lucide-react";

import { AssetClient } from "@/lib/bucket/client";
import { SmartImage } from "./SmartImage";

interface ComicCardProps {
  rank?: number;
  title: string;
  genres: string[];
  cover: string;
  rankChange?: number;
  isNew?: boolean;
  id?: string;
  priority?: boolean;
}

const ComicCard = ({
  rank,
  title,
  genres,
  cover,
  rankChange,
  isNew,
  id,
  priority,
}: ComicCardProps) => {
  const imageUrl = typeof cover === "string" ? AssetClient.getImageUrl(cover) : cover;
  const genreLabel = genres && genres.length > 0 ? genres[0] : "";
  const content = (
    <>
      <div className="relative">
        <SmartImage
          src={imageUrl}
          alt={title}
          width={176}
          height={235}
          className="comic-card-image rounded-lg object-cover aspect-3/4"
          priority={priority}
          unoptimized
        />

        {isNew && <span className="new-badge">New Episode</span>}

        {rank && <span className="rank-number">{rank}</span>}
      </div>

      <div className="mt-2">
        <div className="flex items-center gap-1">
          <h3 className="font-semibold text-sm text-foreground truncate">
            {title}
          </h3>
          {rankChange !== undefined && rankChange !== 0 && (
            <span
              className={`rank-change flex items-center ${rankChange > 0 ? "rank-up" : "rank-down"}`}
            >
              {rankChange > 0 ? (
                <>
                  <ArrowUp className="w-3 h-3" />
                  {rankChange}
                </>
              ) : (
                <>
                  <ArrowDown className="w-3 h-3" />
                  {Math.abs(rankChange)}
                </>
              )}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground">{genreLabel}</p>
      </div>
    </>
  );

  if (id) {
    return (
      <Link
        href={`/comic/${id}`}
        className="comic-card shrink-0 group block cursor-pointer"
      >
        {content}
      </Link>
    );
  }

  return <div className="comic-card shrink-0 group">{content}</div>;
};

export default ComicCard;
