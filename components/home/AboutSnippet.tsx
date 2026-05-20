"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

const pillars = [
  "Uncompromising focus on quality & engineering",
  "Transparent transactions & absolute integrity",
  "On-time delivery — 35+ years track record",
  "Nurturing customer relationships for a lifetime",
];

export default function AboutSnippet() {
  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main image - Styled for Executive Portrait */}
            <div className="relative h-[550px] overflow-hidden border border-black/5">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: "url('/images/owner.jpeg')",
                }}
              />
            </div>

            {/* Floating stat card — black on white section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-8 -right-8 bg-primary text-white p-8 shadow-2xl w-44 z-10"
            >
              <p
                className="text-5xl font-bold leading-none mb-1 text-white"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                35+
              </p>
              <div className="w-6 h-px bg-white/20 my-3" />
              <p className="text-white/40 text-xs tracking-[0.25em] uppercase font-body">
                Years of Trust
              </p>
            </motion.div>

            {/* Decorative corner outline */}
            <div className="absolute -top-5 -left-5 w-20 h-20 border border-primary/10 z-0" />
          </motion.div>

          {/* Text Column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <SectionHeading
              eyebrow="Founder's Vision"
              title="Building Trust, Creating Legacies"
              align="left"
            />

            <div className="flex flex-col gap-4 mt-2">
              <div className="text-primary/80 leading-relaxed font-body text-sm italic pl-4 border-l-2 border-primary/20 flex flex-col gap-3">
                <p>
                  &ldquo;With over 35 years in construction and engineering, building industries across India alongside some of the country&apos;s top MNCs has been more than a career — it has been a calling. As the founder of BD Buildcon LLP, I have had the privilege of leaving a mark on this nation&apos;s industrial landscape, one structure at a time.&rdquo;
                </p>
                <p>
                  &ldquo;But my roots have always been here — in Bharuch. This city shaped me, and everything I have achieved, I owe to it. Bhumi Developers is my way of giving back. A promise to bring world-class construction quality, complete transparency, and projects that truly reflect Bharuch&apos;s growing potential — creating spaces where families can live with pride and businesses can grow with confidence.&rdquo;
                </p>
              </div>

              <div className="flex flex-col gap-0.5 mt-2">
                <span className="font-heading text-lg font-bold text-primary" style={{ fontFamily: "var(--font-playfair)" }}>
                  Kiran Majmudar
                </span>
                <span className="text-muted text-xs tracking-widest uppercase font-semibold font-body">
                  Chairman & Founder
                </span>
              </div>
            </div>

            <ul className="flex flex-col gap-3 mt-4">
              {pillars.map((point, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-3 text-sm text-charcoal font-body"
                >
                  <span className="w-px h-4 bg-primary/30 shrink-0 mt-0.5" />
                  {point}
                </motion.li>
              ))}
            </ul>

            <div className="mt-4">
              <Link href="/about">
                <Button
                  size="md"
                  variant="secondary"
                  className="border-primary"
                >
                  Meet Our Leaders
                  <ArrowRight size={14} />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
