"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* Phones / Save-Data connections skip the YouTube player entirely and keep
   the poster — the embed costs ~1 MB of iframe JS plus video streaming. */
function videoDisabled() {
  return (
    window.matchMedia("(max-width: 767px)").matches ||
    ((navigator as { connection?: { saveData?: boolean } }).connection?.saveData ?? false)
  );
}

/* Minimal typings for the YouTube IFrame Player API */
type YTPlayer = {
  mute: () => void;
  playVideo: () => void;
  pauseVideo: () => void;
  destroy: () => void;
  getIframe: () => HTMLIFrameElement;
  getAvailableQualityLevels?: () => string[];
  setPlaybackQuality?: (q: string) => void;
};

declare global {
  interface Window {
    YT?: {
      Player: new (el: HTMLElement, opts: unknown) => YTPlayer;
      PlayerState: { PLAYING: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

/* Load the IFrame API once, shared across all instances */
let apiPromise: Promise<NonNullable<Window["YT"]>> | null = null;
function loadYouTubeAPI() {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (!apiPromise) {
    apiPromise = new Promise((resolve) => {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prev?.();
        resolve(window.YT!);
      };
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    });
  }
  return apiPromise;
}

/* Ask the player for its best available quality (top of the list) */
function forceHighestQuality(player: YTPlayer) {
  const levels = player.getAvailableQualityLevels?.() ?? [];
  const best = levels.length > 0 ? levels[0] : "highres";
  player.setPlaybackQuality?.(best);
}

/* YouTube's center control overlay stays on screen for ~3s after playback
   starts before auto-hiding; the video can never be revealed sooner. Once
   revealed, we never re-cover it again (see revealedOnce), so a tab switch
   or a mid-playback buffer stall can't bring the overlay-wait back. */
const OVERLAY_HIDE_MS = 3500;

const TICK_MS = 200;

/* ────────────────────────────────────────────────────────────────────────
   Session player cache.
   Each video gets ONE iframe for the whole session, living in a fixed
   full-viewport layer appended to <body>. It is NEVER moved in the DOM —
   reparenting an iframe makes browsers reload it, dropping the media
   buffer. Instead, the section aligns the layer to itself every frame and
   the player is paused/hidden (buffer intact) while its page is away, so
   returning resumes from memory instead of re-downloading the video.
   ──────────────────────────────────────────────────────────────────────── */
type CacheEntry = {
  wrapper: HTMLDivElement;
  player: YTPlayer | null;
  /** performance.now() when the current playback run started; 0 = not playing */
  playingSince: number;
  /** The video already revealed once this session — skip the buffer wait */
  revealedOnce: boolean;
  /** Section element the layer is currently aligned to (null = parked) */
  anchor: HTMLElement | null;
  raf: number;
  /** Last time we countered YouTube's background-tab auto-pause */
  lastAutoResume: number;
  subs: Set<() => void>;
};

const playerCache = new Map<string, CacheEntry>();

/* Low-priority videos wait for the primary (hero) video to reveal before
   loading, so they don't compete with it for bandwidth on first visit. */
let primaryRevealed = false;
const deferredWaiters: (() => void)[] = [];
function releaseDeferred() {
  if (primaryRevealed) return;
  primaryRevealed = true;
  deferredWaiters.splice(0).forEach((fn) => fn());
}
function whenPrimaryReady(timeoutMs = 12000): Promise<void> {
  if (primaryRevealed) return Promise.resolve();
  return new Promise((resolve) => {
    const fallback = setTimeout(resolve, timeoutMs);
    deferredWaiters.push(() => {
      clearTimeout(fallback);
      resolve();
    });
  });
}

/* YouTube pauses muted embeds in hidden tabs. Resume any attached player
   when the tab becomes visible again, so returning to the tab doesn't
   restart the reveal sequence from scratch. */
let visibilityHooked = false;
function hookVisibility() {
  if (visibilityHooked) return;
  visibilityHooked = true;
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState !== "visible") return;
    playerCache.forEach((e) => {
      if (e.anchor && !e.playingSince) e.player?.playVideo();
    });
  });
}

