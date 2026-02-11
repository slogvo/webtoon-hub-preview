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
import { SmartImage } from "@/components/SmartImage";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Helper to get series data with error handling
async function getSeriesData(seriesId: string): Promise<SeriesMeta | null> {
  try {
    return await AssetClient.getSeriesMeta(seriesId);
  } catch (e) {
    console.error(`Failed to fetch series: ${seriesId}`, e);
    return null;
  }
}

// Generate dynamic metadata for SEO
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug: seriesId } = await params;
  const seriesMeta = await getSeriesData(seriesId);

  if (!seriesMeta) {
    return {
      title: "Comic Not Found",
    };
  }

  const title = seriesMeta.title || seriesMeta.seriesId.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
  const description = `Read ${title} online.`;
  const coverUrl = AssetClient.getImageUrl(seriesMeta.cover);

  return {
    title: title,
    description: description,
    openGraph: {
      type: "article",
      title: title,
      description: description,
      url: `/comic/${seriesId}`,
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
  const title = seriesMeta.title || seriesMeta.seriesId.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
  const coverUrl = AssetClient.getImageUrl(seriesMeta.cover);

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
  };
}

export default async function ComicDetailPage({ params }: PageProps) {
  const { slug: seriesId } = await params;
  const seriesMeta = await getSeriesData(seriesId);

  if (!seriesMeta) {
    notFound();
  }

  const coverUrl = AssetClient.getImageUrl(seriesMeta.cover);
  const title = seriesMeta.title || seriesMeta.seriesId.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());

  const episodes = (seriesMeta.episodes || []).map((ep, i) => {
    return {
      id: ep.episodeId,
      title: ep.title || ep.episodeId.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
      number: i + 1,
      date: seriesMeta.publishAt || "",
      thumbnail: coverUrl, // Using cover as thumbnail fallback for list
      likes: 0,
    };
  });

  const comic = {
    seriesId: seriesMeta.seriesId,
    title: title,
    description: seriesMeta.description || "Discover this amazing story on WEBTOON Hub. Follow the journey of characters as they navigate through challenges and adventures.",
    author: seriesMeta.author || "Original Author",
    genre: seriesMeta.genres[0] || "Webtoon",
    status: seriesMeta.status,
    updateDay: "Daily",
    views: "1.2M",
    subscribers: "100K",
    rating: 9.8,
    banner: coverUrl,
    thumbnail: coverUrl,
    episodes: episodes,
    artist: seriesMeta.artist || "Original Artist",
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
          <SmartImage
            src={coverUrl}
            alt={title}
            fill
            className="object-cover"
            priority
            unoptimized
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
              <EpisodeList episodes={comic.episodes} comicId={comic.seriesId} />
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
                {comic.episodes.length > 0 && (
                  <Link href={`/comic/${comic.seriesId}/episode/${comic.episodes[0].id}`} className="block">
                    <Button className="w-full h-12 text-base font-bold bg-primary text-primary-foreground hover:bg-primary/90 rounded-full">
                      Read First Episode
                      <ChevronRight className="w-5 h-5 ml-1" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
