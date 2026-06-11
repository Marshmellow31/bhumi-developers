"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   useCountUp — animates 0 → end (ease-out cubic) on trigger
═══════════════════════════════════════════════════════════════ */
function useCountUp(end: number, trigger: boolean, duration = 2.0) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!trigger) return;
    cancelAnimationFrame(rafRef.current);
    setValue(0);
    const t0 = performance.now();
    const tick = (now: number) => {
      const p     = Math.min((now - t0) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 3);           // ease-out cubic
      setValue(Math.round(eased * end));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [trigger, end, duration]);

  return value;
}

/* ═══════════════════════════════════════════════════════════════
   Milestone data  (Bhumi Developers 1991 → 2024)
═══════════════════════════════════════════════════════════════ */
const MILESTONES = [
  {
    year:   "1991",
    stat:   1,
    suffix: "",
    label:  "Year Founded",
    desc:   "Born in Bharuch with a singular vision — to redefine real estate in Gujarat through uncompromising precision, craftsmanship, and integrity.",
  },
  {
    year:   "2005",
    stat:   500,
    suffix: "+",
    label:  "Happy Families",
    desc:   "A decade of quality residential projects cemented our reputation as Bharuch's most trusted developer — building not just homes, but communities.",
  },
  {
    year:   "2015",
    stat:   30,
    suffix: "+",
    label:  "Projects Delivered",
    desc:   "Expanding into landmark commercial developments, we brought world-class business spaces and retail destinations to South Gujarat.",
  },
  {
    year:   "2024",
    stat:   72,
    suffix: " Lakhs+",
    label:  "Sq Ft Developed",
    desc:   "35 years. 50+ landmark projects. 72 Lakhs+ Sq Ft Developed. A legacy built on trust — shaping the future of Bharuch, one landmark at a time.",
  },
] as const;

const N = MILESTONES.length; // 4

