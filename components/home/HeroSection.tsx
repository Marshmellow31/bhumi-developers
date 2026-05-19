"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { ArrowDown, ChevronRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/90 z-10" />

      {/* Background image placeholder — replace src with real image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80')",
        }}
      />

      {/* Decorative gold lines */}
      <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-accent/40 to-transparent z-20" />
      <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-accent/40 to-transparent z-20" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block text-accent text-xs tracking-[0.4em] uppercase font-semibold font-body mb-6 border border-accent/30 px-4 py-2">
            Est. 2005 · Bharuch, Gujarat
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-none tracking-tight mb-6"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Crafting
          <br />
          <span className="text-accent">Landmark</span>
          <br />
          Spaces
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-white/70 text-lg md:text-xl max-w-xl mx-auto mb-10 font-body leading-relaxed"
        >
          Bhumi Developers builds more than homes — we create legacies. Premium real estate
          across Bharuch and South Gujarat.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/projects">
            <Button size="lg" variant="primary">
              Explore Projects
              <ChevronRight size={16} />
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white hover:text-primary">
              Schedule a Visit
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/40"
      >
        <span className="text-xs tracking-widest uppercase font-body">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
