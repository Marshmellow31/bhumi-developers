"use client";

import { useState } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import GalleryModal from "@/components/ui/GalleryModal";
import SectionHeading from "@/components/ui/SectionHeading";

const awards = [
  {
    photo: "/images/about/bharuch-civil-engineers-forum.png",
    award: "Civil Engineering Felicitation",
    body: "Bharuch Civil Engineers Forum",
    year: "Engineers' Day",
    desc: "Felicitation of Shri Kiran Majmudar in recognition of valuable contribution and outstanding achievements in the field of Civil Engineering.",
  },
  {
    photo: "/images/about/golden-trophy.png",
    award: "Best Developer Trophy",
    body: "Commercial Excellence Awards",
    year: "2025",
    desc: "Iconic gold trophy awarded to Kiran Majmudar for excellence, dedication, and leadership in landmark commercial projects.",
  },
  {
    photo: "/images/about/certificate-appreciation.png",
    award: "Certificate of Appreciation",
    body: "Vivanta Awards",
    year: "2025",
    desc: "Awarded to Kiran Majmudar for outstanding performance and growth in commercial developments under Vir Bhumi Buildcon.",
  },
  {
    photo: "/images/about/city-icon-award.png",
    award: "City Icon Award",
    body: "South Gujarat Real Estate Honours",
    year: "2025",
    desc: "Standing plaque presenting the City Icon honour to Kiran Majmudar of Vir Bhumi Buildcon Pvt. Ltd. for creating architectural landmarks.",
  },
  {
    photo: "/images/about/certificate-excellence.png",
    award: "Certificate of Excellence",
    body: "National Real Estate Awards",
    year: "2026",
    desc: "Certificate of Excellence proudly presented to Vir Bhumi Buildcon Pvt. Ltd. for being the Best Developer of the Year in the Commercial Project category.",
  },
];

export default function AwardsSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setIsOpen(true);
  };

  const imageUrls = awards.map((a) => a.photo);

  return (
    <div className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <SectionHeading
            eyebrow="Recognition"
            title="Awards & Honours"
            subtitle="Decades of excellence recognised by industry leaders and communities alike."
            align="center"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {awards.map((a, i) => (
            <div
              key={i}
              onClick={() => openLightbox(i)}
              className="bg-surface border border-primary/5 p-6 flex flex-col gap-5 group hover:border-primary/20 hover:shadow-xl transition-all duration-300 cursor-pointer relative"
            >
              {/* Photo Container */}
              <div className="w-full h-64 bg-primary/[0.02] border border-primary/10 flex items-center justify-center overflow-hidden relative rounded-sm">
                <Image
                  src={a.photo}
                  alt={a.award}
                  fill
                  className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-background/90 text-primary p-3 rounded-full shadow-lg flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <Maximize2 size={20} />
                  </div>
                </div>
              </div>

              {/* Award Info */}
              <div className="flex flex-col gap-2 flex-grow">
                <div className="flex items-center justify-between">
                  <span className="text-muted text-[10px] tracking-[0.3em] uppercase font-body font-semibold">
                    {a.year}
                  </span>
                  <div className="w-4 h-px bg-primary/10" />
                </div>
                <h4
                  className="text-primary font-bold text-lg leading-snug group-hover:text-sienna transition-colors duration-300"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {a.award}
                </h4>
                <p className="text-muted text-xs tracking-[0.2em] uppercase font-body">
                  {a.body}
                </p>
                <p className="text-muted text-sm font-body leading-relaxed pt-3 mt-auto border-t border-primary/5">
                  {a.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery Lightbox Modal */}
      <GalleryModal
        isOpen={isOpen}
        images={imageUrls}
        onClose={() => setIsOpen(false)}
        initialIndex={activeIndex}
      />
    </div>
  );
}
