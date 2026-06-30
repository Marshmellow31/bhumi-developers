import type { Metadata } from "next";
import ProjectShowcase from "@/components/projects/ProjectShowcase";
import { projects } from "@/data/projects";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects | Flats, Shops & Villas in Bharuch",
  description:
    "Explore all residential, commercial, and villa projects by Bhumi Developers across Bharuch and South Gujarat — ongoing, completed, and upcoming.",
  alternates: { canonical: "/projects" },
};

const projectsUrl = `${SITE_URL}/projects`;

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Projects", item: projectsUrl },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${projectsUrl}/#page`,
    url: projectsUrl,
    name: "Real Estate Projects by Bhumi Developers",
    description:
      "All residential, commercial, villa, and township projects by Bhumi Developers in Bharuch and South Gujarat.",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntity: {
      "@type": "ItemList",
      name: "Projects by Bhumi Developers",
      itemListElement: projects.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.name,
        url: `${SITE_URL}/projects/${p.slug}`,
        description: p.tagline,
      })),
    },
  },
];

export default function ProjectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ProjectShowcase />
    </>
  );
}
