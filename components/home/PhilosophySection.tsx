"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface Segment {
  number: string;
  category: string;
  eyebrow: string;
  headline: string[];
  description: string;
  highlights: string[];
  image: string;
  projectRef: string;
  projectSlug: string;
  accentColor: string;
}

const segments: Segment[] = [
  {
    number: "01",
    category: "COMMERCIAL",
    eyebrow: "Retail & Office Spaces",
    headline: ["Built for Business,", "Designed for Impact"],
    description:
      "Grade-A commercial developments at prime urban locations — attracting India's top retail brands and creating thriving business districts.",
    highlights: [
      "High-footfall city-centre addresses",
      "Anchor tenants — Allen Solly, Puma, Lee Cooper",
      "Future-ready MEP & structural systems",
    ],
    image: "/images/city-center/city-center-1.webp",
    projectRef: "City Center · Bharuch",
    projectSlug: "city-center",
    accentColor: "rgba(201,169,110,0.85)",
  },
  {
    number: "02",
    category: "RESIDENTIAL",
    eyebrow: "Premium Living Spaces",
    headline: ["Where Comfort", "Meets Aspiration"],
    description:
      "Thoughtfully planned apartments and residences that balance modern aesthetics with the warmth of everyday living.",
    highlights: [
      "Vastu-compliant, light-optimised layouts",
      "Curated lifestyle amenities",
      "Premium finishes across every unit",
    ],
    image: "/images/solitaire-plaza/Tavra Top 1st Cam-v01.webp",
    projectRef: "Solitaire Pallazzo · Bharuch",
    projectSlug: "solitaire-pallazzo",
    accentColor: "rgba(201,169,110,0.85)",
  },
  {
    number: "03",
    category: "MIXED-USE",
    eyebrow: "Integrated Communities",
    headline: ["Live. Work. Thrive.", "One Address."],
    description:
      "Vertical communities that weave retail, offices, and residences into a single cohesive ecosystem — the future of urban living.",
    highlights: [
      "Active retail at grade, offices & homes above",
      "Walk-to-work & walk-to-shop convenience",
      "Shared infrastructure, lower cost of living",
    ],
    image: "/images/central-square/Pacnhbatti 505 High 2nd_Cam01-a.webp",
    projectRef: "Central Square · Bharuch",
    projectSlug: "central-square",
    accentColor: "rgba(201,169,110,0.85)",
  },
  {
    number: "04",
    category: "RESIDENTIAL",
    eyebrow: "Refined Living",
    headline: ["Classic Comfort,", "Modern Community"],
    description:
      "A thoughtfully designed residential community offering spacious, well-appointed homes for modern families.",
    highlights: [
      "Spacious 2 & 3 BHK layouts",
      "Landscaped gardens & children's play area",
      "Established family-friendly neighborhood",
    ],
    image: "/images/pritam-residency/pritam-residency.webp",
    projectRef: "Pritam Residency · Bharuch",
    projectSlug: "pritam-residency",
    accentColor: "rgba(201,169,110,0.85)",
  },
];

const STATS = [
  { value: "35+", label: "Years building\nBharuch" },
  { value: "3", label: "Project\ncategories" },
  { value: "1000+", label: "Families\nhoused" },
];

