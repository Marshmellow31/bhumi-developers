"use client";

import { useRef } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import { useAnimationFrame } from "framer-motion";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useAnimationFrame((time) => {
    lenisRef.current?.lenis?.raf(time);
  });

  return (
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
  );
}
