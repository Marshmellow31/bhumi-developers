"use client";

import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import Link from "next/link";

export default function SustainabilitySection() {
  return (
    <section className="relative w-full h-screen overflow-hidden">

      {/* ── Full-screen video ── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="/images/solitaire-plaza/Tavra Gazibo Sitting Cam-v01.jpg"
      >
        <source src="/videos/sustainability.mp4" type="video/mp4" />
      </video>

      {/* ── Overlay ── */}
      <div className="absolute inset-0 bg-black/40" />

      {/* ── Content ── */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full max-w-7xl mx-auto px-8 md:px-14 lg:px-20">
          <div className="flex flex-col md:flex-row md:items-center gap-10 md:gap-20 lg:gap-28">

            {/* Left — Big heading */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="shrink-0"
            >
              <h2
                className="text-white font-bold leading-[0.88] tracking-tight font-heading"
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(4.5rem, 11vw, 10rem)",
                }}
              >
                {/* "Tomorrow" — 'o' replaced by Leaf icons */}
                <div className="flex items-center">
                  Tom
                  <span
                    className="inline-flex items-center justify-center text-white"
                    style={{ width: "0.72em", height: "0.72em", marginBottom: "0.06em" }}
                  >
                    <Leaf strokeWidth={1.8} style={{ width: "100%", height: "100%" }} />
                  </span>
                  rr
                  <span
                    className="inline-flex items-center justify-center text-white"
                    style={{ width: "0.68em", height: "0.68em", marginBottom: "0.06em" }}
                  >
                    <Leaf
                      strokeWidth={1.8}
                      style={{ width: "100%", height: "100%", transform: "scaleX(-1)" }}
                    />
                  </span>
                  w
                </div>

                {/* "matters" — 't' replaced by upward Leaf */}
                <div className="flex items-center font-light italic text-white/90">
                  ma
                  <span
                    className="inline-flex items-center justify-center text-white/90"
                    style={{ width: "0.65em", height: "0.65em", marginBottom: "0.06em" }}
                  >
                    <Leaf
                      strokeWidth={1.8}
                      style={{ width: "100%", height: "100%", transform: "rotate(-45deg)" }}
                    />
                  </span>
                  ters
                </div>
              </h2>
            </motion.div>

            {/* Right — Tagline + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-6 max-w-sm"
            >
              <p className="text-white font-bold text-xl md:text-2xl leading-snug font-body">
                Committed to Sustainable Living for a Greener, Brighter Future.
              </p>

              <Link href="/contact">
                <button className="self-start border border-white/50 bg-white/10 backdrop-blur-sm text-white/80 text-[11px] tracking-[0.35em] uppercase px-10 py-4 hover:bg-white/20 transition-all duration-300 cursor-pointer">
                  DISCOVER MORE
                </button>
              </Link>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
