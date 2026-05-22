import type { Metadata } from "next";
import ProjectShowcase from "@/components/projects/ProjectShowcase";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore all residential, commercial, and villa projects by Bhumi Developers across Bharuch and South Gujarat.",
};

export default function ProjectsPage() {
  return <ProjectShowcase />;
}
