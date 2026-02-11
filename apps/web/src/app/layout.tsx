import type { Metadata, Viewport } from "next";
import { Funnel_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryProvider } from "@/components/providers/query-provider";
import GlobalLayout from "@/components/layout/GlobalLayout";
import "./globals.css";

const funnelSans = Funnel_Sans({
  variable: "--font-funnel-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

// ===== SEO Metadata (Next.js Metadata API) =====
export const metadata: Metadata = {
  title: {
    default: "4HumAI - AI for Humanity",
    template: "%s | 4HumAI",
  },
  description:
    "Discover and read thousands of free digital comics, manga, and manhwa online. WEBTOON offers the best storytelling experience with daily updates from top creators worldwide.",
  keywords: [
    "webtoon",
    "digital comics",
    "manga",
    "manhwa",
    "webcomics",
    "free comics",
    "online comics",
    "read comics",
    "korean comics",
    "webtoon hub",
  ],
  authors: [{ name: "WEBTOON Hub" }],
  creator: "WEBTOON Hub",
  publisher: "WEBTOON Hub",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://webtoon-hub.com",
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "WEBTOON Hub",
    title: "WEBTOON - Read Free Digital Comics Online",
    description:
      "Discover and read thousands of free digital comics, manga, and manhwa online.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "WEBTOON Hub - Read Free Comics Online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WEBTOON - Read Free Digital Comics Online",
    description:
      "Discover and read thousands of free digital comics, manga, and manhwa online.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#00dc64" },
    { media: "(prefers-color-scheme: dark)", color: "#121212" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${funnelSans.variable} font-sans antialiased`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <TooltipProvider delayDuration={0}>
                <GlobalLayout>{children}</GlobalLayout>
              <Toaster richColors position="top-right" />
            </TooltipProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
