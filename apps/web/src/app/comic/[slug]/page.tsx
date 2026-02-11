import { AssetClient } from "@/lib/bucket/client";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import {
  Eye,
  Users,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import EpisodeList from "@/components/EpisodeList";
import { SeriesMeta } from "@/lib/bucket/types";
import { format } from "date-fns";
import { comics } from "@/data/mockData";

interface PageProps {
  params: Promise<{ slug: string }>;
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

// Generate dynamic metadata for SEO
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const seriesMeta = await getSeriesData(slug);

  if (!seriesMeta) {
    return {
      title: "Comic Not Found",
    };
  }

  // TODO: Fetch title from LocaleMeta. For now using ID
  const title = seriesMeta.seriesId;
  const description = `Read ${title} online.`;
  const coverUrl = AssetClient.getCoverUrl(
    seriesMeta.seriesId,
    seriesMeta.cover,
  );

  return {
    title: title,
    description: description,
    openGraph: {
      type: "article",
      title: title,
      description: description,
      url: `/comic/${slug}`,
      siteName: "WEBTOON Hub",
      images: [
        {
          url: coverUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [coverUrl],
    },
  };
}

// JSON-LD for Comic Series
function getComicJsonLd(seriesMeta: SeriesMeta) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://webtoon-hub.com";
  const title = seriesMeta.seriesId; // Placeholder
  const coverUrl = AssetClient.getCoverUrl(
    seriesMeta.seriesId,
    seriesMeta.cover,
  );

  return {
    "@context": "https://schema.org",
    "@type": "ComicSeries",
    name: title,
    image: coverUrl,
    url: `${siteUrl}/comic/${seriesMeta.seriesId}`,
    publisher: {
      "@type": "Organization",
      name: "WEBTOON Hub",
    },
    // We don't have episode count easily accessible here without fetching more data
    // numberOfEpisodes: ...
  };
}

export default async function ComicDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const seriesMeta = await getSeriesData(slug);

  if (!seriesMeta) {
    notFound();
  }

  const mockSeries = comics.find(c => c.slug === seriesMeta.seriesId);

  const coverUrl = AssetClient.getCoverUrl(
    seriesMeta.seriesId,
    seriesMeta.cover,
  );

  const defaultLocale = seriesMeta.locales[0] || "en";

  const episodesCount = mockSeries ? mockSeries.episodes.length : 5;
  const episodes = Array.from({ length: episodesCount }, (_, i) => {
    const episodeId = `ep-${String(i + 1).padStart(3, "0")}`;
    // Using the first panel of each episode as an automatic thumbnail for better variety
    const panelHash = `panel-${seriesMeta.seriesId}-${episodeId}-${defaultLocale}-1.jpg`;

    return {
      id: episodeId,
      title: mockSeries?.episodes[i]?.title || `Episode ${i + 1}`,
      number: i + 1,
      date: seriesMeta.publishAt ? format(new Date(seriesMeta.publishAt), "MMM dd, yyyy") : "N/A",
      thumbnail: AssetClient.getPanelUrl(
        seriesMeta.seriesId,
        episodeId,
        defaultLocale,
        panelHash,
      ),
      likes: mockSeries?.episodes[i]?.likes || 0,
      panels: [],
    };
  });

  const comic = {
    slug: seriesMeta.seriesId,
    title: mockSeries?.title || seriesMeta.seriesId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    description: mockSeries?.description || "In a world of constant change, one warrior stands alone against the darkness. This epic journey explores themes of courage, sacrifice, and the search for truth.",
    author: mockSeries?.author || "Unknown Author",
    genre: seriesMeta.genres[0],
    status: seriesMeta.status,
    updateDay: mockSeries?.updateDay || "Monday",
    views: mockSeries?.views || "1.2M",
    subscribers: mockSeries?.subscribers || "100K",
    rating: mockSeries?.rating || 9.8,
    banner: coverUrl,
    thumbnail: coverUrl,
    episodes: episodes,
    artist: mockSeries?.artist || "Unknown Artist",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getComicJsonLd(seriesMeta)),
        }}
      />

      <div className="pb-20">
        <div className="relative h-[400px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${coverUrl})`,
            }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />

          {/* Header/Nav Wrapper inside container to avoid sát màn hình */}
          <div className="absolute top-0 left-0 right-0 z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-semibold text-sm">Back</span>
              </Link>
            </div>
          </div>

          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-white bg-primary rounded-full mb-4 shadow-lg shadow-primary/20">
                {comic.genre}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3 max-w-3xl leading-tight">
                {comic.title}
              </h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="font-medium">{comic.author}</span>
                {comic.artist && (
                  <>
                    <span>,</span>
                    <span>{comic.artist}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Episode List */}
            <div className="lg:col-span-2">
              <EpisodeList episodes={comic.episodes} comicSlug={comic.slug} />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Stats */}
              <div className="flex items-center gap-6 mb-8 bg-secondary/30 p-4 rounded-2xl">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-muted-foreground" />
                  <span className="font-bold">{comic.views}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="font-bold">{comic.subscribers}</span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-lg font-bold mb-3">About</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {comic.description}
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Link href={`/comic/${comic.slug}/episode/1`} className="block">
                  <Button className="w-full h-12 text-base font-bold bg-primary text-primary-foreground hover:bg-primary/90 rounded-full">
                    Read First Episode
                    <ChevronRight className="w-5 h-5 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
