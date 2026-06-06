"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, ArrowUpRight, Building2, Hotel } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { formatPrice } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  Ongoing:   "text-emerald-700 before:bg-emerald-600",
  Completed: "text-primary before:bg-primary",
  Upcoming:  "text-amber-700 before:bg-amber-600",
};

/* Alternating beige tones */
const rowBg = ["bg-background", "bg-surface"];

interface ProjectRowProps {
  project: Project;
  index: number;
  total: number;
}

function ProjectRow({ project, index, total }: ProjectRowProps) {
  const isReversed = index % 2 === 1;
  const formattedNumber = String(index + 1).padStart(2, "0");
  const totalFormatted = String(total).padStart(2, "0");

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
        isReversed ? "lg:[&>div:first-child]:order-2" : ""
      }`}
    >
      {/* ── Image side ── */}
      <div className="lg:col-span-7 relative group h-full flex flex-col justify-center">
        <Link
          href={`/projects/${project.slug}`}
          data-cursor-label="VIEW"
          className="block relative overflow-hidden aspect-[4/3] lg:aspect-[5/4]"
        >
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${project.image}')`,
              filter: "grayscale(15%)",
            }}
            whileHover={{ scale: 1.04, filter: "grayscale(0%)" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent pointer-events-none" />

          <div className="absolute top-5 left-5 z-10">
            <span
              className={`inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm pl-2.5 pr-3 py-1.5 text-[10px] tracking-[0.18em] uppercase font-semibold font-body shadow-sm before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:inline-block ${statusStyles[project.status]}`}
            >
              {project.status}
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="absolute bottom-5 right-5 w-12 h-12 bg-white/95 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-sm"
          >
            <ArrowUpRight size={18} className="text-primary" />
          </motion.div>
        </Link>
      </div>

      {/* ── Text side ── */}
      <div className="lg:col-span-5 flex flex-col gap-4">
        <div className="flex items-baseline gap-4">
          <span className="text-[10px] tracking-[0.3em] uppercase text-muted font-body font-semibold">
            {project.type}
          </span>
        </div>

        <h3
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-[1.05]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {project.name}
        </h3>

        <p
          className="text-2xl md:text-3xl italic font-semibold text-primary/80 leading-relaxed -mt-2"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {project.tagline}
        </p>

        <p className="text-base md:text-lg text-primary font-body font-semibold leading-relaxed max-w-md">
          {project.description}
        </p>

        <div className="grid grid-cols-2 gap-6 mt-1 pt-5 border-t border-border max-w-md">
          <div>
            <p className="text-[9px] tracking-[0.3em] uppercase text-muted/70 font-body mb-1.5">
              Location
            </p>
            <div className="flex items-center gap-1.5 text-sm text-primary font-body font-semibold">
              <MapPin size={12} className="shrink-0 text-muted" />
              <span>{project.location}</span>
            </div>
          </div>
          <div>
            <p className="text-[9px] tracking-[0.3em] uppercase text-muted/70 font-body mb-1.5">
              Starting From
            </p>
            <p
              className="text-lg font-bold text-primary leading-none"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {formatPrice(project.priceRange.min)}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 max-w-md">
          <Link
            href={`/projects/${project.slug}`}
            data-cursor-label="EXPLORE"
            className="group/cta inline-flex items-center gap-3 text-primary text-xs font-semibold font-body tracking-[0.2em] uppercase"
          >
            <span className="relative">
              Explore Project
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-primary origin-left scale-x-100 group-hover/cta:scale-x-0 transition-transform duration-500" />
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-primary origin-right scale-x-0 group-hover/cta:scale-x-100 transition-transform duration-500 delay-200" />
            </span>
            <ArrowUpRight
              size={14}
              className="transition-transform duration-500 group-hover/cta:translate-x-1 group-hover/cta:-translate-y-1"
            />
          </Link>
          <span
            className="text-xs text-muted/50 tracking-[0.25em] font-body"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {formattedNumber} <span className="text-muted/30">/</span> {totalFormatted}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export default function ProjectShowcase() {
  return (
    <div className="relative overflow-hidden">

      {/* ── Alternating project row bands ── */}
      {projects.map((project, i) => (
        <div
          key={project.id}
          className={`${rowBg[i % rowBg.length]} border-b border-border/50 last:border-b-0`}
        >
          <div className={`max-w-7xl mx-auto px-6 lg:px-12 ${
            i === 0 ? "pt-24 md:pt-32 pb-14 md:pb-20" : "py-14 md:py-20"
          }`}>
            <ProjectRow project={project} index={i} total={projects.length} />
          </div>
        </div>
      ))}

      {/* ── Other categories ── */}
      <div className="bg-beige border-t border-border/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-6 h-px bg-primary/20" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-muted font-body font-semibold">
              Also Explore
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/hotels"
              className="group flex items-center justify-between bg-background border border-border px-6 py-5 hover:border-primary/30 hover:shadow-sm transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-beige border border-border flex items-center justify-center shrink-0 group-hover:border-primary/30 transition-colors duration-300">
                  <Hotel size={18} className="text-primary/60 group-hover:text-primary transition-colors duration-300" />
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-muted font-body font-semibold mb-0.5">Category</p>
                  <p className="text-base font-bold text-primary" style={{ fontFamily: "var(--font-playfair)" }}>Resorts &amp; Hotels</p>
                </div>
              </div>
              <ArrowUpRight size={16} className="text-muted group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
            </Link>

            <Link
              href="/gacl-colony"
              className="group flex items-center justify-between bg-background border border-border px-6 py-5 hover:border-primary/30 hover:shadow-sm transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-beige border border-border flex items-center justify-center shrink-0 group-hover:border-primary/30 transition-colors duration-300">
                  <Building2 size={18} className="text-primary/60 group-hover:text-primary transition-colors duration-300" />
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-muted font-body font-semibold mb-0.5">Township</p>
                  <p className="text-base font-bold text-primary" style={{ fontFamily: "var(--font-playfair)" }}>GACL Colony</p>
                </div>
              </div>
              <ArrowUpRight size={16} className="text-muted group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
