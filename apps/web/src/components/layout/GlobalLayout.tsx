"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // Hide Header/Footer on episode viewer pages
  // Pattern: /comic/[slug]/episode/[episodeId]
  const isEpisodePage = pathname?.includes("/episode/");

  return (
    <div className="bg-background text-foreground min-h-screen transition-colors duration-300">
      {!isEpisodePage && (
        <>
          <Header />
          <div className="h-20 lg:h-[84px] header-spacer" />
        </>
      )}
      <main>{children}</main>
      {!isEpisodePage && <Footer />}
    </div>
  );
}
