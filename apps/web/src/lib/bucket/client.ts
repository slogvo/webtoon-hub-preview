import { SeriesIndex, SeriesMeta, EpisodeMeta } from "./types";

// The real Google Cloud Storage bucket URL
const PUBLIC_BUCKET_URL = "https://storage.googleapis.com/webtoon-hub";
// For Next.js, we should use the same URL for both server and client since it's a public cloud bucket
const FETCH_BASE_URL = PUBLIC_BUCKET_URL;

async function smartFetch<T>(url: string): Promise<T> {
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`Failed to fetch from: ${url}`);
  return res.json();
}

export const AssetClient = {
  async getSeriesIndex(): Promise<SeriesIndex> {
    return smartFetch<SeriesIndex>(`${FETCH_BASE_URL}/index.json`);
  },

  async getSeriesMeta(seriesId: string): Promise<SeriesMeta> {
    try {
      // Try meta.json first as per Notion spec
      return await smartFetch<SeriesMeta>(`${FETCH_BASE_URL}/${seriesId}/meta.json`);
    } catch {
      // Fallback to series.json if meta.json doesn't exist
      console.warn(`meta.json not found for ${seriesId}, trying series.json fallback`);
      return smartFetch<SeriesMeta>(`${FETCH_BASE_URL}/${seriesId}/series.json`);
    }
  },

  async getEpisodeMeta(episodeUrl: string): Promise<EpisodeMeta> {
    // If the URL is relative (doesn't start with http), prepend FETCH_BASE_URL
    const url = episodeUrl.startsWith("http")
      ? episodeUrl
      : `${FETCH_BASE_URL}/${episodeUrl}`;
    return smartFetch<EpisodeMeta>(url);
  },

  // Helper to construct image URLs
  getImageUrl(path: string): string {
    if (!path) return "";
    // If path already has an extension, don't append .webp
    const hasExtension = /\.[a-z0-9]+$/i.test(path);
    const finalPath = hasExtension ? path : `${path}.webp`;
    
    return `${PUBLIC_BUCKET_URL}/${finalPath}`;
  },
};
