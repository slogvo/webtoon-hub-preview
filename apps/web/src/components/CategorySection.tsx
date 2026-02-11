"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import ComicCard from "./ComicCard";
import { comics } from "@/data/mockData";

const categories = [
  "Drama",
  "Fantasy",
  "Comedy",
  "Action",
  "Slice of life",
  "Romance",
  "Superhero",
  "Sci-fi",
];

// Generate category comics from our mock data
const getComicsForCategory = (category: string) => {
  // Use our existing comics data and filter/map for display
  return comics.map((comic, index) => ({
    ...comic,
    genre: category,
    isNew: index === 1,
  }));
};

const CategorySection = () => {
  const [activeCategory, setActiveCategory] = useState("Drama");
  const categoryComics = getComicsForCategory(activeCategory);

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title">Popular Series by Category</h2>
          <a href="#" className="view-all">
            View all
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`category-pill ${activeCategory === category ? "category-pill-active" : ""}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Comics Grid */}
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {categoryComics.map((comic) => (
              <ComicCard
                key={comic.id}
                title={comic.title}
                genre={comic.genre}
                image={comic.image}
                isNew={comic.isNew}
                slug={comic.slug}
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

export default CategorySection;
