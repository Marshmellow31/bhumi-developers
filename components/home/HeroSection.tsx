"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";

import { ArrowDown } from "lucide-react";

/* ────────────────────────────────────────────── */
const TICKER =
  "Premium Real Estate  ·  Bharuch, Gujarat  ·  Since 1991  ·  Built to Endure  ·  ";

/* Stable particles — generated once outside component */
const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  x: 8 + (i * 87) % 84,
  y: 5 + (i * 61) % 88,
  size: 1 + (i % 3) * 0.8,
  delay: (i * 0.7) % 4,
  duration: 7 + (i % 5),
}));

/* Shared fade-rise transition — no overflow, no clip */
const fadeRise = (delay: number) => ({
  initial:    { opacity: 0, y: 22 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function HeroSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  /* ── Mouse parallax ── */
  const mouseX  = useMotionValue(0.5);
  const mouseY  = useMotionValue(0.5);
  const spring  = { damping: 28, stiffness: 80, mass: 0.9 };
  const smoothX = useSpring(mouseX, spring);
  const smoothY = useSpring(mouseY, spring);
  const bgX     = useTransform(smoothX, [0, 1], [16, -16]);
  const bgY     = useTransform(smoothY, [0, 1], [10, -10]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!sectionRef.current) return;
      const { left, top, width, height } =
        sectionRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - left) / width);
      mouseY.set((e.clientY - top) / height);
    },
    [mouseX, mouseY]
  );
  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ backgroundColor: "#080808" }}
    >
      {/* ── BG PHOTO ── */}
      <motion.div
        className="absolute inset-[-5%] z-0"
        style={{
          backgroundImage:    "url('/images/background.png')",
          backgroundSize:     "cover",
          backgroundPosition: "center",
          backgroundRepeat:   "no-repeat",
          x: bgX,
          y: bgY,
          willChange: "transform",
        }}
      />

      {/* ── OVERLAY ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: `
            linear-gradient(to bottom,
              rgba(8,8,8,0.78) 0%,
              rgba(8,8,8,0.42) 30%,
              rgba(8,8,8,0.32) 55%,
              rgba(8,8,8,0.70) 80%,
              rgba(8,8,8,0.96) 100%
            )
          `,
        }}
      />

      {/* ── AMBER RADIAL GLOW (bottom-centre) ── */}
      <div
        className="absolute z-[2] pointer-events-none"
        style={{
          bottom:     "-10%",
          left:       "50%",
          transform:  "translateX(-50%)",
          width:      "70%",
          height:     "50%",
          background:
            "radial-gradient(ellipse at bottom, rgba(245,158,11,0.06) 0%, transparent 70%)",
        }}
      />

      {/* ── FLOATING PARTICLES ── */}
      <AnimatePresence>
        {mounted &&
          PARTICLES.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full pointer-events-none z-[3]"
              style={{
                left:            `${p.x}%`,
                top:             `${p.y}%`,
                width:           p.size,
                height:          p.size,
                backgroundColor:
                  p.id % 4 === 0
                    ? "rgba(245,158,11,0.5)"
                    : "rgba(255,255,255,0.15)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0], y: [-6, -26, -46] }}
              transition={{
                duration: p.duration,
                delay:    p.delay,
                repeat:   Infinity,
                ease:     "easeInOut",
              }}
            />
          ))}
      </AnimatePresence>

      {/* ── VERTICAL EDGE RULES ── */}
      <div className="absolute left-6 lg:left-12 top-0 h-full w-px bg-white/[0.05] z-[4] pointer-events-none" />
      <div className="absolute right-6 lg:right-12 top-0 h-full w-px bg-white/[0.05] z-[4] pointer-events-none" />

      {/* ══════════════════ MAIN CONTENT ══════════════════ */}
      <div className="relative z-10 flex flex-col flex-1 items-center justify-center text-center px-6 lg:px-12 pt-28 pb-20">

        {/* Eyebrow badge */}
        <motion.div
          {...fadeRise(0.15)}
          className="flex items-center gap-3 mb-10"
        >
          <div className="w-8 h-px bg-amber-400/60" />
          <span
            className="text-[8.5px] tracking-[0.55em] uppercase text-white/40"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Est.&nbsp;1991&nbsp;·&nbsp;Bharuch,&nbsp;Gujarat
          </span>
          <div className="w-8 h-px bg-white/15" />
        </motion.div>

        {/* ── MAIN HEADING — no overflow-hidden, pure fade+rise ── */}
        <div className="mb-6">
          {/* Line 1 */}
          <motion.div {...fadeRise(0.35)}>
            <span
              className="block select-none"
              style={{
                fontFamily:   "var(--font-playfair)",
                fontSize:     "clamp(3rem, 8vw, 8rem)",
                lineHeight:   1.08,
                fontWeight:   800,
                letterSpacing:"-0.02em",
                color:        "#ffffff",
              }}
            >
              Shaping
            </span>
          </motion.div>

          {/* Line 2 — italic ghost */}
          <motion.div {...fadeRise(0.52)}>
            <span
              className="block select-none"
              style={{
                fontFamily:   "var(--font-playfair)",
                fontSize:     "clamp(3rem, 8vw, 8rem)",
                lineHeight:   1.08,
                fontWeight:   400,
                fontStyle:    "italic",
                letterSpacing:"-0.02em",
                color:        "rgba(255,255,255,0.38)",
              }}
            >
              Modern
            </span>
          </motion.div>

          {/* Line 3 */}
          <motion.div {...fadeRise(0.68)}>
            <span
              className="block select-none"
              style={{
                fontFamily:   "var(--font-playfair)",
                fontSize:     "clamp(3rem, 8vw, 8rem)",
                lineHeight:   1.08,
                fontWeight:   800,
                letterSpacing:"-0.02em",
                color:        "#ffffff",
              }}
            >
              Spaces
            </span>
          </motion.div>
        </div>

        {/* Amber divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "center" }}
          className="mx-auto mb-8 h-px w-16 bg-gradient-to-r from-transparent via-amber-400 to-transparent"
        />

        {/* Description */}
        <motion.p
          {...fadeRise(0.95)}
          className="max-w-md text-white/55 leading-relaxed mb-10"
          style={{
            fontFamily: "var(--font-inter)",
            fontSize:   "clamp(13px, 1.5vw, 15px)",
          }}
        >
          Premium real estate across Bharuch and South Gujarat.
          <br className="hidden sm:block" />
          Crafted with precision, built to endure.
        </motion.p>


      </div>
      {/* ════════════════════════════════════════════ */}

      {/* ── MARQUEE TICKER ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="relative z-10 overflow-hidden pointer-events-none"
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
      >
        <div
          className="flex whitespace-nowrap py-2"
          style={{ animation: "marquee 45s linear infinite" }}
        >
          {[0, 1, 2].map((n) => (
            <span
              key={n}
              className="shrink-0"
              style={{
                fontFamily:    "var(--font-inter)",
                fontSize:      "9px",
                letterSpacing: "0.38em",
                color:         "rgba(255,255,255,0.07)",
                textTransform: "uppercase",
              }}
            >
              {TICKER.repeat(5)}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ── SCROLL INDICATOR ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 1 }}
        className="absolute bottom-8 right-10 z-20 hidden lg:flex flex-col items-center gap-2 text-white/20"
      >
        <span
          className="text-[7px] tracking-[0.55em] uppercase"
          style={{ writingMode: "vertical-lr", fontFamily: "var(--font-inter)" }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        >
          <ArrowDown size={10} />
        </motion.div>
      </motion.div>
    </section>
  );
}
