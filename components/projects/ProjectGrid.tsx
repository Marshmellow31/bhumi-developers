"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { projects } from "@/data/projects";



export default function ProjectGrid() {
  const router = useRouter();
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

  return (
    <div className="flex-grow flex flex-col min-h-0 w-full">
      {/* Count */}
      <p className="text-xs text-muted tracking-[0.2em] uppercase font-body mb-4 shrink-0">
        {projects.length} Project{projects.length !== 1 ? "s" : ""}
      </p>

      {/* Dynamic Hover-Expanding Panels */}
      <AnimatePresence mode="popLayout">
        {projects.length > 0 ? (
          <motion.div 
            layout 
            className="flex flex-col md:flex-row gap-4 w-full overflow-hidden items-stretch flex-1 min-h-0"
          >
            {projects.map((project, index) => {
              const formattedNumber = String(index + 1).padStart(2, "0");
              const isHovered = hoveredIndex === index;
              const isVertical = windowWidth >= 768 && hoveredIndex !== null && !isHovered;

              
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    flexGrow: isHovered ? 4.5 : hoveredIndex === null ? 1 : 0.6,
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
                      : "100%"
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
                    
                    {/* Top Row: Number & Status Tag */}
                    <div className={`flex items-start w-full transition-all duration-300 ${
                      isVertical ? "justify-center" : "justify-between"
                    }`}>
                      {/* Number */}
                      <motion.span
                        layout="position"
                        animate={{
                          fontSize: isHovered ? "1.5rem" : "0.875rem",
                          color: isHovered ? "rgb(217, 119, 6, 0.8)" : "rgb(255, 255, 255, 0.5)"
                        }}
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        className="font-body font-bold"
                      >
                        {formattedNumber}
                      </motion.span>

                      {/* Right side group: Status Tag */}
                      <div className="flex flex-col items-end gap-3">
                        <AnimatePresence>
                          {isHovered && (
                            <motion.span
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{ type: "spring", stiffness: 380, damping: 32 }}
                              className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] tracking-[0.15em] uppercase font-semibold px-2.5 py-1 font-body"
                            >
                              {project.status}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Bottom Info Stack */}
                    <div className="flex flex-col justify-end h-full items-start">
                      
                      {/* Sub-tag / Location (Fades in when expanded) */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                            className="text-[10px] tracking-[0.2em] text-white/50 uppercase font-semibold font-body block mb-1"
                          >
                            {project.type} &mdash; {project.location}
                          </motion.span>
                        )}
                      </AnimatePresence>

                      {/* Title: Shared between Collapsed and Expanded states */}
                      <motion.h3
                        layout="position"
                        animate={{
                          fontSize: windowWidth >= 768
                            ? (isHovered ? "2rem" : "1.125rem")
                            : (isHovered ? "1.5rem" : "1rem"),
                          color: isHovered ? "rgb(255, 255, 255)" : "rgba(255, 255, 255, 0.5)",
                          opacity: isVertical ? 0 : 1,
                          y: isVertical ? 20 : 0
                        }}
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        className={`font-bold leading-tight font-heading w-full ${
                          isHovered 
                            ? "whitespace-normal" 
                            : "truncate"
                        }`}
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        {project.name}
                      </motion.h3>

                      {/* Expanded Details Stack (tagline, description, price, button) */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 40 }}
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                            className="flex flex-col gap-2 mt-1 pointer-events-auto"
                          >
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
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Spacer at the bottom to push text up smoothly when expanded on desktop */}
                      <motion.div
                        layout
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        style={{
                          height: windowWidth >= 768 && isHovered ? "100px" : "0px"
                        }}
                        className="w-full shrink-0"
                      />
                    </div>

                    {/* Vertical Title (Visible only on desktop when collapsed while another card is hovered) */}
                    <AnimatePresence>
                      {isVertical && (
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 0.7, y: 0 }}
                          exit={{ opacity: 0, y: 30 }}
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          className="absolute bottom-16 left-1/2 -translate-x-1/2 origin-center whitespace-nowrap z-20 pointer-events-none"
                        >
                          <span 
                            className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-white font-heading block"
                            style={{
                              writingMode: "vertical-rl",
                              textOrientation: "mixed",
                              transform: "rotate(180deg)",
                              fontFamily: "var(--font-playfair)"
                            }}
                          >
                            {project.name}
                          </span>
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
