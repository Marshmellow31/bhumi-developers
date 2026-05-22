"use client";

import { useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { type Project } from "@/data/projects";
import { formatPrice } from "@/lib/utils";

/* ── status badge styles ── */
const statusStyles: Record<string, string> = {
  Ongoing:   "bg-white text-primary",
  Completed: "bg-white/10 text-white border border-white/20",
  Upcoming:  "bg-transparent text-white border border-white/20",
};

/* ─────────────────────────────────────────────────────────────────
   SCROLL-REVEAL variants (used by the overlay + image)
   The parent grid sets staggerChildren so each card fires in turn.
───────────────────────────────────────────────────────────────── */
export const cardVariant = {
  hidden:  { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  /* ── Scroll reveal trigger ── */
  const isInView = useInView(wrapRef, { once: true, margin: "0px 0px -80px 0px" });

  /* ──────────────────────────────────────────────────────────────
     3D TILT — useMotionValue + useTransform
     We track pointer position relative to card centre and map it
     to rotateX / rotateY.  Spring smoothly snaps back on leave.
  ────────────────────────────────────────────────────────────── */
  const rawX = useMotionValue(0);   // pointer offset  -0.5 … +0.5
  const rawY = useMotionValue(0);

  const springCfg = { stiffness: 300, damping: 30 };
  const springX = useSpring(rawX, springCfg);
  const springY = useSpring(rawY, springCfg);

  /* Card tilt: rotateX drives pitch, rotateY drives yaw */
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  /* Image parallax — moves opposite direction, adds depth */
  const imgX = useTransform(springX, [-0.5, 0.5], [-6, 6]);
  const imgY = useTransform(springY, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!wrapRef.current) return;
      const rect = wrapRef.current.getBoundingClientRect();
      rawX.set((e.clientX - rect.left) / rect.width  - 0.5);
      rawY.set((e.clientY - rect.top)  / rect.height - 0.5);
    },
    [rawX, rawY]
  );

  const handleMouseLeave = useCallback(() => {
    /* Spring back to centre — stiffness:300 damping:30 */
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return (
    /* Outer wrapper: tracks mouse, also serves as scroll observer */
    <div
      ref={wrapRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 800 }}          /* 3D perspective context */
    >
      <Link href={`/projects/${project.slug}`} className="block group" data-cursor-label="VIEW">

        {/* ── 3D-tilting card shell ── */}
        <motion.article
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
            transformPerspective: 800,
          }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-white border border-border overflow-visible relative"
        >

          {/* ════════════════════════════════════════
              IMAGE REVEAL ON SCROLL
              overflow:hidden mask wraps the image.
              Dark overlay wipes left (scaleX 1→0).
              Image simultaneously un-scales (1.15→1).
          ════════════════════════════════════════ */}
          <div className="relative h-64 overflow-hidden bg-surface">

            {/* The actual property image — parallax depth offset */}
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('${project.image}')`,
                filter: "grayscale(20%)",
                x: imgX,
                y: imgY,
              }}
              /* Scale reveal: starts slightly zoomed, settles to 1 */
              initial={{ scale: 1.15 }}
              animate={isInView ? { scale: 1 } : { scale: 1.15 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Gradient overlay (always present for text legibility) */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />

            {/* ── Wipe overlay: dark curtain that slides off to the right ── */}
            <motion.div
              className="absolute inset-0 z-10"
              style={{
                background:     "#0a0a0a",
                transformOrigin: "right",
              }}
              initial={{ scaleX: 1 }}
              animate={isInView ? { scaleX: 0 } : { scaleX: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            />

            {/* Status badge */}
            <div className="absolute top-4 left-4 z-20">
              <span
                className={`text-xs tracking-[0.15em] uppercase font-semibold px-3 py-1.5 font-body ${statusStyles[project.status]}`}
              >
                {project.status}
              </span>
            </div>
          </div>

          {/* ── Card body / text content ── */}
          <div className="p-6">
            <div className="flex items-center gap-2 text-muted text-xs mb-3 font-body tracking-wide">
              <MapPin size={11} className="text-primary/40 shrink-0" />
              <span>{project.location}</span>
            </div>

            <h3
              className="text-xl font-bold text-primary leading-tight mb-2 group-hover:opacity-60 transition-opacity duration-200"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {project.name}
            </h3>

            <p className="text-muted text-xs leading-relaxed font-body mb-5 tracking-wide">
              {project.tagline}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div>
                <p className="text-xs text-muted/60 uppercase tracking-[0.2em] font-body mb-0.5">From</p>
                <p className="text-lg font-bold text-primary" style={{ fontFamily: "var(--font-playfair)" }}>
                  {formatPrice(project.priceRange.min)}
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-primary text-xs font-semibold font-body opacity-40 group-hover:opacity-100 group-hover:gap-2.5 transition-all duration-300 tracking-[0.15em] uppercase">
                View <ArrowRight size={12} />
              </div>
            </div>
          </div>

          {/* Lit top-edge highlight on tilt */}
          <div
            className="absolute inset-x-0 top-0 h-px pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4) 50%, transparent)",
            }}
          />
        </motion.article>

      </Link>
    </div>
  );
}
