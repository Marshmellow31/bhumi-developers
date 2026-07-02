import type { NextConfig } from "next";

/**
 * Old /public document URLs → Google Drive. Documents are served from Drive
 * now (see lib/documents.ts); these redirects keep previously shared or
 * search-indexed PDF links working.
 */
const DRIVE_DOCUMENT_REDIRECTS: Record<string, string> = {
  "central-square-brochure.pdf": "1KQQRRrItZKLS7ii29C1MgwMv5KNz7qeK",
  "city-center-brochure.pdf": "1xKKx4PbhiDYMG6JceUSpbv9-In26SNci",
  "eminence-floor-plans.pdf": "1TlYi5zW_zaiQeAmnSwRta8Vc9a2-gkIl",
  "solitaire-pallazzo-107-108-ground-floor.pdf": "1CaN5LKr-2LhxGz_td_spt0KqAY1Jk5Ng",
  "solitaire-pallazzo-1st-floor-plan.pdf": "15Ud1unvoXBBoKBf5QmhpOJEZP24R9QEu",
  "solitaire-pallazzo-2nd-floor-plan.pdf": "1p_VNzt5VF02s7lpvYpD55bSlMTP7Bd91",
  "solitaire-pallazzo-brochure-parking.pdf": "1_aSlPoux-ht620NBC7wLDTaMNOZi4zW2",
  "solitaire-pallazzo-brochure.pdf": "1I5U2tBA4nTIkjfR7Q3RW1zC2IxP__O3e",
  "solitaire-pallazzo-ground-floor-parking.pdf": "1CBu2Bfey1eJSeqGnUAm_5800kn32ENZA",
  "solitaire-pallazzo-typical-floor-plan.pdf": "1H-g3t-tYrg4hydk2Mf1uF3R98XoH6JiY",
};

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  compress: true,
  allowedDevOrigins: ["192.168.0.70:3000", "192.168.0.70"],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return Object.entries(DRIVE_DOCUMENT_REDIRECTS).map(([file, driveId]) => ({
      source: `/documents/${file}`,
      destination: `https://drive.google.com/file/d/${driveId}/view`,
      permanent: true,
    }));
  },
};

export default nextConfig;
