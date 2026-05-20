"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { ArrowDown, ChevronRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary">
      {/* Background image with strong black overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 opacity-25"
        style={{
          backgroundImage:
            "url('/images/home-hero.jpg')",
        }}
      />

      {/* Vertical rule lines */}
      <div className="absolute left-8 top-0 h-full w-px bg-white/5 z-10" />
      <div className="absolute right-8 top-0 h-full w-px bg-white/5 z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <span className="inline-block text-white/30 text-xs tracking-[0.5em] uppercase font-body border border-white/10 px-5 py-2">
            Est. 2005 &nbsp;·&nbsp; Bharuch, Gujarat
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="text-6xl md:text-8xl lg:text-[9rem] font-bold text-white leading-none tracking-tight mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Crafting
          <br />
          <span className="italic font-light text-white/60">Landmark</span>
          <br />
          Spaces
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="w-16 h-px bg-white/20 mx-auto mb-8 origin-left"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="text-white/40 text-base md:text-lg max-w-md mx-auto mb-12 font-body leading-relaxed tracking-wide"
        >
          Premium real estate across Bharuch and South Gujarat. Built to endure.
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
              <ChevronRight size={14} />
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white hover:text-primary"
            >
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
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/20"
      >
        <span className="text-xs tracking-[0.4em] uppercase font-body">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
}
