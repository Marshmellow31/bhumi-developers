"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ZoomIn } from "lucide-react";
import GalleryModal from "@/components/ui/GalleryModal";

interface ProjectGalleryGridProps {
  gallery: string[];
  projectName: string;
}

export default function ProjectGalleryGrid({
  gallery,
  projectName,
}: ProjectGalleryGridProps) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
    setIsGalleryOpen(true);
  };

  if (!gallery || gallery.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {gallery.map((img, i) => (
          <motion.div
            key={i}
            onClick={() => handleImageClick(i)}
            className="relative overflow-hidden group aspect-[4/3] bg-primary/5 border border-border cursor-pointer"
            whileHover={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src={img}
              alt={`${projectName} Gallery ${i + 1}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-primary/10 group-hover:bg-black/40 transition-colors duration-300" />

            {/* Zoom Icon */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <ZoomIn size={32} className="text-white" />
            </motion.div>
          </motion.div>
        ))}
      </div>

      <GalleryModal
        isOpen={isGalleryOpen}
        images={gallery}
        initialIndex={selectedIndex}
        onClose={() => setIsGalleryOpen(false)}
      />
    </>
  );
}
