import { useParams, Link } from "react-router-dom";
import {
  Eye,
  Users,
  Heart,
  ChevronRight,
  ArrowLeft,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getComicBySlug } from "@/data/mockData";
import EpisodeList from "@/components/EpisodeList";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ComicDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const comic = getComicBySlug(slug || "");

  if (!comic) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Comic not found</h1>
          <Link to="/" className="text-primary hover:underline">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Banner Section */}
      <div className="relative h-[400px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${comic.banner})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

        {/* Back Button */}
        <Link
          to="/"
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
            {/* App Promo Banner */}
            <div className="bg-muted rounded-lg p-4 mb-6 flex items-center justify-between">
              <div>
                <span className="text-primary font-semibold">
                  Read 5 new episodes only on the app!
                </span>
                <p className="text-sm text-muted-foreground mt-1">
                  Scan the QR code to download the WEBTOON app
                </p>
              </div>
              <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center">
                <span className="text-xs text-muted-foreground">QR</span>
              </div>
            </div>

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

            {/* Update Schedule */}
            <div className="flex items-center gap-2 mb-6">
              <span className="px-2 py-1 text-xs font-bold bg-primary text-primary-foreground rounded">
                UP
              </span>
              <span className="font-semibold">{comic.updateDay}</span>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-muted-foreground leading-relaxed">
                {comic.description}
              </p>
              <p className="text-sm text-muted-foreground mt-4 italic">
                This series is rated Young Adult. Please review the Content
                Ratings page for more information.
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Link to={`/comic/${comic.slug}/episode/1`} className="block">
                <Button className="w-full bg-foreground text-background hover:bg-foreground/90">
                  First episode
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Button variant="outline" className="w-full">
                <Heart className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="flex-1">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ComicDetail;
