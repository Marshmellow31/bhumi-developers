import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, Home, Calendar, Layers, Phone, Mail } from "lucide-react";
import { getProjectBySlug, projects, type Project } from "@/data/projects";
import { formatPrice } from "@/lib/utils";
import CTABanner from "@/components/home/CTABanner";
import Button from "@/components/ui/Button";
import Link from "next/link";
import ProjectGallerySection from "@/components/projects/ProjectGallerySection";
import ProjectGalleryGrid from "@/components/projects/ProjectGalleryGrid";
import ProjectDocuments from "@/components/projects/ProjectDocuments";

const PROJECT_LOGOS: Record<string, string> = {
  "central-square": "/images/central-square-logo.webp",
  "solitaire-pallazzo": "/images/solitaire-pallazzo-logo.webp",
  "city-center": "/images/city-center-logo.webp",
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
        video={project.video}
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
              <div className="text-muted leading-relaxed font-body space-y-4">
                {project.description.split('\n').map((para, i) => (
                  para.trim() && <p key={i}>{para}</p>
                ))}
              </div>
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
                    className="bg-background border border-border text-charcoal text-xs tracking-wide px-4 py-2 font-body"
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
                
                {/* Logo directly on dark background */}
                <div className="relative w-full h-52">
                  <Image
                    src={logo}
                    alt={`${project.name} logo`}
                    fill
                    className="object-contain"
                    priority
                  />
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
                Starts From
              </p>
              <p
                className="text-3xl font-bold text-white mb-1"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {formatPrice(project.priceRange.min)}
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

            {/* Project Contact */}
            {project.contact && (
              <div className="relative bg-primary overflow-hidden">
                {/* Amber top accent */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-amber-500/10 via-amber-500 to-amber-500/10" />

                <div className="p-8 flex flex-col gap-5">
                  <div>
                    <span className="text-[10px] tracking-[0.35em] uppercase font-semibold text-amber-500/80 font-body">
                      Sales & Enquiries
                    </span>
                    <h3
                      className="text-white font-bold text-lg mt-1 leading-snug"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      Speak to Our Team
                    </h3>
                    <div className="w-8 h-px bg-white/10 mt-3" />
                  </div>

                  <div className="flex flex-col gap-4">
                    {/* Phones */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Phone size={13} className="text-amber-400" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        {project.contact.phones.map((p) => (
                          <a
                            key={p.number}
                            href={`tel:${p.number}`}
                            className="text-white/80 text-sm font-body tracking-wide hover:text-white transition-colors duration-200"
                          >
                            {p.label ?? p.number}
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Email */}
                    {project.contact.email && (
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Mail size={13} className="text-amber-400" />
                        </div>
                        <a
                          href={`mailto:${project.contact.email}`}
                          className="text-white/80 text-sm font-body break-all hover:text-white transition-colors duration-200 mt-1"
                        >
                          {project.contact.email}
                        </a>
                      </div>
                    )}
                  </div>

                  {/* WhatsApp CTA */}
                  <a
                    href={`https://wa.me/${project.contact.phones[0].number.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 border border-white/15 text-white/70 text-xs tracking-[0.2em] uppercase font-body py-3 hover:border-white/40 hover:text-white transition-all duration-200"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-green-400">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp Us
                  </a>
                </div>
              </div>
            )}

            {/* Details */}
            <div className="bg-surface border border-border p-6 flex flex-col gap-4">
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
