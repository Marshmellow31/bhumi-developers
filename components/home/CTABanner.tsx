"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { Phone } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="relative py-28 overflow-hidden bg-beige">
      {/* Champagne hairline borders */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-champagne/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-champagne/50 to-transparent" />

      {/* Subtle warm grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#111111 1px, transparent 1px), linear-gradient(90deg, #111111 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Warm champagne radial glow — centre */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(201,169,110,0.08) 0%, transparent 70%)",
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
          <span className="text-sienna text-xs tracking-[0.4em] uppercase font-body font-semibold">
            Find Your Dream Home
          </span>

          <h2
            className="text-4xl md:text-6xl font-bold text-primary leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Ready to Make
            <br />
            <span className="italic font-light text-primary/55">Your Move?</span>
          </h2>

          {/* Champagne divider */}
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-champagne to-transparent mt-1" />

          <p className="text-muted text-sm max-w-sm font-body leading-relaxed tracking-wide">
            Our property experts are here to guide you through every step — from site visits
            to final possession.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
            <Link href="/contact">
              <Button size="lg" variant="secondary">
                Book a Site Visit
              </Button>
            </Link>
            <a href="tel:+918511566682">
              <Button size="lg" variant="outline">
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
