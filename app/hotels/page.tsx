"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, ArrowUpRight, Compass } from "lucide-react";
import { projects } from "@/data/projects";

const statusStyles: Record<string, string> = {
  Ongoing:   "text-emerald-700 before:bg-emerald-600",
  Completed: "text-primary before:bg-primary",
  Upcoming:  "text-amber-700 before:bg-amber-600",
};

export default function HotelsPage() {
  // Filter for projects of type "Hotel"
  const hotelProjects = projects.filter((p) => p.type === "Hotel");

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* ── Section header band ── */}
      <div className="bg-beige pt-28 md:pt-36 pb-12 md:pb-16 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4 max-w-3xl"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-primary/20" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-muted font-body font-semibold">
                Our Portfolio
              </span>
            </div>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-[1.02] tracking-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Resorts & Hotels, <br />
              <span className="italic font-light text-muted">crafted for serenity.</span>
            </h1>
            <p className="text-muted text-sm md:text-base font-body max-w-xl mt-2 leading-relaxed">
              Explore our exclusive hospitality developments. From private resort retreats to 
              world-class boutique hotels, we design spaces that harmonize with their natural surroundings.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Content Grid ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Active Hotel Projects */}
          {hotelProjects.map((project, idx) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col gap-6"
            >
              {/* Image box */}
              <Link
                href={`/projects/${project.slug}`}
                className="relative overflow-hidden aspect-[16/10] bg-surface border border-border"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${project.image}')` }}
                />
                {/* Overlays */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
                
                <div className="absolute top-5 left-5">
                  <span className={`inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm pl-2.5 pr-3 py-1.5 text-[9px] tracking-[0.18em] uppercase font-semibold font-body shadow-sm before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:inline-block ${statusStyles[project.status]}`}>
                    {project.status}
                  </span>
                </div>
              </Link>

              {/* Text info */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-muted font-body font-semibold">
                    Premier Resort
                  </span>
                  <div className="flex items-center gap-1 text-sm text-primary font-body font-semibold">
                    <MapPin size={12} className="text-muted shrink-0" />
                    <span>{project.location}</span>
                  </div>
                </div>

                <h2
                  className="text-3xl font-bold text-primary leading-tight hover:text-amber-600 transition-colors duration-300"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  <Link href={`/projects/${project.slug}`}>{project.name}</Link>
                </h2>

                <p className="text-sm text-muted leading-relaxed font-body">
                  {project.description}
                </p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.highlights.map((h, i) => (
                    <span key={i} className="text-[10px] tracking-wider uppercase font-semibold font-body bg-beige/35 text-primary px-3 py-1.5 border border-border/40">
                      {h}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/50">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group/cta inline-flex items-center gap-2 text-primary text-xs font-semibold font-body tracking-[0.2em] uppercase"
                  >
                    <span>View Specifications</span>
                    <ArrowUpRight
                      size={13}
                      className="transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                    />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}

          {/* Coming Soon Hotel Property */}
          <motion.article
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="group flex flex-col gap-6"
          >
            {/* Image box with premium abstract styling */}
            <div className="relative overflow-hidden aspect-[16/10] bg-[#1a1917] border border-white/5 flex flex-col items-center justify-center p-8 text-center select-none">
              {/* Gold abstract circular line decoration */}
              <div className="absolute w-64 h-64 border border-white/[0.02] rounded-full" />
              <div className="absolute w-48 h-48 border border-white/[0.03] rounded-full" />
              
              <Compass size={36} className="text-amber-500/30 mb-4 animate-pulse" />
              
              <span className="text-[9px] tracking-[0.3em] uppercase text-amber-500/80 font-bold mb-2">
                Future Development
              </span>
              <h3 className="text-2xl font-bold text-white/90 mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
                The Sanctuary Retreat
              </h3>
              <p className="text-white/40 text-xs font-body max-w-xs leading-relaxed">
                An ultra-luxury eco-resort planned in the pristine landscapes of Western India. Details coming soon.
              </p>
            </div>

            {/* Text info */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] tracking-[0.3em] uppercase text-white/25 font-body font-semibold">
                  Under Planning
                </span>
                <span className="text-xs text-white/35 font-body tracking-wider">
                  Goa / Maharashtra Border
                </span>
              </div>

              <h2
                className="text-3xl font-bold text-primary/50 leading-tight select-none"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                The Sanctuary
              </h2>

              <p className="text-sm text-muted/60 leading-relaxed font-body">
                Redefining organic architecture, The Sanctuary will feature private pavilions, zero-carbon footprints, and natural hot spring spa access.
              </p>

              <div className="flex flex-wrap gap-2 mt-2 select-none opacity-40">
                <span className="text-[10px] tracking-wider uppercase font-semibold font-body bg-beige/35 text-primary px-3 py-1.5 border border-border/40">
                  Private Pavilions
                </span>
                <span className="text-[10px] tracking-wider uppercase font-semibold font-body bg-beige/35 text-primary px-3 py-1.5 border border-border/40">
                  Eco-Luxe Spa
                </span>
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/50">
                <span className="text-[10px] tracking-[0.2em] uppercase text-muted/40 font-semibold font-body select-none">
                  Details in Planning
                </span>
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </div>
  );
}
