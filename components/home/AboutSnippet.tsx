"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const pillars = [
  "Uncompromising focus on quality & engineering",
  "Transparent transactions & absolute integrity",
  "On-time delivery — a 35+ year track record",
  "Nurturing customer relationships for a lifetime",
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function AboutSnippet() {
  return (
    <section className="relative py-24 md:py-40 bg-[#0A0A0A] overflow-hidden">
      {/* Soft ambient warmth */}
      <div className="absolute top-0 right-0 w-[45%] h-[55%] bg-gradient-to-bl from-white/[0.02] via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* ── Editorial header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease }}
          className="flex items-center gap-3 mb-12 md:mb-20"
        >
          <span className="w-8 h-px bg-white/20" />
          <span className="text-[10px] tracking-[0.4em] uppercase text-white/40 font-body font-semibold">
            A Word From The Founder
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* ─── Portrait column ─── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease }}
            className="lg:col-span-5 relative"
          >
            {/* Portrait frame */}
            <div className="relative aspect-[4/5] overflow-hidden group">
              <motion.div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: "url('/images/owner.jpeg')",
                  filter: "grayscale(20%)",
                }}
                whileHover={{ scale: 1.03, filter: "grayscale(0%)" }}
                transition={{ duration: 1.4, ease }}
              />
              {/* Subtle vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/15 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Establishment badge — top-left of portrait */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4, ease }}
              className="absolute -top-4 left-6 bg-primary px-4 py-1.5"
            >
              <span className="text-[9px] tracking-[0.35em] uppercase font-body font-semibold text-white/40">
                Est. 1991
              </span>
            </motion.div>

            {/* Stat overlay — refined */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5, ease }}
              className="absolute -bottom-10 -right-6 lg:-right-12 bg-primary text-white px-8 py-7 z-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.35)]"
            >
              <div className="flex items-baseline gap-1">
                <p
                  className="text-6xl font-bold leading-none text-white"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  35
                </p>
                <p
                  className="text-3xl font-light text-white/70 leading-none"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  +
                </p>
              </div>
              <div className="w-8 h-px bg-white/25 my-4" />
              <p className="text-white/50 text-[9px] tracking-[0.35em] uppercase font-body font-semibold">
                Years of <br />
                Trust
              </p>
            </motion.div>
          </motion.div>

          {/* ─── Content column ─── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease }}
            className="lg:col-span-7 relative flex flex-col gap-8"
          >
            {/* Title */}
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.02] tracking-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              The man behind <br />
              <span className="italic font-light text-white/50">Bhumi&rsquo;s promise.</span>
            </h2>

            {/* Decorative quote mark + pull quote */}
            <div className="relative pt-6">
              <span
                className="absolute -top-2 -left-2 text-7xl lg:text-8xl text-amber-700/15 leading-none select-none font-light"
                style={{ fontFamily: "var(--font-playfair)" }}
                aria-hidden
              >
                &ldquo;
              </span>
              <p
                className="relative text-lg md:text-xl text-white/80 leading-relaxed font-light italic max-w-2xl pl-6"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                My roots have always been here — in Bharuch. This city shaped me, and everything I have achieved, I owe to it. Bhumi Developers is my way of giving back.
              </p>
            </div>

            {/* Supporting body */}
            <div className="flex flex-col gap-4 text-sm md:text-[15px] text-white/40 leading-relaxed font-body max-w-2xl">
              <p>
                With over 35 years in construction and engineering — building industries across India alongside some of the country&rsquo;s top MNCs — I have had the privilege of leaving a mark on this nation&rsquo;s industrial landscape, one structure at a time.
              </p>
              <p>
                Bhumi Developers is a promise to bring world-class construction quality, complete transparency, and projects that truly reflect Bharuch&rsquo;s growing potential — creating spaces where families can live with pride and businesses can grow with confidence.
              </p>
            </div>

            {/* Signature block */}
            <div className="flex items-center gap-5 pt-2">
              <span className="w-12 h-px bg-white/20" />
              <div className="flex flex-col">
                <span
                  className="text-2xl font-bold text-white leading-tight"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Kiran Majmudar
                </span>
                <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase font-body font-semibold mt-1">
                  Chairman &amp; Founder
                </span>
              </div>
            </div>

            {/* Pillars */}
            <div className="mt-4 pt-10 border-t border-white/10">
              <p className="text-[9px] tracking-[0.35em] uppercase text-white/30 font-body font-semibold mb-6">
                Our Promise To You
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                {pillars.map((point, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.08, ease }}
                    className="flex items-baseline gap-4 text-sm text-white/80 font-body"
                  >
                    <span
                      className="text-xs text-amber-700/60 font-semibold tracking-wider shrink-0"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      0{i + 1}
                    </span>
                    <span className="leading-relaxed">{point}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="mt-2">
              <Link
                href="/about"
                data-cursor-label="LEADERS"
                className="group inline-flex items-center gap-3 text-white text-xs font-semibold font-body tracking-[0.25em] uppercase"
              >
                <span className="relative">
                  Meet Our Leaders
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-white origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-500" />
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-white origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-200" />
                </span>
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
