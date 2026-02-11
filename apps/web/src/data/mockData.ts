import type { StaticImageData } from "next/image";
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

type ImageSrc = string | StaticImageData;

export interface Comic {
  id: number | string;
  slug: string;
  title: string;
  genre: string;
  image: ImageSrc;
  banner?: ImageSrc;
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
  id: number | string;
  number: number;
  title: string;
  thumbnail: ImageSrc;
  date: string;
  likes: number;
  panels: ImageSrc[];
}

const generateEpisodes = (
  count: number,
  comicImages: ImageSrc[],
): Episode[] => {
  const episodeTitles = [
    "The Awakening",
    "First Encounter",
    "Hidden Secrets",
    "The Journey Begins",
    "Shadows in the Woods",
    "A New Ally",
    "The Forgotten Temple",
    "Rising Tension",
    "The First Duel",
    "Victory and Loss",
    "Whispers of Fate",
    "The Second Trial",
    "A Path Unveiled",
    "The Ancient Key",
    "Beyond the Horizon",
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: count - i,
    number: count - i,
    title: episodeTitles[i % episodeTitles.length],
    thumbnail: comicImages[i % comicImages.length],
    date: new Date(Date.now() - i * 3 * 24 * 60 * 60 * 1000).toISOString(),
    likes: Math.floor(Math.random() * 5000) + 500,
    panels: [panel1, panel2, panel3, panel4, panel5],
  }));
};

