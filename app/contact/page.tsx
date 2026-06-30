import type { Metadata } from "next";
import ContactClient from "./ContactClient";
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
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Where is the Bhumi Developers office located?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our office is at 1st Floor, Millennium Arcade, College Rd, opp. SVMIT Eng. College, Friends Colony, Bholav, Bharuch, Gujarat 392001. Office hours are Monday–Saturday, 10 AM to 7 PM.",
        },
      },
      {
        "@type": "Question",
        name: "How can I contact Bhumi Developers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can call us at +91 98791 00355, email us at contact@bhumidevelopers.co.in, or fill out the enquiry form on our website. We are available Monday to Saturday from 10 AM to 7 PM.",
        },
      },
      {
        "@type": "Question",
        name: "What types of properties does Bhumi Developers offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Bhumi Developers offers a range of property types including premium residential apartments (2 BHK and 3 BHK flats), commercial shops and offices, villa plots, gated townships, and hospitality projects across Bharuch, Ankleshwar, Vadodara, and Mumbai.",
        },
      },
      {
        "@type": "Question",
        name: "Are Bhumi Developers projects RERA registered?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, all applicable Bhumi Developers projects are RERA registered and compliant with Gujarat RERA regulations, ensuring clear land titles, transparent pricing, and timely delivery.",
        },
      },
      {
        "@type": "Question",
        name: "Which areas does Bhumi Developers serve?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Bhumi Developers primarily operates in Bharuch and South Gujarat, with projects also in Ankleshwar, Vadodara, and Mumbai.",
        },
      },
    ],
  },
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
    </>
  );
}
