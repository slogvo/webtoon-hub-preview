import { ChevronRight } from "lucide-react";
import ComicCard from "./ComicCard";

import comic1 from "@/assets/comic-1.jpg";
import comic2 from "@/assets/comic-2.jpg";
import comic3 from "@/assets/comic-3.jpg";
import comic4 from "@/assets/comic-4.jpg";
import comic5 from "@/assets/comic-5.jpg";
import comic6 from "@/assets/comic-6.jpg";
import comic7 from "@/assets/comic-7.jpg";
import comic8 from "@/assets/comic-8.jpg";

const newComics = [
  {
    id: 1,
    title: "Moonlit Shadows",
    genre: "Fantasy",
    image: comic1,
    isNew: true,
  },
  {
    id: 2,
    title: "City of Secrets",
    genre: "Thriller",
    image: comic3,
    isNew: true,
  },
  {
    id: 3,
    title: "Love Algorithm",
    genre: "Romance",
    image: comic6,
    isNew: true,
  },
  { id: 4, title: "Power Surge", genre: "Action", image: comic4, isNew: true },
  {
    id: 5,
    title: "Campus Days",
    genre: "Slice of life",
    image: comic7,
    isNew: true,
  },
  { id: 6, title: "Dark Horizon", genre: "Sci-fi", image: comic8, isNew: true },
];

const NewOnWebtoon = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title">New on WEBTOON</h2>
          <a href="#" className="view-all">
            View all
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        {/* Comics Grid */}
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {newComics.map((comic) => (
              <ComicCard
                key={comic.id}
                title={comic.title}
                genre={comic.genre}
                image={comic.image}
                isNew={comic.isNew}
              />
            ))}
          </div>

          <button className="carousel-arrow right-0">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewOnWebtoon;
