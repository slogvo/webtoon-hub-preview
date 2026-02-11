import { AssetClient } from "@/lib/bucket/client";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import NextImage from "next/image";
import { EpisodeHeader } from "@/components/episode/EpisodeHeader";
import { EpisodeNavigation } from "@/components/episode/EpisodeNavigation";
import { EpisodeEndActions } from "@/components/episode/EpisodeEndActions";
import { SeriesMeta, EpisodeMeta } from "@/lib/bucket/types";

interface PageProps {
  params: Promise<{ slug: string; episodeId: string }>;
}

// Helper to get series data with error handling
async function getSeriesData(slug: string): Promise<SeriesMeta | null> {
  try {
    return await AssetClient.getSeriesMeta(slug);
  } catch (e) {
    console.error(`Failed to fetch series: ${slug}`, e);
    return null;
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, episodeId } = await params;

  try {
    const seriesMeta = await AssetClient.getSeriesMeta(slug);
    const episodeSummary = seriesMeta.episodes.find(ep => ep.episodeId === episodeId);
    if (!episodeSummary) throw new Error("Episode not found in series list");

    const episodeMeta = await AssetClient.getEpisodeMeta(episodeSummary.url);

    const title = `${episodeMeta.title || episodeMeta.episodeId} - ${seriesMeta.seriesId.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())}`;
    const desc = `Read ${title} online.`;
    const coverUrl = AssetClient.getImageUrl(seriesMeta.cover);

    return {
      title: title,
      description: desc,
      openGraph: {
        images: [{ url: coverUrl }],
      },
    };
  } catch {
    return { title: "Episode Not Found" };
  }
}

// JSON-LD for Episode
function getEpisodeJsonLd(
  seriesMeta: SeriesMeta,
  episodeMeta: EpisodeMeta,
  episodeNumber: number,
) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://webtoon-hub.com";
  const coverUrl = AssetClient.getImageUrl(seriesMeta.cover);

  return {
    "@context": "https://schema.org",
    "@type": "Chapter",
    name: episodeMeta.title || episodeMeta.episodeId,
    isPartOf: {
      "@type": "ComicSeries",
      name: seriesMeta.seriesId,
      url: `${siteUrl}/comic/${seriesMeta.seriesId}`,
    },
    position: episodeNumber,
    url: `${siteUrl}/comic/${seriesMeta.seriesId}/episode/${episodeMeta.episodeId}`,
    image: coverUrl,
    datePublished: seriesMeta.publishAt,
  };
}

export default async function EpisodeViewerPage({ params }: PageProps) {
  const { slug, episodeId } = await params;

  // 1. Fetch Series Meta
  const seriesMeta = await getSeriesData(slug);
  if (!seriesMeta) notFound();

  // 2. Find Episode in series list
  const episodeIndex = seriesMeta.episodes.findIndex(ep => ep.episodeId === episodeId);
  if (episodeIndex === -1) notFound();
  
  const episodeSummary = seriesMeta.episodes[episodeIndex];

  // 3. Fetch Episode Meta
  let episodeMeta;
  try {
    episodeMeta = await AssetClient.getEpisodeMeta(episodeSummary.url);
  } catch (e) {
    console.error(`Failed to fetch episode: ${episodeSummary.url}`, e);
    notFound();
  }

  // 4. Calculate prev/next
  const prevEpisodeId = episodeIndex > 0 ? seriesMeta.episodes[episodeIndex - 1].episodeId : null;
  const nextEpisodeId = episodeIndex < seriesMeta.episodes.length - 1 ? seriesMeta.episodes[episodeIndex + 1].episodeId : null;

  const panels = episodeMeta.panels.map((p) =>
    AssetClient.getImageUrl(p.url),
  );

  const comicProps = {
    title: seriesMeta.seriesId.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
    slug: seriesMeta.seriesId,
  };

  const episodeProps = {
    title: episodeMeta.title || episodeMeta.episodeId.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
    number: episodeIndex + 1,
    date: episodeMeta.publishAt || seriesMeta.publishAt,
    panels: panels,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getEpisodeJsonLd(seriesMeta, episodeMeta, episodeIndex + 1),
          ),
        }}
      />

      <div className="min-h-screen bg-background no-layout">
        <EpisodeHeader
          slug={slug}
          comic={comicProps as any}
          episode={episodeProps as any}
        />

        {/* Panels Container */}
        <main className="flex flex-col items-center py-8">
          <div className="max-w-3xl w-full">
            {panels.map((panelUrl, index) => (
              <NextImage
                key={index}
                src={panelUrl}
                alt={`${seriesMeta.seriesId} - Episode ${episodeIndex + 1} - Panel ${index + 1}`}
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
          currentEpisodeNumber={episodeProps.number}
          totalEpisodes={seriesMeta.episodes.length}
          prevEpisodeId={prevEpisodeId}
          nextEpisodeId={nextEpisodeId}
        />

        <EpisodeEndActions
          slug={slug}
          currentEpisodeNumber={episodeProps.number}
          nextEpisodeId={nextEpisodeId}
        />
      </div>
    </>
  );
}
