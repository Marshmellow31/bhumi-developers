"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  light?: boolean;
  animate?: boolean;
}

const ease = [0.16, 1, 0.3, 1] as const;

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
  animate = false,
}: SectionHeadingProps) {
  const alignClass = {
    left:   "text-left  items-start",
    center: "text-center items-center",
    right:  "text-right  items-end",
  }[align];

  return (
    <div className={`flex flex-col gap-3 ${alignClass}`}>
      {eyebrow && (
        <div className="overflow-hidden">
          <motion.span
            initial={{ y: "110%" }}
            {...(animate
              ? { animate: { y: "0%" } }
              : { whileInView: { y: "0%" }, viewport: { once: true, amount: 0.4 } })}
            transition={{ duration: 0.65, ease }}
            className={`block text-xs tracking-[0.3em] uppercase font-semibold font-body ${
              light ? "text-white/50" : "text-muted"
            }`}
          >
            {eyebrow}
          </motion.span>
        </div>
      )}

      <div className="overflow-hidden">
        <motion.h2
          initial={{ y: "105%" }}
          {...(animate
            ? { animate: { y: "0%" } }
            : { whileInView: { y: "0%" }, viewport: { once: true, amount: 0.4 } })}
          transition={{ duration: 0.85, delay: eyebrow ? 0.1 : 0, ease }}
          className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight font-heading ${
            light ? "text-white" : "text-primary"
          }`}
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {title}
        </motion.h2>
      </div>

      {eyebrow && (
        <motion.div
          initial={{ scaleX: 0 }}
          {...(animate
            ? { animate: { scaleX: 1 } }
            : { whileInView: { scaleX: 1 }, viewport: { once: true, amount: 0.4 } })}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          style={{ originX: align === "right" ? 1 : align === "center" ? 0.5 : 0 }}
          className={`w-10 h-px ${light ? "bg-champagne/50" : "bg-champagne"} ${
            align === "center" ? "self-center" : align === "right" ? "self-end" : "self-start"
          }`}
        />
      )}

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          {...(animate
            ? { animate: { opacity: 1, y: 0 } }
            : { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.4 } })}
          transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
          className={`text-base md:text-lg max-w-2xl leading-relaxed font-body mt-2 ${
            light ? "text-white/50" : "text-muted"
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
