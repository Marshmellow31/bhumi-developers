# Mobile Optimization Implementation Plan — Bhumi Developers

Most visitors browse property sites on phones over 4G. This plan is ordered by
impact: media weight first (it dwarfs everything else), then animation/touch
behavior, then bundle size, then a responsive QA sweep.

**Targets:** LCP < 2.5 s on 4G · CLS < 0.1 · INP < 200 ms · first-load page
weight < 2.5 MB · Lighthouse mobile ≥ 85.

---

## Audit findings (measured, current state)

| Finding | Where | Cost on mobile |
|---|---|---|
| Raw CSS `background-image` divs — no responsive sizes, no lazy-load, no alt | `ProjectShowcase.tsx:49` (every card on /projects), `PhilosophySection.tsx:143` (home carousel), `AboutSnippet.tsx:42` (founder photo), `HotelsClient.tsx:69`, `DownloadsClient.tsx:161` | Full-resolution images shipped to 360-px screens |
| City Center project video is a 25 MB local mp4 | `videos/city-center/use.mp4` via `ProjectGallerySection` | 25 MB on cellular |
| ~62 MB of videos in repo appear unused since the YouTube switch | `sustainability.mp4` (31.6 MB), `homepage-video.mp4` (17.1 MB), `city-center/homepage-video.mp4` (13.3 MB) | Repo bloat + risk of accidental use |
| PageLoader shows a 2.9 s brand overlay on first visit | `components/ui/PageLoader.tsx` | +2.9 s before content on the slowest visit (first one) |
| Two YouTube background embeds on the home page | `HeroSection`, `SustainabilitySection` | Each iframe pulls ~0.5–1 MB of YouTube JS + streams video |
| Lenis smooth-scroll runs a permanent rAF loop on all devices | `components/ui/LenisProvider.tsx` | CPU/battery on phones; native touch scroll doesn't need it |
| Contact popup is a full-screen modal at 15 s on all devices | `components/ui/ContactPopup.tsx` | Intrusive on small screens |
| Playfair Display loads 6 font weights (400–900) | `app/layout.tsx` | ~30–50 KB per weight |
| `framer-motion` fully imported in every section | all `components/home/*`, clients | ~35 KB gz that LazyMotion can cut |
| Award certificate PNGs are 1.9–3.2 MB source files | `public/images/about/*.png` | Served via next/image (mitigated) — source hygiene only |
| Already good ✅ | CustomCursor skips touch (`pointer: coarse`), `viewport={{ once: true }}` used, AVIF/WebP enabled in next.config, `display: swap` fonts, deterministic particles | — |

---

## Phase 0 — Baseline (30 min, do before any change)

- [ ] Run PageSpeed Insights (mobile) for `/`, `/projects`, `/projects/solitaire-pallazzo`, `/about` — record Performance score, LCP, CLS, INP, total bytes.
- [x] Install `@vercel/speed-insights`, add `<SpeedInsights />` to layout → real-user metrics from actual visitors' phones.
- [ ] Search Console → Core Web Vitals report is now live (post-verification); it becomes the long-term scoreboard.

## Phase 1 — Media diet (~1 day, biggest win)

- [x] **Convert the 5 background-image components to `next/image`** (`fill` + `sizes` + descriptive `alt`). Gains: per-viewport AVIF/WebP, native lazy-loading below the fold, image-SEO alt text. Order: `ProjectShowcase` → `PhilosophySection` → `AboutSnippet` → `HotelsClient` → `DownloadsClient`.
- [ ] **Compress project videos** (needs ffmpeg/HandBrake — manual): re-encode `city-center/use.mp4` 25 MB → 720p H.264 ≤ 5 MB (RF ~24). Same pass on `solitaire-plaza-video.mp4` (6.1 MB) and `central-square-video.mp4` (5.3 MB) → ~2–3 MB each. Mitigated meanwhile: videos now play on desktop only, with `preload="metadata"` + `poster`.
- [x] **Delete unused videos** (`sustainability.mp4`, `homepage-video.mp4`, `city-center/homepage-video.mp4`) — 62 MB removed, recoverable from git.
- [x] **Defer YouTube embeds on mobile**: `YouTubeBackground` now skips the player entirely on phones and Save-Data connections — poster only (served via `next/image` with `priority`).
- [ ] Source hygiene (low priority): batch-convert `public/images/about/*.png` (10 MB) and remaining `.jpeg` files to WebP.

