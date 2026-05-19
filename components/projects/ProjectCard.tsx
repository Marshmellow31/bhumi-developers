"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { type Project } from "@/data/projects";
import { formatPrice } from "@/lib/utils";

const statusColors: Record<string, string> = {
  Ongoing: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  Completed: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Upcoming: "bg-amber-500/20 text-amber-300 border-amber-500/30",
};

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} className="block group">
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
        className="bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden"
      >
        {/* Image */}
        <div className="relative h-64 overflow-hidden bg-primary-light">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />

          {/* Status badge */}
          <div className="absolute top-4 left-4">
            <span
              className={`text-xs tracking-wider uppercase font-semibold px-3 py-1.5 border font-body ${
                statusColors[project.status]
              }`}
            >
              {project.status}
            </span>
          </div>

          {/* Type badge */}
          <div className="absolute top-4 right-4">
            <span className="bg-white/10 backdrop-blur-sm text-white text-xs tracking-wider uppercase font-semibold px-3 py-1.5 border border-white/20 font-body">
              {project.type}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3
              className="text-xl font-bold text-primary leading-tight group-hover:text-accent transition-colors duration-200"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {project.name}
            </h3>
          </div>

          <div className="flex items-center gap-2 text-muted text-sm mb-4 font-body">
            <MapPin size={13} className="text-accent shrink-0" />
            <span>{project.location}</span>
          </div>

          <p className="text-muted text-sm leading-relaxed font-body mb-5 line-clamp-2">
            {project.tagline}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              <p className="text-xs text-muted uppercase tracking-wider font-body mb-0.5">Starting</p>
              <p
                className="text-lg font-bold text-primary"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {formatPrice(project.priceRange.min)}
              </p>
            </div>
            <div className="flex items-center gap-1 text-accent text-sm font-semibold font-body group-hover:gap-2 transition-all duration-200">
              View Details
              <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
