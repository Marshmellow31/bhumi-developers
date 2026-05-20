"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { projects, type ProjectStatus, type ProjectType } from "@/data/projects";

const statusFilters: Array<{ label: string; value: ProjectStatus | "All" }> = [
  { label: "All", value: "All" },
  { label: "Ongoing", value: "Ongoing" },
  { label: "Completed", value: "Completed" },
  { label: "Upcoming", value: "Upcoming" },
];

const typeFilters: Array<{ label: string; value: ProjectType | "All" }> = [
  { label: "All Types", value: "All" },
  { label: "Residential", value: "Residential" },
  { label: "Villa", value: "Villa" },
  { label: "Commercial", value: "Commercial" },
  { label: "Mixed Use", value: "Mixed Use" },
];

export default function ProjectGrid() {
  const router = useRouter();
  const [activeStatus, setActiveStatus] = useState<ProjectStatus | "All">("All");
  const [activeType, setActiveType] = useState<ProjectType | "All">("All");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [windowWidth, setWindowWidth] = useState(1200);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filtered = projects.filter((p) => {
    const statusMatch = activeStatus === "All" || p.status === activeStatus;
    const typeMatch = activeType === "All" || p.type === activeType;
    return statusMatch && typeMatch;
  });

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-12">
        <div className="flex flex-wrap gap-2">
          {statusFilters.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => {
                setActiveStatus(value);
                setHoveredIndex(null);
              }}
              className={`px-4 py-2 text-xs tracking-[0.15em] uppercase font-semibold border transition-colors duration-200 font-body ${
                activeStatus === value
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-muted border-border hover:border-primary hover:text-primary"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {typeFilters.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => {
                setActiveType(value);
                setHoveredIndex(null);
              }}
              className={`px-4 py-2 text-xs tracking-[0.15em] uppercase font-semibold border transition-colors duration-200 font-body ${
                activeType === value
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-muted border-border hover:border-primary hover:text-primary"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <p className="text-xs text-muted tracking-[0.2em] uppercase font-body mb-8">
        {filtered.length} Project{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Dynamic Hover-Expanding Panels */}
      <AnimatePresence mode="popLayout">
        {filtered.length > 0 ? (
          <motion.div 
            layout 
            className="flex flex-col md:flex-row gap-4 w-full overflow-hidden items-stretch"
          >
            {filtered.map((project, index) => {
              const formattedNumber = String(index + 1).padStart(2, "0");
              const isHovered = hoveredIndex === index;
              
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    flexGrow: isHovered ? 2.2 : hoveredIndex === null ? 1 : 0.7,
                  }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => {
                    if (isHovered) {
                      router.push(`/projects/${project.slug}`);
                    } else {
                      setHoveredIndex(index);
                    }
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 380, 
                    damping: 32
                  }}
                  className={`relative overflow-hidden border border-white/10 group cursor-pointer bg-primary transition-all duration-300 ${
                    isHovered ? "shadow-2xl" : "shadow-md"
                  }`}
                  style={{
                    height: windowWidth < 768 
                      ? (isHovered ? "380px" : "110px") 
                      : "60vh"
                  }}
                >
                  {/* Background Image with Scale and Filter Effects */}
                  <motion.div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url('${project.image}')`,
                    }}
                    animate={{
                      scale: isHovered ? 1.05 : 1,
                      filter: isHovered
                        ? "grayscale(0%) contrast(100%) brightness(0.65)"
                        : "grayscale(25%) contrast(105%) brightness(0.55)"
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />

                  {/* Dark Elegant Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent z-0 opacity-90" />
                  
                  {/* Card Content Wrapper */}
                  <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8 z-10 select-none">
                    
                    {/* Collapsed State Content */}
                    <AnimatePresence>
                      {!isHovered && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.1 }}
                          className="absolute inset-0 flex flex-col justify-between p-6 md:p-8 pointer-events-none"
                        >
                          {/* Number */}
                          <span className="text-sm font-body font-bold text-white/50 tracking-wider">
                            {formattedNumber}
                          </span>
                          
                          {/* Rotated Desktop Title */}
                          <div className="hidden md:block absolute bottom-12 left-1/2 -translate-x-1/2 origin-center whitespace-nowrap">
                            <span 
                              className="text-lg font-bold tracking-[0.25em] uppercase text-white/70 font-heading block"
                              style={{
                                writingMode: "vertical-rl",
                                textOrientation: "mixed",
                                transform: "rotate(180deg)",
                                fontFamily: "var(--font-playfair)"
                              }}
                            >
                              {project.name}
                            </span>
                          </div>

                          {/* Horizontal Mobile Title */}
                          <div className="md:hidden flex justify-between items-end w-full">
                            <h4 className="text-lg font-bold text-white/80 font-heading" style={{ fontFamily: "var(--font-playfair)" }}>
                              {project.name}
                            </h4>
                            <span className="text-xs text-amber-500 font-semibold tracking-wider font-body">
                              {project.status}
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Expanded State Details */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 15 }}
                          transition={{ duration: 0.2 }}
                          className="flex flex-col h-full justify-between pointer-events-auto"
                        >
                          {/* Top Tag Row */}
                          <div className="flex justify-between items-start">
                            <span className="text-2xl font-bold font-body text-amber-500/80">
                              {formattedNumber}
                            </span>
                            <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] tracking-[0.15em] uppercase font-semibold px-2.5 py-1 font-body">
                              {project.status}
                            </span>
                          </div>

                          {/* Info Stack */}
                          <div className="flex flex-col gap-2 mt-auto">
                            <span className="text-[10px] tracking-[0.2em] text-white/50 uppercase font-semibold font-body">
                              {project.type} &mdash; {project.location}
                            </span>
                            <h3 
                              className="text-2xl md:text-4xl font-bold text-white leading-tight font-heading"
                              style={{ fontFamily: "var(--font-playfair)" }}
                            >
                              {project.name}
                            </h3>
                            <p className="text-white/60 text-xs italic font-body max-w-md line-clamp-1">
                              &ldquo;{project.tagline}&rdquo;
                            </p>
                            <p className="text-white/70 text-xs leading-relaxed font-body max-w-lg line-clamp-3 md:line-clamp-2 mt-1">
                              {project.description}
                            </p>

                            {/* CTA Row */}
                            <div className="flex items-center justify-between border-t border-white/20 pt-4 mt-2 max-w-lg">
                              <div>
                                <span className="text-[9px] text-white/40 uppercase tracking-widest font-body block mb-0.5">
                                  Starting From
                                </span>
                                <span className="text-base md:text-lg font-bold text-white font-heading" style={{ fontFamily: "var(--font-playfair)" }}>
                                  {formatPrice(project.priceRange.min)}
                                </span>
                              </div>
                              <Link href={`/projects/${project.slug}`} onClick={(e) => e.stopPropagation()}>
                                <Button 
                                  variant="primary" 
                                  size="sm" 
                                  className="bg-white text-black hover:bg-white/90 border-white hover:border-white/90"
                                >
                                  Explore Project
                                  <ArrowRight size={12} />
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-muted font-body text-center py-16 tracking-wide"
          >
            No projects found for the selected filters.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
