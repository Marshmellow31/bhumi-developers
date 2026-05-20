"use client";

import { useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, useMotionValue, useTransform, useSpring, type Transition } from "framer-motion";
import Link from "next/link";
import { ArrowDown, ChevronRight } from "lucide-react";
import Button from "@/components/ui/Button";

const Hero3DScene = dynamic(() => import("@/components/home/Hero3DScene"), {
  ssr: false,
});

const TICKER = "Premium Real Estate · Bharuch · Gujarat · Since 1991 · Landmark Spaces · Crafted with Excellence · ";

const wordTransition = (i: number): Transition => ({
  duration: 0.85,
  delay: 0.4 + i * 0.14,
  ease: "easeOut",
});

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const spring = { damping: 30, stiffness: 90, mass: 0.8 };
  const smoothX = useSpring(mouseX, spring);
  const smoothY = useSpring(mouseY, spring);

  // Background drifts opposite to cursor (deep layer)
  const bgX = useTransform(smoothX, [0, 1], [24, -24]);
  const bgY = useTransform(smoothY, [0, 1], [18, -18]);

  // Orb 1 — amber, top-left, moves with cursor
  const orb1X = useTransform(smoothX, [0, 1], [-50, 50]);
  const orb1Y = useTransform(smoothY, [0, 1], [-40, 40]);

  // Orb 2 — white, bottom-right, moves opposite
  const orb2X = useTransform(smoothX, [0, 1], [60, -60]);
  const orb2Y = useTransform(smoothY, [0, 1], [50, -50]);

  // Orb 3 — mid, subtle
  const orb3X = useTransform(smoothX, [0, 1], [-30, 30]);
  const orb3Y = useTransform(smoothY, [0, 1], [25, -25]);

  // Text floats very slightly
  const textX = useTransform(smoothX, [0, 1], [-10, 10]);
  const textY = useTransform(smoothY, [0, 1], [-7, 7]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!sectionRef.current) return;
      const { left, top, width, height } = sectionRef.current.getBoundingClientRect();
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary"
    >
      {/* ── 3D Scene — interactive layer ── */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          x: bgX,
          y: bgY,
          opacity: 0.55,
          willChange: "transform",
        }}
      >
        <Hero3DScene />
      </motion.div>

      {/* ── Ambient orb 1: large amber bloom ── */}
      <motion.div
        className="absolute pointer-events-none z-[1]"
        style={{
          x: orb1X,
          y: orb1Y,
          width: 700,
          height: 700,
          top: "-10%",
          left: "-5%",
          background:
            "radial-gradient(circle, rgba(245,158,11,0.11) 0%, rgba(245,158,11,0.04) 45%, transparent 70%)",
          willChange: "transform",
        }}
      />

      {/* ── Ambient orb 2: white glow bottom-right ── */}
      <motion.div
        className="absolute pointer-events-none z-[1]"
        style={{
          x: orb2X,
          y: orb2Y,
          width: 500,
          height: 500,
          bottom: "-5%",
          right: "-5%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 65%)",
          willChange: "transform",
        }}
      />

      {/* ── Ambient orb 3: faint center accent ── */}
      <motion.div
        className="absolute pointer-events-none z-[1]"
        style={{
          x: orb3X,
          y: orb3Y,
          width: 400,
          height: 400,
          top: "30%",
          left: "55%",
          background:
            "radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 60%)",
          willChange: "transform",
        }}
      />

      {/* ── Vertical rule lines ── */}
      <div className="absolute left-8 top-0 h-full w-px bg-white/[0.04] z-10" />
      <div className="absolute right-8 top-0 h-full w-px bg-white/[0.04] z-10" />

      {/* ── Hero content — floats gently ── */}
      <motion.div
        className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 text-center"
        style={{ x: textX, y: textY, willChange: "transform" }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-10"
        >
          <span className="inline-block text-white/25 text-[10px] tracking-[0.55em] uppercase font-body border border-white/[0.08] px-6 py-2.5">
            Est.&nbsp;1991&nbsp;·&nbsp;Bharuch,&nbsp;Gujarat
          </span>
        </motion.div>

        {/* ── Main heading — word-by-word 3D reveal ── */}
        <div
          className="text-[clamp(4rem,11vw,9.5rem)] font-bold text-white leading-[0.92] tracking-tight mb-6"
          style={{ fontFamily: "var(--font-playfair)", perspective: "800px" }}
        >
          {/* Line 1 */}
          <div className="overflow-hidden">
            <motion.span
              className="hero-word block"
              initial={{ opacity: 0, y: 60, rotateX: -25 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={wordTransition(0)}
            >
              Shaping
            </motion.span>
          </div>

          {/* Line 2 — italic light */}
          <div className="overflow-hidden">
            <motion.span
              className="hero-word block italic font-light text-white/55"
              initial={{ opacity: 0, y: 60, rotateX: -25 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={wordTransition(1)}
            >
              Modern
            </motion.span>
          </div>

          {/* Line 3 */}
          <div className="overflow-hidden">
            <motion.span
              className="hero-word block"
              initial={{ opacity: 0, y: 60, rotateX: -25 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={wordTransition(2)}
            >
              Spaces
            </motion.span>
          </div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
          className="w-14 h-px bg-amber-500/60 mx-auto mb-8 origin-left"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-white/35 text-base md:text-lg max-w-sm mx-auto mb-12 font-body leading-relaxed tracking-wide"
        >
          Premium real estate across Bharuch and South Gujarat.&nbsp;Built to endure.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.15 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/projects" data-cursor-label="EXPLORE">
            <Button size="lg" variant="primary">
              Explore Projects
              <ChevronRight size={14} />
            </Button>
          </Link>
          <Link href="/contact" data-cursor-label="VISIT">
            <motion.div
              whileHover={{ backgroundColor: "#ffffff", color: "#0A0A0A" }}
              transition={{ duration: 0.2 }}
              className="inline-flex items-center justify-center gap-2 uppercase font-body font-semibold px-9 py-4 text-xs tracking-[0.15em] border border-white/20 text-white active:scale-95 cursor-pointer"
            >
              Schedule a Visit
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>

      {/* ── Bottom marquee ticker ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-12 left-0 right-0 z-20 overflow-hidden pointer-events-none"
      >
        <div className="flex whitespace-nowrap animate-marquee">
          {/* Duplicate for seamless loop */}
          {[0, 1].map((n) => (
            <span key={n} className="text-[9px] tracking-[0.4em] text-white/[0.12] uppercase font-body">
              {TICKER.repeat(6)}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/20"
      >
        <span className="text-[9px] tracking-[0.45em] uppercase font-body">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown size={12} />
        </motion.div>
      </motion.div>
    </section>
  );
}
