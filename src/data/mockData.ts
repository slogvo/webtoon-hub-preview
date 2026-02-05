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
 import webtoonCover from "@/assets/webtoon-cover.jpg";
 import webtoonBanner from "@/assets/webtoon-banner.jpg";
 import panel1 from "@/assets/panel-1.jpg";
 import panel2 from "@/assets/panel-2.jpg";
 import panel3 from "@/assets/panel-3.jpg";
 import panel4 from "@/assets/panel-4.jpg";
 import panel5 from "@/assets/panel-5.jpg";
 
 export interface Comic {
   id: number;
   slug: string;
   title: string;
   genre: string;
   image: string;
   banner?: string;
   description: string;
   author: string;
   artist?: string;
   views: string;
   subscribers: string;
   rating: number;
   updateDay: string;
   episodes: Episode[];
 }
 
 export interface Episode {
   id: number;
   number: number;
   title: string;
   thumbnail: string;
   date: string;
   likes: number;
   panels: string[];
 }
 
 const generateEpisodes = (count: number, comicImages: string[]): Episode[] => {
   const episodeTitles = [
     "Because It Suits Me",
     "His True Lover",
     "The Tower Master",
     "Something Truly Special",
     "Raven's Desires",
     "I Just Can't Trust Myself",
     "The Shores of Paradise",
     "Happiness Is Being with You",
     "A Dangerous Game",
     "The Truth Revealed",
     "Unexpected Ally",
     "The Villainess's Plan",
     "A New Beginning",
     "The Duke's Proposal",
     "Behind the Mask",
   ];
 
   return Array.from({ length: count }, (_, i) => ({
     id: count - i,
     number: count - i,
     title: episodeTitles[i % episodeTitles.length],
     thumbnail: comicImages[i % comicImages.length],
     date: new Date(Date.now() - i * 7 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
       month: "short",
       day: "numeric",
       year: "numeric",
     }),
     likes: Math.floor(Math.random() * 10000) + 1000,
     panels: [panel1, panel2, panel3, panel4, panel5],
   }));
 };
 
 export const comics: Comic[] = [
   {
     id: 1,
     slug: "empires-greatest-villainess",
     title: "I've Fallen for the Empire's Greatest Villainess",
     genre: "Romance",
     image: webtoonCover,
     banner: webtoonBanner,
     description: "There's a price to be paid for a seemingly perfect life. For Raven, the dashing young son of a duke tasked with guarding the empire, marriage represents nothing but a downward spiral into misery. Cherishing his freedom as a bachelor, Raven is perplexed when the daughter of rival House Sharen makes him a daring proposal of marriage. But there's a hitch: Lady Estrella Sharen is an infamous villainess who is feared across the empire! Raven suspects there is more to her than meets the eye, but nonetheless agrees to enter into a marriage contract...",
     author: "AJI",
     artist: "Atsushi, Perlacot",
     views: "12.1M",
     subscribers: "311,310",
     rating: 9.8,
     updateDay: "EVERY FRIDAY",
     episodes: generateEpisodes(61, [comic1, comic2, comic3, comic4, comic5, comic6]),
   },
   {
     id: 2,
     slug: "eat-before-you-go",
     title: "Eat Before You Go",
     genre: "Fantasy",
     image: comic1,
     banner: webtoonBanner,
     description: "A fantasy adventure about a young chef who discovers magical ingredients that can change the fate of kingdoms.",
     author: "Kim Min-ho",
     views: "8.5M",
     subscribers: "245,000",
     rating: 9.5,
     updateDay: "EVERY MONDAY",
     episodes: generateEpisodes(45, [comic1, comic7, comic8, comic9, comic10]),
   },
   {
     id: 3,
     slug: "special-civil-servant",
     title: "Special Civil Servant",
     genre: "Action",
     image: comic2,
     banner: webtoonBanner,
     description: "Follow the story of a government agent with supernatural abilities protecting the city from otherworldly threats.",
     author: "Lee Jun-seo",
     views: "10.2M",
     subscribers: "298,500",
     rating: 9.6,
     updateDay: "EVERY TUESDAY",
     episodes: generateEpisodes(52, [comic2, comic4, comic8]),
   },
   {
     id: 4,
     slug: "trapped",
     title: "Trapped",
     genre: "Thriller",
     image: comic3,
     banner: webtoonBanner,
     description: "A psychological thriller about survival in a mysterious dimension where nothing is as it seems.",
     author: "Park Ji-yeon",
     views: "6.8M",
     subscribers: "189,000",
     rating: 9.3,
     updateDay: "EVERY WEDNESDAY",
     episodes: generateEpisodes(38, [comic3, comic9]),
   },
   {
     id: 5,
     slug: "killer-peter",
     title: "Killer Peter",
     genre: "Action",
     image: comic4,
     banner: webtoonBanner,
     description: "An action-packed story of revenge and redemption in the criminal underworld.",
     author: "Choi Dong-wook",
     views: "11.5M",
     subscribers: "356,000",
     rating: 9.7,
     updateDay: "EVERY THURSDAY",
     episodes: generateEpisodes(67, [comic4, comic8]),
   },
   {
     id: 6,
     slug: "white-tower-mage",
     title: "The White Tower's Rogue Mage",
     genre: "Fantasy",
     image: comic5,
     banner: webtoonBanner,
     description: "A mage expelled from the prestigious White Tower embarks on a journey to prove his innocence.",
     author: "Song Hye-rin",
     views: "7.9M",
     subscribers: "223,000",
     rating: 9.4,
     updateDay: "EVERY FRIDAY",
     episodes: generateEpisodes(41, [comic5, comic1]),
   },
   {
     id: 7,
     slug: "fake-bonds",
     title: "Fake Bonds",
     genre: "Romance",
     image: comic6,
     banner: webtoonBanner,
     description: "A fake marriage between rivals leads to unexpected feelings and complications.",
     author: "Han So-yeon",
     views: "9.1M",
     subscribers: "267,000",
     rating: 9.5,
     updateDay: "EVERY SATURDAY",
     episodes: generateEpisodes(55, [comic6, comic7, comic10]),
   },
 ];
 
 export const getComicBySlug = (slug: string): Comic | undefined => {
   return comics.find((comic) => comic.slug === slug);
 };
 
 export const getComicById = (id: number): Comic | undefined => {
   return comics.find((comic) => comic.id === id);
 };