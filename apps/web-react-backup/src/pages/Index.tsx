import Header from "@/components/Header";
import TrendingSection from "@/components/TrendingSection";
import PromoBanner from "@/components/PromoBanner";
import CategorySection from "@/components/CategorySection";
import NewOnWebtoon from "@/components/NewOnWebtoon";
import DailySchedule from "@/components/DailySchedule";
import Footer from "@/components/Footer";
import RecentlyViewed from "@/components/RecentlyViewed";

const Index = () => {
  return (
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
  );
};

export default Index;
