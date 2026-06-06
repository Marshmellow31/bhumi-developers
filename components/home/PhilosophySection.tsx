"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface SlideData {
  number: string;
  category: string;
  titleHtml: string; // To support italicized text via HTML or custom React Node
  italicWord: string;
  regularText: string;
  description: string;
  image: string;
  projectTag: string;
}

const slides: SlideData[] = [
  {
    number: "01",
    category: "DESIGN",
    titleHtml: "Meticulous <em>Planning</em>",
    italicWord: "Planning",
    regularText: "Meticulous",
    description: "Designing spaces with attention to layout optimization, natural ventilation, and architectural harmony.",
    image: "/images/central-square/Pacnhbatti 505 High 2nd_Cam01-a.webp",
    projectTag: "Central Square",
  },
  {
    number: "02",
    category: "CRAFT",
    titleHtml: "Superior <em>Build Quality</em>",
    italicWord: "Build Quality",
    regularText: "Superior",
    description: "Crafting structures with top-tier materials and rigorous engineering standards to stand the test of time.",
    image: "/images/solitaire-plaza/Tavra Top 1st Cam-v01.webp",
    projectTag: "Solitaire Pallazzo",
  },
  {
    number: "03",
    category: "BUSINESS",
    titleHtml: "Modern <em>Retail Hubs</em>",
    italicWord: "Retail Hubs",
    regularText: "Modern",
    description: "Positioning Grade-A corporate offices and retail outlets at high-footfall urban centers.",
    image: "/images/city-center/city-center-1.webp",
    projectTag: "City Center",
  },
];

export default function PhilosophySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Framer Motion hooks for desktop & mobile scroll animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // Calculate dynamic scroll distance in pixels to align the last card perfectly
  const [scrollRange, setScrollRange] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateScrollRange = () => {
      if (trackRef.current && rightColRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const containerWidth = rightColRef.current.clientWidth;
        setScrollRange(Math.max(0, trackWidth - containerWidth));
      }
    };

    calculateScrollRange();
    const timer = setTimeout(calculateScrollRange, 150);

    window.addEventListener("resize", calculateScrollRange);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculateScrollRange);
    };
  }, []);

  // Translate the horizontal track dynamically based on measured pixels
  const xRaw = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const x = useTransform(xRaw, (v) => -v * scrollRange);

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-[#111111] z-10">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div ref={rightColRef} className="w-full overflow-hidden h-[75vh] md:h-[70vh] flex items-center relative">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-2 md:gap-3 lg:gap-4 items-center absolute left-0 pl-6 md:pl-16 lg:pl-24"
          >
            {/* Left Column Text Block (First item in the horizontal scroll track) */}
            <div className="w-[80vw] md:w-[45vw] lg:w-[30vw] shrink-0 flex flex-col justify-center gap-6 pr-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight font-body">
                A Seamless Blend <br />
                of <span className="font-heading italic font-light text-white/70">Purpose</span> and <br />
                <span className="font-heading italic font-light text-white/70">Aesthetics</span>
              </h2>

              <p className="text-white/40 text-sm leading-relaxed font-body max-w-[70vw] md:max-w-md lg:max-w-sm">
                We are a design and engineering company with a focus on quality construction,
                architectural excellence, sustainable design, and innovation.
              </p>
            </div>

            {/* Cards */}
            {slides.map((slide, index) => (
              <div
                key={index}
                className="relative w-[90vw] md:w-[75vw] lg:w-[68vw] h-[64vh] md:h-[66vh] lg:h-[66vh] shrink-0 overflow-hidden group border border-white/10"
              >
                {/* Image background */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                  style={{
                    backgroundImage: `url('${slide.image}')`,
                  }}
                />
                {/* Elegant dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity" />

                {/* Top-left building name */}
                <div className="absolute top-6 md:top-8 left-6 md:left-8 z-10">
                  <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/60 font-body font-semibold">
                    {slide.projectTag}
                  </span>
                </div>

                {/* Bottom content: Title */}
                <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 right-6 md:right-8 text-white">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold font-body leading-tight">
                    {slide.regularText} <br />
                    <span className="font-heading italic font-light text-white/80">
                      {slide.italicWord}
                    </span>
                  </h3>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
