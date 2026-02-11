"use client";

import { useState } from "react";
import Image, { ImageProps, StaticImageData } from "next/image";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";

type ImageSrc = string | StaticImageData;

interface SmartImageProps extends Omit<ImageProps, "src" | "onError"> {
  src: ImageSrc;
  fallbackSuffix?: string;
  originalSuffix?: string;
}

/**
 * A wrapper around Next.js Image that handles automatic fallback for naming mismatches
 * and displays a skeleton while loading.
 */
export const SmartImage = ({
  src,
  fallbackSuffix = ".webp",
  originalSuffix = "-1.webp",
  alt,
  className,
  ...props
}: SmartImageProps) => {
  const [imgSrc, setImgSrc] = useState<ImageSrc>(src);
  const [hasTriedFallback, setHasTriedFallback] = useState(false);
  const [prevSrc, setPrevSrc] = useState<ImageSrc>(src);
  const [isLoading, setIsLoading] = useState(true);

  // Sync internal state with prop changes
  if (src !== prevSrc) {
    setImgSrc(src);
    setHasTriedFallback(false);
    setPrevSrc(src);
    setIsLoading(true);
  }

  const handleError = () => {
    if (!hasTriedFallback && typeof imgSrc === "string" && imgSrc.includes(originalSuffix)) {
      const fallbackUrl = imgSrc.replace(originalSuffix, fallbackSuffix);
      setImgSrc(fallbackUrl);
      setHasTriedFallback(true);
    } else {
      setIsLoading(false); // Stop loading if even fallback fails
    }
  };

  const isFill = "fill" in props && props.fill;

  return (
    <div className={cn(
      "overflow-hidden",
      isFill ? "absolute inset-0" : "relative",
      !isFill && className 
    )}>
      {isLoading && (
        <Skeleton className="absolute inset-0 z-10 rounded-inherit" />
      )}
      <Image
        {...props}
        src={imgSrc}
        alt={alt}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          className
        )}
        onLoad={() => setIsLoading(false)}
        onError={handleError}
      />
    </div>
  );
};
