import { projects } from "@/data/projects";
import { homeFaqs, contactFaqs } from "@/data/faqs";
import { SITE_URL } from "@/lib/site";

/* /llms.txt — the emerging standard (llmstxt.org) AI assistants and answer
   engines read to understand a site. Generated from the same data files as
   the pages, so it can never drift from the visible content. */

export const dynamic = "force-static";

function formatPrice(value: number): string {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(value % 10000000 === 0 ? 0 : 1)} Cr`;
  return `₹${Math.round(value / 100000)} L`;
}

function projectLine(p: (typeof projects)[number]): string {
  const price = `${formatPrice(p.priceRange.min)}–${formatPrice(p.priceRange.max)}`;
  return [
    `### ${p.name} (${p.status})`,
    `- Type: ${p.type} | Location: ${p.location} | Units: ${p.units} | Sizes: ${p.area}`,
    `- Price range: ${price} | Completion: ${p.completionYear}`,
    `- ${p.seo?.description ?? p.tagline}`,
    `- Details: ${SITE_URL}/projects/${p.slug}`,
  ].join("\n");
}

export function GET() {
  const body = `# Bhumi Developers

> Bhumi Developers is Bharuch's most trusted real estate developer and builder, operating since 1995 — 35+ years, 50+ delivered projects, and 72+ lakh sq ft built across Bharuch, South Gujarat, Vadodara, and Mumbai. The company develops premium residential flats (3 BHK), commercial shops and offices, villas, townships, and hotels. All applicable projects are RERA compliant.

Key facts:
- Founded: 1995 (Bharuch, Gujarat, India)
- Office: 1st Floor, Millennium Arcade, College Rd, opp. SVMIT Eng. College, Friends Colony, Bholav, Bharuch, Gujarat 392001
- Phone: +91 85115 66682 | Email: contact@bhumidevelopers.co.in
- Hours: Monday–Saturday, 10:00–19:00 IST
- Languages: English, Hindi, Gujarati
- Website: ${SITE_URL}

## Projects

${projects.map(projectLine).join("\n\n")}

## Frequently Asked Questions

${[...homeFaqs, ...contactFaqs].map((f) => `### ${f.question}\n${f.answer}`).join("\n\n")}

## Pages

- [Home](${SITE_URL}/): Overview of Bhumi Developers
- [Projects](${SITE_URL}/projects): All residential and commercial projects
- [About](${SITE_URL}/about): Company history, milestones, and leadership
- [Hotels](${SITE_URL}/hotels): Hospitality projects including the Fern Series by Marriott
- [Contact](${SITE_URL}/contact): Enquiries, office location, and phone numbers
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
