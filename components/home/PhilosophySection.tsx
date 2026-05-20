"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

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
    image: "/images/central-square/Pacnhbatti 505 Front_Cam01-a.jpg",
    projectTag: "Central Square",
  },
  {
    number: "02",
    category: "CRAFT",
    titleHtml: "Superior <em>Build Quality</em>",
    italicWord: "Build Quality",
    regularText: "Superior",
    description: "Crafting structures with top-tier materials and rigorous engineering standards to stand the test of time.",
    image: "/images/solitaire-plaza/Tavra Top 1st Cam-v01.jpg",
    projectTag: "Solitaire Pallazzo",
  },
  {
    number: "03",
    category: "COMMUNITY",
    titleHtml: "Integrated <em>Living</em>",
    italicWord: "Living",
    regularText: "Integrated",
    description: "Creating communities with self-contained ecosystems, green spaces, and modern lifestyle amenities.",
    image: "/images/pritam-residency/pritam-residency.png",
    projectTag: "Pritam Residency",
  },
  {
    number: "04",
    category: "LEISURE",
    titleHtml: "Rooftop <em>Recreation</em>",
    italicWord: "Recreation",
    regularText: "Rooftop",
    description: "Curating premium active spaces such as terrace pickleball courts, multi-sport turfs, and rooftop cafes.",
    image: "/images/solitaire-plaza/Tavra Tarrace Pickel Ball Area-v01.jpg",
    projectTag: "Solitaire Pallazzo",
  },
  {
    number: "05",
    category: "NATURE",
    titleHtml: "Green <em>Landscapes</em>",
    italicWord: "Landscapes",
    regularText: "Green",
    description: "Integrating lush manicured gardens, quiet gazebo sitouts, and open-air decks to keep you connected with nature.",
    image: "/images/solitaire-plaza/Tavra Gazibo Sitting Cam-v01.jpg",
    projectTag: "Solitaire Pallazzo",
  },
  {
    number: "06",
    category: "BUSINESS",
    titleHtml: "Modern <em>Retail Hubs</em>",
    italicWord: "Retail Hubs",
    regularText: "Modern",
    description: "Positioning Grade-A corporate offices and retail outlets at high-footfall urban centers.",
    image: "/images/city-centre/city-centre-1.jpg",
    projectTag: "City Centre",
  },
];

export default function PhilosophySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Detect screen size to switch between mobile normal scroll and desktop sticky scroll-animation
  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Framer Motion hooks for desktop scroll animation
  const { scrollYProgress } = useScroll({
    target: isMounted && !isMobile ? containerRef : undefined,
  });

  // Calculate dynamic scroll distance in pixels to align the last card perfectly
  const [scrollRange, setScrollRange] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobile) return;

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
  }, [isMobile]);

  // Translate the horizontal track dynamically based on measured pixels
  const xRaw = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const x = useTransform(xRaw, (v) => -v * scrollRange);

  return (
    <>
      {/* DESKTOP VIEW (Sticky Scroll Animation) */}
      {!isMobile && (
        <div ref={containerRef} className="relative h-[400vh] bg-[#0A0A0A] z-10">
          <div className="sticky top-0 h-screen flex items-center overflow-hidden">
            <div ref={rightColRef} className="w-full overflow-hidden h-[70vh] flex items-center relative">
              <motion.div
                ref={trackRef}
                style={{ x }}
                className="flex gap-6 lg:gap-8 items-center absolute left-0 pl-8 md:pl-16 lg:pl-24"
              >
                {/* Left Column Text Block (First item in the horizontal scroll track) */}
                <div className="w-[30vw] shrink-0 flex flex-col justify-center gap-6 pr-8">
                  <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight font-body">
                    A Seamless Blend <br />
                    of <span className="font-heading italic font-light text-white/70">Purpose</span> and <br />
                    <span className="font-heading italic font-light text-white/70">Aesthetics</span>
                  </h2>

                  <p className="text-white/40 text-sm leading-relaxed font-body max-w-sm">
                    We are a design and engineering company with a focus on quality construction,
                    architectural excellence, sustainable design, and innovation.
                  </p>
                </div>

                {/* Cards */}
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className="relative w-[52vw] h-[55vh] shrink-0 overflow-hidden group border border-white/10"
                  >
                    {/* Image background with dark grayscale */}
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                      style={{
                        backgroundImage: `url('${slide.image}')`,
                      }}
                    />
                    {/* Elegant dark overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity" />

                    {/* Bottom content: Title */}
                    <div className="absolute bottom-8 left-8 right-8 text-white">
                      <h3 className="text-3xl lg:text-4xl font-bold font-body leading-tight">
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
      )}

      {/* MOBILE & TABLET VIEW (Normal Horizontal Swipe) */}
      {isMobile && (
        <section className="bg-[#0A0A0A] py-20 px-6 overflow-hidden">
          <div className="flex flex-col gap-8">
            {/* Header info */}
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-bold text-white leading-tight font-body">
                A Seamless Blend <br />
                of <span className="font-heading italic font-light text-white/70">Purpose</span> and <br />
                <span className="font-heading italic font-light text-white/70">Aesthetics</span>
              </h2>
              <p className="text-white/40 text-sm leading-relaxed font-body">
                We are a design and engineering company with a focus on quality construction,
                architectural excellence, sustainable design, and innovation.
              </p>
            </div>

            {/* Horizontal Swipe Cards */}
            <div className="flex gap-4 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-4">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className="relative w-[85vw] h-[50vh] shrink-0 snap-center overflow-hidden border border-white/10"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url('${slide.image}')`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2 text-white">
                    <h3 className="text-2xl font-bold font-body leading-tight">
                      {slide.regularText} <br />
                      <span className="font-heading italic font-light text-white/80">
                        {slide.italicWord}
                      </span>
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
