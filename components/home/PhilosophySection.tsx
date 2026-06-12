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
    titleHtml: "Prime Commercial <em>Destination</em>",
    italicWord: "Destination",
    regularText: "Prime Commercial",
    description: "Designing spaces with attention to layout optimization, natural ventilation, and architectural harmony.",
    image: "/images/central-square/Pacnhbatti 505 High 2nd_Cam01-a.webp",
    projectTag: "Central Square",
  },
  {
    number: "02",
    category: "CRAFT",
    titleHtml: "Residential <em>High Rise</em>",
    italicWord: "High Rise",
    regularText: "Residential",
    description: "Crafting structures with top-tier materials and rigorous engineering standards to stand the test of time.",
    image: "/images/solitaire-plaza/Tavra Top 1st Cam-v01.webp",
    projectTag: "Solitaire Pallazzo",
  },
  {
    number: "03",
    category: "BUSINESS",
    titleHtml: "Mixed Use <em>Development</em>",
    italicWord: "Development",
    regularText: "Mixed Use",
    description: "Positioning Grade-A corporate offices and retail outlets at high-footfall urban centers.",
    image: "/images/city-center/city-center-1.webp",
    projectTag: "City Center",
  },
  {
    number: "04",
    category: "HOSPITALITY",
    titleHtml: "Luxury <em>Hotel</em>",
    italicWord: "Hotel",
    regularText: "Luxury",
    description: "An upcoming luxury hotel project bringing the renowned Fern Series by Marriott to Bharuch.",
    image: "/images/fern-series/WhatsApp Image 2026-06-11 at 4.20.56 PM.jpeg",
    projectTag: "Fern Series by Marriott",
  },
  {
    number: "05",
    category: "UPCOMING",
    titleHtml: "Luxury <em>Resort</em>",
    italicWord: "Resort",
    regularText: "Luxury",
    description: "An upcoming premium residential project offering luxurious villa living with world-class resort amenities.",
    image: "/images/resort/resort-main.jpeg",
    projectTag: "The Resort",
  },
  {
    number: "06",
    category: "COMMERCIAL",
    titleHtml: "IT <em>Hubs</em>",
    italicWord: "Hubs",
    regularText: "IT",
    description: "An exciting new development set to redefine the city's commercial landscape.",
    image: "/images/bkc2/bkc2-main.jpeg",
    projectTag: "BKC 2",
  },
];

export default function PhilosophySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
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
    <div ref={containerRef} className="relative h-[500vh] bg-[#111111] z-10">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div ref={rightColRef} className="w-full overflow-hidden h-[75vh] md:h-[70vh] flex items-center relative">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-2 md:gap-3 lg:gap-4 items-center absolute left-0 pl-6 md:pl-16 lg:pl-24 pr-6 md:pr-16 lg:pr-24 w-max"
          >
            {/* Left Column Text Block (First item in the horizontal scroll track) */}
            <div className="w-[80vw] md:w-[45vw] lg:w-[30vw] shrink-0 flex flex-col justify-center gap-6 pr-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight font-body">
                Creating <span className="font-heading italic font-light text-white/70">Landmarks.</span> <br />
                Building <span className="font-heading italic font-light text-white/70">Trust.</span>
              </h2>
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
                {/* Elegant dark overlays for contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/70 to-transparent" />

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
