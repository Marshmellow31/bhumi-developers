"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const stats = [
  { value: 20,   suffix: "+",  label: "Years of Excellence" },
  { value: 50,   suffix: "+",  label: "Projects Delivered"  },
  { value: 5000, suffix: "+",  label: "Happy Families"      },
  { value: 12,   suffix: "M+", label: "Sq Ft Developed"     },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Subtle 3-D tilt: section tilts slightly as you scroll through it
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [4, 0, -4]);
  const scale    = useTransform(scrollYProgress, [0, 0.35, 1], [0.97, 1, 0.97]);

  return (
    <section
      ref={sectionRef}
      className="bg-primary border-t border-white/5 py-16 md:py-24 overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      <motion.div
        style={{ rotateX, scale }}
        className="max-w-7xl mx-auto px-6 lg:px-8"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y-2 lg:divide-y-0 lg:divide-x divide-white/[0.06]">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.65, delay: i * 0.12, ease: "easeOut" }}
              className="group text-center py-10 lg:py-0 lg:px-8 relative"
            >
              {/* Amber glow behind number */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="w-32 h-32 rounded-full bg-amber-500/[0.07] blur-2xl" />
              </div>

              <div
                className="stat-number text-4xl md:text-5xl lg:text-6xl font-bold mb-2 relative"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                <AnimatedCounter target={stat.value} suffix={stat.suffix} duration={1800} />
              </div>

              <p className="text-white/20 text-[10px] tracking-[0.35em] uppercase font-body">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
