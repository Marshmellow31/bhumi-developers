import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectGrid from "@/components/projects/ProjectGrid";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore all residential, commercial, and villa projects by Bhumi Developers across Bharuch and South Gujarat.",
};

export default function ProjectsPage() {
  return (
    <>
      {/* Page Header */}
      <div className="bg-primary pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Portfolio"
            title="Every Project, a Landmark"
            subtitle="From premium residences to landmark commercial spaces — discover what we've built across South Gujarat."
            align="center"
            light
          />
        </div>
      </div>

      {/* Projects */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <ProjectGrid />
      </div>
    </>
  );
}
