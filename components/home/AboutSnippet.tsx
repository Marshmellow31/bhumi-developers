"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

const pillars = [
  "Transparent dealings & clear documentation",
  "RERA registered projects across Gujarat",
  "On-time delivery — 20+ years track record",
  "Post-possession support & maintenance",
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
            {/* Main image */}
            <div className="relative h-[500px] overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80')",
                  filter: "grayscale(100%)",
                }}
              />
              <div className="absolute inset-0 bg-primary/10" />
            </div>

            {/* Floating stat card — black on black section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-8 -right-8 bg-primary text-white p-8 shadow-2xl w-44"
            >
              <p
                className="text-5xl font-bold leading-none mb-1 text-white"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                20
              </p>
              <div className="w-6 h-px bg-white/20 my-3" />
              <p className="text-white/40 text-xs tracking-[0.25em] uppercase font-body">
                Years of Trust
              </p>
            </motion.div>

            {/* Decorative corner */}
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
              eyebrow="About Bhumi Developers"
              title="Building Bharuch's Most Trusted Legacy"
              align="left"
            />

            <p className="text-muted leading-relaxed font-body text-sm">
              Founded in 2005, Bhumi Developers has grown from a small family enterprise into
              South Gujarat&rsquo;s most respected real estate developer. With over 50 completed
              projects and 5,000+ satisfied families, our commitment to quality, transparency,
              and timely delivery sets us apart.
            </p>

            <ul className="flex flex-col gap-3 mt-2">
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
                  Our Story
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
