import { Plus } from "lucide-react";
import type { Faq } from "@/data/faqs";

interface FaqSectionProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  faqs: Faq[];
}

/**
 * Server-rendered FAQ accordion built on <details> — the full Q&A text ships
 * in the HTML (crawlable, matches the FAQPage JSON-LD) with no client JS.
 */
export default function FaqSection({ eyebrow, title, subtitle, faqs }: FaqSectionProps) {
  return (
    <section className="py-24 bg-surface border-t border-champagne/15">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14 flex flex-col items-center gap-4">
          {eyebrow && (
            <span className="text-sienna text-xs tracking-[0.4em] uppercase font-body font-semibold">
              {eyebrow}
            </span>
          )}
          <h2
            className="text-3xl md:text-4xl font-bold text-primary leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {title}
          </h2>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-champagne to-transparent" />
          {subtitle && (
            <p className="text-muted text-sm font-body max-w-xl leading-relaxed">{subtitle}</p>
          )}
        </div>

        {/* Accordion */}
        <div className="border-t border-champagne/25">
          {faqs.map((faq) => (
            <details key={faq.question} className="group border-b border-champagne/25">
              <summary className="flex items-center justify-between gap-6 py-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <h3 className="text-primary font-semibold text-sm md:text-base font-body leading-snug">
                  {faq.question}
                </h3>
                <span className="shrink-0 w-8 h-8 flex items-center justify-center border border-primary/15 text-primary transition-all duration-300 group-open:rotate-45 group-open:bg-primary group-open:text-white">
                  <Plus size={14} />
                </span>
              </summary>
              <p className="text-muted text-sm font-body leading-relaxed pb-6 pr-14 max-w-3xl">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
