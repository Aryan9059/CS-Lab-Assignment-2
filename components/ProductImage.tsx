"use client";

import Image from "next/image";
import { useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";

interface ProductImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
}

/**
 * Wraps next/image with a graceful placeholder fallback.
 * When the image file is missing or fails to load, shows a
 * styled placeholder with a PhotoIcon so the layout never breaks.
 * Drop images into /public/images/products/ to make them appear.
 */
export default function ProductImage({
  src,
  alt,
  fill = true,
  className = "object-cover",
  sizes = "(max-width: 768px) 100vw, 50vw",
}: ProductImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#4A1080] to-[#320A5E] flex flex-col items-center justify-center gap-2">
        <PhotoIcon className="w-10 h-10 text-white/25" />
        <span className="text-white/30 text-xs font-medium">Image coming soon</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      sizes={sizes}
      className={className}
      onError={() => setError(true)}
    />
  );
}
