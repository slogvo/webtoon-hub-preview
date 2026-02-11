import type { StaticImageData } from "next/image";

/**
 * Helper to get URL string from ImageSrc (string or StaticImageData)
 */
export type ImageSrc = string | StaticImageData;

export function getImageUrl(image: ImageSrc): string {
  if (typeof image === "string") {
    return image;
  }
  return image.src;
}
