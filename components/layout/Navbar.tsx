"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import Logo from "@/components/ui/Logo";

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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Logo className="h-14 w-auto" light={false} />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-xs tracking-[0.2em] uppercase font-body transition-colors duration-200 ${
                  pathname === href
                    ? "text-white"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {label}
              </Link>
            ))}
            <a
              href="tel:+912642000000"
              className="flex items-center gap-2 bg-white text-primary px-5 py-2.5 text-xs font-semibold tracking-[0.15em] uppercase hover:bg-white/90 transition-colors duration-200"
            >
              <Phone size={13} />
              Enquire
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
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
                  className={`text-sm tracking-[0.2em] uppercase font-body py-2 border-b border-white/10 ${
                    pathname === href ? "text-white" : "text-white/50"
                  }`}
                >
                  {label}
                </Link>
              ))}
              <a
                href="tel:+912642000000"
                className="mt-2 flex items-center justify-center gap-2 bg-white text-primary px-5 py-3 text-xs font-semibold tracking-[0.15em] uppercase"
              >
                <Phone size={13} />
                Enquire Now
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
