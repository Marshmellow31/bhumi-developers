import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import CTABanner from "@/components/home/CTABanner";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Bhumi Developers — over 35 years of building premium real estate in Bharuch and South Gujarat.",
};


const team = [
  { name: "Kiran Majmudar", role: "Chairman & Founder", since: "1991" },
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
            animate
          />
        </div>
      </div>

      {/* Stats */}
      <div className="bg-surface border-t border-champagne/20 py-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y-2 lg:divide-y-0 lg:divide-x divide-primary/5 text-center">
            {[
              { value: 35, suffix: "+", label: "Years" },
              { value: 50, suffix: "+", label: "Projects" },
              { value: 5000, suffix: "+", label: "Families" },
              { value: 12, suffix: "M+", label: "Sq Ft Built" },
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

      {/* Founder's Story */}
      <div className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left: Framed Portrait */}
            <div className="lg:col-span-5 relative">
              <div className="relative h-[480px] overflow-hidden border border-black/5 shadow-lg">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('/images/owner.jpeg')",
                  }}
                />
              </div>
              {/* Badge on image */}
              <div className="absolute -bottom-6 -right-6 bg-background text-primary p-6 shadow-xl border border-primary/5 w-40">
                <p className="text-3xl font-bold leading-none mb-1 text-primary" style={{ fontFamily: "var(--font-playfair)" }}>
                  35+
                </p>
                <div className="w-5 h-px bg-primary/20 my-2" />
                <p className="text-muted text-[10px] tracking-[0.2em] uppercase font-body">
                  Years Experience
                </p>
              </div>
              {/* Corner accent */}
              <div className="absolute -top-4 -left-4 w-16 h-16 border border-primary/10 -z-10" />
            </div>

            {/* Right: Vision & Narrative */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div>
                <span className="text-muted text-xs tracking-[0.3em] uppercase font-semibold font-body">Founder&apos;s Story</span>
                <h3 className="text-3xl lg:text-4xl font-bold text-primary mt-3 leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
                  From National Infrastructure to Bharuch&apos;s Horizon
                </h3>
              </div>
              <div className="w-12 h-px bg-champagne/60" />

              <div className="flex flex-col gap-5 text-muted font-body text-sm leading-relaxed">
                <p>
                  With over <strong className="text-primary font-semibold">35 years of engineering and construction experience</strong>, our founder Kiran Majmudar has spent decades building massive industrial layouts across India alongside some of the country&apos;s most prominent MNCs. Under his leadership as the founder of <strong className="text-primary font-semibold">BD Buildcon LLP</strong>, he has left an indelible mark on the nation&apos;s industrial growth, one structure at a time.
                </p>
                <p>
                  Now, he brings that exact level of industrial-grade engineering precision, complete transparency, and world-class quality back to where it all began — his hometown of Bharuch.
                </p>
                <div className="italic pl-4 border-l-2 border-champagne/60 text-primary/80 font-medium flex flex-col gap-3">
                  <p>
                    &ldquo;This city shaped me, and everything I have achieved, I owe to it. Bhumi Developers is my way of giving back. A promise to bring world-class construction quality, complete transparency, and projects that truly reflect Bharuch&apos;s growing potential — creating spaces where families can live with pride and businesses can grow with confidence.&rdquo;
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-0.5 mt-2">
                <span className="font-heading text-lg font-bold text-primary" style={{ fontFamily: "var(--font-playfair)" }}>
                  Kiran Majmudar
                </span>
                <span className="text-muted text-xs tracking-widest uppercase font-semibold font-body">
                  Chairman & Founder
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Team Foundation Image Section */}
      <div className="relative w-full h-[40vh] md:h-[60vh] overflow-hidden">
        {/* Parallax Image */}
        <div 
          className="absolute inset-0 bg-cover bg-fixed bg-center"
          style={{ backgroundImage: "url('/images/about/team-foundation.jpg')" }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-6">
          <span className="text-white/80 text-[10px] md:text-xs tracking-[0.4em] uppercase font-semibold font-body mb-4 drop-shadow-md">
            Our Greatest Asset
          </span>
          <h2 
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white max-w-4xl leading-tight drop-shadow-lg"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            A foundation built by people, <br/>
            <span className="italic font-light text-white/90">not just concrete.</span>
          </h2>
        </div>
      </div>


      {/* Awards & Recognition */}
      <div className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <SectionHeading
              eyebrow="Recognition"
              title="Awards & Honours"
              subtitle="Decades of excellence recognised by industry leaders and communities alike."
              align="center"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-primary/5">
            {[
              {
                photo: null,
                award: "Award Name",
                body: "Awarding Organisation",
                year: "Year",
                desc: "Short description of the award and what it recognises. Add details here.",
              },
              {
                photo: null,
                award: "Award Name",
                body: "Awarding Organisation",
                year: "Year",
                desc: "Short description of the award and what it recognises. Add details here.",
              },
              {
                photo: null,
                award: "Award Name",
                body: "Awarding Organisation",
                year: "Year",
                desc: "Short description of the award and what it recognises. Add details here.",
              },
              {
                photo: null,
                award: "Award Name",
                body: "Awarding Organisation",
                year: "Year",
                desc: "Short description of the award and what it recognises. Add details here.",
              },
              {
                photo: null,
                award: "Award Name",
                body: "Awarding Organisation",
                year: "Year",
                desc: "Short description of the award and what it recognises. Add details here.",
              },
              {
                photo: null,
                award: "Award Name",
                body: "Awarding Organisation",
                year: "Year",
                desc: "Short description of the award and what it recognises. Add details here.",
              },
            ].map((a, i) => (
              <div key={i} className="bg-surface p-8 flex flex-col gap-5 group hover:bg-primary/[0.02] transition-colors duration-300">
                {/* Photo placeholder */}
                <div className="w-full h-44 bg-primary/[0.04] border border-primary/10 flex items-center justify-center overflow-hidden">
                  {a.photo ? (
                    <img src={a.photo} alt={a.award} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-muted/40 text-xs tracking-[0.2em] uppercase font-body select-none">Photo</span>
                  )}
                </div>

                {/* Award info */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-muted text-[10px] tracking-[0.3em] uppercase font-body">{a.year}</span>
                    <div className="w-4 h-px bg-primary/10" />
                  </div>
                  <h4 className="text-primary font-bold text-lg leading-snug" style={{ fontFamily: "var(--font-playfair)" }}>
                    {a.award}
                  </h4>
                  <p className="text-muted text-xs tracking-[0.2em] uppercase font-body">{a.body}</p>
                  <p className="text-muted text-sm font-body leading-relaxed pt-1 border-t border-primary/5">
                    {a.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leadership */}

      <div className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <SectionHeading eyebrow="Leadership" title="The People Behind Bhumi" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
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
