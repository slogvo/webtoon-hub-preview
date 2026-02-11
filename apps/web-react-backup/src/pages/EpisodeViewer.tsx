import { useParams, Link, useNavigate } from "react-router-dom";
import { getComicBySlug } from "@/data/mockData";
import { EpisodeHeader } from "@/components/episode/EpisodeHeader";
import { EpisodeNavigation } from "@/components/episode/EpisodeNavigation";
import { EpisodeEndActions } from "@/components/episode/EpisodeEndActions";
import GenericSeo from "@/components/seo/generic-seo";

const EpisodeViewer = () => {
  const { slug, episodeNumber } = useParams<{
    slug: string;
    episodeNumber: string;
  }>();
  const navigate = useNavigate();
  const comic = getComicBySlug(slug || "");
  const currentEpisode = parseInt(episodeNumber || "1");

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

  const episode = comic.episodes.find((ep) => ep.number === currentEpisode);
  const hasNextEpisode = currentEpisode < comic.episodes.length;
  const hasPrevEpisode = currentEpisode > 1;

  if (!episode) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Episode not found</h1>
          <Link to={`/comic/${slug}`} className="text-primary hover:underline">
            Go back to comic
          </Link>
        </div>
      </div>
    );
  }

  const goToPrevEpisode = () => {
    if (hasPrevEpisode) {
      navigate(`/comic/${slug}/episode/${currentEpisode - 1}`);
    }
  };

  const goToNextEpisode = () => {
    if (hasNextEpisode) {
      navigate(`/comic/${slug}/episode/${currentEpisode + 1}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <GenericSeo
        title={`${episode.title} - ${comic.title}`}
        description={`Read ${comic.title} - Episode ${episode.number}: ${episode.title} online for free.`}
        ogImage={episode.thumbnail}
      />

      <EpisodeHeader slug={slug || ""} comic={comic} episode={episode} />

      {/* Panels Container */}
      <main className="flex flex-col items-center py-8">
        <div className="max-w-3xl w-full">
          {episode.panels.map((panel, index) => (
            <img
              key={index}
              src={panel}
              alt={`Panel ${index + 1}`}
              className="w-full h-auto"
              loading={index > 2 ? "lazy" : "eager"}
            />
          ))}
        </div>
      </main>

      <EpisodeNavigation
        currentEpisode={currentEpisode}
        totalEpisodes={comic.episodes.length}
        hasPrevEpisode={hasPrevEpisode}
        hasNextEpisode={hasNextEpisode}
        onPrev={goToPrevEpisode}
        onNext={goToNextEpisode}
      />

      {/* End of Episode Actions */}
      <EpisodeEndActions
        currentEpisode={currentEpisode}
        hasNextEpisode={hasNextEpisode}
        onNext={goToNextEpisode}
      />
    </div>
  );
};

export default EpisodeViewer;
