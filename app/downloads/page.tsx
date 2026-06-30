import type { Metadata } from "next";
import { projects } from "@/data/projects";
import DownloadsClient from "./DownloadsClient";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Download Brochures & Floor Plans — Bhumi Developer Projects",
  description:
    "Download official brochures and floor plan layouts for Bhumi Developers projects in Bharuch — Central Square, Solitaire Pallazzo, City Center, and more.",
  alternates: { canonical: "/downloads" },
};

const downloadsUrl = `${SITE_URL}/downloads`;

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Downloads", item: downloadsUrl },
    ],
  },
];

export default function DownloadsPage() {
  const downloadableProjects = projects.filter(
    (p) => p.brochure || (p.floorPlans && p.floorPlans.length > 0)
  );

  const totalDocs = downloadableProjects.reduce((sum, p) => {
    return sum + (p.brochure ? 1 : 0) + (p.floorPlans?.length ?? 0);
  }, 0);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <DownloadsClient projects={downloadableProjects} totalDocs={totalDocs} />
    </>
  );
}
