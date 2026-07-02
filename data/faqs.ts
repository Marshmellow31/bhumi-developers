export interface Faq {
  question: string;
  answer: string;
}

/**
 * FAQ copy is the single source for both the visible FAQ sections and the
 * FAQPage JSON-LD — Google requires structured-data answers to match content
 * that is visible on the page.
 */

export const homeFaqs: Faq[] = [
  {
    question: "Who are the most trusted builders in Bharuch?",
    answer:
      "Bhumi Developers has been building in Bharuch since 1995 — over 35 years, 50+ delivered projects, and 72 lakh+ sq ft of residential, commercial, and township construction across Bharuch and South Gujarat, backed by an engineering-first approach to quality.",
  },
  {
    question: "Which are the new residential projects in Bharuch?",
    answer:
      "Solitaire Pallazzo is our newest residential launch — a premium G+14 gated community in Tavra, Bharuch with 168 spacious 3 BHK flats, Narmada river views, clubhouse, sky deck, and sports courts. Possession is planned for 2027.",
  },
  {
    question: "What is the price of a 3 BHK flat in Bharuch?",
    answer:
      "Premium 3 BHK flats at Solitaire Pallazzo, Tavra start from ₹60 lakh, with carpet-efficient layouts starting at 1,011 sq ft. Contact us for current availability, floor-wise pricing, and payment plans.",
  },
  {
    question: "Where can I buy shops or offices in Bharuch?",
    answer:
      "Central Square at Panchbatti offers 110 shops, clinics, and offices from 450–3,500 sq ft starting at ₹32 lakh — Bharuch's only four-side-open commercial project. City Center on Station Road, our completed 6 lakh sq ft landmark, also has shops available for rent and purchase.",
  },
  {
    question: "Are Bhumi Developers' projects RERA compliant?",
    answer:
      "Yes. Our projects are RERA-compliant with clear land titles, approved layouts, transparent pricing, and a 35+ year record of on-time delivery in Gujarat.",
  },
  {
    question: "Why invest in property in Bharuch?",
    answer:
      "Bharuch sits on one of Gujarat's fastest-growing industrial corridors — surrounded by Ankleshwar GIDC, the Dahej PCPIR, and major chemical and manufacturing hubs — driving steady housing demand, rental income, and long-term appreciation for both residential and commercial property.",
  },
];

export const contactFaqs: Faq[] = [
  {
    question: "Where is the Bhumi Developers office located?",
    answer:
      "Our office is at 1st Floor, Millennium Arcade, College Rd, opp. SVMIT Eng. College, Friends Colony, Bholav, Bharuch, Gujarat 392001. Office hours are Monday–Saturday, 10 AM to 7 PM.",
  },
  {
    question: "How can I contact Bhumi Developers?",
    answer:
      "You can call us at +91 85115 66682, email us at contact@bhumidevelopers.co.in, or fill out the enquiry form on our website. We are available Monday to Saturday from 10 AM to 7 PM.",
  },
  {
    question: "What types of properties does Bhumi Developers offer?",
    answer:
      "Bhumi Developers offers a range of property types including premium residential apartments (3 BHK flats), commercial shops and offices, villa plots, gated townships, and hospitality projects across Bharuch, Vadodara, and Mumbai.",
  },
  {
    question: "Are Bhumi Developers projects RERA registered?",
    answer:
      "Yes, all applicable Bhumi Developers projects are RERA registered and compliant with Gujarat RERA regulations, ensuring clear land titles, transparent pricing, and timely delivery.",
  },
  {
    question: "Which areas does Bhumi Developers serve?",
    answer:
      "Bhumi Developers primarily operates in Bharuch and South Gujarat, with projects also in Vadodara and Mumbai.",
  },
];

/** Builds schema.org FAQPage JSON-LD from a FAQ list. */
export const buildFaqJsonLd = (faqs: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
});
