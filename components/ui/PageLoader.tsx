"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/ui/Logo";

export default function PageLoader() {
  const [show, setShow] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const seen = sessionStorage.getItem("bhumi_loaded");
    if (seen) return;

    setShow(true);

    // Start exit after 2.2 s
    const exitTimer = setTimeout(() => setLeaving(true), 2200);
    // Fully unmount after exit animation
    const hideTimer = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("bhumi_loaded", "1");
    }, 2900);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="page-loader"
          className="fixed inset-0 z-[10000] bg-primary flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Curtain wipe — two panels that split apart on exit */}
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
              Premium Real Estate · Since 2005
            </motion.p>

            {/* Progress bar */}
            <div className="w-40 h-px bg-white/10 overflow-hidden">
              <motion.div
                className="h-full bg-amber-500"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2.0, ease: "easeInOut", delay: 0.2 }}
                style={{ transformOrigin: "left" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
