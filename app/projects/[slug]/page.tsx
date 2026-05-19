import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MapPin, Home, Calendar, Layers } from "lucide-react";
import { getProjectBySlug, projects, type Project } from "@/data/projects";
import { formatPrice } from "@/lib/utils";
import CTABanner from "@/components/home/CTABanner";
import Button from "@/components/ui/Button";
import Link from "next/link";

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
      <div className="relative h-[60vh] min-h-[400px] bg-primary overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-primary/70" />
        <div className="absolute inset-0 flex items-end max-w-7xl mx-auto px-6 lg:px-8 pb-12">
          <div className="relative z-10">
            <span
              className={`inline-block text-xs tracking-widest uppercase font-semibold px-3 py-1.5 mb-4 font-body ${
                statusColors[project.status]
              }`}
            >
              {project.status}
            </span>
            <h1
              className="text-4xl md:text-6xl font-bold text-white mb-3"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {project.name}
            </h1>
            <p className="text-white/70 text-lg font-body flex items-center gap-2">
              <MapPin size={16} className="text-accent" />
              {project.location}
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
              className="text-2xl text-accent font-semibold italic"
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
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    {h}
                  </div>
                ))}
              </div>
            </div>

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
                className="text-3xl font-bold text-accent mb-1"
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
                    <Icon size={14} className="text-accent" />
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