/* ═══════════════════════════════════════════════════════════════
   MilestoneCard — one full-screen panel in the horizontal strip
═══════════════════════════════════════════════════════════════ */
function MilestoneCard({
  milestone,
  active,
  triggered,
}: {
  milestone: (typeof MILESTONES)[number];
  active:    boolean;
  triggered: boolean;
}) {
  const count = useCountUp(milestone.stat, triggered);

  return (
    <div
      className="shrink-0 relative flex items-center justify-center"
      style={{ width: "100vw", height: "100vh" }}
    >
      {/* ── Ghost year — massive backdrop watermark ── */}
      <span
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
        aria-hidden="true"
        style={{
          fontFamily:  "var(--font-playfair)",
          fontSize:    "clamp(8rem, 25vw, 20rem)",
          fontWeight:  800,
          lineHeight:  1,
          color:       "rgba(245,158,11,0.05)",
          whiteSpace:  "nowrap",
          letterSpacing: "-0.04em",
        }}
      >
        {milestone.year}
      </span>

      {/* ── Foreground content ── */}
      <div className="relative z-10 text-center px-8 max-w-2xl mx-auto">

        {/* Year + decorative lines */}
        <motion.div
          className="flex items-center justify-center gap-5 mb-10"
          initial={{ opacity: 0, y: 24 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-amber-400/50" />
          <span
            style={{
              fontFamily:    "var(--font-playfair)",
              fontSize:      "clamp(2.8rem, 6vw, 5rem)",
              fontWeight:    800,
              lineHeight:    1,
              color:         "#f59e0b",
              letterSpacing: "-0.03em",
            }}
          >
            {milestone.year}
          </span>
          <div className="h-px flex-1 max-w-[60px] bg-gradient-to-l from-transparent to-amber-400/50" />
        </motion.div>

        {/* Animated stat counter */}
        <motion.div
          className="mb-3"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="text-white tabular-nums"
            style={{
              fontFamily:    "var(--font-playfair)",
              fontSize:      "clamp(5rem, 14vw, 11rem)",
              fontWeight:    800,
              lineHeight:    0.9,
              letterSpacing: "-0.05em",
            }}
          >
            {count.toLocaleString()}
          </span>
          <span
            className="text-amber-400"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize:   "clamp(2rem, 5vw, 5rem)",
              fontWeight: 800,
            }}
          >
            {milestone.suffix}
          </span>
        </motion.div>

        {/* Stat label */}
        <motion.p
          className="text-amber-400/60 tracking-[0.45em] uppercase mb-8"
          style={{ fontFamily: "var(--font-inter)", fontSize: "10px" }}
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.22 }}
        >
          {milestone.label}
        </motion.p>

        {/* Divider */}
        <motion.div
          className="mx-auto mb-8"
          style={{
            height:          1,
            width:           64,
            background:      "rgba(255,255,255,0.12)",
            transformOrigin: "center",
          }}
          initial={{ scaleX: 0 }}
          animate={active ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.6, delay: 0.28 }}
        />

        {/* Description */}
        <motion.p
          className="text-white/42 leading-relaxed mx-auto"
          style={{
            fontFamily: "var(--font-inter)",
            fontSize:   "clamp(13px, 1.3vw, 15px)",
            maxWidth:   480,
          }}
          initial={{ opacity: 0, y: 14 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.65, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {milestone.desc}
        </motion.p>

      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MilestonesSection — sticky horizontal scroll
═══════════════════════════════════════════════════════════════ */
export default function MilestonesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  /* Tracks which cards have ever been activated (so countUp fires only once) */
  const [triggered, setTriggered] = useState<boolean[]>(() =>
    MILESTONES.map((_, i) => i === 0)  // card 0 pre-triggered
  );

  /* ── Scroll progress 0 → 1 over the full 400vh ── */
  const { scrollYProgress } = useScroll({
    target:  containerRef,
    offset:  ["start start", "end end"],
  });

  /* ── Smooth spring on raw scroll so strip glides, not jumps ── */
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping:   28,
    mass:      0.6,
    restDelta: 0.0001,
  });

  /* ── Strip translation: 0% → -75% of its own width (400vw × 75% = 300vw) ── */
  const x = useTransform(smoothProgress, [0, 1], ["0%", "-75%"]);

  /* ── Thin amber progress bar at bottom ── */
  const progressBarScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  /* ── Determine active card and trigger countUp ── */
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.round(Math.min(Math.max(v * (N - 1), 0), N - 1));
    setActiveIndex(idx);
    setTriggered((prev) => {
      if (prev[idx]) return prev;        // already triggered — no re-render
      const next = [...prev];
      next[idx] = true;
      return next;
    });
  });

  return (
    /* ── Outer scroll container — 400vh ── */
    <div
      ref={containerRef}
      style={{ height: "400vh" }}
      className="relative"
    >
      {/* ── Sticky viewport panel ── */}
      <div
        className="sticky top-0 overflow-hidden"
        style={{ height: "100vh", backgroundColor: "#060606" }}
      >

        {/* Section eyebrow — stays fixed at top-centre */}
        <div className="absolute top-8 inset-x-0 z-20 flex items-center justify-center gap-4 pointer-events-none">
          <div className="h-px w-10 bg-amber-400/35" />
          <span
            className="text-[8px] tracking-[0.58em] uppercase text-white/28"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Our Journey
          </span>
          <div className="h-px w-10 bg-amber-400/35" />
        </div>

        {/* ── Horizontal strip — 4 × 100vw wide ── */}
        <motion.div
          className="flex h-full"
          style={{
            x,
            width: `${N * 100}vw`,
          }}
        >
          {MILESTONES.map((m, i) => (
            <MilestoneCard
              key={m.year}
              milestone={m}
              active={activeIndex === i}
              triggered={triggered[i]}
            />
          ))}
        </motion.div>

        {/* ── Pill-dot nav at bottom-centre ── */}
        <div className="absolute bottom-10 inset-x-0 z-20 flex items-center justify-center gap-2 pointer-events-none">
          {MILESTONES.map((_, i) => (
            <motion.div
              key={i}
              className="rounded-full"
              animate={{
                width:           activeIndex === i ? 28 : 6,
                backgroundColor: activeIndex === i
                  ? "#f59e0b"
                  : "rgba(255,255,255,0.18)",
              }}
              style={{ height: 6 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
        </div>

        {/* ── Scroll progress bar (bottom edge) ── */}
        <div
          className="absolute bottom-0 inset-x-0 z-20 pointer-events-none"
          style={{ height: 1, background: "rgba(255,255,255,0.05)" }}
        >
          <motion.div
            className="h-full bg-amber-400/55"
            style={{ scaleX: progressBarScale, transformOrigin: "left" }}
          />
        </div>

      </div>
    </div>
  );
}
