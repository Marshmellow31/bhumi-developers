import type { Metadata } from "next";
import { projects } from "@/data/projects";
import DownloadsClient from "./DownloadsClient";

export const metadata: Metadata = {
  title: "Downloads — Brochures & Floor Plans",
  description:
    "Download brochures and floor plan layout structures for Bhumi Developers landmark projects in Bharuch.",
  alternates: { canonical: "/downloads" },
};

export default function DownloadsPage() {
  const downloadableProjects = projects.filter(
    (p) => p.brochure || (p.floorPlans && p.floorPlans.length > 0)
  );

  const totalDocs = downloadableProjects.reduce((sum, p) => {
    return sum + (p.brochure ? 1 : 0) + (p.floorPlans?.length ?? 0);
  }, 0);

  return <DownloadsClient projects={downloadableProjects} totalDocs={totalDocs} />;
}