export const comics: Comic[] = [
  {
    id: "dragon-sword",
    slug: "dragon-sword",
    title: "Dragon Sword",
    genre: "Action",
    image: comic4,
    banner: webtoonBanner,
    description: "In a world ruled by ancient dragons, a young warrior finds a legendary sword that holds the power to change everything. His journey to reclaim the throne starts here.",
    author: "Kim Sung-min",
    artist: "Park Ji-hoon",
    views: "2.4M",
    subscribers: "85K",
    rating: 9.8,
    updateDay: "EVERY SUNDAY",
    episodes: generateEpisodes(5, [comic4, comic8]),
  },
  {
    id: 1,
    slug: "empires-greatest-villainess",
    title: "I've Fallen for the Empire's Greatest Villainess",
    genre: "Romance",
    image: webtoonCover,
    banner: webtoonBanner,
    description:
      "There's a price to be paid for a seemingly perfect life. For Raven, the dashing young son of a duke tasked with guarding the empire, marriage represents nothing but a downward spiral into misery. Cherishing his freedom as a bachelor, Raven is perplexed when the daughter of rival House Sharen makes him a daring proposal of marriage.",
    author: "AJI",
    artist: "Atsushi, Perlacot",
    views: "12.1M",
    subscribers: "311,310",
    rating: 9.8,
    updateDay: "EVERY FRIDAY",
    episodes: generateEpisodes(5, [
      comic1,
      comic2,
      comic3,
      comic4,
      comic5,
      comic6,
    ]),
  },
  {
    id: 2,
    slug: "eat-before-you-go",
    title: "Eat Before You Go",
    genre: "Fantasy",
    image: comic1,
    banner: webtoonBanner,
    description:
      "A fantasy adventure about a young chef who discovers magical ingredients that can change the fate of kingdoms.",
    author: "Kim Min-ho",
    views: "8.5M",
    subscribers: "245,000",
    rating: 9.5,
    updateDay: "EVERY MONDAY",
    episodes: generateEpisodes(5, [comic1, comic7, comic8, comic9, comic10]),
  },
  {
    id: 3,
    slug: "special-civil-servant",
    title: "Special Civil Servant",
    genre: "Action",
    image: comic2,
    banner: webtoonBanner,
    description:
      "Follow the story of a government agent with supernatural abilities protecting the city from otherworldly threats.",
    author: "Lee Jun-seo",
    views: "10.2M",
    subscribers: "298,500",
    rating: 9.6,
    updateDay: "EVERY TUESDAY",
    episodes: generateEpisodes(5, [comic2, comic4, comic8]),
  },
  {
    id: 4,
    slug: "trapped",
    title: "Trapped",
    genre: "Thriller",
    image: comic3,
    banner: webtoonBanner,
    description:
      "A psychological thriller about survival in a mysterious dimension where nothing is as it seems.",
    author: "Park Ji-yeon",
    views: "6.8M",
    subscribers: "189,000",
    rating: 9.3,
    updateDay: "EVERY WEDNESDAY",
    episodes: generateEpisodes(8, [comic3, comic9]),
  },
  {
    id: 5,
    slug: "killer-peter",
    title: "Killer Peter",
    genre: "Action",
    image: comic4,
    banner: webtoonBanner,
    description:
      "An action-packed story of revenge and redemption in the criminal underworld.",
    author: "Choi Dong-wook",
    views: "11.5M",
    subscribers: "356,000",
    rating: 9.7,
    updateDay: "EVERY THURSDAY",
    episodes: generateEpisodes(5, [comic4, comic8]),
  },
  {
    id: 6,
    slug: "white-tower-mage",
    title: "The White Tower's Rogue Mage",
    genre: "Fantasy",
    image: comic5,
    banner: webtoonBanner,
    description:
      "A mage expelled from the prestigious White Tower embarks on a journey to prove his innocence.",
    author: "Song Hye-rin",
    views: "7.9M",
    subscribers: "223,000",
    rating: 9.4,
    updateDay: "EVERY FRIDAY",
    episodes: generateEpisodes(5, [comic5, comic1]),
  },
  {
    id: 7,
    slug: "fake-bonds",
    title: "Fake Bonds",
    genre: "Romance",
    image: comic6,
    banner: webtoonBanner,
    description:
      "A fake marriage between rivals leads to unexpected feelings and complications.",
    author: "Han So-yeon",
    views: "9.1M",
    subscribers: "267,000",
    rating: 9.5,
    updateDay: "EVERY SATURDAY",
    episodes: generateEpisodes(5, [comic6, comic7, comic10]),
  },
  {
    id: 8,
    slug: "leveling-up-with-the-gods",
    title: "Leveling Up with the Gods",
    genre: "Action",
    image: comic7,
    banner: webtoonBanner,
    description: "After being betrayed by his teammates, a legendary hero is reborn with a chance to reach the top once more.",
    author: "Black-Headed",
    views: "15.4M",
    subscribers: "412,000",
    rating: 9.9,
    updateDay: "EVERY SUNDAY",
    episodes: generateEpisodes(5, [comic7, comic4]),
  },
  {
    id: 9,
    slug: "omniscient-readers-viewpoint",
    title: "Omniscient Reader's Viewpoint",
    genre: "Fantasy",
    image: comic8,
    banner: webtoonBanner,
    description: "Dokja was an average office worker whose sole interest was reading his favorite web novel.",
    author: "singNsong",
    views: "25.1M",
    subscribers: "1.2M",
    rating: 9.9,
    updateDay: "EVERY WEDNESDAY",
    episodes: generateEpisodes(5, [comic8, comic2]),
  },
  {
    id: 10,
    slug: "tower-of-god",
    title: "Tower of God",
    genre: "Fantasy",
    image: comic9,
    banner: webtoonBanner,
    description: "What do you desire? Whatever you desire—it's here in the tower.",
    author: "SIU",
    views: "45.2M",
    subscribers: "3.5M",
    rating: 9.8,
    updateDay: "EVERY MONDAY",
    episodes: generateEpisodes(5, [comic9, comic10]),
  },
  {
    id: 11,
    slug: "solo-leveling",
    title: "Solo Leveling",
    genre: "Action",
    image: comic10,
    banner: webtoonBanner,
    description: "Sung Jinwoo is the weakest of hunters, until a mysterious incident gives him the ability to level up alone.",
    author: "Chugong",
    views: "38.5M",
    subscribers: "2.8M",
    rating: 9.9,
    updateDay: "EVERY THURSDAY",
    episodes: generateEpisodes(5, [comic10, comic1]),
  },
  {
    id: 12,
    slug: "lookism",
    title: "Lookism",
    genre: "Drama",
    image: comic1,
    banner: webtoonBanner,
    description: "A high school student wakes up one day in a completely different, handsome body.",
    author: "Park Tae-jun",
    views: "18.2M",
    subscribers: "950,000",
    rating: 9.7,
    updateDay: "EVERY FRIDAY",
    episodes: generateEpisodes(5, [comic1, comic4]),
  },
  {
    id: 13,
    slug: "goddess-of-healing",
    title: "The Goddess of Healing",
    genre: "Romance",
    image: comic2,
    description: "A skilled doctor from modern times is reincarnated into the past.",
    author: "Flower Tea",
    views: "5.4M",
    subscribers: "120,000",
    rating: 9.4,
    updateDay: "EVERY TUESDAY",
    episodes: generateEpisodes(10, [comic2, comic6]),
  },
  {
    id: 14,
    slug: "urban-shadow",
    title: "Urban Shadow",
    genre: "Thriller",
    image: comic3,
    description: "A private investigator uncovers a series of supernatural murders.",
    author: "J.D. Night",
    views: "4.1M",
    subscribers: "85,000",
    rating: 9.2,
    updateDay: "EVERY SATURDAY",
    episodes: generateEpisodes(8, [comic3, comic7]),
  },
  {
    id: 15,
    slug: "virtual-reality",
    title: "The King of VR",
    genre: "Action",
    image: comic4,
    description: "The world's top player in a virtual reality game loses everything and decides to start over.",
    author: "Cyber Punk",
    views: "9.8M",
    subscribers: "310,000",
    rating: 9.6,
    updateDay: "EVERY SUNDAY",
    episodes: generateEpisodes(12, [comic4, comic8]),
  }
];

export const getComicBySlug = (slug: string): Comic | undefined => {
  return comics.find((comic) => comic.slug === slug);
};

export const getComicById = (id: number): Comic | undefined => {
  return comics.find((comic) => comic.id === id);
};
