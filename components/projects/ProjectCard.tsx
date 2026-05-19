"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, ArrowRight, ZoomIn } from "lucide-react";
import { type Project } from "@/data/projects";
import { formatPrice } from "@/lib/utils";
import GalleryModal from "@/components/ui/GalleryModal";

const statusStyles: Record<string, string> = {
  Ongoing: "bg-white text-primary",
  Completed: "bg-white/10 text-white border border-white/20",
  Upcoming: "bg-transparent text-white border border-white/20",
};

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const galleryImages = project.gallery.length > 0 ? project.gallery : [project.image];

  const handleImageClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsGalleryOpen(true);
  };

  return (
    <>
      <Link href={`/projects/${project.slug}`} className="block group">
        <motion.article
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
          className="bg-white border border-border hover:border-primary/20 hover:shadow-xl transition-all duration-300 overflow-hidden"
        >
          {/* Image */}
          <div className="relative h-64 overflow-hidden bg-surface cursor-pointer" onClick={handleImageClick}>
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage: `url('${project.image}')`,
                filter: "grayscale(30%)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />

            {/* Zoom Indicator */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-none"
            >
              <div className="flex flex-col items-center gap-2">
                <ZoomIn size={32} className="text-white" />
                <p className="text-white text-xs tracking-widest uppercase font-semibold font-body">View Gallery</p>
              </div>
            </motion.div>

            {/* Status badge */}
            <div className="absolute top-4 left-4">
            <span
              className={`text-xs tracking-[0.15em] uppercase font-semibold px-3 py-1.5 font-body ${
                statusStyles[project.status]
              }`}
            >
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
              <p className="text-xs text-muted/60 uppercase tracking-[0.2em] font-body mb-0.5">
                From
              </p>
              <p
                className="text-lg font-bold text-primary"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {formatPrice(project.priceRange.min)}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-primary text-xs font-semibold font-body opacity-40 group-hover:opacity-100 group-hover:gap-2.5 transition-all duration-300 tracking-[0.15em] uppercase">
              View
              <ArrowRight size={12} />
            </div>
          </div>
        </div>
      </motion.article>
      </Link>

      <GalleryModal isOpen={isGalleryOpen} images={galleryImages} onClose={() => setIsGalleryOpen(false)} />
    </>
  );
}
