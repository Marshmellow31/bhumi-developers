import type { Metadata } from "next";
import ProjectShowcase from "@/components/projects/ProjectShowcase";

export const metadata: Metadata = {
  title: "Projects | Flats, Shops & Villas in Bharuch",
  description:
    "Explore all residential, commercial, and villa projects by Bhumi Developers across Bharuch and South Gujarat — ongoing, completed, and upcoming.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return <ProjectShowcase />;
}
