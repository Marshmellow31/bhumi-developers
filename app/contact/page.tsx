import type { Metadata } from "next";
import ContactClient from "./ContactClient";
import FaqSection from "@/components/ui/FaqSection";
import { contactFaqs, buildFaqJsonLd } from "@/data/faqs";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us — Enquire About Properties in Bharuch",
  description:
    "Get in touch with Bhumi Developers for residential and commercial property enquiries in Bharuch. Visit our office at Millennium Arcade, College Rd, Bholav, or call +91 98791 00355.",
  alternates: { canonical: "/contact" },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Contact", item: `${SITE_URL}/contact` },
    ],
  },
  buildFaqJsonLd(contactFaqs),
];

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ContactClient />
      <FaqSection
        eyebrow="Quick Answers"
        title="Frequently Asked Questions"
        faqs={contactFaqs}
      />
    </>
  );
}
