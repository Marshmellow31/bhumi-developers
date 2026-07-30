"use client";

import VideoBackground from "./VideoBackground";

export default function YouTubeBackground({
  videoId,
  poster,
  onProgress,
}: {
  videoId?: string;
  poster?: string;
  onProgress?: (loading: boolean) => void;
  priority?: string;
}) {
  const src =
    videoId === "e5smuG9DGlk"
      ? "/videos/homepage-video.mp4"
      : "/videos/sustainability.mp4";

  return (
    <VideoBackground
      src={src}
      poster={poster}
      onLoaded={() => onProgress?.(false)}
    />
  );
}
