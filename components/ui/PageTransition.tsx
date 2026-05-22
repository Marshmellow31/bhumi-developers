"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { usePathname } from "next/navigation";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const curtain = useAnimation();
  const content = useAnimation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    (async () => {
      // Curtain hidden at left edge → sweeps right to cover screen
      curtain.set({ clipPath: "inset(0 100% 0 0)" });
      await curtain.start({
        clipPath: "inset(0 0% 0 0)",
        transition: { duration: 0.45, ease: EASE },
      });

      // New page already rendered beneath — reset content to entry state
      content.set({ opacity: 0, y: 30 });

      // Simultaneously: curtain exits to right, content rises up
      curtain.start({
        clipPath: "inset(0 0% 0 100%)",
        transition: { duration: 0.45, ease: EASE },
      });
      content.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: EASE },
      });
    })();
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {/* Full-screen curtain — only visible mid-transition */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{ backgroundColor: "#111111", zIndex: 9990 }}
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={curtain}
      />

      {/* Page content */}
      <motion.main
        className="flex-1 flex flex-col"
        initial={{ opacity: 1, y: 0 }}
        animate={content}
      >
        {children}
      </motion.main>
    </>
  );
}
