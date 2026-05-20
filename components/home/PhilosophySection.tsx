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
    image: "/images/solitaire-plaza/Tavra Corner Day-a.jpg",
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
            <div className="max-w-7xl mx-auto w-full px-6 lg:px-8 grid grid-cols-12 gap-8 items-center h-full py-16">
              {/* Left Column (Static) */}
              <div className="col-span-4 flex flex-col justify-center gap-6 h-full pr-8">
                <span className="text-white/30 text-xs tracking-[0.4em] uppercase font-body">
                  Our Philosophy
                </span>
                
                <h2 
                  className="text-4xl lg:text-5xl font-bold text-white leading-tight font-heading"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  A Seamless Blend of <br />
                  <span className="italic font-light text-white/60">Purpose</span> and <br />
                  <span className="italic font-light text-white/60">Aesthetics</span>
                </h2>

                <div className="w-10 h-px bg-white/20 my-2" />

                <p className="text-white/40 text-sm leading-relaxed font-body max-w-sm">
                  We are a design and engineering company with a focus on quality construction, 
                  architectural excellence, sustainable design, and innovation.
                </p>

                <div className="mt-4">
                  <Link href="/contact">
                    <Button size="md" variant="primary" className="bg-white text-black hover:bg-white/90">
                      Let's Connect
                      <ArrowRight size={14} />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Column (Horizontal Scroll Track) */}
              <div ref={rightColRef} className="col-span-8 overflow-hidden h-[70vh] flex items-center relative">
                <motion.div ref={trackRef} style={{ x }} className="flex gap-10 lg:gap-14 absolute left-0">
                  {slides.map((slide, index) => (
                    <div
                      key={index}
                      className="relative w-[38vw] h-[60vh] shrink-0 overflow-hidden group border border-white/10"
                    >
                      {/* Image background with dark grayscale */}
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                        style={{
                          backgroundImage: `url('${slide.image}')`,
                          filter: "grayscale(30%) contrast(110%)",
                        }}
                      />
                      {/* Elegant dark overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-85 transition-opacity" />
                      
                      {/* Top content: Category and number */}
                      <div className="absolute top-6 left-6 right-6 flex justify-between items-center text-white/50 text-xs tracking-widest font-body">
                        <span>{slide.number} &mdash; {slide.category}</span>
                      </div>

                      {/* Bottom content: Title & Description */}
                      <div className="absolute bottom-8 left-8 right-8 flex flex-col gap-3 text-white">
                        <h3 
                          className="text-2xl font-bold font-heading leading-tight"
                          style={{ fontFamily: "var(--font-playfair)" }}
                        >
                          {slide.regularText}{" "}
                          <span className="italic font-light text-white/70">
                            {slide.italicWord}
                          </span>
                        </h3>
                        <p className="text-white/50 text-xs leading-relaxed max-w-xs font-body opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {slide.description}
                        </p>
                        <div className="flex items-center gap-2 text-white/30 text-[10px] tracking-widest uppercase font-body mt-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                          {slide.projectTag}
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
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
              <span className="text-white/30 text-xs tracking-[0.3em] uppercase font-body">
                Our Philosophy
              </span>
              <h2 
                className="text-3xl font-bold text-white leading-tight font-heading"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                A Seamless Blend of <br />
                <span className="italic font-light text-white/60">Purpose</span> and <br />
                <span className="italic font-light text-white/60">Aesthetics</span>
              </h2>
              <p className="text-white/40 text-sm leading-relaxed font-body">
                We are a design and engineering company with a focus on quality construction, 
                architectural excellence, sustainable design, and innovation.
              </p>
            </div>

            {/* Horizontal Swipe Cards */}
            <div className="flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-4">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className="relative w-[85vw] h-[50vh] shrink-0 snap-center overflow-hidden border border-white/10"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url('${slide.image}')`,
                      filter: "grayscale(30%) contrast(110%)",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  
                  <div className="absolute top-5 left-5 right-5 flex justify-between items-center text-white/50 text-xs tracking-widest font-body">
                    <span>{slide.number} &mdash; {slide.category}</span>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2 text-white">
                    <h3 
                      className="text-xl font-bold font-heading"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {slide.regularText}{" "}
                      <span className="italic font-light text-white/70">
                        {slide.italicWord}
                      </span>
                    </h3>
                    <p className="text-white/50 text-xs leading-relaxed font-body">
                      {slide.description}
                    </p>
                    <div className="flex items-center gap-2 text-white/30 text-[9px] tracking-widest uppercase font-body mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                      {slide.projectTag}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <Link href="/contact">
                <Button size="md" variant="primary" className="w-full bg-white text-black hover:bg-white/90 justify-center">
                  Let's Connect
                  <ArrowRight size={14} />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
