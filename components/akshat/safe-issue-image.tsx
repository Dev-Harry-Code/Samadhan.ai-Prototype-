"use client";

import { useState } from "react";
import Image from "next/image";

const STOCK_IMAGES = [
  "https://images.pexels.com/photos/19156793/pexels-photo-19156793.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/13111211/pexels-photo-13111211.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/15480506/pexels-photo-15480506.jpeg?auto=compress&cs=tinysrgb&w=800",
];

function pickFallback(src: string): string {
  let hash = 0;
  for (let i = 0; i < src.length; i++) hash = (hash * 31 + src.charCodeAt(i)) >>> 0;
  return STOCK_IMAGES[hash % STOCK_IMAGES.length];
}

interface SafeIssueImageProps {
  src: string | null | undefined;
  alt: string;
  className?: string;
  sizes?: string;
}

export function SafeIssueImage({ src, alt, className, sizes }: SafeIssueImageProps) {
  const fallback = pickFallback(src ?? "fallback");
  const [prevSrc, setPrevSrc] = useState<string | null | undefined>(src);
  const [current, setCurrent] = useState(src || fallback);
  const [failed, setFailed] = useState(false);

  if (prevSrc !== src) {
    setPrevSrc(src);
    setCurrent(src || fallback);
    setFailed(false);
  }

  return (
    <Image
      src={failed ? fallback : current}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      onError={() => {
        if (!failed) setFailed(true);
      }}
    />
  );
}