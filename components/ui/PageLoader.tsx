"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import BrandLoader from "@/components/ui/BrandLoader";

export default function PageLoader() {
  const [show, setShow] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const seen = sessionStorage.getItem("bhumi_loaded");
    if (seen) return;

    // Initial render is empty so SSR/client match — show the loader only after
    // confirming first-time visit on the client.
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
      {show && <BrandLoader leaving={leaving} />}
    </AnimatePresence>
  );
}
