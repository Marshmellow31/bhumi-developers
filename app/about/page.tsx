import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import CTABanner from "@/components/home/CTABanner";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Bhumi Developers — over 20 years of building premium real estate in Bharuch and South Gujarat.",
};

const milestones = [
  { year: "2005", title: "Founded", desc: "Bhumi Developers was established in Bharuch with a vision to redefine real estate." },
  { year: "2010", title: "First Landmark", desc: "Delivered our first major residential project — Bhumi Excel Park with 300 homes." },
  { year: "2015", title: "Commercial Expansion", desc: "Entered the commercial segment with Bhumi Grand Square in the heart of Bharuch." },
  { year: "2020", title: "5,000 Families", desc: "Crossed the milestone of housing 5,000+ satisfied families across South Gujarat." },
  { year: "2025", title: "Expanding Horizons", desc: "Expanding into Ankleshwar, Surat, and beyond with 6 ongoing projects." },
];

const team = [
  { name: "Rajesh Patel", role: "Chairman & Founder", since: "2005" },
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
            title="Two Decades of Building Dreams"
            subtitle="From a single plot in Bharuch to South Gujarat's most respected developer — this is our story."
            align="center"
            light
          />
        </div>
      </div>

      {/* Stats */}
      <div className="bg-accent py-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: 20, suffix: "+", label: "Years" },
              { value: 50, suffix: "+", label: "Projects" },
              { value: 5000, suffix: "+", label: "Families" },
              { value: 12, suffix: "M+", label: "Sq Ft Built" },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-4xl font-bold text-primary" style={{ fontFamily: "var(--font-playfair)" }}>
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </p>
                <p className="text-primary/60 text-xs tracking-widest uppercase font-body mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white border border-border p-10">
              <span className="text-accent text-xs tracking-widest uppercase font-semibold font-body">Our Mission</span>
              <h3 className="text-2xl font-bold text-primary mt-3 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                Building More Than Homes
              </h3>
              <p className="text-muted font-body leading-relaxed">
                To create thoughtfully designed spaces that enrich lives — with unwavering commitment
                to quality, transparency, and timely delivery. Every Bhumi project is a promise kept.
              </p>
            </div>
            <div className="bg-primary p-10">
              <span className="text-accent text-xs tracking-widest uppercase font-semibold font-body">Our Vision</span>
              <h3 className="text-2xl font-bold text-white mt-3 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                Gujarat&apos;s Most Trusted Builder
              </h3>
              <p className="text-white/60 font-body leading-relaxed">
                To be recognized across Gujarat for building spaces that stand the test of time —
                where engineering excellence meets architectural beauty, creating legacies for generations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <SectionHeading eyebrow="Our Journey" title="Milestones That Define Us" />
          </div>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-border" />
            <div className="flex flex-col gap-12">
              {milestones.map((m, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-8 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                    <div className="inline-block bg-background border border-border px-6 py-4">
                      <p className="text-accent text-xs tracking-widest uppercase font-semibold font-body mb-1">{m.year}</p>
                      <h4 className="text-primary font-bold font-heading text-lg mb-2" style={{ fontFamily: "var(--font-playfair)" }}>{m.title}</h4>
                      <p className="text-muted text-sm font-body">{m.desc}</p>
                    </div>
                  </div>
                  <div className="relative z-10 w-4 h-4 rounded-full bg-accent border-4 border-white shadow-md mt-4 shrink-0" />
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Leadership */}
      <div className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <SectionHeading eyebrow="Leadership" title="The People Behind Bhumi" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <div key={i} className="bg-white border border-border p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-primary-light mx-auto mb-5 flex items-center justify-center">
                  <span className="text-accent text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h4 className="text-primary font-bold font-heading mb-1" style={{ fontFamily: "var(--font-playfair)" }}>
                  {member.name}
                </h4>
                <p className="text-accent text-xs tracking-wider uppercase font-body mb-2">{member.role}</p>
                <p className="text-muted text-xs font-body">With Bhumi since {member.since}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CTABanner />
    </>
  );
}
