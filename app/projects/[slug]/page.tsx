import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, Home, Calendar, Layers } from "lucide-react";
import { getProjectBySlug, projects, type Project } from "@/data/projects";
import { formatPrice } from "@/lib/utils";
import CTABanner from "@/components/home/CTABanner";
import Button from "@/components/ui/Button";
import Link from "next/link";
import ProjectGallerySection from "@/components/projects/ProjectGallerySection";
import ProjectGalleryGrid from "@/components/projects/ProjectGalleryGrid";
import ProjectDocuments from "@/components/projects/ProjectDocuments";

const PROJECT_LOGOS: Record<string, string> = {
  "central-square": "/images/central-square-logo.svg",
  "solitaire-pallazzo": "/images/solitaire-pallazzo-logo.jpg",
  "city-centre": "/images/city-center-logo.png",
  "pritam-residency": "/images/pritam-residency-logo.svg",
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
  Ongoing: "bg-white text-primary",
  Completed: "bg-white text-primary",
  Upcoming: "bg-white/10 text-white border border-white/20",
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

  const logo = PROJECT_LOGOS[project.slug];

  return (
    <>
      <ProjectGallerySection
        image={project.image}
        gallery={project.gallery}
        status={project.status}
        name={project.name}
        location={project.location}
        tagline={project.tagline}
        statusColors={statusColors}
      />

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
                <ProjectGalleryGrid gallery={project.gallery} projectName={project.name} />
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
            {/* Project Brand Seal */}
            {logo && (
              <div className="bg-primary border border-white/10 p-8 flex flex-col items-center justify-center relative group overflow-hidden shadow-2xl">
                {/* Thin elegant gold top border line */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-amber-500/10 via-amber-500 to-amber-500/10" />
                
                {/* Visual grid texture overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-40" />
                
                {/* Sleek logo capsule */}
                <div className="relative w-full bg-white/95 rounded-xl p-6 flex items-center justify-center shadow-inner h-28 border border-white/5 transition-all duration-500 group-hover:scale-[1.02] group-hover:bg-white">
                  <div className="relative w-full h-full">
                    <Image
                      src={logo}
                      alt={`${project.name} logo`}
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
                
                {/* Luxury Typography Stamp */}
                <div className="mt-5 flex flex-col items-center gap-1.5 select-none text-center">
                  <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-amber-500 font-body">
                    Exclusive Development
                  </span>
                  <span className="text-[9px] tracking-[0.15em] uppercase text-white/40 font-body">
                    Bhumi Developers Signature Series
                  </span>
                </div>
              </div>
            )}

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
                {project.brochure && (
                  <a href={project.brochure} download target="_blank" rel="noreferrer">
                    <Button
                      variant="outline"
                      size="md"
                      className="w-full justify-center border-white/30 text-white hover:bg-white hover:text-primary"
                    >
                      Download Brochure
                    </Button>
                  </a>
                )}
                <a href="tel:+919879100355">
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

            {/* Available Downloads */}
            <ProjectDocuments brochure={project.brochure} floorPlans={project.floorPlans} />
          </aside>
        </div>
      </div>

      <CTABanner />
    </>
  );
}
