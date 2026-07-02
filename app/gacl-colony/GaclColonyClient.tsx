"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Home,
  Trees,
  ShieldCheck,
  Zap,
  Car,
  Waves,
  Building2,
  Phone,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

/* ──────────────────────────────────────────────
   Township stats
────────────────────────────────────────────── */
const stats = [
  { value: "200+",  label: "Residential Plots" },
  { value: "50 Acres", label: "Total Area" },
  { value: "30%",   label: "Green Cover" },
  { value: "2026",  label: "Est. Completion" },
];

/* ──────────────────────────────────────────────
   Amenities list
────────────────────────────────────────────── */
const amenities = [
  { icon: ShieldCheck, label: "24 / 7 Gated Security"     },
  { icon: Trees,       label: "Landscaped Green Belts"    },
  { icon: Waves,       label: "Community Swimming Pool"   },
  { icon: Car,         label: "Wide Internal Roads"       },
  { icon: Zap,         label: "Underground Utilities"     },
  { icon: Building2,   label: "Community Club House"      },
  { icon: Home,        label: "Children's Play Area"      },
  { icon: MapPin,      label: "Proximity to GACL Campus"  },
];

/* ──────────────────────────────────────────────
   Development phases
────────────────────────────────────────────── */
const phases = [
  {
    phase: "Phase I",
    status: "Ongoing",
    plots: "80 Plots",
    area: "1 200–2 400 sq ft each",
    description:
      "Core residential sector with all essential infrastructure — roads, drainage, water supply and lighting.",
  },
  {
    phase: "Phase II",
    status: "Upcoming",
    plots: "80 Plots",
    area: "1 500–3 000 sq ft each",
    description:
      "Expanded residential zone with community parks and a dedicated commercial strip for everyday conveniences.",
  },
  {
    phase: "Phase III",
    status: "Planned",
    plots: "40+ Plots",
    area: "2 000–5 000 sq ft each",
    description:
      "Premium villa plots with larger footprints, mature tree corridors and a dedicated clubhouse block.",
  },
];

const phaseStatusStyle: Record<string, string> = {
  Ongoing:  "text-emerald-700 bg-emerald-50 border-emerald-200",
  Upcoming: "text-amber-700  bg-amber-50  border-amber-200",
  Planned:  "text-primary/70 bg-beige      border-border/50",
};

