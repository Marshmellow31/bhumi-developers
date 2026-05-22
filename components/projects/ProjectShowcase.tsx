"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import { formatPrice } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  Ongoing:   "bg-champagne text-primary",
  Completed: "bg-champagne/10 text-champagne border border-champagne/30",
  Upcoming:  "bg-champagne/5 text-champagne/70 border border-champagne/20",
};

export default function ProjectShowcase() {
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
        {/* Eyebrow */}
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

        {/* Project Names */}
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
                  {/* Active indicator line */}
                  <motion.div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] bg-champagne rounded-full"
                    initial={false}
                    animate={{
                      height: isActive ? "60%" : "0%",
                      opacity: isActive ? 1 : 0,
                    }}
                    transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                  />

                  <div className="flex items-center justify-between pl-6">
                    <div className="flex items-baseline gap-4">
                      {/* Number */}
                      <span
                        className={`text-xs font-body tracking-wider transition-colors duration-400 ${
                          isActive ? "text-champagne/80" : "text-white/15"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      {/* Name */}
                      <h3
                        className={`text-2xl lg:text-3xl font-bold transition-all duration-400 ${
                          isActive ? "text-white" : "text-white/25 group-hover:text-white/50"
                        }`}
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        {project.name}
                      </h3>
                    </div>

                    {/* Arrow */}
                    <motion.div
                      animate={{
                        opacity: isActive ? 1 : 0,
                        x: isActive ? 0 : -10,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight size={18} className="text-champagne/70" />
                    </motion.div>
                  </div>

                  {/* Status + Location — visible when active */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        className="pl-6 mt-3 flex items-center gap-4"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                      >
                        <span
                          className={`text-[9px] tracking-[0.18em] uppercase font-semibold px-2.5 py-1 font-body ${statusStyles[project.status]}`}
                        >
                          {project.status}
                        </span>
                        <div className="flex items-center gap-1.5 text-white/30 text-xs font-body">
                          <MapPin size={10} className="shrink-0" />
                          <span>{project.location}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Bottom info — active project details */}
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-end justify-between"
        >
          <div>
            <p className="text-champagne/50 text-[9px] tracking-[0.3em] uppercase font-body mb-1">
              Starting from
            </p>
            <p
              className="text-champagne text-xl font-bold"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
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

        {/* Right-edge separator */}
        <div className="absolute top-0 right-0 w-px h-full bg-white/[0.06]" />
      </div>

      {/* ─── Right Panel: Hero Image ─── */}
      <div className="relative flex-1 h-full overflow-hidden">
        {/* Preload all project images so transitions feel instant */}
        <div className="sr-only" aria-hidden="true">
          {projects.map((p) => (
            <Image key={p.id} src={p.image} alt="" width={1} height={1} priority />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            className="absolute inset-0 overflow-hidden"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="absolute inset-0">
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

            {/* Shimmer skeleton — fades out once image has loaded */}
            <AnimatePresence>
              {!imageLoaded && (
                <motion.div
                  className="absolute inset-0 z-10 overflow-hidden bg-primary-light"
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(105deg, transparent 35%, rgba(201,169,110,0.07) 50%, transparent 65%)",
                    }}
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatDelay: 0.2,
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            {/* Subtle left-edge gradient for blending */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-transparent to-transparent" />
            {/* Bottom gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Floating tagline — bottom right */}
        <div className="absolute bottom-10 right-10 z-10 text-right max-w-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p
                className="text-white/50 text-sm lg:text-base font-light italic leading-relaxed"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                &ldquo;{active.tagline}&rdquo;
              </p>
              <div className="w-10 h-px bg-champagne/30 mt-4 ml-auto" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Project type badge — top right */}
        <div className="absolute top-28 right-10 z-10">
          <AnimatePresence mode="wait">
            <motion.span
              key={active.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.4, delay: 0.1 }}
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
