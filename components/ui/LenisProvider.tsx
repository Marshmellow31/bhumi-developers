"use client";

import { useEffect, useRef } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import { MotionConfig, useAnimationFrame } from "framer-motion";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);
  const touchRef = useRef(false);

  // Touch devices scroll natively — tear down Lenis and stop its rAF work.
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      touchRef.current = true;
      lenisRef.current?.lenis?.destroy();
    }
  }, []);

  useAnimationFrame((time) => {
    if (touchRef.current) return;
    lenisRef.current?.lenis?.raf(time);
  });

  return (
    <MotionConfig reducedMotion="user">
      <ReactLenis
        ref={lenisRef}
        root
        autoRaf={false}
        options={{
          lerp: 0.08,
          duration: 1.4,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        }}
      >
        {children}
      </ReactLenis>
    </MotionConfig>
  );
}
