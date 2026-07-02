import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { SITE_URL, SITE_NAME } from "@/lib/site";
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Bhumi Developers | Trusted Builders & Real Estate in Bharuch",
    template: "%s | Bhumi Developers",
  },
  description:
    "Bhumi Developers — Bharuch's most trusted builders since 1995. Explore premium residential flats, commercial shops & offices, villas, and townships across Bharuch and South Gujarat.",
  keywords: [
    "Bhumi Developers",
    "real estate Bharuch",
    "builders in Bharuch",
    "real estate developers in Bharuch",
    "property developers Bharuch",
    "flats in Bharuch",
    "3 BHK flats Bharuch",
    "2 BHK flats Bharuch",
    "apartments in Bharuch",
    "new projects in Bharuch",
    "flats in Tavra Bharuch",
    "shops for sale in Bharuch",
    "shops for rent in Bharuch",
    "commercial property Bharuch",
    "offices in Bharuch",
    "villas in Bharuch",
    "plots in Bharuch",
    "township in Bharuch",
    "property in Bharuch",
    "property investment Bharuch",
    "real estate Gujarat",
    "real estate Ankleshwar",
    "RERA approved projects Bharuch",
    "Central Square Bharuch",
    "Solitaire Pallazzo Bharuch",
    "City Center Bharuch",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Real Estate",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
    verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
  }),
  other: {
    "geo.region": "IN-GJ",
    "geo.placename": "Bharuch",
    "geo.position": "21.710968;72.997883",
    ICBM: "21.710968, 72.997883",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_IN",
    url: SITE_URL,
    title: "Bhumi Developers | Premium Real Estate in Bharuch, Gujarat",
    description:
      "Bharuch's most trusted real estate developer since 1995. Premium residential flats, commercial shops & offices, villas, and townships across South Gujarat.",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Bhumi Developers logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bhumi Developers | Premium Real Estate in Bharuch, Gujarat",
    description:
      "Bharuch's most trusted real estate developer since 1995. Premium residential, commercial, and township projects across South Gujarat.",
    images: ["/logo.png"],
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description:
    "Bhumi Developers — Bharuch's most trusted real estate developer since 1995. Premium residential, commercial, and township projects across South Gujarat.",
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-IN",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness", "RealEstateAgent"],
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/logo.png`,
  description:
    "Bhumi Developers is Bharuch's most trusted real estate developer since 1995, building premium residential, commercial, hospitality, and township projects across South Gujarat.",
  foundingDate: "1995",
  email: "contact@bhumidevelopers.co.in",
  telephone: "+919879100355",
  priceRange: "₹28 L – ₹2.4 Cr",
  hasMap: "https://maps.google.com/?q=21.710968,72.997883",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+919879100355",
    contactType: "sales",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi", "Gujarati"],
  },
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "1st Floor, Millennium Arcade, College Rd, opp. SVMIT Eng. College, Friends Colony, Bholav",
    addressLocality: "Bharuch",
    addressRegion: "Gujarat",
    postalCode: "392001",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 21.710968,
    longitude: 72.997883,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "10:00",
      closes: "19:00",
    },
  ],
  sameAs: ["https://www.instagram.com/bd_buildcon/"],
  areaServed: ["Bharuch", "South Gujarat", "Vadodara", "Mumbai"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-background text-charcoal antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([websiteJsonLd, organizationJsonLd]).replace(/</g, "\\u003c"),
          }}
        />
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
