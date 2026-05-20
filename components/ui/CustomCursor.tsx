"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");

  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);

  const dotX = useSpring(rawX, { damping: 50, stiffness: 800 });
  const dotY = useSpring(rawY, { damping: 50, stiffness: 800 });
  const ringX = useSpring(rawX, { damping: 28, stiffness: 280 });
  const ringY = useSpring(rawY, { damping: 28, stiffness: 280 });

  // Refs so event handlers never go stale and never trigger re-renders
  const shownRef   = useRef(false);
  const activeRef  = useRef<Element | null>(null);
  const hoverRef   = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.body.classList.add("cursor-active");

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      // Only call setVisible once — use ref to avoid stale closure
      if (!shownRef.current) {
        shownRef.current = true;
        setVisible(true);
      }
    };

    const onOver = (e: MouseEvent) => {
      const hit = (e.composedPath() as Element[]).find(
        (el) => el instanceof HTMLElement && el.matches("a, button, [data-cursor]")
      ) as HTMLElement | undefined;

      if (hit) {
        if (hit !== activeRef.current) {
          activeRef.current = hit;
          if (!hoverRef.current) {
            hoverRef.current = true;
            setHovering(true);
          }
          const next = hit.dataset.cursorLabel ?? "";
          setLabel(next);
        }
      } else {
        if (activeRef.current) {
          activeRef.current = null;
          hoverRef.current = false;
          setHovering(false);
          setLabel("");
        }
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.body.classList.remove("cursor-active");
    };
  }, []); // stable: rawX/rawY are MotionValues (never change), refs never change

  return (
    <>
      {/* Dot — instant follow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          className="rounded-full bg-white"
          animate={{
            width: hovering ? 6 : 8,
            height: hovering ? 6 : 8,
            opacity: label ? 0 : 1,
            scale: label ? 0 : 1,
          }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>

      {/* Ring — spring-lagged */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          className="rounded-full flex items-center justify-center"
          animate={{
            width:           hovering ? 64  : 32,
            height:          hovering ? 64  : 32,
            opacity:         visible  ? 1   : 0,
            borderColor:     hovering ? "rgba(245,158,11,0.85)" : "rgba(255,255,255,0.35)",
            backgroundColor: hovering ? "rgba(245,158,11,0.12)" : "rgba(0, 0, 0, 0.04)",
          }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          style={{ border: "1px solid" }}
        >
          {hovering && label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.15 }}
              className="text-[8px] font-semibold tracking-[0.18em] uppercase text-amber-400 font-body whitespace-nowrap"
            >
              {label}
            </motion.span>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
