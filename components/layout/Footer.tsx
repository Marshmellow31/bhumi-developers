import Link from "next/link";
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube } from "lucide-react";

const projects = [
  { href: "/projects/bhumi-royal-heights", label: "Royal Heights" },
  { href: "/projects/bhumi-serene-villas", label: "Serene Villas" },
  { href: "/projects/bhumi-grand-square", label: "Grand Square" },
  { href: "/projects/bhumi-one-ankleshwar", label: "One Ankleshwar" },
];

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <span
                className="text-accent text-3xl font-bold block"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Bhumi
              </span>
              <span className="text-white/60 text-xs tracking-[0.3em] uppercase">Developers</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Building dreams, crafting legacies. Bharuch&rsquo;s most trusted real estate
              developer since 2005.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/60 hover:border-accent hover:text-accent transition-colors duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-accent text-xs tracking-[0.25em] uppercase font-semibold mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-white/60 text-sm hover:text-accent transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div>
            <h4 className="text-accent text-xs tracking-[0.25em] uppercase font-semibold mb-6">
              Our Projects
            </h4>
            <ul className="space-y-3">
              {projects.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-white/60 text-sm hover:text-accent transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-accent text-xs tracking-[0.25em] uppercase font-semibold mb-6">
              Get In Touch
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/60 text-sm">
                <MapPin size={16} className="text-accent mt-0.5 shrink-0" />
                <span>
                  Bhumi House, Station Road,
                  <br />
                  Bharuch — 392 001, Gujarat
                </span>
              </li>
              <li>
                <a
                  href="tel:+912642000000"
                  className="flex items-center gap-3 text-white/60 text-sm hover:text-accent transition-colors"
                >
                  <Phone size={16} className="text-accent" />
                  +91 2642 000000
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@bhumidevelopers.com"
                  className="flex items-center gap-3 text-white/60 text-sm hover:text-accent transition-colors"
                >
                  <Mail size={16} className="text-accent" />
                  contact@bhumidevelopers.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>© {new Date().getFullYear()} Bhumi Developers. All rights reserved.</p>
          <p>Designed with care in Bharuch, Gujarat</p>
        </div>
      </div>
    </footer>
  );
}
