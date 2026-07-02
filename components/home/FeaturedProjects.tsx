import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowUpRight } from "lucide-react";
import { getFeaturedProjects } from "@/data/projects";

const statusStyles: Record<string, string> = {
  Ongoing:   "text-emerald-700 before:bg-emerald-600",
  Completed: "text-primary before:bg-primary",
  Upcoming:  "text-amber-700 before:bg-amber-600",
};

/* Keyword-focused one-liners per flagship project (fallback: project tagline). */
const blurbs: Record<string, string> = {
  "central-square":
    "Shops, clinics & offices for sale at Panchbatti — Bharuch's only four-side-open commercial hub.",
  "solitaire-pallazzo":
    "Premium 3 BHK flats in Tavra, Bharuch with Narmada river views — G+14 gated community.",
  "city-center":
    "6 lakh sq ft of shops, offices & multiplex on Station Road — shops for rent and purchase.",
  "fern-series":
    "The Fern Series by Marriott — a luxury hotel coming to Bharuch.",
  "the-resort":
    "Ultra-luxury lakefront resort & wellness retreat near Imagica, Mumbai.",
  bkc2:
    "17+ lakh sq ft of Grade-A offices & premium retail — an upcoming Mumbai landmark.",
};

export default function FeaturedProjects() {
  const featured = getFeaturedProjects();

  return (
    <section className="py-24 md:py-32 bg-background border-t border-champagne/15">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="flex flex-col gap-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-primary/20" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-muted font-body font-semibold">
                Signature Developments
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold text-primary leading-[1.05] tracking-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Flats, Shops & Landmarks
              <br />
              <span className="italic font-light text-muted">across Bharuch & beyond.</span>
            </h2>
          </div>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 self-start md:self-end text-primary text-xs font-semibold font-body tracking-[0.2em] uppercase border-b border-primary/20 pb-1 hover:border-primary transition-colors duration-300"
          >
            View All Projects
            <ArrowUpRight
              size={13}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((project) => (
            <article key={project.id} className="group flex flex-col gap-4">
              <Link
                href={`/projects/${project.slug}`}
                className="relative overflow-hidden aspect-[4/3] bg-surface border border-border block"
              >
                <Image
                  src={project.image}
                  alt={`${project.name} — ${project.type.toLowerCase()} project in ${project.location} by Bhumi Developers`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span
                    className={`inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm pl-2.5 pr-3 py-1.5 text-[9px] tracking-[0.18em] uppercase font-semibold font-body shadow-sm before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:inline-block ${statusStyles[project.status]}`}
                  >
                    {project.status}
                  </span>
                </div>
              </Link>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-muted font-body font-semibold">
                    {project.type}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted font-body">
                    <MapPin size={11} className="shrink-0" />
                    {project.location}
                  </span>
                </div>
                <h3
                  className="text-2xl font-bold text-primary leading-tight group-hover:text-sienna transition-colors duration-300"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  <Link href={`/projects/${project.slug}`}>{project.name}</Link>
                </h3>
                <p className="text-sm text-muted leading-relaxed font-body">
                  {blurbs[project.slug] ?? project.tagline}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
