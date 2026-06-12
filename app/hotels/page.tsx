import type { Metadata } from "next";
import HotelsClient from "./HotelsClient";

export const metadata: Metadata = {
  title: "Resorts & Hotels",
  description:
    "Discover hospitality projects by Bhumi Developers — premium resorts and hotels including The Fern Series in Bharuch and The Resort near Imagica, Mumbai.",
  alternates: { canonical: "/hotels" },
};

export default function HotelsPage() {
  return <HotelsClient />;
}
