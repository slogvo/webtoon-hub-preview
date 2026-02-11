import { useState } from "react";
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
import comic9 from "@/assets/comic-9.jpg";
import comic10 from "@/assets/comic-10.jpg";

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const scheduleByDay: Record<
  string,
  { id: number; title: string; genre: string; image: string; isNew?: boolean }[]
> = {
  SUN: [
    {
      id: 1,
      title: "Tower of God",
      image: comic1,
      genre: "Fantasy",
      isNew: true,
    },
    { id: 2, title: "True Beauty", image: comic6, genre: "Romance" },
    { id: 3, title: "The God of High School", image: comic4, genre: "Action" },
    { id: 4, title: "Lore Olympus", image: comic5, genre: "Fantasy" },
    { id: 5, title: "My Giant Nerd", image: comic7, genre: "Comedy" },
    { id: 6, title: "Parallel City", image: comic9, genre: "Sci-fi" },
  ],
  MON: [
    { id: 1, title: "Unordinary", image: comic8, genre: "Action", isNew: true },
    { id: 2, title: "Let's Play", image: comic2, genre: "Romance" },
    { id: 3, title: "Eleceed", image: comic4, genre: "Fantasy" },
    { id: 4, title: "I Love Yoo", image: comic7, genre: "Drama" },
    { id: 5, title: "Lookism", image: comic10, genre: "Action" },
    { id: 6, title: "Space Boy", image: comic9, genre: "Sci-fi" },
  ],
  TUE: [
    {
      id: 1,
      title: "Solo Leveling",
      image: comic4,
      genre: "Action",
      isNew: true,
    },
    { id: 2, title: "Remarried Empress", image: comic5, genre: "Fantasy" },
    { id: 3, title: "Midnight Poppy", image: comic3, genre: "Romance" },
    { id: 4, title: "SubZero", image: comic1, genre: "Fantasy" },
    { id: 5, title: "Age Matters", image: comic6, genre: "Romance" },
    { id: 6, title: "Viral Hit", image: comic2, genre: "Action" },
  ],
  WED: [
    {
      id: 1,
      title: "Omniscient Reader",
      image: comic1,
      genre: "Fantasy",
      isNew: true,
    },
    { id: 2, title: "Freaking Romance", image: comic6, genre: "Romance" },
    { id: 3, title: "Unholy Blood", image: comic3, genre: "Action" },
    { id: 4, title: "Yumi's Cells", image: comic7, genre: "Slice of life" },
    { id: 5, title: "Cursed Princess", image: comic5, genre: "Comedy" },
    { id: 6, title: "Hero Killer", image: comic8, genre: "Action" },
  ],
  THU: [
    { id: 1, title: "Weak Hero", image: comic4, genre: "Action", isNew: true },
    { id: 2, title: "Heartstopper", image: comic6, genre: "Romance" },
    { id: 3, title: "Super Secret", image: comic2, genre: "Fantasy" },
    { id: 4, title: "Grim Reaper", image: comic3, genre: "Thriller" },
    { id: 5, title: "Lumine", image: comic9, genre: "Fantasy" },
    { id: 6, title: "My Dear King", image: comic10, genre: "Romance" },
  ],
  FRI: [
    {
      id: 1,
      title: "Hardcore Leveling",
      image: comic4,
      genre: "Action",
      isNew: true,
    },
    { id: 2, title: "Adventures of God", image: comic7, genre: "Comedy" },
    { id: 3, title: "Ghost Teller", image: comic3, genre: "Horror" },
    { id: 4, title: "Mage Queen", image: comic5, genre: "Fantasy" },
    { id: 5, title: "Bluechair", image: comic9, genre: "Comedy" },
    { id: 6, title: "Code Adam", image: comic8, genre: "Superhero" },
  ],
  SAT: [
    {
      id: 1,
      title: "Gangnam Beauty",
      image: comic10,
      genre: "Romance",
      isNew: true,
    },
    { id: 2, title: "Safely Endangered", image: comic7, genre: "Comedy" },
    { id: 3, title: "Cape of Spirits", image: comic8, genre: "Superhero" },
    { id: 4, title: "Everything Fine", image: comic9, genre: "Horror" },
    { id: 5, title: "Seed", image: comic1, genre: "Sci-fi" },
    { id: 6, title: "Muted", image: comic4, genre: "Superhero" },
  ],
};

const DailySchedule = () => {
  const today = new Date().getDay();
  const [activeDay, setActiveDay] = useState(days[today]);
  const comics = scheduleByDay[activeDay] || [];

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title">Daily Schedule</h2>
          <a href="#" className="view-all">
            View all
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        {/* Day Pills */}
        <div className="flex gap-2 mb-6">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`category-pill ${activeDay === day ? "category-pill-active" : ""}`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Comics Grid */}
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {comics.map((comic) => (
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

export default DailySchedule;
