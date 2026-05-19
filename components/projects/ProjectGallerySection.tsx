"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ZoomIn } from "lucide-react";
import GalleryModal from "@/components/ui/GalleryModal";

interface ProjectGallerySectionProps {
  image: string;
  gallery: string[];
  status: string;
  name: string;
  location: string;
  statusColors: Record<string, string>;
}

export default function ProjectGallerySection({
  image,
  gallery,
  status,
  name,
  location,
  statusColors,
}: ProjectGallerySectionProps) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const galleryImages = gallery.length > 0 ? gallery : [image];

  const handleImageClick = () => {
    setIsGalleryOpen(true);
  };

  return (
    <>
      {/* Hero */}
      <div
        className="relative h-[60vh] min-h-[400px] bg-primary overflow-hidden cursor-pointer"
        onClick={handleImageClick}
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
          style={{
            backgroundImage: `url('${image}')`,
          }}
        />
        <div className="absolute inset-0 bg-primary/70" />

        {/* Zoom Indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-none"
        >
          <div className="flex flex-col items-center gap-3">
            <ZoomIn size={40} className="text-white" />
            <p className="text-white text-sm tracking-widest uppercase font-semibold font-body">
              Click to View Gallery
            </p>
          </div>
        </motion.div>

        <div className="absolute inset-0 flex items-end max-w-7xl mx-auto px-6 lg:px-8 pb-12">
          <div className="relative z-10">
            <span
              className={`inline-block text-xs tracking-widest uppercase font-semibold px-3 py-1.5 mb-4 font-body ${
                statusColors[status]
              }`}
            >
              {status}
            </span>
            <h1
              className="text-4xl md:text-6xl font-bold text-white mb-3"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {name}
            </h1>
            <p className="text-white/70 text-lg font-body flex items-center gap-2">
              <span>📍</span>
              {location}
            </p>
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
