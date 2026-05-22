import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import PageLoader from "@/components/ui/PageLoader";
import ScrollProgress from "@/components/ui/ScrollProgress";
import ContactPopup from "@/components/ui/ContactPopup";
import LenisProvider from "@/components/ui/LenisProvider";
import PageTransition from "@/components/ui/PageTransition";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Bhumi Developers | Premium Real Estate in Bharuch, Gujarat",
    template: "%s | Bhumi Developers",
  },
  description:
    "Bhumi Developers — Bharuch's most trusted real estate developer. Explore premium residential and commercial projects crafted with excellence.",
  keywords: ["real estate", "Bharuch", "Gujarat", "apartments", "villas", "Bhumi Developers"],
  openGraph: {
    type: "website",
    siteName: "Bhumi Developers",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-background text-charcoal antialiased">
        <LenisProvider>
          {/* Gold scroll-progress bar */}
          <ScrollProgress />

          {/* Lead Generation Popup */}
          <ContactPopup />

          {/* First-load cinematic loader */}
          <PageLoader />

          {/* Magnetic dual-ring cursor (desktop only) */}
          <CustomCursor />

          <Navbar />
          <PageTransition>{children}</PageTransition>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
