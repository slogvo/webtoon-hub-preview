import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { ArrowUp, ArrowDown } from "lucide-react";

type ImageSrc = string | StaticImageData;

interface ComicCardProps {
  rank?: number;
  title: string;
  genre: string;
  image: ImageSrc;
  rankChange?: number;
  isNew?: boolean;
  slug?: string;
  priority?: boolean;
}

const ComicCard = ({
  rank,
  title,
  genre,
  image,
  rankChange,
  isNew,
  slug,
  priority,
}: ComicCardProps) => {
  const content = (
    <>
      <div className="relative">
        <Image
          src={image}
          alt={title}
          width={176}
          height={235}
          className="comic-card-image rounded-lg"
          style={{ height: "auto" }}
          priority={priority}
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
        <p className="text-xs text-muted-foreground">{genre}</p>
      </div>
    </>
  );

  if (slug) {
    return (
      <Link
        href={`/comic/${slug}`}
        className="comic-card shrink-0 group block cursor-pointer"
      >
        {content}
      </Link>
    );
  }

  return <div className="comic-card shrink-0 group">{content}</div>;
};

export default ComicCard;
