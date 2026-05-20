"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { damping: 30, stiffness: 300, mass: 0.5 });

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX }}
    />
  );
}
