import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us — Enquire About Properties in Bharuch",
  description:
    "Get in touch with Bhumi Developers for residential and commercial property enquiries in Bharuch. Visit our office at Millennium Arcade, College Rd, Bholav, or call +91 98791 00355.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactClient />;
}