function ensureEntry(videoId: string, defer: boolean): CacheEntry {
  hookVisibility();
  let entry = playerCache.get(videoId);
  if (entry) return entry;

  const wrapper = document.createElement("div");
  wrapper.setAttribute("aria-hidden", "true");
  Object.assign(wrapper.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    backgroundColor: "#111111",
    zIndex: "0",
    visibility: "hidden",
    pointerEvents: "none",
    willChange: "transform",
  });

  /* Oversized 16:9 sizer so the video covers the layer, controls bleed off-frame */
  const sizer = document.createElement("div");
  Object.assign(sizer.style, {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "calc(177.78vh + 300px)",
    height: "calc(56.25vw + 300px)",
    minWidth: "calc(100% + 300px)",
    minHeight: "calc(100% + 300px)",
  });
  const mount = document.createElement("div");
  sizer.appendChild(mount);
  wrapper.appendChild(sizer);
  document.body.appendChild(wrapper);

  const e: CacheEntry = {
    wrapper,
    player: null,
    playingSince: 0,
    revealedOnce: false,
    anchor: null,
    raf: 0,
    lastAutoResume: 0,
    subs: new Set(),
  };
  entry = e;
  playerCache.set(videoId, e);

  (defer ? whenPrimaryReady() : Promise.resolve())
    .then(loadYouTubeAPI)
    .then((YT) => {
      e.player = new YT.Player(mount, {
      videoId,
      width: "100%",
      height: "100%",
      host: "https://www.youtube-nocookie.com",
      playerVars: {
        autoplay: 1,
        mute: 1,
        controls: 0,
        disablekb: 1,
        fs: 0,
        rel: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        playsinline: 1,
        loop: 1,
        playlist: videoId,
      },
      events: {
        onReady: (ev: { target: YTPlayer }) => {
          ev.target.mute();
          forceHighestQuality(ev.target);
          const iframe = ev.target.getIframe();
          iframe.style.width = "100%";
          iframe.style.height = "100%";
          iframe.style.pointerEvents = "none";
          iframe.style.border = "0";
          if (e.anchor) ev.target.playVideo();
          else ev.target.pauseVideo();
        },
        onStateChange: (ev: { data: number; target: YTPlayer }) => {
          if (ev.data === YT.PlayerState.PLAYING) {
            if (!e.playingSince) e.playingSince = performance.now();
            forceHighestQuality(ev.target);
          } else {
            e.playingSince = 0;
            /* We didn't pause it and the tab is hidden — YouTube's
               background auto-pause. Resume right away so the video is
               already playing (and revealed) when the viewer returns. */
            const now = performance.now();
            if (e.anchor && document.hidden && now - e.lastAutoResume > 2000) {
              e.lastAutoResume = now;
              ev.target.playVideo();
            }
          }
          e.subs.forEach((fn) => fn());
        },
      },
    });
    });

  return e;
}

/* Align the fixed layer to the section every frame (Lenis scroll, resize…) */
function attachEntry(videoId: string, anchor: HTMLElement, defer: boolean): CacheEntry {
  const e = ensureEntry(videoId, defer);
  e.anchor = anchor;
  e.wrapper.style.visibility = "visible";
  e.player?.playVideo();

  cancelAnimationFrame(e.raf);
  const align = () => {
    if (!e.anchor) return;
    const rect = e.anchor.getBoundingClientRect();
    e.wrapper.style.width = `${rect.width}px`;
    e.wrapper.style.height = `${rect.height}px`;
    e.wrapper.style.transform = `translate3d(${rect.left}px, ${rect.top}px, 0)`;
    e.raf = requestAnimationFrame(align);
  };
  align();
  return e;
}

