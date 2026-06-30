import type { Metadata } from "next";
import HotelsClient from "./HotelsClient";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resorts & Hotels — Hospitality Projects in Bharuch & Mumbai",
  description:
    "Explore premium hospitality projects by Bhumi Developers — The Fern Series by Marriott in Bharuch and The Resort near Imagica, Mumbai. World-class accommodation and luxury amenities.",
  alternates: { canonical: "/hotels" },
};

const hotelsUrl = `${SITE_URL}/hotels`;

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Resorts & Hotels", item: hotelsUrl },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${hotelsUrl}#page`,
    url: hotelsUrl,
    name: "Resorts & Hotels — Hospitality Projects by Bhumi Developers",
    description:
      "Premium hospitality projects by Bhumi Developers including The Fern Series by Marriott in Bharuch and The Resort near Imagica, Mumbai.",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "The Fern Series by Marriott",
          url: `${SITE_URL}/projects/fern-series`,
          description: "Upcoming luxury hotel by Marriott's Fern Series brand in Bharuch, Gujarat.",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "The Resort",
          url: `${SITE_URL}/projects/the-resort`,
          description: "Ultra-luxury eco-resort near Imagica, Khalapur, Mumbai with natural pond and waterfalls.",
        },
      ],
    },
  },
];

export default function HotelsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <HotelsClient />
    </>
  );
}
