import type { Metadata } from "next";
import Image from "next/image";
import { ShieldCheck, Award, Clock, Building2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import CTABanner from "@/components/home/CTABanner";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import AwardsSection from "@/components/about/AwardsSection";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Bhumi Developers — over 35 years of building premium real estate in Bharuch and South Gujarat.",
};


const team = [
  { name: "Kiran Majmudar", role: "Chairman & Founder", since: "1991" },
  { name: "Hema Majmudar", role: "Director", since: "1991" },
  { name: "Avik Majmudar", role: "Managing Director", since: "2023" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-primary pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Story"
            title="Over Three Decades of Building Dreams"
            subtitle="From a single plot in Bharuch to South Gujarat's most respected developer — this is our story."
            align="center"
            light
            animate
          />
        </div>
      </div>

      {/* Stats */}
      <div className="bg-surface border-t border-champagne/20 py-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-3 divide-y-2 lg:divide-y-0 lg:divide-x divide-primary/5 text-center">
            {[
              { value: 35, suffix: "+", label: "Years" },
              { value: 50, suffix: "+", label: "Projects" },
              { value: 72, suffix: " Lakhs+", label: "Sq Ft Built" },
            ].map((s, i) => (
              <div key={i} className="py-8 lg:py-0 lg:px-8">
                <p className="text-4xl font-bold text-primary" style={{ fontFamily: "var(--font-playfair)" }}>
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </p>
                <p className="text-muted text-xs tracking-[0.3em] uppercase font-body mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-champagne/25">
            <div className="bg-background p-12">
              <span className="text-sienna text-xs tracking-[0.3em] uppercase font-semibold font-body">Our Mission</span>
              <h3 className="text-2xl font-bold text-primary mt-3 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                Building More Than Homes
              </h3>
              <div className="w-8 h-px bg-champagne/60 mb-6" />
              <p className="text-muted font-body leading-relaxed text-sm">
                To create thoughtfully designed spaces that enrich lives — with unwavering commitment
                to quality, transparency, and timely delivery. Every Bhumi project is a promise kept.
              </p>
            </div>
            <div className="bg-surface p-12">
              <span className="text-sienna text-xs tracking-[0.3em] uppercase font-semibold font-body">Our Vision</span>
              <h3 className="text-2xl font-bold text-primary mt-3 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                Gujarat&apos;s Most Trusted Builder
              </h3>
              <div className="w-8 h-px bg-champagne/60 mb-6" />
              <p className="text-muted font-body leading-relaxed text-sm">
                To be recognized across Gujarat for building spaces that stand the test of time —
                where engineering excellence meets architectural beauty, creating legacies for generations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Bhumi Developers Section */}
      <div className="py-24 bg-surface border-t border-b border-champagne/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <SectionHeading
              eyebrow="Our Advantages"
              title="Why Bhumi Developers"
              subtitle="Over three decades of engineering excellence, built on trust, quality, and transparency."
              align="center"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: "Industrial Precision",
                desc: "We bring the highest standards of safety, material choice, and engineering rigor from heavy industrial construction into residential and commercial spaces.",
              },
              {
                icon: Award,
                title: "Proven Legacy",
                desc: "With over 35 years of experience in Gujarat's real estate sector, we have built a reputation of delivering premium quality and reliable construction.",
              },
              {
                icon: Clock,
                title: "On-Time Delivery",
                desc: "We respect your time. Our rigorous planning, advanced construction scheduling, and direct project supervision ensure we deliver on or before schedule.",
              },
              {
                icon: Building2,
                title: "Complete Transparency",
                desc: "Clear land titles, RERA-compliant projects, honest pricing, and transparent communications. We keep our promises with zero hidden clauses.",
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-background border border-primary/5 p-8 flex flex-col gap-5 hover:border-primary/20 hover:shadow-xl transition-all duration-300 rounded-sm group"
                >
                  <div className="w-12 h-12 bg-primary/5 border border-primary/10 flex items-center justify-center rounded-sm text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Icon size={24} />
                  </div>
                  <h4 className="text-primary font-bold text-lg leading-snug font-heading" style={{ fontFamily: "var(--font-playfair)" }}>
                    {item.title}
                  </h4>
                  <p className="text-muted text-sm font-body leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Our Team Section */}
      <div className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Column: Heading and Text */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div>
                <span className="text-sienna text-xs tracking-[0.3em] uppercase font-semibold font-body">Our Greatest Asset</span>
                <h3 className="text-3xl lg:text-4xl font-bold text-primary mt-3 leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
                  A Foundation Built by People, <br/>
                  <span className="italic font-light text-muted">not just concrete.</span>
                </h3>
              </div>
              <div className="w-12 h-px bg-champagne/60" />
              <div className="flex flex-col gap-5 text-muted font-body text-sm leading-relaxed">
                <p>
                  At Bhumi Developers, we believe that real estate isn&apos;t just about steel and concrete — it is about the collective passion, engineering precision, and dedication of the people who bring these blueprints to life.
                </p>
                <p>
                  Our multidisciplinary team comprises seasoned civil engineers, project managers, design specialists, and customer relations experts. Working in perfect harmony, we ensure that every square foot we build delivers on our promise of craftsmanship, safety, and transparency.
                </p>
                <p>
                  Together, we are not just building modern structures; we are crafting the landmarks of South Gujarat and nurturing a legacy that future generations will build upon.
                </p>
              </div>
            </div>

            {/* Right Column: Beautifully Framed Team Photo - Aspect-[16/9] renders the full image with 0 cropping */}
            <div className="lg:col-span-7 relative">
              <div className="relative w-full aspect-[16/9] overflow-hidden border border-black/5 shadow-xl group rounded-sm">
                <Image
                  src="/images/about/bhumi-team.webp"
                  alt="Bhumi Developers Team"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent pointer-events-none" />
              </div>
              {/* Decorative background framing accent */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-l border-b border-primary/10 -z-10" />
              <div className="absolute -top-4 -right-4 w-24 h-24 border-r border-t border-primary/10 -z-10" />
            </div>
          </div>
        </div>
      </div>


      {/* Awards & Recognition */}
      <AwardsSection />


      {/* Leadership */}

      <div className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <SectionHeading eyebrow="Leadership" title="The People Behind Bhumi" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {team.map((member, i) => (
              <div key={i} className="bg-background p-8 text-center">
                <div className="w-16 h-16 bg-primary mx-auto mb-5 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h4 className="text-primary font-bold mb-1 text-base" style={{ fontFamily: "var(--font-playfair)" }}>
                  {member.name}
                </h4>
                <p className="text-muted text-xs tracking-[0.2em] uppercase font-body mb-2">{member.role}</p>
                <p className="text-muted/60 text-xs font-body">Since {member.since}</p>
              </div>
            ))}
          </div>
        </div>
      </div>


      <CTABanner />

    </>
  );
}
