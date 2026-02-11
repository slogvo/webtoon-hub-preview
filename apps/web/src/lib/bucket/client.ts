import { SeriesIndex, SeriesMeta, EpisodeMeta, LocaleMeta } from "./types";

// In production, this would be your CDN URL.
// For local dev, we point to the mock bucket in public folder.
const PUBLIC_BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL || "/mock-bucket";

// For server-side fetch, we need an absolute URL if the bucket is local.
let FETCH_BASE_URL = PUBLIC_BUCKET_URL;

const isServer = typeof window === "undefined";
const isLocalBucket = PUBLIC_BUCKET_URL.startsWith("/");

if (isServer && isLocalBucket) {
  // Note: If you run on a custom port (e.g., 3001), ensure process.env.PORT is set
  // or manually update this if server-side fetches fail.
  const PORT = process.env.PORT || 3000;
  FETCH_BASE_URL = `http://127.0.0.1:${PORT}${FETCH_BASE_URL}`;
}

async function smartFetch<T>(url: string): Promise<T> {
  // If we're on the server and it's a local mock-bucket request,
  // we try to read from the filesystem directly to avoid fetch errors during build.
  if (isServer && isLocalBucket && url.includes("/mock-bucket/")) {
    try {
      const { readFileSync } = await import("fs");
      const { join } = await import("path");

      const relativePath = url.split("/mock-bucket/")[1];
      const filePath = join(
        process.cwd(),
        "public",
        "mock-bucket",
        relativePath,
      );

      const content = readFileSync(filePath, "utf8");
      return JSON.parse(content);
    } catch (e) {
      console.warn(
        `AssetClient: Failed to read local file: ${url}. Falling back to fetch.`,
        e,
      );
    }
  }

  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`Failed to fetch from: ${url}`);
  return res.json();
}

export const AssetClient = {
  async getSeriesIndex(): Promise<SeriesIndex> {
    return smartFetch<SeriesIndex>(`${FETCH_BASE_URL}/index.json`);
  },

  async getSeriesMeta(seriesId: string): Promise<SeriesMeta> {
    return smartFetch<SeriesMeta>(`${FETCH_BASE_URL}/${seriesId}/meta.json`);
  },

  async getEpisodeMeta(
    seriesId: string,
    episodeId: string,
  ): Promise<EpisodeMeta> {
    return smartFetch<EpisodeMeta>(
      `${FETCH_BASE_URL}/${seriesId}/${episodeId}/meta.json`,
    );
  },

  async getLocaleMeta(
    seriesId: string,
    episodeId: string,
    locale: string,
  ): Promise<LocaleMeta> {
    return smartFetch<LocaleMeta>(
      `${FETCH_BASE_URL}/${seriesId}/${episodeId}/${locale}/meta.json`,
    );
  },

  // Helper to construct image URLs
  getCoverUrl(seriesId: string, hash: string): string {
    // In real implementation, this might be signed or public
    return `${PUBLIC_BUCKET_URL}/${seriesId}/cover/${hash}`;
  },

  getThumbUrl(
    seriesId: string,
    episodeId: string,
    locale: string,
    hash: string,
  ): string {
    return `${PUBLIC_BUCKET_URL}/${seriesId}/${episodeId}/${locale}/thumbs/${hash}`;
  },

  getPanelUrl(
    seriesId: string,
    episodeId: string,
    locale: string,
    hash: string,
  ): string {
    // In real implementation, this MUST be signed
    return `${PUBLIC_BUCKET_URL}/${seriesId}/${episodeId}/${locale}/panels/${hash}`;
  },
};
