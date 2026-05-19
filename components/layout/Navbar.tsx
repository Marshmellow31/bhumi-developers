"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navBg = isHome
    ? scrolled
      ? "bg-primary shadow-lg"
      : "bg-transparent"
    : "bg-primary shadow-lg";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-tight">
            <span
              className="text-accent font-heading text-2xl font-bold tracking-wide"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Bhumi
            </span>
            <span className="text-white text-xs font-body tracking-[0.25em] uppercase">
              Developers
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm tracking-widest uppercase font-body transition-colors duration-200 ${
                  pathname === href
                    ? "text-accent"
                    : "text-white/80 hover:text-accent"
                }`}
              >
                {label}
              </Link>
            ))}
            <a
              href="tel:+912642000000"
              className="flex items-center gap-2 bg-accent text-primary px-5 py-2.5 text-sm font-semibold tracking-wide hover:bg-accent-light transition-colors duration-200"
            >
              <Phone size={14} />
              Enquire Now
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-primary border-t border-white/10 overflow-hidden"
          >
            <nav className="flex flex-col px-6 py-6 gap-4">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={`text-base tracking-wider uppercase font-body py-2 border-b border-white/10 ${
                    pathname === href ? "text-accent" : "text-white/80"
                  }`}
                >
                  {label}
                </Link>
              ))}
              <a
                href="tel:+912642000000"
                className="mt-2 flex items-center justify-center gap-2 bg-accent text-primary px-5 py-3 text-sm font-semibold tracking-wide"
              >
                <Phone size={14} />
                Enquire Now
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
