"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { type Project } from "@/data/projects";
import { formatPrice } from "@/lib/utils";


const statusStyles: Record<string, string> = {
  Ongoing:   "bg-white text-primary",
  Completed: "bg-white/10 text-white border border-white/20",
  Upcoming:  "bg-transparent text-white border border-white/20",
};

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  // 3D tilt state
  const wrapRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isTilted, setIsTilted] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top)  / rect.height;
    setTilt({ x: (ny - 0.5) * -14, y: (nx - 0.5) * 14 });
  }, []);

  const handleMouseEnter = useCallback(() => setIsTilted(true), []);
  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsTilted(false);
  }, []);

  return (
    <div
      ref={wrapRef}
      className="card-3d-wrap"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={`/projects/${project.slug}`} className="block group" data-cursor-label="VIEW">
        <motion.article
          animate={{
            rotateX: tilt.x,
            rotateY: tilt.y,
            scale: isTilted ? 1.025 : 1,
          }}
          transition={{ type: "spring", damping: 22, stiffness: 220 }}
          style={{ transformStyle: "preserve-3d" }}
          className="bg-white border border-border overflow-hidden relative"
        >
          {/* Image */}
          <div className="relative h-64 overflow-hidden bg-surface">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('${project.image}')`, filter: "grayscale(25%)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />

            {/* Status badge */}
            <div className="absolute top-4 left-4">
              <span className={`text-xs tracking-[0.15em] uppercase font-semibold px-3 py-1.5 font-body ${statusStyles[project.status]}`}>
                {project.status}
              </span>
            </div>


          </div>

          {/* Content */}
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

          {/* Top-edge lit highlight on tilt */}
          {isTilted && (
            <div
              className="absolute inset-x-0 top-0 h-px pointer-events-none z-20"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35) 50%, transparent)",
              }}
            />
          )}
        </motion.article>
      </Link>
    </div>
  );
}
