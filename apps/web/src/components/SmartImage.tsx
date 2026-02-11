"use client";

import { useState } from "react";
import Image, { ImageProps, StaticImageData } from "next/image";

type ImageSrc = string | StaticImageData;

interface SmartImageProps extends Omit<ImageProps, "src" | "onError"> {
  src: ImageSrc;
  fallbackSuffix?: string;
  originalSuffix?: string;
}

/**
 * A wrapper around Next.js Image that handles automatic fallback for naming mismatches.
 * Specifically handles the case where a "-1.webp" file might not exist but ".webp" does.
 */
export const SmartImage = ({
  src,
  fallbackSuffix = ".webp",
  originalSuffix = "-1.webp",
  alt,
  ...props
}: SmartImageProps) => {
  const [imgSrc, setImgSrc] = useState<ImageSrc>(src);
  const [hasTriedFallback, setHasTriedFallback] = useState(false);
  const [prevSrc, setPrevSrc] = useState<ImageSrc>(src);

  // Sync internal state with prop changes during render
  if (src !== prevSrc) {
    setImgSrc(src);
    setHasTriedFallback(false);
    setPrevSrc(src);
  }

  const handleError = () => {
    if (!hasTriedFallback && typeof imgSrc === "string" && imgSrc.includes(originalSuffix)) {
      const fallbackUrl = imgSrc.replace(originalSuffix, fallbackSuffix);
      console.log(`SmartImage fallback: ${imgSrc} -> ${fallbackUrl}`);
      setImgSrc(fallbackUrl);
      setHasTriedFallback(true);
    }
  };

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={handleError}
    />
  );
};