function detachEntry(e: CacheEntry) {
  e.anchor = null;
  cancelAnimationFrame(e.raf);
  e.wrapper.style.visibility = "hidden";
  e.player?.pauseVideo();
}

type Props = {
  videoId: string;
  /** Shown over the video until playback actually starts */
  poster?: string;
  /** Fires once, the first time the video is revealed */
  onPlaying?: () => void;
  /** true while the poster/cover is showing, false once the video is revealed */
  onProgress?: (loading: boolean) => void;
  /** "low" defers loading until the primary (hero) video has revealed */
  priority?: "high" | "low";
};

/**
 * Full-bleed muted looping YouTube background with no visible player UI.
 * The video renders in a session-persistent fixed layer (see cache above)
 * aligned behind this component; this component draws the cover on top
 * (poster or solid dark) until playback has run long enough for YouTube's
 * control overlay to auto-hide. Once revealed for the first time, the cover
 * never comes back for that video's session-lifetime — so pausing/buffering
 * from a background-tab auto-pause, or any other transient state change,
 * can't re-trigger the cover and cause a visible glitch on tab return.
 * Must be placed inside a full-viewport-height section. Overlays that must
 * sit above the video need an explicit z-index of 1 or higher.
 */
export default function YouTubeBackground({
  videoId,
  poster,
  onPlaying,
  onProgress,
  priority = "high",
}: Props) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const onPlayingRef = useRef(onPlaying);
  const onProgressRef = useRef(onProgress);
  useEffect(() => {
    onPlayingRef.current = onPlaying;
    onProgressRef.current = onProgress;
  }, [onPlaying, onProgress]);

  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!anchorRef.current) return;
    if (videoDisabled()) return; // poster-only: never boot the player
    const entry = attachEntry(videoId, anchorRef.current, priority === "low");

    let shown = false;
    let announced = false;

    const reveal = () => {
      if (shown) return;
      shown = true;
      entry.revealedOnce = true;
      releaseDeferred(); // primary is on screen — let deferred videos load
      setRevealed(true);
      onProgressRef.current?.(false);
      if (!announced) {
        announced = true;
        onPlayingRef.current?.();
      }
    };
    const conceal = () => {
      if (entry.revealedOnce || !shown) return; // never re-cover once revealed
      shown = false;
      setRevealed(false);
      onProgressRef.current?.(true);
    };

    /* already revealed earlier this session (e.g. remount) — skip the wait */
    if (entry.revealedOnce) {
      reveal();
      return () => detachEntry(entry);
    }

    /* mask instantly when playback stops before the first reveal */
    const onPlayerState = () => {
      if (!entry.playingSince) conceal();
    };
    entry.subs.add(onPlayerState);

    const tick = () => {
      if (entry.revealedOnce) return; // reveal() already ran via another tab/instance
      if (entry.playingSince && performance.now() - entry.playingSince >= OVERLAY_HIDE_MS) {
        reveal();
        return;
      }
      conceal();
    };

    onProgressRef.current?.(true);
    tick();
    const iv = setInterval(tick, TICK_MS);

    return () => {
      clearInterval(iv);
      entry.subs.delete(onPlayerState);
      detachEntry(entry);
      if (!entry.revealedOnce) onProgressRef.current?.(false);
    };
  }, [videoId, priority]);

  return (
    <div ref={anchorRef} className="absolute inset-0 pointer-events-none">
      {/* Cover: sits above the fixed video layer (z-1); fades out slowly on
          reveal, snaps back fast when the overlay returns */}
      <div
        aria-hidden
        className="absolute inset-0 transition-opacity ease-out"
        style={{
          zIndex: 1,
          transitionDuration: revealed ? "700ms" : "150ms",
          opacity: revealed ? 0 : 1,
          backgroundColor: "#111111",
        }}
      >
        {poster && (
          <Image
            src={poster}
            alt=""
            fill
            priority={priority === "high"}
            className="object-cover"
            sizes="100vw"
          />
        )}
      </div>
    </div>
  );
}
