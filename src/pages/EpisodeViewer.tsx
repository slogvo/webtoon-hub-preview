 import { useParams, Link, useNavigate } from "react-router-dom";
 import { ArrowLeft, ChevronLeft, ChevronRight, Heart, MessageSquare, Share2 } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { getComicBySlug } from "@/data/mockData";
 
 const EpisodeViewer = () => {
   const { slug, episodeNumber } = useParams<{ slug: string; episodeNumber: string }>();
   const navigate = useNavigate();
   const comic = getComicBySlug(slug || "");
   const currentEpisode = parseInt(episodeNumber || "1");
 
   if (!comic) {
     return (
       <div className="min-h-screen bg-background flex items-center justify-center">
         <div className="text-center">
           <h1 className="text-2xl font-bold mb-4">Comic not found</h1>
           <Link to="/" className="text-primary hover:underline">
             Go back home
           </Link>
         </div>
       </div>
     );
   }
 
   const episode = comic.episodes.find((ep) => ep.number === currentEpisode);
   const hasNextEpisode = currentEpisode < comic.episodes.length;
   const hasPrevEpisode = currentEpisode > 1;
 
   if (!episode) {
     return (
       <div className="min-h-screen bg-background flex items-center justify-center">
         <div className="text-center">
           <h1 className="text-2xl font-bold mb-4">Episode not found</h1>
           <Link to={`/comic/${slug}`} className="text-primary hover:underline">
             Go back to comic
           </Link>
         </div>
       </div>
     );
   }
 
   const goToPrevEpisode = () => {
     if (hasPrevEpisode) {
       navigate(`/comic/${slug}/episode/${currentEpisode - 1}`);
     }
   };
 
   const goToNextEpisode = () => {
     if (hasNextEpisode) {
       navigate(`/comic/${slug}/episode/${currentEpisode + 1}`);
     }
   };
 
   return (
     <div className="min-h-screen bg-[#1a1a1a]">
       {/* Top Navigation */}
       <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
         <div className="container mx-auto px-4">
           <div className="flex items-center justify-between h-14">
             {/* Left */}
             <div className="flex items-center gap-4">
               <Link
                 to={`/comic/${slug}`}
                 className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
               >
                 <ArrowLeft className="w-5 h-5" />
               </Link>
               <div>
                 <h1 className="font-semibold text-sm truncate max-w-[200px] md:max-w-none">
                   {comic.title}
                 </h1>
                 <p className="text-xs text-muted-foreground">
                   Ep. {episode.number} - {episode.title}
                 </p>
               </div>
             </div>
 
             {/* Right */}
             <div className="flex items-center gap-2">
               <Button variant="ghost" size="icon">
                 <Heart className="w-5 h-5" />
               </Button>
               <Button variant="ghost" size="icon">
                 <MessageSquare className="w-5 h-5" />
               </Button>
               <Button variant="ghost" size="icon">
                 <Share2 className="w-5 h-5" />
               </Button>
             </div>
           </div>
         </div>
       </header>
 
       {/* Panels Container */}
       <main className="flex flex-col items-center py-8">
         <div className="max-w-3xl w-full">
           {episode.panels.map((panel, index) => (
             <img
               key={index}
               src={panel}
               alt={`Panel ${index + 1}`}
               className="w-full h-auto"
               loading={index > 2 ? "lazy" : "eager"}
             />
           ))}
         </div>
       </main>
 
       {/* Bottom Navigation */}
       <div className="sticky bottom-0 bg-background border-t border-border">
         <div className="container mx-auto px-4">
           <div className="flex items-center justify-between h-16">
             <Button
               variant="ghost"
               onClick={goToPrevEpisode}
               disabled={!hasPrevEpisode}
               className="flex items-center gap-2"
             >
               <ChevronLeft className="w-5 h-5" />
               <span className="hidden sm:inline">Previous</span>
             </Button>
 
             <div className="flex items-center gap-4">
               <span className="text-sm font-medium">
                 Episode {currentEpisode} of {comic.episodes.length}
               </span>
             </div>
 
             <Button
               variant="ghost"
               onClick={goToNextEpisode}
               disabled={!hasNextEpisode}
               className="flex items-center gap-2"
             >
               <span className="hidden sm:inline">Next</span>
               <ChevronRight className="w-5 h-5" />
             </Button>
           </div>
         </div>
       </div>
 
       {/* End of Episode Actions */}
       <div className="bg-background py-8 border-t border-border">
         <div className="container mx-auto px-4 max-w-xl">
           <div className="text-center space-y-4">
             <h3 className="text-lg font-semibold">
               End of Episode {currentEpisode}
             </h3>
             <div className="flex gap-4 justify-center">
               <Button variant="outline" className="flex items-center gap-2">
                 <Heart className="w-4 h-4" />
                 Like
               </Button>
               <Button variant="outline" className="flex items-center gap-2">
                 <MessageSquare className="w-4 h-4" />
                 Comment
               </Button>
             </div>
             {hasNextEpisode && (
               <Button
                 onClick={goToNextEpisode}
                 className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
               >
                 Next Episode
                 <ChevronRight className="w-4 h-4 ml-2" />
               </Button>
             )}
           </div>
         </div>
       </div>
     </div>
   );
 };
 
 export default EpisodeViewer;