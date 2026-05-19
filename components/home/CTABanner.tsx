"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { Phone } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="relative py-28 overflow-hidden bg-primary">
      {/* Hairline borders */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/10" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-6"
        >
          <span className="text-white/30 text-xs tracking-[0.4em] uppercase font-body">
            Find Your Dream Home
          </span>

          <h2
            className="text-4xl md:text-6xl font-bold text-white leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Ready to Make
            <br />
            <span className="italic font-light text-white/60">Your Move?</span>
          </h2>

          <div className="w-10 h-px bg-white/15 mt-2" />

          <p className="text-white/35 text-sm max-w-sm font-body leading-relaxed tracking-wide">
            Our property experts are here to guide you through every step — from site visits
            to final possession.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
            <Link href="/contact">
              <Button size="lg" variant="primary">
                Book a Site Visit
              </Button>
            </Link>
            <a href="tel:+912642000000">
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white hover:text-primary"
              >
                <Phone size={14} />
                Call Us Now
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