## Phase 2 — Animation & touch behavior (~half day)

- [x] Wrap the app in `<MotionConfig reducedMotion="user">` — respects the OS "Reduce Motion" setting for accessibility and battery.
- [ ] Add a small `useIsMobile()` hook (matchMedia `(max-width: 767px)`): on mobile, halve animation durations/stagger delays and cap entrance offsets (`y: 30–50` → `y: 12–16`) — same feel, less paint work.
- [x] **PageLoader**: skipped entirely on mobile.
- [x] **Lenis**: destroyed on coarse-pointer devices (native scroll, no rAF work).
- [ ] **PhilosophySection** pinned-scroll narrative: test at 360 px; if janky or awkwardly tall, render a simple stacked/static version below `md`.
- [x] **ContactPopup**: mobile delay 15 s → 30 s. (Bottom-sheet restyle still open.)
- [x] Hero marquee gated behind `prefers-reduced-motion` (via `.marquee-track` class).

## Phase 3 — JS bundle (~half day)

- [ ] Switch `framer-motion` imports to `LazyMotion` + `m.` components with `domAnimation` features (~40 % smaller motion bundle).
- [x] `next/dynamic` for conditional clients: `CustomCursor` + `ContactPopup` split into `ClientEnhancements` (`ssr: false`).
- [x] Playfair now loads as a single variable font file instead of six static weights.
- [ ] Run `next build` and record per-route First Load JS; investigate anything > 200 KB.

## Phase 4 — Responsive QA sweep (~half day)

Test at **360×800** (budget Android), **390×844** (iPhone), **768×1024** (tablet), plus one real Android over "Slow 4G" throttling.

Per page checklist (Home, Projects, Project detail ×2, About, Contact, Hotels, GACL, Downloads):

- [ ] No horizontal scroll (watch: AboutSnippet stat card negative offsets, hero `clamp()` headline at 360 px).
- [ ] Tap targets ≥ 44 px: footer social icons, filter chips (projects/downloads), navbar hamburger, FAQ rows.
- [x] Form inputs font-size ≥ 16 px (prevents iOS auto-zoom) — contact form + popup switched from `text-sm` to `text-base`. `type="tel"`/`type="email"` still to verify.
- [ ] Sticky elements: downloads filter bar `top-[64px]` matches real mobile navbar height; no content hidden underneath.
- [ ] Map iframes on project pages: sized correctly, page still scrollable past them.
- [ ] 9–10 px eyebrow/label text: verify legibility on device; bump to 10–11 px where it strains.
- [ ] Galleries/lightbox: swipe works, close button reachable, no scroll-lock leaks.
- [ ] Lighthouse accessibility pass ≥ 90 (contrast of `text-white/40`-style captions over images is the likely flag).

## Phase 5 — Verify & lock in (~2 h)

- [ ] Re-run PSI on the same 4 pages; compare against Phase 0 baseline.
- [ ] Chase the remaining LCP element per page (should be the hero poster via `next/image` + `priority`).
- [ ] Monitor Vercel Speed Insights + Search Console CWV for the next 28 days.
- [ ] Adopt a budget: no image > 300 KB served, no local video > 5 MB, route First Load JS < 200 KB.

---

## Quick wins if only 2 hours are available

1. PageLoader skip/shorten on mobile (15 min)
2. `ProjectShowcase` + `PhilosophySection` → `next/image` (45 min)
3. Re-encode `use.mp4` 25 MB → ≤ 5 MB (20 min)
4. `MotionConfig reducedMotion="user"` + Lenis off on touch (20 min)
5. `@vercel/speed-insights` install (10 min)

**Expected overall outcome:** home page transfer on mobile drops from ~6–10 MB to under 2 MB, project pages drop by 20 + MB where video is involved, LCP moves from ~5–8 s to ≤ 2.5 s on 4G, and Lighthouse mobile lands in the high 80s–90s. Faster mobile pages also feed directly back into SEO — Core Web Vitals are a Google ranking signal, especially for mobile-first indexing.
