import type { Metadata } from "next";
import GaclColonyClient from "./GaclColonyClient";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "GACL Colony — 50-Acre Gated Township in Bharuch, Gujarat",
  description:
    "GACL Colony by Bhumi Developers — a 50-acre RERA-compliant gated township in Bharuch, Gujarat with 200+ residential plots, wide roads, green belts, clubhouse, and 24/7 security.",
  alternates: { canonical: "/gacl-colony" },
};

const gaclUrl = `${SITE_URL}/gacl-colony`;

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "GACL Colony", item: gaclUrl },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Residence",
    "@id": `${gaclUrl}#place`,
    name: "GACL Colony",
    url: gaclUrl,
    description:
      "A 50-acre RERA-compliant gated township in Bharuch, Gujarat offering 200+ residential plots with world-class infrastructure, landscaped green belts, a clubhouse, and 24/7 security.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bharuch",
      addressRegion: "Gujarat",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 21.7203322,
      longitude: 72.9826081,
    },
    branchOf: { "@id": `${SITE_URL}/#organization` },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "24/7 Gated Security", value: true },
      { "@type": "LocationFeatureSpecification", name: "Landscaped Green Belts", value: true },
      { "@type": "LocationFeatureSpecification", name: "Community Clubhouse", value: true },
      { "@type": "LocationFeatureSpecification", name: "Wide Internal Roads", value: true },
      { "@type": "LocationFeatureSpecification", name: "Underground Utilities", value: true },
    ],
  },
];

export default function GaclColonyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <GaclColonyClient />
    </>
  );
}
