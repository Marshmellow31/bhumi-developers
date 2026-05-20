"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Download, Eye, MapPin, ChevronRight, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Project, ProjectType } from "@/data/projects";

type Filter = "All" | ProjectType;

interface Props {
  projects: Project[];
  totalDocs: number;
}

export default function DownloadsClient({ projects, totalDocs }: Props) {
  const availableTypes: Filter[] = [
    "All",
    ...Array.from(new Set(projects.map((p) => p.type))),
  ];
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const filtered =
    activeFilter === "All" ? projects : projects.filter((p) => p.type === activeFilter);

  return (
    <>
      {/* ── Hero ── */}
      <div className="bg-primary pt-36 pb-0">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-14">
          <SectionHeading
            eyebrow="Resources"
            title="Brochures & Floor Plans"
            subtitle="Access complete engineering layouts, floor plans, and digital brochures for our premier commercial and residential landmarks."
            align="center"
            light
          />
        </div>

        {/* Stats strip */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-3 border-t border-white/10"
          >
            {[
              { value: projects.length, label: "Projects" },
              { value: totalDocs, label: "Documents" },
              { value: "Free", label: "Access" },
            ].map((s) => (
              <div
                key={s.label}
                className="py-6 text-center border-r border-white/10 last:border-r-0"
              >
                <div
                  className="text-3xl font-bold text-white"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {s.value}
                </div>
                <div className="text-[10px] tracking-[0.25em] uppercase text-white/30 mt-1 font-body">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Filter Bar ── */}
      <div className="sticky top-[64px] z-30 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto py-3">
            <span className="flex items-center gap-1.5 text-[10px] text-muted tracking-[0.2em] uppercase font-body pr-4 border-r border-border mr-2 shrink-0">
              <SlidersHorizontal size={11} />
              Filter
            </span>
            {availableTypes.map((type) => {
              const count =
                type === "All"
                  ? projects.length
                  : projects.filter((p) => p.type === type).length;
              return (
                <button
                  key={type}
                  onClick={() => setActiveFilter(type)}
                  className={`relative shrink-0 px-4 py-1.5 text-[11px] tracking-[0.12em] uppercase font-semibold font-body transition-all duration-200 ${
                    activeFilter === type
                      ? "bg-primary text-white"
                      : "text-muted hover:text-primary"
                  }`}
                >
                  {type}
                  <span
                    className={`ml-1.5 text-[9px] ${
                      activeFilter === type ? "text-white/60" : "text-muted/60"
                    }`}
                  >
                    ({count})
                  </span>
                  {activeFilter === type && (
                    <motion.div
                      layoutId="filter-indicator"
                      className="absolute inset-0 bg-primary -z-10"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Downloads Directory ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-8"
            >
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 border border-dashed border-border"
            >
              <p className="text-muted font-body tracking-wide text-sm">
                No download resources for this category.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

/* ─── Project Card ─── */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const docCount =
    (project.brochure ? 1 : 0) + (project.floorPlans?.length ?? 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.55, ease: "easeOut", delay: index * 0.06 }}
      className="border border-border bg-white overflow-hidden group"
    >
      {/* Banner with project image */}
      <div className="relative h-56 md:h-64 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.03]"
          style={{ backgroundImage: `url('${project.image}')` }}
        />
        {/* gradient: strong on left, fades right */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/92 via-primary/65 to-primary/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />

        <div className="relative h-full flex flex-col justify-between p-6 md:p-8">
          {/* Top row — badges */}
          <div className="flex items-start justify-between gap-3">
            <span className="inline-block text-[10px] tracking-[0.2em] uppercase font-semibold border border-white/20 px-2.5 py-1 bg-white/5 text-white font-body">
              {project.type}
            </span>
            <div className="flex items-center gap-2">
              <span
                className={`text-[10px] tracking-[0.12em] uppercase font-semibold px-2.5 py-1 font-body ${
                  project.status === "Ongoing"
                    ? "bg-amber-500 text-white"
                    : project.status === "Completed"
                    ? "bg-emerald-600 text-white"
                    : "bg-white/10 text-white border border-white/20"
                }`}
              >
                {project.status}
              </span>
              <span className="text-[10px] tracking-[0.12em] uppercase text-white/50 border border-white/15 px-2.5 py-1 font-body bg-white/5">
                {docCount} {docCount === 1 ? "Doc" : "Docs"}
              </span>
            </div>
          </div>

          {/* Bottom row — name + link */}
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2
                className="text-2xl md:text-3xl font-bold text-white leading-tight mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {project.name}
              </h2>
              <p className="text-white/45 text-xs italic font-body mb-2">
                &ldquo;{project.tagline}&rdquo;
              </p>
              <div className="flex items-center gap-1.5 text-white/50 text-xs font-body">
                <MapPin size={11} className="text-amber-400 shrink-0" />
                <span>{project.location}</span>
              </div>
            </div>

            <Link
              href={`/projects/${project.slug}`}
              className="shrink-0 hidden sm:flex items-center gap-1.5 text-[11px] tracking-[0.1em] uppercase font-semibold font-body text-white/55 hover:text-white transition-colors duration-200 group/lnk"
            >
              View Project
              <ChevronRight
                size={13}
                className="transition-transform duration-200 group-hover/lnk:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Documents */}
      <div className="p-6 md:p-8 bg-[#FAFAFA]">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-border">
          <h3 className="text-[11px] font-semibold tracking-[0.2em] text-primary uppercase font-body">
            Available Documents
          </h3>
          <span className="text-[10px] text-muted font-body tracking-widest uppercase">
            {docCount} {docCount === 1 ? "file" : "files"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {project.brochure && (
            <DocCard
              name="Complete Project Brochure"
              meta="Official Digital Brochure • PDF"
              label="Brochure"
              file={project.brochure}
              delay={0}
            />
          )}
          {project.floorPlans?.map((plan, i) => (
            <DocCard
              key={i}
              name={plan.name}
              meta={`Floor Plan / Layout${plan.size ? ` • ${plan.size}` : " • PDF"}`}
              label="Floor Plan"
              file={plan.file}
              delay={(i + (project.brochure ? 1 : 0)) * 0.04}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Document Card ─── */
interface DocCardProps {
  name: string;
  meta: string;
  label: string;
  file: string;
  delay: number;
}

function DocCard({ name, meta, label, file, delay }: DocCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.4, ease: "easeOut", delay }}
      className="bg-white border border-border flex flex-col gap-3 p-4 hover:border-amber-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.07)] transition-all duration-300 group/doc"
    >
      {/* Icon + info */}
      <div className="flex items-start gap-3">
        <div className="shrink-0 w-9 h-9 flex items-center justify-center bg-amber-50 border border-amber-100 text-amber-500 transition-all duration-300 group-hover/doc:bg-amber-500 group-hover/doc:text-white group-hover/doc:border-amber-500">
          <FileText size={16} strokeWidth={1.5} />
        </div>
        <div className="min-w-0">
          <h4 className="text-[12px] font-bold text-primary font-body leading-snug line-clamp-2">
            {name}
          </h4>
          <p className="text-[10px] text-muted font-body mt-0.5 leading-relaxed">
            {meta}
          </p>
        </div>
      </div>

      {/* Type tag */}
      <span className="self-start text-[9px] tracking-[0.18em] uppercase font-semibold font-body text-amber-600 bg-amber-50 px-2 py-0.5 border border-amber-100">
        {label}
      </span>

      {/* Actions */}
      <div className="flex gap-2 mt-auto">
        <a
          href={file}
          target="_blank"
          rel="noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-border text-[11px] font-semibold text-charcoal tracking-wide font-body transition-all duration-200 hover:bg-primary hover:text-white hover:border-primary"
        >
          <Eye size={11} />
          View
        </a>
        <a
          href={file}
          download
          className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-amber-500 hover:bg-amber-600 text-[11px] font-semibold text-white tracking-wide font-body transition-all duration-200 border border-amber-500 hover:border-amber-600"
        >
          <Download size={11} />
          Download
        </a>
      </div>
    </motion.div>
  );
}
