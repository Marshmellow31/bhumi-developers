import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import PhilosophySection from "@/components/home/PhilosophySection";
import AboutSnippet from "@/components/home/AboutSnippet";
import SustainabilitySection from "@/components/home/SustainabilitySection";
import CTABanner from "@/components/home/CTABanner";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PhilosophySection />
      <AboutSnippet />
      <SustainabilitySection />
      <CTABanner />
    </>
  );
}
