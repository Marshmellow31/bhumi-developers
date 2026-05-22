"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   CustomCursor
   • 8px dot  — near-instant spring (stiffness:800 damping:50)
   • 36px ring — lagged spring    (stiffness:150 damping:20)
   • On data-cursor="view"  → ring 80px, gold fill, "VIEW" label
   • On any link / button   → dot hidden, ring shrinks to 14px
   • body.cursor-active sets cursor:none on everything
═══════════════════════════════════════════════════════════════ */
type CursorMode = "default" | "link" | "view";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [mode, setMode]       = useState<CursorMode>("default");

  /* Raw mouse position */
  const rawX = useMotionValue(-300);
  const rawY = useMotionValue(-300);

  /* Dot — near-instant */
  const dotX = useSpring(rawX, { stiffness: 800, damping: 50 });
  const dotY = useSpring(rawY, { stiffness: 800, damping: 50 });

  /* Ring — lagged (stiffness:150 damping:20 as specified) */
  const ringX = useSpring(rawX, { stiffness: 150, damping: 20 });
  const ringY = useSpring(rawY, { stiffness: 150, damping: 20 });

  /* Refs to avoid stale-closure issues in event handlers */
  const seenRef    = useRef(false);
  const activeRef  = useRef<Element | null>(null);

  useEffect(() => {
    /* Skip on touch devices */
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.body.classList.add("cursor-active");

    /* ── Track mouse position ── */
    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!seenRef.current) {
        seenRef.current = true;
        setVisible(true);
      }
    };

    /* ── Detect hovered element type ── */
    const onOver = (e: MouseEvent) => {
      const path = e.composedPath() as Element[];

      /* Highest-priority: data-cursor="view" */
      const viewEl = path.find(
        (el) => el instanceof HTMLElement && el.dataset.cursor === "view"
      );
      if (viewEl) {
        if (activeRef.current !== viewEl) {
          activeRef.current = viewEl;
          setMode("view");
        }
        return;
      }

      /* Second: any link or button */
      const linkEl = path.find(
        (el) => el instanceof HTMLElement && el.matches("a, button")
      );
      if (linkEl) {
        if (activeRef.current !== linkEl) {
          activeRef.current = linkEl;
          setMode("link");
        }
        return;
      }

      /* Default */
      if (activeRef.current) {
        activeRef.current = null;
        setMode("default");
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.body.classList.remove("cursor-active");
    };
  }, [rawX, rawY]);

  /* ── Derived animate values per mode ── */
  const dotAnimate = {
    width:   mode === "link" ? 0   : 8,
    height:  mode === "link" ? 0   : 8,
    opacity: mode === "link" ? 0   : visible ? 1 : 0,
    scale:   mode === "link" ? 0   : 1,
  };

  const ringAnimate = {
    width:           mode === "view" ? 80  : mode === "link" ? 14 : 36,
    height:          mode === "view" ? 80  : mode === "link" ? 14 : 36,
    /* For "view" we use a real gold fill and exit the blend context */
    backgroundColor: mode === "view" ? "rgba(245,158,11,0.92)" : "transparent",
    borderColor:     mode === "view" ? "transparent" : "rgba(255,255,255,1)",
    opacity: visible ? 1 : 0,
  };

  return (
    <>
      {/* ── 8px dot — mix-blend-mode:difference → inverts against bg ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          mixBlendMode: "difference",
        }}
      >
        <motion.div
          className="rounded-full"
          style={{ backgroundColor: "#ffffff" }}
          animate={dotAnimate}
          transition={{ duration: 0.15, ease: "easeOut" }}
        />
      </motion.div>

      {/* ── 36px ring (spring-lagged) ── */}
      {/* In default/link modes: mix-blend-mode:difference → ring auto-inverts.
          In view mode: gold fill, no blend needed (sits above image cards). */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          /* Disable blend in view mode so gold colour is faithful */
          mixBlendMode: mode === "view" ? "normal" : "difference",
        }}
      >
        <motion.div
          className="rounded-full flex items-center justify-center border"
          animate={ringAnimate}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          {mode === "view" && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.18 }}
              className="text-[9px] font-bold tracking-[0.22em] uppercase text-black select-none"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              VIEW
            </motion.span>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
