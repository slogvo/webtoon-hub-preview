import { ChevronRight } from "lucide-react";
import ComicCard from "./ComicCard";
import Link from "next/link";

import { SeriesIndex } from "@/lib/bucket/types";

interface NewOnWebtoonProps {
  series: SeriesIndex["series"];
}

const NewOnWebtoon = ({ series }: NewOnWebtoonProps) => {
  const comics = series.map((s) => ({
    id: s.id,
    title: s.title || s.id.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
    genres: s.genres,
    cover: s.cover,
    isNew: true,
  }));

  if (comics.length === 0) {
    return null;
  }

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title">New on WEBTOON</h2>
          <Link href="/new" className="view-all">
            View all
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Comics Grid */}
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {comics.map((comic, index) => (
              <div key={comic.id} className="flex-none w-[calc(50%-8px)] sm:w-[calc(33.333%-10.666px)] lg:w-[calc(16.666%-13.333px)]">
                <ComicCard
                  title={comic.title}
                  genres={comic.genres}
                  cover={comic.cover}
                  isNew={comic.isNew}
                  id={comic.id.toString()}
                  priority={index === 0}
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default NewOnWebtoon;
