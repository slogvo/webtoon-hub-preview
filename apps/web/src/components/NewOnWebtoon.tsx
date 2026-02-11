import { ChevronRight } from "lucide-react";
import ComicCard from "./ComicCard";
import { AssetClient } from "@/lib/bucket/client";
import Link from "next/link";

interface ComicSummary {
  id: string | number;
  title: string;
  genre: string;
  image: string;
  isNew: boolean;
  slug: string;
}

const NewOnWebtoon = async () => {
  let comics: ComicSummary[] = [];

  try {
    const indexData = await AssetClient.getSeriesIndex();
    // In real app: Sort by 'publishAt' descending
    // For now: Just take all
    comics = indexData.series.map((s) => ({
      id: s.id,
      title: s.id, // TODO: Localized title
      genre: s.genres[0] || "Webtoon",
      image: AssetClient.getCoverUrl(s.id, s.cover),
      isNew: true, // Logic to determine 'new' based on date
      slug: s.id,
    }));
  } catch (error) {
    console.error("Failed to load NewOnWebtoon data", error);
    // We could return null or a skeleton here
  }

  if (comics.length === 0) {
    return null; // Or empty state
  }

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  genre={comic.genre}
                  image={comic.image}
                  isNew={comic.isNew}
                  slug={comic.slug}
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