/* ══════════════════════════════════════════════
   Page component
══════════════════════════════════════════════ */
export default function GaclColonyClient() {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">

      {/* ─────────────────────────────────────────
          HERO BAND
      ───────────────────────────────────────── */}
      <div className="bg-beige pt-28 md:pt-36 pb-16 md:pb-24 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6 max-w-4xl"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-primary/20" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-muted font-body font-semibold">
                Township Development · Bharuch
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-4xl md:text-5xl lg:text-7xl font-bold text-primary leading-[1.02] tracking-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              GACL Colony
              <br />
              <span className="italic font-light text-muted">
                a place to truly belong.
              </span>
            </h1>

            {/* Sub-copy */}
            <p className="text-muted text-sm md:text-base font-body max-w-xl leading-relaxed">
              Sprawling over 50 acres in the heart of Bharuch's GACL corridor,
              GACL Colony is a meticulously planned township offering
              plot-based living with world-class infrastructure, lush green
              open spaces, and a thriving community spirit.
            </p>

            {/* CTA row */}
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <a
                href="tel:+918511566682"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 text-[11px] font-semibold tracking-[0.18em] uppercase hover:bg-primary/90 transition-colors duration-200"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <Phone size={12} />
                Enquire Now
              </a>
              <span className="flex items-center gap-1.5 text-xs text-muted font-body">
                <MapPin size={13} className="shrink-0" />
                GACL Township Area, Bharuch, Gujarat
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─────────────────────────────────────────
          STATS ROW
      ───────────────────────────────────────── */}
      <div className="border-b border-border/50 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border/50">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-1 py-8 px-6 md:px-10 first:pl-0 last:pr-0"
              >
                <span
                  className="text-3xl md:text-4xl font-bold text-primary tracking-tight"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {s.value}
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-muted font-body font-semibold">
                  {s.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────
          ABOUT + AMENITIES
      ───────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left — overview copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-8"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="w-6 h-px bg-primary/25" />
                <span className="text-[10px] tracking-[0.35em] uppercase text-muted font-body font-semibold">
                  Overview
                </span>
              </div>
              <h2
                className="text-3xl md:text-4xl font-bold text-primary leading-snug"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Life, carefully
                <br />
                <span className="italic font-light text-muted">
                  planned for you.
                </span>
              </h2>
            </div>

            <p className="text-muted text-sm leading-relaxed font-body">
              GACL Colony is more than a real-estate development — it is a
              self-sustained township conceived to give families of every size
              a serene yet well-connected home. From wide tree-lined boulevards
              to underground utilities and 24-hour security, every element has
              been designed with generational living in mind.
            </p>

            <p className="text-muted text-sm leading-relaxed font-body">
              Strategically located adjacent to the GACL industrial campus in
              Bharuch, residents enjoy unmatched connectivity to city centres,
              educational institutions, hospitals, and the national highway
              network — while still retreating to a quiet, green community at
              the end of the day.
            </p>

            <div className="flex flex-col gap-3 mt-2">
              {[
                "RERA-compliant development",
                "Clear title, approved layouts",
                "Flexible plot sizes for every budget",
                "Bhumi Developers' 35+ year legacy",
              ].map((point) => (
                <div key={point} className="flex items-start gap-2.5">
                  <CheckCircle2 size={14} className="text-amber-600 shrink-0 mt-0.5" />
                  <span className="text-sm text-primary font-body">{point}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — amenities grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="w-6 h-px bg-primary/25" />
                <span className="text-[10px] tracking-[0.35em] uppercase text-muted font-body font-semibold">
                  Amenities
                </span>
              </div>
              <h2
                className="text-3xl md:text-4xl font-bold text-primary leading-snug"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Everything
                <br />
                <span className="italic font-light text-muted">
                  within reach.
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              {amenities.map(({ icon: Icon, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-3 bg-beige/40 border border-border/50 px-4 py-4 group hover:bg-beige/80 hover:border-border transition-colors duration-200"
                >
                  <div className="w-8 h-8 flex items-center justify-center bg-white border border-border/60 shrink-0 group-hover:border-amber-200 transition-colors duration-200">
                    <Icon size={15} className="text-primary group-hover:text-amber-600 transition-colors duration-200" />
                  </div>
                  <span className="text-sm text-primary font-body font-medium">
                    {label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─────────────────────────────────────────
          DEVELOPMENT PHASES
      ───────────────────────────────────────── */}
      <div className="bg-beige/30 border-t border-b border-border/50 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-3 mb-12"
          >
            <div className="flex items-center gap-3">
              <span className="w-6 h-px bg-primary/25" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-muted font-body font-semibold">
                Development Phases
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold text-primary leading-snug"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              A township built
              <br />
              <span className="italic font-light text-muted">in stages of excellence.</span>
            </h2>
          </motion.div>

          {/* Phase cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {phases.map((phase, idx) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-5 bg-background border border-border/60 p-7 hover:shadow-sm transition-shadow duration-300"
              >
                {/* Phase label + status */}
                <div className="flex items-center justify-between">
                  <span
                    className="text-xl font-bold text-primary"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {phase.phase}
                  </span>
                  <span
                    className={`text-[9px] font-bold tracking-[0.2em] uppercase px-2.5 py-1 border ${phaseStatusStyle[phase.status]}`}
                  >
                    {phase.status}
                  </span>
                </div>

                {/* Plot info */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <Home size={12} className="text-amber-600 shrink-0" />
                    <span className="text-xs text-primary font-body font-semibold">
                      {phase.plots}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 size={12} className="text-muted shrink-0" />
                    <span className="text-xs text-muted font-body">
                      {phase.area}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-muted font-body leading-relaxed">
                  {phase.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────
          CONTACT / CTA STRIP
      ───────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 border-t border-border/60 pt-12"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="w-6 h-px bg-primary/25" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-muted font-body font-semibold">
                Get in Touch
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold text-primary leading-snug"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Interested in
              <br />
              <span className="italic font-light text-muted">GACL Colony?</span>
            </h2>
            <p className="text-sm text-muted font-body max-w-sm leading-relaxed">
              Our team is on hand to walk you through available plots,
              pricing, and the investment potential of this landmark township.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="tel:+918511566682"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3.5 text-[11px] font-semibold tracking-[0.18em] uppercase hover:bg-primary/90 transition-colors duration-200"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <Phone size={12} />
              Call Us
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 border border-border text-primary px-6 py-3.5 text-[11px] font-semibold tracking-[0.18em] uppercase hover:bg-beige transition-colors duration-200"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Send Enquiry
              <ArrowUpRight size={13} />
            </a>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
