"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { Phone } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="relative py-24 overflow-hidden bg-primary">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 50%)",
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      {/* Gold accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-accent/30" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-accent/30" />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-6"
        >
          <span className="text-accent text-xs tracking-[0.35em] uppercase font-semibold font-body">
            Find Your Dream Home
          </span>

          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Ready to Make
            <br />
            <span className="text-accent">Your Move?</span>
          </h2>

          <p className="text-white/60 text-base md:text-lg max-w-xl font-body leading-relaxed">
            Our property experts are here to guide you through every step — from site visits
            to final possession. Let&rsquo;s find the perfect space for you.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <Link href="/contact">
              <Button size="lg" variant="primary">
                Book a Site Visit
              </Button>
            </Link>
            <a href="tel:+912642000000">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white hover:text-primary"
              >
                <Phone size={16} />
                Call Us Now
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
