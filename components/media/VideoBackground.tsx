"use client";

import { useEffect, useRef, useState } from "react";

interface VideoBackgroundProps {
  src: string;
  poster?: string;
  className?: string;
  onLoaded?: () => void;
}

export default function VideoBackground({
  src,
  poster,
  className = "",
  onLoaded,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoaded = () => {
      setIsLoaded(true);
      if (onLoaded) onLoaded();
    };

    if (video.readyState >= 2) {
      handleLoaded();
    } else {
      video.addEventListener("loadeddata", handleLoaded);
      video.addEventListener("canplay", handleLoaded);
      video.addEventListener("playing", handleLoaded);
    }

    video.play().catch(() => {
      // Auto-play handled by muted attribute
    });

    return () => {
      video.removeEventListener("loadeddata", handleLoaded);
      video.removeEventListener("canplay", handleLoaded);
      video.removeEventListener("playing", handleLoaded);
    };
  }, [src, onLoaded]);

  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 ${className}`}>
      {poster && (
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 z-[1] ${
            isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          style={{ backgroundImage: `url("${poster}")` }}
        />
      )}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
    </div>
  );
}
