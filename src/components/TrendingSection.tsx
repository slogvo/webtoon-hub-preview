 import { useState } from "react";
 import { ChevronRight, ChevronLeft } from "lucide-react";
 import ComicCard from "./ComicCard";
 import { comics } from "@/data/mockData";
 
 const trendingComics = comics.map((comic, index) => ({
   ...comic,
   rankChange: [2, 7, -2, 21, 2, -2, 1][index % 7],
   isNew: index === 0,
 }));
 
 const popularComics = [...comics].reverse().map((comic, index) => ({
   ...comic,
   rankChange: [0, 1, -1, 3, 0, 2, -1][index % 7],
   isNew: index === 3,
 }));
 
 const TrendingSection = () => {
   const [activeTab, setActiveTab] = useState<"trending" | "popular">("trending");
   const displayComics = activeTab === "trending" ? trendingComics : popularComics;
 
   return (
     <section className="py-8">
       <div className="container mx-auto px-4">
         {/* Header */}
         <div className="flex items-center justify-between mb-6">
           <h2 className="section-title">Trending & Popular Series</h2>
           <a href="#" className="view-all">
             View all
             <ChevronRight className="w-4 h-4" />
           </a>
         </div>
 
         {/* Tabs */}
         <div className="flex gap-2 mb-6">
           <button
             onClick={() => setActiveTab("trending")}
             className={`category-pill ${activeTab === "trending" ? "category-pill-active" : ""}`}
           >
             Trending
           </button>
           <button
             onClick={() => setActiveTab("popular")}
             className={`category-pill ${activeTab === "popular" ? "category-pill-active" : ""}`}
           >
             Popular
           </button>
         </div>
 
         {/* Carousel */}
         <div className="relative">
           <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
             {displayComics.map((comic, index) => (
               <ComicCard
                 key={comic.id}
                 rank={index + 1}
                 title={comic.title}
                 genre={comic.genre}
                 image={comic.image}
                 rankChange={comic.rankChange}
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
 
 export default TrendingSection;