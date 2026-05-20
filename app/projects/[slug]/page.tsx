import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, Home, Calendar, Layers } from "lucide-react";
import { getProjectBySlug, projects, type Project } from "@/data/projects";
import { formatPrice } from "@/lib/utils";
import CTABanner from "@/components/home/CTABanner";
import Button from "@/components/ui/Button";
import Link from "next/link";

const PROJECT_LOGOS: Record<string, string> = {
  "central-square": "/images/central-square-logo.png",
  "solitaire-pallazzo": "/images/solitaire-pallazzo-logo.jpg",
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.description,
  };
}

const statusColors: Record<string, string> = {
  Ongoing: "bg-emerald-500 text-white",
  Completed: "bg-blue-500 text-white",
  Upcoming: "bg-amber-500 text-primary",
};

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project: Project | undefined = getProjectBySlug(slug);
  if (!project) notFound();

  const details = [
    { icon: Home, label: "Type", value: project.type },
    { icon: MapPin, label: "Location", value: project.city },
    { icon: Layers, label: "Total Units", value: `${project.units} Units` },
    { icon: Calendar, label: "Completion", value: project.completionYear.toString() },
  ];

  return (
    <>
      {/* Hero */}
      <div className="relative h-[75vh] min-h-[520px] bg-primary overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url('${project.image}')` }}
        />
        {/* Gradient: image visible at top, deep dark at bottom for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-primary/10" />

        <div className="absolute inset-0 flex items-end max-w-7xl mx-auto px-6 lg:px-8 pb-16">
          <div className="relative z-10 w-full flex items-end justify-between gap-8">

            {/* Left: logo crest → divider → badge → title → location */}
            <div>
              {PROJECT_LOGOS[project.slug] && (
                <div className="mb-6">
                  <Image
                    src={PROJECT_LOGOS[project.slug]}
                    alt={`${project.name} logo`}
                    width={140}
                    height={105}
                    className="object-contain"
                    priority
                  />
                  <div className="mt-5 flex items-center gap-3">
                    <span className="block w-10 h-px bg-amber-500" />
                    <span className="block w-2 h-2 rounded-full bg-amber-500/60" />
                    <span className="block flex-1 h-px bg-white/10" />
                  </div>
                </div>
              )}
              <span
                className={`inline-block text-xs tracking-widest uppercase font-semibold px-3 py-1.5 mb-5 font-body ${
                  statusColors[project.status]
                }`}
              >
                {project.status}
              </span>
              <h1
                className="text-5xl md:text-7xl font-bold text-white mb-4 leading-none"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {project.name}
              </h1>
              <p className="text-white/60 text-base font-body flex items-center gap-2 tracking-wide">
                <MapPin size={14} className="text-amber-500/70 shrink-0" />
                {project.location}
              </p>
            </div>

            {/* Right: tagline watermark on large screens */}
            <p
              className="hidden lg:block text-right text-white/20 text-xs tracking-[0.3em] uppercase font-body self-end pb-1 max-w-[160px] leading-relaxed"
            >
              {project.tagline}
            </p>

          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-2 flex flex-col gap-10">
            {/* Tagline */}
            <p
              className="text-2xl text-primary/40 font-light italic"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              &ldquo;{project.tagline}&rdquo;
            </p>

            {/* Description */}
            <div>
              <h2
                className="text-xl font-bold text-primary mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                About This Project
              </h2>
              <p className="text-muted leading-relaxed font-body">{project.description}</p>
            </div>

            {/* Highlights */}
            <div>
              <h2
                className="text-xl font-bold text-primary mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Project Highlights
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {project.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-background border border-border px-4 py-3 text-sm font-body text-charcoal"
                  >
                    <span className="w-px h-3 bg-primary/30 shrink-0" />
                    {h}
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <div>
                <h2
                  className="text-xl font-bold text-primary mb-4"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Project Gallery
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.gallery.map((img, i) => (
                    <div
                      key={i}
                      className="relative overflow-hidden group aspect-[4/3] bg-primary/5 border border-border"
                    >
                      <img
                        src={img}
                        alt={`${project.name} Gallery ${i + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-300" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Amenities */}
            <div>
              <h2
                className="text-xl font-bold text-primary mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Amenities
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.amenities.map((a, i) => (
                  <span
                    key={i}
                    className="bg-white border border-border text-charcoal text-xs tracking-wide px-4 py-2 font-body"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-6">
            {/* Price Card */}
            <div className="bg-primary text-white p-8">
              <p className="text-white/50 text-xs tracking-widest uppercase font-body mb-2">
                Price Range
              </p>
              <p
                className="text-3xl font-bold text-white mb-1"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {formatPrice(project.priceRange.min)}
              </p>
              <p className="text-white/50 text-sm font-body mb-1">to</p>
              <p
                className="text-2xl font-bold text-white"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {formatPrice(project.priceRange.max)}
              </p>
              <p className="text-white/40 text-xs font-body mt-2">{project.area}</p>

              <div className="mt-6 flex flex-col gap-3">
                <Link href="/contact">
                  <Button variant="primary" size="md" className="w-full justify-center">
                    Enquire Now
                  </Button>
                </Link>
                <a href="tel:+912642000000">
                  <Button
                    variant="outline"
                    size="md"
                    className="w-full justify-center border-white/30 text-white hover:bg-white hover:text-primary"
                  >
                    Call Us
                  </Button>
                </a>
              </div>
            </div>

            {/* Details */}
            <div className="bg-background border border-border p-6 flex flex-col gap-4">
              <h3
                className="text-base font-bold text-primary"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Project Details
              </h3>
              {details.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center justify-between text-sm font-body">
                  <div className="flex items-center gap-2 text-muted">
                    <Icon size={14} className="text-primary/40" />
                    {label}
                  </div>
                  <span className="text-charcoal font-medium">{value}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>

      <CTABanner />
    </>
  );
}
