import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import CTABanner from "@/components/home/CTABanner";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Bhumi Developers — over 35 years of building premium real estate in Bharuch and South Gujarat.",
};

const milestones = [
  { year: "1991", title: "Founded", desc: "Bhumi Developers was established in Bharuch with a vision to redefine real estate." },
  { year: "2010", title: "First Landmark", desc: "Delivered our first major residential project — Bhumi Excel Park with 300 homes." },
  { year: "2015", title: "Commercial Expansion", desc: "Entered the commercial segment with Bhumi Grand Square in the heart of Bharuch." },
  { year: "2020", title: "5,000 Families", desc: "Crossed the milestone of housing 5,000+ satisfied families across South Gujarat." },
  { year: "2025", title: "Expanding Horizons", desc: "Expanding into Ankleshwar, Surat, and beyond with 6 ongoing projects." },
];

const team = [
  { name: "Rajesh Patel", role: "Chairman & Founder", since: "1991" },
  { name: "Mihir Patel", role: "Managing Director", since: "2010" },
  { name: "Priya Shah", role: "Head of Design", since: "2015" },
  { name: "Kunal Desai", role: "Chief Sales Officer", since: "2018" },
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
          />
        </div>
      </div>

      {/* Stats — black section */}
      <div className="bg-primary border-t border-white/5 py-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y-2 lg:divide-y-0 lg:divide-x divide-white/5 text-center">
            {[
              { value: 35, suffix: "+", label: "Years" },
              { value: 50, suffix: "+", label: "Projects" },
              { value: 5000, suffix: "+", label: "Families" },
              { value: 12, suffix: "M+", label: "Sq Ft Built" },
            ].map((s, i) => (
              <div key={i} className="py-8 lg:py-0 lg:px-8">
                <p className="text-4xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </p>
                <p className="text-white/25 text-xs tracking-[0.3em] uppercase font-body mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            <div className="bg-white p-12">
              <span className="text-muted text-xs tracking-[0.3em] uppercase font-semibold font-body">Our Mission</span>
              <h3 className="text-2xl font-bold text-primary mt-3 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                Building More Than Homes
              </h3>
              <div className="w-8 h-px bg-primary/20 mb-6" />
              <p className="text-muted font-body leading-relaxed text-sm">
                To create thoughtfully designed spaces that enrich lives — with unwavering commitment
                to quality, transparency, and timely delivery. Every Bhumi project is a promise kept.
              </p>
            </div>
            <div className="bg-primary p-12">
              <span className="text-white/30 text-xs tracking-[0.3em] uppercase font-semibold font-body">Our Vision</span>
              <h3 className="text-2xl font-bold text-white mt-3 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                Gujarat&apos;s Most Trusted Builder
              </h3>
              <div className="w-8 h-px bg-white/20 mb-6" />
              <p className="text-white/40 font-body leading-relaxed text-sm">
                To be recognized across Gujarat for building spaces that stand the test of time —
                where engineering excellence meets architectural beauty, creating legacies for generations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="py-24 bg-surface">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <SectionHeading eyebrow="Our Journey" title="Milestones That Define Us" />
          </div>
          <div className="relative">
            <div className="absolute md:left-1/2 md:-translate-x-px left-1.5 top-0 bottom-0 w-px bg-border" />
            <div className="flex flex-col gap-12">
              {milestones.map((m, i) => (
                <div
                  key={i}
                  className={`flex md:items-start gap-6 md:gap-8 flex-row ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"} text-left`}>
                    <div className="inline-block bg-white border border-border px-6 py-4 w-full md:w-auto">
                      <p className="text-muted text-xs tracking-[0.25em] uppercase font-semibold font-body mb-1">{m.year}</p>
                      <h4 className="text-primary font-bold text-base mb-2" style={{ fontFamily: "var(--font-playfair)" }}>{m.title}</h4>
                      <p className="text-muted text-sm font-body leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                  <div className="relative z-10 w-3 h-3 bg-primary border-4 border-surface mt-4 shrink-0 order-first md:order-none" />
                  <div className="hidden md:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Leadership */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <SectionHeading eyebrow="Leadership" title="The People Behind Bhumi" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {team.map((member, i) => (
              <div key={i} className="bg-white p-8 text-center">
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
