"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionTemplate,
  useTransform,
} from "framer-motion";
import { Phone } from "lucide-react";
import Logo from "@/components/ui/Logo";

/* ── Nav links ── */
const NAV_LINKS = [
  { href: "/",        label: "Home"    },
  { href: "/projects", label: "Projects" },
  { href: "/about",   label: "About"   },
  { href: "/contact", label: "Contact" },
];

/* ── Mobile menu stagger variants ── */
const overlayVariants = {
  closed: { opacity: 0 },
  open:   { opacity: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } },
};

const menuListVariants = {
  closed: {},
  open:   { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const menuItemVariants = {
  closed: { opacity: 0, y: 32 },
  open:   {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* ════════════════════════════════════════════════════════════
   Animated hamburger — 3 SVG lines morph to X
════════════════════════════════════════════════════════════ */
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="24" height="24"
      viewBox="0 0 24 24"
      className="text-white"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      {/* Top line — rotates to first arm of X */}
      <motion.line
        x1="3" y1="6" x2="21" y2="6"
        animate={open
          ? { x1: 4, y1: 4, x2: 20, y2: 20 }
          : { x1: 3, y1: 6, x2: 21, y2: 6 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* Middle line — fades out */}
      <motion.line
        x1="3" y1="12" x2="21" y2="12"
        animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
      {/* Bottom line — rotates to second arm of X */}
      <motion.line
        x1="3" y1="18" x2="21" y2="18"
        animate={open
          ? { x1: 4, y1: 20, x2: 20, y2: 4 }
          : { x1: 3, y1: 18, x2: 21, y2: 18 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

/* ============================================================
   Navbar
============================================================ */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHome   = pathname === "/";

  /* Close mobile menu on route change */
  useEffect(() => setIsOpen(false), [pathname]);

  /* ── Scroll-driven navbar background ── */
  const { scrollY } = useScroll();

  /* opacity of bg: 0 at scrollY≤60, 1 at scrollY≥120 */
  const bgOpacity = useTransform(scrollY, [0, 60], [0, 1]);

  /* On non-home pages always show solid bg */
  const navBgColor = useMotionTemplate`rgba(17,17,17,${isHome ? bgOpacity : 1})`;
  const navBlur    = useMotionTemplate`blur(${useTransform(
    scrollY,
    [0, 60],
    isHome ? ["0px", "20px"] : ["20px", "20px"]
  )})`;

  return (
    <>
      {/* ============ NAVBAR HEADER ============ */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: navBgColor,
          backdropFilter:  navBlur,
          borderBottom:    "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div
            className="flex items-center justify-between h-16"
          >
            {/* Logo */}
            <Link href="/" className="flex items-center h-full">
              <Logo className="w-auto h-10" light={false} />
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className="hidden md:flex items-center gap-8 h-full">
              {NAV_LINKS.map(({ href, label }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className="relative flex flex-col items-center gap-0.5 group"
                  >
                    <span
                      className={`text-[11px] tracking-[0.22em] uppercase transition-colors duration-200 ${
                        active ? "text-white" : "text-white/48 group-hover:text-white"
                      }`}
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {label}
                    </span>

                    {/* Gold underline — shared layoutId animates between active links */}
                    {active && (
                      <motion.span
                        layoutId="navUnderline"
                        className="absolute -bottom-1 left-0 right-0 h-px"
                        style={{ background: "#C9A96E" }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}

              {/* CTA */}
              <a
                href="tel:+919879100355"
                className="flex items-center gap-2 bg-white text-primary px-5 py-2.5 text-[10px] font-semibold tracking-[0.18em] uppercase hover:bg-champagne hover:text-primary transition-colors duration-200"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <Phone size={12} />
                Enquire
              </a>
            </nav>

            {/* ── Mobile hamburger ── */}
            <button
              className="md:hidden p-2 flex items-center"
              onClick={() => setIsOpen((v) => !v)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              <HamburgerIcon open={isOpen} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ============ FULLSCREEN MOBILE OVERLAY ============ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-40 md:hidden flex flex-col"
            style={{ backgroundColor: "rgba(17,17,17,0.97)" }}
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Champagne accent line at top */}
            <div className="h-px w-full bg-champagne/30" />

            {/* Spacer for navbar height */}
            <div style={{ height: 64 }} />

            {/* Staggered nav links */}
            <motion.nav
              className="flex flex-col flex-1 justify-center px-10 gap-2"
              variants={menuListVariants}
              initial="closed"
              animate="open"
            >
              {NAV_LINKS.map(({ href, label }) => {
                const active = pathname === href;
                return (
                  <motion.div key={href} variants={menuItemVariants}>
                    <Link
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center gap-4 py-4 border-b border-white/[0.06]"
                    >
                      {/* Amber dot — shows on active */}
                      <span
                        className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-200 ${
                          active ? "bg-champagne" : "bg-white/20 group-hover:bg-champagne/60"
                        }`}
                      />
                      <span
                        className={`text-3xl font-bold tracking-tight transition-colors duration-200 ${
                          active ? "text-white" : "text-white/40 group-hover:text-white"
                        }`}
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        {label}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}

              {/* CTA in mobile menu */}
              <motion.div variants={menuItemVariants} className="mt-8">
                <a
                  href="tel:+919879100355"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 bg-champagne text-primary px-6 py-4 text-[10px] font-bold tracking-[0.25em] uppercase"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  <Phone size={13} />
                  Call Us Now
                </a>
              </motion.div>
            </motion.nav>

            {/* Subtle bottom watermark */}
            <div className="pb-10 px-10">
              <p
                className="text-[8px] tracking-[0.5em] uppercase text-white/12"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Bhumi Developers · Bharuch, Gujarat
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
