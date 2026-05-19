"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const stats = [
  { value: 20, suffix: "+", label: "Years of Excellence" },
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 5000, suffix: "+", label: "Happy Families" },
  { value: 12, suffix: "M+", label: "Sq Ft Developed" },
];

export default function StatsSection() {
  return (
    <section className="bg-primary py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 divide-y-2 lg:divide-y-0 lg:divide-x divide-white/10">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center py-6 lg:py-0 lg:px-8"
            >
              <div
                className="text-4xl md:text-5xl font-bold text-accent mb-2"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  duration={1800}
                />
              </div>
              <p className="text-white/50 text-xs tracking-widest uppercase font-body">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
