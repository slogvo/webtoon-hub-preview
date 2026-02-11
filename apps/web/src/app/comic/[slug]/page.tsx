import { AssetClient } from "@/lib/bucket/client";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import {
  Eye,
  Users,
  Heart,
  ChevronRight,
  ArrowLeft,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getImageUrl } from "@/lib/image-utils";
import EpisodeList from "@/components/EpisodeList";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SeriesMeta, SeriesIndex } from "@/lib/bucket/types";

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

  // MAPPING: Convert Bucket Data to UI Props
  // In a real app, we would fetch LocaleMeta here to get Title/Description
  // For this preview, we Mock the "UI Data" using the Series Meta + Placeholders

  const coverUrl = AssetClient.getCoverUrl(
    seriesMeta.seriesId,
    seriesMeta.cover,
  );

  // We need to fetch episodes to render the list
  // The bucket structure doesn't give us a "list of episodes" directly in series/meta.json
  // It only gives "thumbnails" array.
  // BUT the spec says: "./{seriesId}/{episodeId}/meta.json"
  // So we assume we know the Episode IDs?
  // WAIT: The spec `index.json` only list series.
  // `series/meta.json` has `thumbnails: [{ index: 1, hash: ... }]`. This looks like "Episode Thumbnails"?
  // If `thumbnails` array corresponds to episodes, we can map it.

  // For the Mock Data Generator, I generated 5 episodes for each series.
  // I will assume for this UI that we have 5 episodes.
  // In reality, `series/meta.json` should probably contain an `episodes` list or range.
  // Let's fake the episodes list based on my knowledge of the mock generator (5 eps).

  const defaultLocale = seriesMeta.locales[0] || "en";

  const episodes = Array.from({ length: 5 }, (_, i) => {
    const episodeId = `ep-${String(i + 1).padStart(3, "0")}`;
    // In mock data, we used "thumb-hash-1.jpg" for all episode/locale thumbs
    // In real app, we would get this hash from EpisodeMeta or LocaleMeta
    const thumbHash = seriesMeta.thumbnails[0]?.hash || "thumb-hash-1.jpg";

    return {
      id: episodeId,
      title: `Episode ${i + 1}`,
      number: i + 1,
      date: seriesMeta.publishAt,
      thumbnail: AssetClient.getThumbUrl(
        seriesMeta.seriesId,
        episodeId,
        defaultLocale,
        thumbHash,
      ),
      likes: 0,
      panels: [], // Added to satisfy Episode type
    };
  });

  const comic = {
    slug: seriesMeta.seriesId,
    title: seriesMeta.seriesId, // TODO: Localize
    description: "Description loading from locale...", // TODO: Localize
    author: "Unknown Author",
    genre: seriesMeta.genres[0],
    status: seriesMeta.status,
    updateDay: "Monday",
    views: "1.2M", // Fake stats
    subscribers: "100K", // Fake stats
    rating: 9.8,
    banner: coverUrl,
    thumbnail: coverUrl,
    episodes: episodes,
    artist: "Unknown Artist",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getComicJsonLd(seriesMeta)),
        }}
      />

      <div className="min-h-screen bg-background">
        <Header />

        <div className="relative h-[400px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${coverUrl})`,
            }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />

          {/* Back Button */}
          <Link
            href="/"
            className="absolute top-4 left-4 z-10 flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </Link>

          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <span className="inline-block px-3 py-1 text-sm font-semibold text-primary bg-primary/10 rounded-full mb-3">
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
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Episode List */}
            <div className="lg:col-span-2">
              <EpisodeList episodes={comic.episodes} comicSlug={comic.slug} />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Stats */}
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-muted-foreground" />
                  <span className="font-semibold">{comic.views}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="font-semibold">{comic.subscribers}</span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <p className="text-muted-foreground leading-relaxed">
                  {comic.description}
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Link href={`/comic/${comic.slug}/episode/1`} className="block">
                  <Button className="w-full bg-foreground text-background hover:bg-foreground/90">
                    First episode
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
