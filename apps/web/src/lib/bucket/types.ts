export interface SeriesIndex {
  updatedAt: string;
  series: SeriesSummary[];
}

export interface SeriesSummary {
  id: string;
  status: "ongoing" | "completed" | "hiatus";
  genres: string[];
  locales: string[];
  cover: string; // hash
}

export interface SeriesMeta {
  seriesId: string;
  status: "ongoing" | "completed" | "hiatus";
  genres: string[];
  locales: string[];
  cover: string;
  thumbnails: { index: number; hash: string }[];
  publishAt: string;
}

export interface EpisodeMeta {
  episodeId: string;
  episodeNumber: number;
  publishAt: string;
  access: {
    type: "free" | "paid" | "subscription" | "time-locked";
  };
}

export interface LocaleMeta {
  locale: string;
  title: string;
  synopsis: string;
  panels: PanelImage[];
}

export interface PanelImage {
  index: number;
  hash: string;
}
