"use client";

import { useState } from "react";
import { MapPin, ZoomIn, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import GalleryModal from "@/components/ui/GalleryModal";
import Image from "next/image";

interface ProjectGallerySectionProps {
  image: string;
  gallery: string[];
  status: string;
  name: string;
  location: string;
  tagline?: string;
  statusColors: Record<string, string>;
  video?: string;
}

export default function ProjectGallerySection({
  image,
  gallery,
  status,
  name,
  location,
  tagline,
  statusColors,
  video,
}: ProjectGallerySectionProps) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const galleryImages = gallery.length > 0 ? gallery : [image];

  return (
    <>
      <div
        className="relative h-[75vh] min-h-[520px] bg-primary overflow-hidden cursor-pointer"
        onClick={() => setIsGalleryOpen(true)}
      >
        {/* Back to Projects Button */}
        <div
          className="absolute top-28 left-6 lg:left-8 z-30"
          onClick={(e) => e.stopPropagation()}
        >
          <Link
            href="/projects"
            className="flex items-center gap-2 px-4 py-2 bg-black/40 hover:bg-black/60 border border-white/10 hover:border-white/30 rounded-full text-white/80 hover:text-white text-xs tracking-[0.15em] uppercase font-semibold font-body backdrop-blur-md transition-all duration-300"
          >
            <ArrowLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
            <span>Back to Projects</span>
          </Link>
        </div>
        {video ? (
          <video
            src={video}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105 pointer-events-none"
          />
        ) : (
          <Image
            src={image}
            alt={name}
            fill
            priority
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            sizes="100vw"
          />
        )}
        {/* Gradient: image clearly visible at top, dark only at bottom for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-transparent" />

        {/* Zoom hint on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none z-10"
        >
          <div className="flex flex-col items-center gap-3">
            <ZoomIn size={40} className="text-white" />
            <p className="text-white text-sm tracking-widest uppercase font-semibold font-body">
              Click to View Gallery
            </p>
          </div>
        </motion.div>

        {/* Content row: title stack left, tagline watermark right */}
        <div className="absolute inset-0 flex items-end max-w-7xl mx-auto px-6 lg:px-8 pb-16 z-20 pointer-events-none">
          <div className="w-full flex items-end justify-between gap-8">

            {/* Left: logo crest → divider → badge → title → location */}
            <div>
              <span
                className={`inline-block text-xs tracking-widest uppercase font-semibold px-3 py-1.5 mb-5 font-body ${statusColors[status]}`}
              >
                {status}
              </span>
              <h1
                className="text-5xl md:text-7xl font-bold text-white mb-4 leading-none"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {name}
              </h1>
              <p className="text-white/60 text-base font-body flex items-center gap-2 tracking-wide">
                <MapPin size={14} className="text-amber-500/70 shrink-0" />
                {location}
              </p>
            </div>

            {/* Right: subtle tagline watermark on large screens */}
            {tagline && (
              <p className="hidden lg:block text-right text-white/20 text-xs tracking-[0.3em] uppercase font-body self-end pb-1 max-w-[160px] leading-relaxed">
                {tagline}
              </p>
            )}

          </div>
        </div>
      </div>

      <GalleryModal
        isOpen={isGalleryOpen}
        images={galleryImages}
        onClose={() => setIsGalleryOpen(false)}
      />
    </>
  );
}
