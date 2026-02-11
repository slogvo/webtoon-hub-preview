import TrendingSection from "@/components/TrendingSection";
import CategorySection from "@/components/CategorySection";
// import DailySchedule from "@/components/DailySchedule";
import { AssetClient } from "@/lib/bucket/client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WEBTOON Hub - Read Comics Online",
  description: "Discover and read thousands of free digital comics, manga, and manhwa online.",
};

// JSON-LD Structured Data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "WEBTOON Hub",
  url: "https://webtoon-hub.com",
};

export default async function HomePage() {
  const index = await AssetClient.getSeriesIndex().catch((e) => {
    console.error("Failed to fetch series index:", e);
    return { series: [], updatedAt: "" };
  });

  const allSeries = index.series;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex flex-col gap-12 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TrendingSection series={allSeries} />
        <CategorySection series={allSeries} />
        {/* <DailySchedule series={allSeries} /> */}
      </div>
    </>
  );
}
