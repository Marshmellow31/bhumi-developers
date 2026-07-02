"use client";

import ReactDOM from "react-dom";

/** Resource hints so the hero video player and its poster start loading
 *  as early as possible (see docs: generate-metadata → Resource hints). */
export default function PreloadResources() {
  ReactDOM.preload("/images/background.webp", { as: "image" });
  ReactDOM.preconnect("https://www.youtube-nocookie.com");
  ReactDOM.preconnect("https://www.youtube.com");
  ReactDOM.preconnect("https://i.ytimg.com");
  return null;
}
