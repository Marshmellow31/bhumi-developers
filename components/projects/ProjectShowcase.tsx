"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { formatPrice } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  Ongoing:   "bg-champagne text-primary",
  Completed: "bg-champagne/10 text-champagne border border-champagne/30",
  Upcoming:  "bg-champagne/5 text-champagne/70 border border-champagne/20",
};

/* ══════════════════════════════════════════════════════
   MOBILE — full-bleed vertical card stack
══════════════════════════════════════════════════════ */
function MobileShowcase() {
  return (
    <div className="min-h-screen bg-primary pb-16">
      {/* Header */}
      <div className="pt-28 pb-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <span className="w-6 h-px bg-champagne/40" />
          <span className="text-champagne text-[10px] tracking-[0.45em] uppercase font-body font-semibold">
            Our Portfolio
          </span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-white text-3xl font-bold mt-4 leading-tight"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Every project, <br />
          <span className="italic font-light text-white/45">a lasting mark.</span>
        </motion.h1>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-4 px-4">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link href={`/projects/${project.slug}`} className="block">
              {/* Image area */}
              <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover object-center"
                  sizes="100vw"
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Top row: status + number/type */}
                <div className="absolute top-4 left-4 right-4 flex items-start justify-between z-10">
                  <span className={`text-[9px] tracking-[0.18em] uppercase font-semibold px-2.5 py-1 font-body ${statusStyles[project.status]}`}>
                    {project.status}
                  </span>
                  <span className="text-champagne/60 text-[9px] tracking-[0.28em] uppercase font-body font-semibold">
                    {String(i + 1).padStart(2, "0")} · {project.type}
                  </span>
                </div>

                {/* Bottom overlay: name + tagline */}
                <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                  <h3
                    className="text-white text-2xl font-bold leading-tight mb-1"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {project.name}
                  </h3>
                  <p
                    className="text-white/50 text-sm italic font-light leading-snug"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {project.tagline}
                  </p>
                </div>
              </div>

              {/* Meta bar below image */}
              <div
                className="flex items-center justify-between px-5 py-4"
                style={{ backgroundColor: "rgba(17,17,17,0.95)", borderTop: "1px solid rgba(201,169,110,0.12)" }}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-white/35 text-xs font-body">
                    <MapPin size={10} className="shrink-0 text-champagne/40" />
                    <span>{project.location}</span>
                  </div>
                  <div className="w-px h-3 bg-white/10" />
                  <div>
                    <p className="text-champagne/45 text-[8px] tracking-[0.3em] uppercase font-body leading-none mb-0.5">From</p>
                    <p
                      className="text-champagne text-sm font-bold leading-none"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {formatPrice(project.priceRange.min)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-champagne/70 text-[10px] tracking-[0.2em] uppercase font-semibold font-body">
                  Explore
                  <ArrowUpRight size={13} />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   DESKTOP — split panel hover showcase
══════════════════════════════════════════════════════ */
function DesktopShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const active = projects[activeIndex];

  useEffect(() => {
    setImageLoaded(false);
  }, [activeIndex]);

  const handleSelect = useCallback((i: number) => {
    setActiveIndex(i);
  }, []);

  return (
    <div className="h-screen w-full flex bg-primary overflow-hidden">
      {/* ─── Left Panel: Project List ─── */}
      <div className="relative w-[42%] min-w-[420px] h-full flex flex-col justify-between py-32 px-12 lg:px-16 z-10">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-champagne text-[10px] tracking-[0.35em] uppercase font-body font-semibold"
          >
            Our Portfolio
          </motion.span>
        </div>

        <nav className="flex flex-col gap-0 -my-2">
          {projects.map((project, i) => {
            const isActive = i === activeIndex;
            return (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                onMouseEnter={() => handleSelect(i)}
                className="block"
              >
                <motion.div
                  className="group relative text-left py-5 border-b border-white/[0.06] last:border-b-0 cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                >
                  <motion.div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] bg-champagne rounded-full"
                    initial={false}
                    animate={{ height: isActive ? "60%" : "0%", opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                  />

                  <div className="flex items-center justify-between pl-6">
                    <div className="flex items-baseline gap-4">
                      <span className={`text-xs font-body tracking-wider transition-colors duration-300 ${isActive ? "text-champagne/80" : "text-white/15"}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3
                        className={`text-2xl lg:text-3xl font-bold transition-all duration-300 ${isActive ? "text-white" : "text-white/25 group-hover:text-white/50"}`}
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        {project.name}
                      </h3>
                    </div>
                    <motion.div
                      animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -6 }}
                      transition={{ duration: 0.15 }}
                    >
                      <ArrowRight size={18} className="text-champagne/70" />
                    </motion.div>
                  </div>

                  {/* Fixed-height status row — no layout shift */}
                  <div
                    className="pl-6 mt-2 flex items-center gap-4"
                    style={{
                      height: "28px",
                      opacity: isActive ? 1 : 0,
                      transition: "opacity 0.2s ease",
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                  >
                    <span className={`text-[9px] tracking-[0.18em] uppercase font-semibold px-2.5 py-1 font-body ${statusStyles[project.status]}`}>
                      {project.status}
                    </span>
                    <div className="flex items-center gap-1.5 text-white/30 text-xs font-body">
                      <MapPin size={10} className="shrink-0" />
                      <span>{project.location}</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </nav>

        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-end justify-between"
        >
          <div>
            <p className="text-champagne/50 text-[9px] tracking-[0.3em] uppercase font-body mb-1">Starting from</p>
            <p className="text-champagne text-xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>
              {formatPrice(active.priceRange.min)}
            </p>
          </div>
          <Link
            href={`/projects/${active.slug}`}
            className="group/link flex items-center gap-2 text-champagne/70 hover:text-champagne text-xs font-semibold font-body tracking-[0.15em] uppercase transition-colors duration-300"
            data-cursor-label="VIEW"
          >
            View Project
            <ArrowRight size={13} className="transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        </motion.div>

        <div className="absolute top-0 right-0 w-px h-full bg-white/[0.06]" />
      </div>

      {/* ─── Right Panel: Hero Image ─── */}
      <div className="relative flex-1 h-full overflow-hidden">
        <div className="sr-only" aria-hidden="true">
          {projects.map((p) => (
            <Image key={p.id} src={p.image} alt="" width={1} height={1} priority />
          ))}
        </div>

        <AnimatePresence>
          <motion.div
            key={active.id}
            className="absolute inset-0 overflow-hidden"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="absolute inset-x-0 inset-y-[8%]">
              <div className="relative w-full h-full">
                <Image
                  src={active.image}
                  alt={active.name}
                  fill
                  className="object-contain object-center"
                  priority={activeIndex === 0}
                  sizes="58vw"
                  onLoad={() => setImageLoaded(true)}
                />
              </div>
            </div>

            <AnimatePresence>
              {!imageLoaded && (
                <motion.div
                  className="absolute inset-0 z-10 overflow-hidden bg-primary-light"
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <motion.div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(105deg, transparent 35%, rgba(201,169,110,0.07) 50%, transparent 65%)" }}
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.2 }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-10 right-10 z-10 text-right max-w-sm">
          <AnimatePresence>
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, delay: 0.05 }}
            >
              <p className="text-white/50 text-sm lg:text-base font-light italic leading-relaxed" style={{ fontFamily: "var(--font-playfair)" }}>
                &ldquo;{active.tagline}&rdquo;
              </p>
              <div className="w-10 h-px bg-champagne/30 mt-4 ml-auto" />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute top-28 right-10 z-10">
          <AnimatePresence>
            <motion.span
              key={active.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-champagne/45 text-[10px] tracking-[0.3em] uppercase font-body font-semibold"
            >
              {active.type}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   ROOT — render correct layout per breakpoint
══════════════════════════════════════════════════════ */
export default function ProjectShowcase() {
  return (
    <>
      <div className="md:hidden">
        <MobileShowcase />
      </div>
      <div className="hidden md:block">
        <DesktopShowcase />
      </div>
    </>
  );
}
