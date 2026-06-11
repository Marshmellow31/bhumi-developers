"use client";

import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import Logo from "@/components/ui/Logo";
import Image from "next/image";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/bd_buildcon/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
      </svg>
    ),
  },
];

const projects = [
  { href: "/projects/solitaire-pallazzo", label: "Solitaire Pallazzo" },
  { href: "/projects/central-square",     label: "Central Square"    },
  { href: "/projects/city-center",        label: "City Center"       },
  { href: "/projects/fern-series",        label: "Fern Series by Marriott" },
];

const quickLinks = [
  { href: "/",         label: "Home"    },
  { href: "/about",    label: "About Us" },
  { href: "/projects", label: "Projects" },
  { href: "/contact",  label: "Contact"  },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      {/* Champagne top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-champagne/40 to-transparent" />

      {/* Group Companies Strip */}
      <div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="flex flex-col items-center gap-6">
            <span className="text-[10px] tracking-[0.35em] uppercase text-white/40 font-body font-semibold text-center">Associated Companies</span>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
              {[
                { src: "/images/BD Buildcon.png",  alt: "BD Buildcon LLP",           scale: 1.6, noBg: true },
                { src: "/images/kiranveda.webp",     alt: "Kiranveda Hospitality LLP",  scale: 1.5, noBg: true },
                { src: "/images/dra-narmada.jpeg",  alt: "DRA Narmada",                scale: 1.2 },
              ].map(({ src, alt, scale, noBg }) => (
                <div
                  key={alt}
                  className={`h-24 w-24 shrink-0 flex items-center justify-center overflow-hidden p-2 ${noBg ? "" : "bg-white/90"}`}
                  title={alt}
                >
                  <Image
                    src={src}
                    alt={alt}
                    width={80}
                    height={80}
                    className="max-h-full max-w-full object-contain"
                    style={{ transform: `scale(${scale})` }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="mb-6 -ml-2">
                <Logo className="h-16 w-auto" light={false} />
              </div>
              <div className="flex gap-3">
                {socialLinks.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 border border-white/12 flex items-center justify-center text-white/35 hover:border-champagne hover:text-champagne transition-colors duration-300"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white/40 text-xs tracking-[0.3em] uppercase font-semibold mb-6 font-body">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-white/50 text-sm font-body hover:text-champagne transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Projects */}
            <div>
              <h4 className="text-white/40 text-xs tracking-[0.3em] uppercase font-semibold mb-6 font-body">
                Our Projects
              </h4>
              <ul className="space-y-3">
                {projects.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-white/50 text-sm font-body hover:text-champagne transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white/40 text-xs tracking-[0.3em] uppercase font-semibold mb-6 font-body">
                Get In Touch
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-white/50 text-sm font-body">
                  <MapPin size={15} className="text-champagne/60 mt-0.5 shrink-0" />
                  <span>
                    1ST FLOOR, Millennium Arcade, College Rd,
                    <br />
                    opp. SVMIT ENG. COLLEGE, Bholav, Bharuch, Gujarat 392001
                  </span>
                </li>
                <li>
                  <a
                    href="tel:+919879100355"
                    className="flex items-center gap-3 text-white/50 text-sm font-body hover:text-champagne transition-colors"
                  >
                    <Phone size={15} className="text-champagne/60 shrink-0" />
                    +91 98791 00355
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:contact@bhumidevelopers.co.in"
                    className="flex items-center gap-3 text-white/50 text-sm font-body hover:text-champagne transition-colors"
                  >
                    <Mail size={15} className="text-champagne/60 shrink-0" />
                    contact@bhumidevelopers.co.in
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/[0.06] bg-primary-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/25 tracking-wide font-body">
          <p>© {new Date().getFullYear()} Bhumi Developers. All rights reserved.</p>
          <p>Bharuch, Gujarat, India</p>
        </div>
      </div>
    </footer>
  );
}
