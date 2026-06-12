"use client";

import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";

/* ── Constants ── */
const TICKER =
  "Premium Real Estate  ·  Bharuch, Gujarat  ·  Since 1995  ·  Built to Endure  ·  ";

/* Deterministic particles — no Math.random() on render */
const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id:       i,
  x:        8  + (i * 87) % 84,
  y:        5  + (i * 61) % 88,
  size:     1  + (i % 3)  * 0.8,
  delay:    (i * 0.7) % 4,
  duration: 7  + (i % 5),
}));

/* Shared fade-rise for all elements */
const fadeRise = (delay: number) => ({
  initial:    { opacity: 0, y: 20 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ backgroundColor: "#111111" }}
    >
      {/* ── BG VIDEO ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          src="/videos/homepage-video.mp4"
          poster="/images/background.webp"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      {/* ── Gradient overlay ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: `
            linear-gradient(to bottom,
              rgba(8,8,8,0.78) 0%,
              rgba(8,8,8,0.40) 28%,
              rgba(8,8,8,0.28) 52%,
              rgba(8,8,8,0.68) 80%,
              rgba(8,8,8,0.97) 100%
            )
          `,
        }}
      />

      {/* ── Amber radial glow (bottom-centre) ── */}
      <div
        className="absolute z-[2] pointer-events-none"
        style={{
          bottom:    "-10%",
          left:      "50%",
          transform: "translateX(-50%)",
          width:     "70%",
          height:    "50%",
          background:
            "radial-gradient(ellipse at bottom, rgba(245,158,11,0.07) 0%, transparent 70%)",
        }}
      />

      {/* ── Floating particles ── */}
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
                backgroundColor: p.id % 4 === 0
                  ? "rgba(245,158,11,0.50)"
                  : "rgba(255,255,255,0.14)",
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

      {/* ── Vertical edge rules ── */}
      <div className="absolute left-6 lg:left-12 top-0 h-full w-px bg-white/[0.05] z-[4] pointer-events-none" />
      <div className="absolute right-6 lg:right-12 top-0 h-full w-px bg-white/[0.05] z-[4] pointer-events-none" />

      {/* ══════════════ MAIN CONTENT ══════════════ */}
      <div className="relative z-10 flex flex-col flex-1 items-start justify-end text-left pl-6 lg:pl-12 pr-10 lg:pr-16 pt-28 pb-8 lg:pb-12 max-w-4xl">


        {/* ── Heading ── */}
        <h1 className="mb-6">
          <span className="sr-only">
            Bhumi Developers — Premium Real Estate Developer in Bharuch, Gujarat.{" "}
          </span>
          <motion.span className="block" {...fadeRise(0.38)}>
            <span
              className="block select-none"
              style={{
                fontFamily:    "var(--font-playfair)",
                fontSize:      "clamp(3rem, 8vw, 8rem)",
                lineHeight:    1.08,
                fontWeight:    800,
                letterSpacing: "-0.02em",
                color:         "#ffffff",
              }}
            >
              Shaping
            </span>
          </motion.span>

          <motion.span className="block" {...fadeRise(0.52)}>
            <span
              className="block select-none"
              style={{
                fontFamily:    "var(--font-playfair)",
                fontSize:      "clamp(3rem, 8vw, 8rem)",
                lineHeight:    1.08,
                fontWeight:    400,
                fontStyle:     "italic",
                letterSpacing: "-0.02em",
                color:         "rgba(255,255,255,0.36)",
              }}
            >
              Modern
            </span>
          </motion.span>

          <motion.span className="block" {...fadeRise(0.66)}>
            <span
              className="block select-none"
              style={{
                fontFamily:    "var(--font-playfair)",
                fontSize:      "clamp(3rem, 8vw, 8rem)",
                lineHeight:    1.08,
                fontWeight:    800,
                letterSpacing: "-0.02em",
                color:         "#ffffff",
              }}
            >
              Spaces
            </span>
          </motion.span>
        </h1>



      </div>
      {/* ════════════════════════════════════════ */}

      {/* ── Marquee ticker ── */}
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
                color:         "rgba(255,255,255,0.06)",
                textTransform: "uppercase",
              }}
            >
              {TICKER.repeat(5)}
            </span>
          ))}
        </div>
      </motion.div>


      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
      >
        {/* Mouse outline */}
        <div
          className="relative flex justify-center"
          style={{
            width:        "34px",
            height:       "52px",
            borderRadius: "17px",
            border:       "1.5px solid rgba(255,255,255,0.35)",
          }}
        >
          {/* Scrolling dot inside mouse */}
          <motion.div
            style={{
              width:           "5px",
              height:          "9px",
              borderRadius:    "3px",
              backgroundColor: "rgba(255,255,255,0.7)",
              marginTop:       "9px",
            }}
            animate={{ y: [0, 16, 0], opacity: [1, 0.2, 1] }}
            transition={{
              duration:    1.6,
              repeat:      Infinity,
              ease:        "easeInOut",
              repeatDelay: 0.2,
            }}
          />
        </div>

        <span
          style={{
            fontFamily:    "var(--font-inter)",
            fontSize:      "8px",
            letterSpacing: "0.45em",
            color:         "rgba(255,255,255,0.30)",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
      </motion.div>

    </section>
  );
}
