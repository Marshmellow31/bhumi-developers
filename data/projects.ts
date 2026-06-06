export type ProjectStatus = "Ongoing" | "Completed" | "Upcoming";
export type ProjectType = "Residential" | "Commercial" | "Mixed Use" | "Villa";

export interface FloorPlan {
  name: string;
  file: string;
  size?: string;
}

export interface ProjectContact {
  phones: { number: string; label?: string }[];
  email?: string;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  location: string;
  city: string;
  status: ProjectStatus;
  type: ProjectType;
  units: number;
  area: string;
  priceRange: {
    min: number;
    max: number;
  };
  completionYear: number;
  image: string;
  gallery: string[];
  highlights: string[];
  description: string;
  amenities: string[];
  featured: boolean;
  brochure?: string;
  floorPlans?: FloorPlan[];
  contact?: ProjectContact;
  video?: string;
}

export const projects: Project[] = [
  {
    id: "7",
    slug: "central-square",
    name: "Central Square",
    tagline: "Bharuch's Premier Business Plaza",
    location: "Link Road, Bharuch",
    city: "Bharuch",
    status: "Ongoing",
    type: "Commercial",
    units: 110,
    area: "450–3500 sq ft",
    priceRange: { min: 3200000, max: 18000000 },
    completionYear: 2026,
    image: "/images/central-square/Pacnhbatti 505 High 2nd_Cam01-a.webp",
    gallery: [
      "/images/central-square/Pacnhbatti 505 Front_Cam01-a.webp",
      "/images/central-square/Pacnhbatti 505 Gallary Closeup_Cam01-a.webp",
      "/images/central-square/Pacnhbatti 505 Gate_Cam01-a.webp",
      "/images/central-square/Pacnhbatti 505 High 2nd_Cam01-a.webp",
      "/images/central-square/Pacnhbatti 505 Left Corner_Cam01-a.webp",
      "/images/central-square/Pacnhbatti 505 Right_Cam.webp",
      "/images/central-square/Pacnhbatti 505 Shops Closeup_Cam01-a.webp"
    ],
    highlights: ["State-of-the-art Design", "Vibrant Retail Plaza", "Ample Multi-level Parking", "Prime Location"],
    description:
      "Bhumi Central Square redefines commercial excellence in Bharuch. Located in the highly active business hub, it integrates premium corporate offices and luxurious retail spaces with world-class facilities and unmatched architectural grandeur.",
    amenities: [
      "24/7 Security & CCTV",
      "High-speed Elevators",
      "Executive Conference Room",
      "Centralized AC",
      "Double-height Entrance Lobby",
      "Food Court & Cafes",
      "Power Backup",
    ],
    featured: true,
    brochure: "/documents/central-square-brochure.pdf",
    contact: {
      phones: [{ number: "+917283888893", label: "+91 72838 88893" }],
    },
  },
  {
    id: "8",
    slug: "solitaire-pallazzo",
    name: "Solitaire Pallazzo",
    tagline: "Ultra-Luxury Palatial Residencies",
    location: "Zadeshwar Road, Bharuch",
    city: "Bharuch",
    status: "Upcoming",
    type: "Residential",
    units: 48,
    area: "2400–4500 sq ft",
    priceRange: { min: 8500000, max: 24000000 },
    completionYear: 2027,
    image: "/images/solitaire-plaza/47.webp",
    gallery: [
      "/images/solitaire-plaza/47.webp",
      "/images/solitaire-plaza/53.webp",
      "/images/solitaire-plaza/54.webp",
      "/images/solitaire-plaza/55.webp",
      "/images/solitaire-plaza/72.webp",
      "/images/solitaire-plaza/Tavra Corner Day-a.webp",
      "/images/solitaire-plaza/Tavra Foyer Entry_Cam-a.webp",
      "/images/solitaire-plaza/Tavra Gate Night Cam-a.webp",
      "/images/solitaire-plaza/Tavra Gazibo Sitting Cam-v01.webp",
      "/images/solitaire-plaza/Tavra Multy Court Area-v01.webp",
      "/images/solitaire-plaza/Tavra Path Entry Cam-v01.webp",
      "/images/solitaire-plaza/Tavra Play Area-v01.webp",
      "/images/solitaire-plaza/Tavra Rain Darnce Area-v01.webp",
      "/images/solitaire-plaza/Tavra Shop Closeup Night_Cam-v01.webp",
      "/images/solitaire-plaza/Tavra Tarrace Box Cricket Night-v01.webp",
      "/images/solitaire-plaza/Tavra Tarrace Cafe-v01.webp",
      "/images/solitaire-plaza/Tavra Tarrace Pickel Ball Area-v01.webp",
      "/images/solitaire-plaza/Tavra Tarrace Sitting Cam-a.webp",
      "/images/solitaire-plaza/Tavra Top 1st Cam-v01.webp"
    ],
    highlights: ["Exclusive Single-Apartment-Per-Floor", "Infinity Terrace Pool", "Smart-Home Automation", "Private Elevators"],
    description:
      "Drawing inspiration from the finest architectural designs, Solitaire Pallazzo is the crown jewel of luxury living in Bharuch. An exclusive collection of ultra-luxurious, expansive spaces, private sky lawns, and high-end finishes built for the elite few.",
    amenities: [
      "Infinity Swimming Pool",
      "World-class Gym & Spa",
      "Private Sky Deck",
      "Concierge Service",
      "Multi-tier Security System",
      "EV Charging Infrastructure",
      "Clubhouse & Indoor Theater",
    ],
    featured: true,
    brochure: "/documents/solitaire-pallazzo-brochure.pdf",
    contact: {
      phones: [
        { number: "+919998016244", label: "+91 99980 16244" },
        { number: "+918511343554", label: "+91 85113 43554" },
      ],
      email: "sp.info.tavra@gmail.com",
    },
    floorPlans: [
      { name: "Brochure (Parking Layout & Details)", file: "/documents/solitaire-pallazzo-brochure-parking.pdf", size: "1.3 MB" },
      { name: "Ground Floor Parking Layout Plan", file: "/documents/solitaire-pallazzo-ground-floor-parking.pdf", size: "1.7 MB" },
      { name: "Ground Floor Shops Layout (107-108)", file: "/documents/solitaire-pallazzo-107-108-ground-floor.pdf", size: "2.1 MB" },
      { name: "1st Floor Premium Plan", file: "/documents/solitaire-pallazzo-1st-floor-plan.pdf", size: "4.2 MB" },
      { name: "2nd Floor Premium Plan", file: "/documents/solitaire-pallazzo-2nd-floor-plan.pdf", size: "7.0 MB" },
      { name: "Typical Floor Layout Plan", file: "/documents/solitaire-pallazzo-typical-floor-plan.pdf", size: "5.9 MB" }
    ],
  },
  {
    id: "9",
    slug: "city-center",
    name: "City Center",
    tagline: "The Core of Trade and Entertainment",
    location: "College Road, Bharuch",
    city: "Bharuch",
    status: "Completed",
    type: "Commercial",
    units: 95,
    area: "500–5000 sq ft",
    priceRange: { min: 2800000, max: 15000000 },
    completionYear: 2024,
    image: "/images/city-center/city-center-1.webp",
    gallery: [
      "/images/city-center/03.webp",
      "/images/city-center/04.webp",
      "/images/city-center/05.webp",
      "/images/city-center/06.webp",
      "/images/city-center/07.webp",
      "/images/city-center/08.webp",
      "/images/city-center/09.webp",
      "/images/city-center/10.webp",
      "/images/city-center/14.webp",
      "/images/city-center/15.webp",
      "/images/city-center/16.webp",
      "/images/city-center/17.webp",
      "/images/city-center/19.webp",
      "/images/city-center/20.webp",
      "/images/city-center/city-center-night-168.webp",
      "/images/city-center/city-center-night-169.webp",
      "/images/city-center/city-center-night-170.webp",
      "/images/city-center/city-center-night-171.webp",
      "/images/city-center/city-center-night-172.webp",
      "/images/city-center/city-center-1.webp",
      "/images/city-center/city-center-2.webp",
      "/images/city-center/city-center-3.webp",
      "/images/city-center/city-center-4.webp"
    ],
    highlights: ["High-street Retail Stores", "Premium Multiplex & Dining", "Grade-A Office Spaces", "Centrally Located"],
    description:
      "Bhumi City Center is a landmark commercial and retail destination. Positioned at high-footfall location, it boasts modern, flexible retail layouts and Grade-A office facilities, making it the perfect hub for both national brands and scaling enterprises.",
    amenities: [
      "Escalators & Lift Services",
      "Central Air Conditioning",
      "Dedicated Loading Bays",
      "Multi-cuisine Food Court",
      "Extensive Visitor Parking",
      "100% Power Backup",
      "Professional Property Management",
    ],
    featured: true,
    video: "/videos/city-center/use.mp4",
  },
  {
    id: "10",
    slug: "pritam-residency",
    name: "Pritam Residency",
    tagline: "Refined Living in the Heart of Bharuch",
    location: "Bharuch",
    city: "Bharuch",
    status: "Completed",
    type: "Residential",
    units: 48,
    area: "1050–1800 sq ft",
    priceRange: { min: 3500000, max: 7200000 },
    completionYear: 2023,
    image: "/images/pritam-residency/pritam-residency.webp",
    gallery: [
      "/images/pritam-residency/pritam-residency.webp",
      "/images/pritam-residency/pritam-residency-2.webp"
    ],
    highlights: ["Spacious Residences", "Modern Architecture", "Prime Location", "24/7 Security"],
    description:
      "Pritam Residency is a thoughtfully designed residential community in the heart of Bharuch, offering spacious, well-appointed homes for modern families. Every detail has been crafted to provide a comfortable, secure, and community-oriented living experience.",
    amenities: [
      "Swimming Pool",
      "Gymnasium",
      "Children's Play Area",
      "Landscaped Gardens",
      "Covered Parking",
      "Power Backup",
      "24/7 Security",
      "Community Hall",
    ],
    featured: true,
  },
  {
    id: "11",
    slug: "bkc2",
    name: "BKC 2",
    tagline: "Upcoming Landmark Building",
    location: "Mumbai",
    city: "Mumbai",
    status: "Upcoming",
    type: "Commercial",
    units: 0,
    area: "Coming Soon",
    priceRange: { min: 0, max: 0 },
    completionYear: 2028,
    image: "/images/bkc2/bkc2-main.jpeg",
    gallery: [
      "/images/bkc2/bkc2-main.jpeg"
    ],
    highlights: ["Modern Architecture", "Prime Location", "Upcoming Project"],
    description: "BKC 2 is an exciting upcoming project set to become a new landmark. Designed with modern architecture and premium facilities, more details will be announced soon.",
    amenities: [
      "State-of-the-art Design",
      "Ample Parking",
      "24/7 Security",
      "Modern Infrastructure"
    ],
    featured: false,
  },
];

// Featured projects for the homepage — primary slugs shown first, capped at 5.
export const getFeaturedProjects = () => {
  const primarySlugs = ["central-square", "solitaire-pallazzo", "city-center", "pritam-residency", "bkc2"];
  return projects.filter((p) => primarySlugs.includes(p.slug))
    .sort((a, b) => primarySlugs.indexOf(a.slug) - primarySlugs.indexOf(b.slug))
    .slice(0, 5);
};

export const getProjectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
export const getProjectsByStatus = (status: ProjectStatus) =>
  projects.filter((p) => p.status === status);
