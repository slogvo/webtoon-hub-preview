import { ArrowUp, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";

interface ComicCardProps {
  rank?: number;
  title: string;
  genre: string;
  image: string;
  rankChange?: number;
  isNew?: boolean;
  slug?: string;
}

const ComicCard = ({
  rank,
  title,
  genre,
  image,
  rankChange,
  isNew,
  slug,
}: ComicCardProps) => {
  const content = (
    <>
      <div className="relative">
        <img src={image} alt={title} className="comic-card-image rounded-lg" />

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
        <p className="text-xs text-muted-foreground">{genre}</p>
      </div>
    </>
  );

  if (slug) {
    return (
      <Link
        to={`/comic/${slug}`}
        className="comic-card flex-shrink-0 w-44 group block"
      >
        {content}
      </Link>
    );
  }

  return <div className="comic-card flex-shrink-0 w-44 group">{content}</div>;
};

export default ComicCard;
