import { Helmet } from "react-helmet-async";

interface GenericSeoProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
}

const GenericSeo = ({
  title = "Webtoon Hub",
  description = "Your favorite webtoons in one place.",
  canonical,
  ogImage,
  noindex = false,
}: GenericSeoProps) => {
  const metaDescription = description;
  const metaTitle = title;
  const metaCanonical = canonical || window.location.href;

  return (
    <Helmet>
      {/* Basic */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={metaCanonical} />

      {/* Noindex */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={metaCanonical} />
      {ogImage && <meta property="og:image" content={ogImage} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
    </Helmet>
  );
};

export default GenericSeo;
