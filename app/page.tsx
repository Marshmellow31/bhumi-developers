import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import PhilosophySection from "@/components/home/PhilosophySection";
import FeaturedProjects from "@/components/home/FeaturedProjects";
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
