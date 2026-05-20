import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import PhilosophySection from "@/components/home/PhilosophySection";
import AboutSnippet from "@/components/home/AboutSnippet";
import SustainabilitySection from "@/components/home/SustainabilitySection";
import CTABanner from "@/components/home/CTABanner";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <PhilosophySection />
      <FeaturedProjects />
      <AboutSnippet />
      <SustainabilitySection />
      <CTABanner />
    </>
  );
}
