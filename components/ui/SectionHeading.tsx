"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  light?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  const alignClass = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  }[align];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`flex flex-col gap-3 ${alignClass}`}
    >
      {eyebrow && (
        <span
          className={`text-xs tracking-[0.3em] uppercase font-semibold font-body ${
            light ? "text-accent" : "text-accent"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight font-heading ${
          light ? "text-white" : "text-primary"
        }`}
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        {title}
      </h2>
      {eyebrow && (
        <div
          className={`w-12 h-0.5 bg-accent ${
            align === "center" ? "self-center" : align === "right" ? "self-end" : "self-start"
          }`}
        />
      )}
      {subtitle && (
        <p
          className={`text-base md:text-lg max-w-2xl leading-relaxed font-body mt-2 ${
            light ? "text-white/70" : "text-muted"
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
