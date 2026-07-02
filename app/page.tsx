import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import PhilosophySection from "@/components/home/PhilosophySection";
import AboutSnippet from "@/components/home/AboutSnippet";
import SustainabilitySection from "@/components/home/SustainabilitySection";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import CTABanner from "@/components/home/CTABanner";
import FaqSection from "@/components/ui/FaqSection";
import { homeFaqs, buildFaqJsonLd } from "@/data/faqs";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Bhumi Developers | Premium Real Estate in Bharuch, Gujarat",
  description:
    "Bhumi Developers — Bharuch's most trusted real estate developer since 1995. Explore premium residential flats, commercial shops & offices, villas, and townships across Bharuch and South Gujarat.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Bhumi Developers | Premium Real Estate in Bharuch, Gujarat",
    description:
      "Bharuch's most trusted real estate developer since 1995. Premium residential flats, commercial shops, offices, villas, and townships across South Gujarat.",
    url: SITE_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bhumi Developers | Premium Real Estate in Bharuch, Gujarat",
    description:
      "Bharuch's most trusted real estate developer since 1995. Premium residential, commercial, and township projects across South Gujarat.",
  },
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/#webpage`,
  url: SITE_URL,
  name: "Bhumi Developers | Premium Real Estate in Bharuch, Gujarat",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#organization` },
  description:
    "Bhumi Developers — Bharuch's most trusted real estate developer since 1995. Premium residential, commercial, and township projects across South Gujarat.",
  inLanguage: "en-IN",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    ],
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([webPageJsonLd, buildFaqJsonLd(homeFaqs)]).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />
      <HeroSection />
      <PhilosophySection />
      <FeaturedProjects />
      <AboutSnippet />
      <SustainabilitySection />
      <FaqSection
        eyebrow="Buyer's Guide"
        title="Bharuch Real Estate, Answered"
        subtitle="Straight answers to the questions home buyers and investors ask us most about flats, shops, and property in Bharuch."
        faqs={homeFaqs}
      />
      <CTABanner />
    </>
  );
}
