import type { Metadata } from "next";
import GaclColonyClient from "./GaclColonyClient";

export const metadata: Metadata = {
  title: "GACL Colony — Gated Township in Bharuch",
  description:
    "GACL Colony by Bhumi Developers — a 50-acre gated township in Bharuch with 200+ residential plots, landscaped green belts, clubhouse, and 24/7 security.",
  alternates: { canonical: "/gacl-colony" },
};

export default function GaclColonyPage() {
  return <GaclColonyClient />;
}
