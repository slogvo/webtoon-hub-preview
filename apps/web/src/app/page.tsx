import Header from "@/components/Header";
import TrendingSection from "@/components/TrendingSection";
import PromoBanner from "@/components/PromoBanner";
import CategorySection from "@/components/CategorySection";
import NewOnWebtoon from "@/components/NewOnWebtoon";
import DailySchedule from "@/components/DailySchedule";
import Footer from "@/components/Footer";
import RecentlyViewed from "@/components/RecentlyViewed";

// JSON-LD Structured Data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "WEBTOON Hub",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://webtoon-hub.com",
  description:
    "Discover and read thousands of free digital comics, manga, and manhwa online.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || "https://webtoon-hub.com"}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
  publisher: {
    "@type": "Organization",
    name: "WEBTOON Hub",
    logo: {
      "@type": "ImageObject",
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://webtoon-hub.com"}/logo.png`,
    },
  },
};

export default function HomePage() {
  return (
    <>
      {/* JSON-LD for rich search results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <TrendingSection />
          <PromoBanner />
          <CategorySection />
          <NewOnWebtoon />
          <DailySchedule />
        </main>
        <Footer />
        <RecentlyViewed />
      </div>
    </>
  );
}
