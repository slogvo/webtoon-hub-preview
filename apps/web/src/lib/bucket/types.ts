export interface SeriesIndex {
  updatedAt: string;
  series: SeriesSummary[];
}

export interface SeriesSummary {
  id: string;
  status: "ongoing" | "completed" | "hiatus";
  genres: string[];
  cover: string; // hash
  url: string;
  title?: string;
  description?: string;
}

export interface SeriesMeta {
  seriesId: string;
  status: "ongoing" | "completed" | "hiatus";
  genres: string[];
  cover: string; // full path like "seriesId/cover.webp"
  publishAt: string;
  episodes: EpisodeSummary[];
  title?: string;
  description?: string;
  author?: string;
  artist?: string;
}

export interface EpisodeSummary {
  episodeId: string;
  url: string; // path to episode.json
  title?: string;
}

export interface EpisodeMeta {
  episodeId: string;
  seriesId?: string;
  title?: string;
  description?: string;
  panels: PanelImage[];
  publishAt?: string;
}

export interface PanelImage {
  index: number;
  url: string; // path to panel image (might need .webp)
}
