"use client";

import { motion } from "framer-motion";
import Logo from "@/components/ui/Logo";

type Props = {
  /** Triggers the curtain-wipe exit animation */
  leaving: boolean;
  zIndex?: number;
};

/** The site's cinematic loading screen — shared by PageLoader (first visit)
 *  and HeroSection (while the background video buffers). */
export default function BrandLoader({ leaving, zIndex = 10000 }: Props) {
  return (
    <motion.div
      key="brand-loader"
      className="fixed inset-0 bg-primary flex flex-col items-center justify-center overflow-hidden"
      style={{ zIndex }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Curtain wipe — panel that splits away on exit */}
      <motion.div
        className="absolute inset-0 bg-primary origin-top"
        animate={leaving ? { scaleY: 0 } : { scaleY: 1 }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        style={{ transformOrigin: "top" }}
      />

      <div className="relative z-10 flex flex-col items-center gap-10">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
        >
          <Logo className="h-14 w-auto" light={false} />
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-white/25 text-[10px] tracking-[0.45em] uppercase font-body"
        >
          Premium Real Estate · Since 1995
        </motion.p>

        {/* Progress bar */}
        <div className="w-40 h-px bg-white/10 overflow-hidden">
          <motion.div
            className="h-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2.0, ease: "easeInOut", delay: 0.2 }}
            style={{ transformOrigin: "left" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
