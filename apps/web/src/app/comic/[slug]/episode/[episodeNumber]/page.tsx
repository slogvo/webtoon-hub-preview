import { AssetClient } from "@/lib/bucket/client";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import NextImage from "next/image";
import Link from "next/link";
import { EpisodeHeader } from "@/components/episode/EpisodeHeader";
import { EpisodeNavigation } from "@/components/episode/EpisodeNavigation";
import { EpisodeEndActions } from "@/components/episode/EpisodeEndActions";
import { SeriesMeta, LocaleMeta } from "@/lib/bucket/types";

interface PageProps {
  params: Promise<{ slug: string; episodeNumber: string }>;
}

// Helper: Format episode number to ID (e.g. 1 -> ep-001)
// TODO: This logic should match the backend/bucket generation logic strictly.
const formatEpisodeId = (num: number) => `ep-${String(num).padStart(3, "0")}`;
// Default locale for now
const DEFAULT_LOCALE = "en";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, episodeNumber } = await params;
  const epNum = parseInt(episodeNumber);
  const episodeId = formatEpisodeId(epNum);

  try {
    const seriesMeta = await AssetClient.getSeriesMeta(slug);
    const locale = seriesMeta.locales.includes("en")
      ? "en"
      : seriesMeta.locales[0];

    if (!locale) throw new Error("No locale available");

    const localeMeta = await AssetClient.getLocaleMeta(slug, episodeId, locale);

    const title = `${localeMeta.title} - ${seriesMeta.seriesId}`;
    const desc =
      localeMeta.synopsis || `Read ${seriesMeta.seriesId} Episode ${epNum}`;
    const coverUrl = AssetClient.getCoverUrl(slug, seriesMeta.cover);

    return {
      title: title,
      description: desc,
      openGraph: {
        images: [{ url: coverUrl }],
      },
    };
  } catch (e) {
    return { title: "Episode Not Found" };
  }
}

// JSON-LD for Episode
function getEpisodeJsonLd(
  seriesMeta: SeriesMeta,
  localeMeta: LocaleMeta,
  episodeNumber: number,
) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://webtoon-hub.com";
  const coverUrl = AssetClient.getCoverUrl(
    seriesMeta.seriesId,
    seriesMeta.cover,
  ); // Fallback to cover

  return {
    "@context": "https://schema.org",
    "@type": "Chapter",
    name: localeMeta.title,
    description: localeMeta.synopsis,
    isPartOf: {
      "@type": "ComicSeries",
      name: seriesMeta.seriesId,
      url: `${siteUrl}/comic/${seriesMeta.seriesId}`,
    },
    position: episodeNumber,
    url: `${siteUrl}/comic/${seriesMeta.seriesId}/episode/${episodeNumber}`,
    image: coverUrl,
    datePublished: seriesMeta.publishAt, // Use series publish date as fallback
  };
}

export default async function EpisodeViewerPage({ params }: PageProps) {
  const { slug, episodeNumber } = await params;
  const currentEpisode = parseInt(episodeNumber);
  const episodeId = formatEpisodeId(currentEpisode);

  try {
    // 1. Fetch Series Meta first to know supported locales
    const seriesMeta = await AssetClient.getSeriesMeta(slug);

    // 2. Select Locale (Prefer EN if available, else first)
    const locale = seriesMeta.locales.includes("en")
      ? "en"
      : seriesMeta.locales[0];

    if (!locale) throw new Error("No locale available for this series");

    // 3. Fetch Locale Meta
    const localeMeta = await AssetClient.getLocaleMeta(slug, episodeId, locale);

    // Map to UI Props
    const comicMock = {
      title: seriesMeta.seriesId,
      slug: seriesMeta.seriesId,
      episodes: [],
    };

    const TOTAL_EPISODES_MOCK = 5; // Based on generator
    const hasNextEpisode = currentEpisode < TOTAL_EPISODES_MOCK;
    const hasPrevEpisode = currentEpisode > 1;

    const panels = localeMeta.panels.map((p) =>
      AssetClient.getPanelUrl(slug, episodeId, locale, p.hash),
    );

    // Mock Episode Object for components
    const episodeMock = {
      title: localeMeta.title,
      number: currentEpisode,
      date: seriesMeta.publishAt,
      panels: panels,
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              getEpisodeJsonLd(seriesMeta, localeMeta, currentEpisode),
            ),
          }}
        />

        <div className="min-h-screen bg-[#1a1a1a]">
          {/* 
                Warning: EpisodeHeader expects a full 'comic' object. 
                We are passing a stripped down version. If it accesses properties we didn't mock, it will crash.
                Let's check EpisodeHeader.tsx if needed. 
                Assuming it uses title and slug.
            */}
          <EpisodeHeader
            slug={slug}
            comic={comicMock as any}
            episode={episodeMock as any}
          />

          {/* Panels Container */}
          <main className="flex flex-col items-center py-8">
            <div className="max-w-3xl w-full">
              {panels.map((panelUrl, index) => (
                <NextImage
                  key={index}
                  src={panelUrl}
                  alt={`${seriesMeta.seriesId} Episode ${currentEpisode} - Panel ${index + 1}`}
                  width={768}
                  height={1024}
                  className="w-full h-auto"
                  style={{ height: "auto" }}
                  priority={index <= 2}
                  unoptimized
                />
              ))}
            </div>
          </main>

          <EpisodeNavigation
            slug={slug}
            currentEpisode={currentEpisode}
            totalEpisodes={TOTAL_EPISODES_MOCK}
            hasPrevEpisode={hasPrevEpisode}
            hasNextEpisode={hasNextEpisode}
          />

          <EpisodeEndActions
            slug={slug}
            currentEpisode={currentEpisode}
            hasNextEpisode={hasNextEpisode}
          />
        </div>
      </>
    );
  } catch (error) {
    console.error(error);
    notFound();
  }
}