export default function PhilosophySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    const calc = () => {
      if (trackRef.current && rightColRef.current) {
        setScrollRange(
          Math.max(0, trackRef.current.scrollWidth - rightColRef.current.clientWidth)
        );
      }
    };
    calc();
    const t = setTimeout(calc, 150);
    window.addEventListener("resize", calc);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", calc);
    };
  }, []);

  const xRaw = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const x = useTransform(xRaw, (v) => -v * scrollRange);

  return (
    <div ref={containerRef} className="relative h-[400vh] z-10" style={{ backgroundColor: "#111111" }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div ref={rightColRef} className="w-full overflow-hidden h-[80vh] flex items-center relative">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-4 lg:gap-6 items-center absolute left-0 pl-6 md:pl-16 lg:pl-24 pr-6 md:pr-16 lg:pr-24 w-max"
          >
            {/* ── Left intro panel ── */}
            <div className="w-[82vw] md:w-[44vw] lg:w-[28vw] shrink-0 flex flex-col justify-between py-2 pr-4 lg:pr-8">
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-px bg-champagne/40" />
                  <span className="text-champagne text-[9px] tracking-[0.42em] uppercase font-body font-semibold">
                    What We Build
                  </span>
                </div>

                <h2
                  className="text-3xl md:text-4xl font-bold text-white leading-[1.1]"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Three verticals.{" "}
                  <span className="italic font-light text-white/45">
                    One vision.
                  </span>
                </h2>

                <p className="text-white/40 text-sm leading-relaxed font-body">
                  Commercial spaces that anchor cities. Residential communities
                  that elevate living. Mixed-use developments that do both —
                  Bhumi Developers shapes the spaces where Gujarat lives, works,
                  and thrives.
                </p>

                <Link
                  href="/projects"
                  className="group inline-flex items-center gap-2 text-champagne text-[10px] tracking-[0.22em] uppercase font-semibold font-body mt-1"
                >
                  Explore All Projects
                  <ArrowUpRight
                    size={12}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </div>

              {/* Stats row */}
              <div className="flex gap-6 pt-8 mt-8 border-t border-white/[0.07]">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <p
                      className="text-2xl font-bold text-champagne leading-none"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {s.value}
                    </p>
                    <p className="text-white/35 text-[9px] tracking-[0.15em] uppercase font-body mt-1 leading-snug whitespace-pre-line">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Segment cards ── */}
            {segments.map((seg, i) => (
              <div
                key={i}
                className="relative shrink-0 overflow-hidden group"
                style={{ width: "clamp(300px, 62vw, 640px)", height: "clamp(460px, 72vh, 720px)" }}
              >
                {/* Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                  style={{ backgroundImage: `url('${seg.image}')` }}
                />

                {/* Base dark veil */}
                <div className="absolute inset-0 bg-black/30" />

                {/* Bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

                {/* Top row: number + category */}
                <div className="absolute top-6 left-6 right-6 flex items-start justify-between z-10">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="text-[9px] tracking-[0.35em] uppercase font-semibold font-body px-2.5 py-1"
                      style={{ backgroundColor: "rgba(201,169,110,0.15)", color: "#C9A96E", border: "1px solid rgba(201,169,110,0.3)" }}
                    >
                      {seg.category}
                    </span>
                    <span className="text-white/20 text-[10px] font-body tracking-widest">
                      {seg.eyebrow}
                    </span>
                  </div>
                  <span
                    className="font-bold text-white/8 leading-none select-none"
                    style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(3rem, 6vw, 5rem)", lineHeight: 1, opacity: 0.06 }}
                  >
                    {seg.number}
                  </span>
                </div>

                {/* Bottom content panel */}
                <div className="absolute bottom-0 left-0 right-0 z-10 p-6 lg:p-8 flex flex-col gap-4">
                  {/* Headline */}
                  <h3
                    className="text-white text-2xl lg:text-3xl font-bold leading-tight"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {seg.headline[0]}
                    <br />
                    <span className="italic font-light text-white/70">
                      {seg.headline[1]}
                    </span>
                  </h3>

                  {/* Description */}
                  <p className="text-white/50 text-xs lg:text-sm leading-relaxed font-body max-w-lg">
                    {seg.description}
                  </p>

                  {/* Highlights */}
                  <ul className="flex flex-col gap-1.5">
                    {seg.highlights.map((h, j) => (
                      <li key={j} className="flex items-center gap-2.5 text-white/60 text-[11px] font-body">
                        <span className="w-3.5 h-px shrink-0" style={{ backgroundColor: "#C9A96E", opacity: 0.7 }} />
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* Footer: project ref + link */}
                  <div
                    className="flex items-center justify-between pt-4 mt-1"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <span className="text-white/30 text-[9px] tracking-[0.3em] uppercase font-body">
                      {seg.projectRef}
                    </span>
                    <Link
                      href={`/projects/${seg.projectSlug}`}
                      className="group/lnk flex items-center gap-1.5 text-champagne text-[10px] tracking-[0.22em] uppercase font-semibold font-body"
                    >
                      View Project
                      <ArrowUpRight
                        size={11}
                        className="transition-transform duration-300 group-hover/lnk:translate-x-0.5 group-hover/lnk:-translate-y-0.5"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
