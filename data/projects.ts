export type ProjectStatus = "Ongoing" | "Completed" | "Upcoming";
export type ProjectType = "Residential" | "Commercial" | "Mixed Use" | "Villa";

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
}

export const projects: Project[] = [
  {
    id: "1",
    slug: "bhumi-royal-heights",
    name: "Bhumi Royal Heights",
    tagline: "Where Luxury Meets Legacy",
    location: "Station Road, Bharuch",
    city: "Bharuch",
    status: "Ongoing",
    type: "Residential",
    units: 120,
    area: "1200–2400 sq ft",
    priceRange: { min: 4500000, max: 9500000 },
    completionYear: 2026,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    gallery: [],
    highlights: ["Rooftop Sky Lounge", "Smart Home Automation", "EV Charging", "24/7 Security"],
    description:
      "Bhumi Royal Heights is an iconic residential tower in the heart of Bharuch, offering meticulously designed apartments with panoramic views of the Narmada river. Every detail is crafted to deliver an unparalleled living experience.",
    amenities: [
      "Swimming Pool",
      "Gymnasium",
      "Clubhouse",
      "Children's Play Area",
      "Landscaped Gardens",
      "Indoor Games Room",
      "Power Backup",
      "Covered Parking",
    ],
    featured: false,
  },
  {
    id: "2",
    slug: "bhumi-serene-villas",
    name: "Bhumi Serene Villas",
    tagline: "Private Retreats, Timeless Design",
    location: "Narmada Nagar, Bharuch",
    city: "Bharuch",
    status: "Ongoing",
    type: "Villa",
    units: 36,
    area: "2800–4500 sq ft",
    priceRange: { min: 12000000, max: 22000000 },
    completionYear: 2026,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    gallery: [],
    highlights: ["Private Pool", "Home Theatre", "Modular Kitchen", "Double-height Living Room"],
    description:
      "An exclusive enclave of 36 premium villas nestled in the tranquil outskirts of Bharuch. Bhumi Serene Villas redefines luxury living with sprawling private spaces, lush landscaping, and world-class amenities.",
    amenities: [
      "Private Swimming Pool",
      "Home Automation",
      "Solar Panels",
      "Private Garden",
      "3-Car Garage",
      "Servant Quarters",
      "24/7 Gated Security",
    ],
    featured: false,
  },
  {
    id: "3",
    slug: "bhumi-grand-square",
    name: "Bhumi Grand Square",
    tagline: "Business Hub of Bharuch",
    location: "Golden Chowk, Bharuch",
    city: "Bharuch",
    status: "Completed",
    type: "Commercial",
    units: 80,
    area: "500–5000 sq ft",
    priceRange: { min: 3000000, max: 25000000 },
    completionYear: 2023,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    gallery: [],
    highlights: ["Prime Location", "High-Speed Elevators", "Ample Parking", "24/7 Operations"],
    description:
      "Bharuch's premier commercial destination, Bhumi Grand Square offers state-of-the-art office spaces and retail units in the city's most sought-after business corridor.",
    amenities: [
      "Conference Rooms",
      "Food Court",
      "ATM",
      "Ample Parking",
      "High-Speed Internet",
      "Power Backup",
      "CCTV Surveillance",
    ],
    featured: false,
  },
  {
    id: "4",
    slug: "bhumi-riverside-residency",
    name: "Bhumi Riverside Residency",
    tagline: "Life on the Banks of Narmada",
    location: "Narmada Ghats, Bharuch",
    city: "Bharuch",
    status: "Upcoming",
    type: "Residential",
    units: 200,
    area: "900–1800 sq ft",
    priceRange: { min: 3800000, max: 7500000 },
    completionYear: 2027,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    gallery: [],
    highlights: ["River-Facing Apartments", "Yoga Deck", "Jogging Track", "Amphitheatre"],
    description:
      "An upcoming landmark project offering breathtaking river views with a curated lifestyle experience. Bhumi Riverside Residency promises a serene, green, and connected community.",
    amenities: [
      "River-View Balconies",
      "Swimming Pool",
      "Gymnasium",
      "Meditation Garden",
      "Children's Park",
      "Supermarket",
      "Power Backup",
    ],
    featured: false,
  },
  {
    id: "5",
    slug: "bhumi-excel-park",
    name: "Bhumi Excel Park",
    tagline: "Affordable. Aspirational. Exceptional.",
    location: "Amod Road, Bharuch",
    city: "Bharuch",
    status: "Completed",
    type: "Residential",
    units: 300,
    area: "650–1100 sq ft",
    priceRange: { min: 2200000, max: 4000000 },
    completionYear: 2021,
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
    gallery: [],
    highlights: ["Gated Community", "Temple", "Community Hall", "CCTV Security"],
    description:
      "Bhumi Excel Park is a thriving residential community that offers quality homes at accessible price points, without compromising on the essentials of modern living.",
    amenities: [
      "Community Hall",
      "Garden",
      "Children's Park",
      "Parking",
      "Power Backup",
      "Water Tank",
      "Watchman",
    ],
    featured: false,
  },
  {
    id: "6",
    slug: "bhumi-one-ankleshwar",
    name: "Bhumi One Ankleshwar",
    tagline: "The New Address of Prestige",
    location: "GIDC Road, Ankleshwar",
    city: "Ankleshwar",
    status: "Ongoing",
    type: "Mixed Use",
    units: 160,
    area: "800–3000 sq ft",
    priceRange: { min: 3500000, max: 14000000 },
    completionYear: 2025,
    image: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=800&q=80",
    gallery: [],
    highlights: ["Mixed-Use Tower", "Retail on Ground", "Corporate Offices", "Premium Homes"],
    description:
      "Bhumi One Ankleshwar is a landmark mixed-use development combining premium residences, modern offices, and vibrant retail — designed for the evolving needs of industrial Ankleshwar.",
    amenities: [
      "Rooftop Terrace",
      "Co-Working Spaces",
      "Café",
      "Retail Outlets",
      "Gymnasium",
      "Visitor Parking",
      "24/7 Security",
    ],
    featured: false,
  },
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
    image: "/images/central-square/Pacnhbatti 505 Front_Cam01-a.jpg",
    gallery: [
      "/images/central-square/Pacnhbatti 505 Front_Cam01-a.jpg",
      "/images/central-square/Pacnhbatti 505 Gallary Closeup_Cam01-a.jpg",
      "/images/central-square/Pacnhbatti 505 Gate_Cam01-a.jpg",
      "/images/central-square/Pacnhbatti 505 High 2nd_Cam01-a.jpg",
      "/images/central-square/Pacnhbatti 505 Left Corner_Cam01-a..jpg",
      "/images/central-square/Pacnhbatti 505 Right_Cam.jpg",
      "/images/central-square/Pacnhbatti 505 Shops Closeup_Cam01-a.jpg"
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
    image: "/images/solitaire-plaza/Tavra Corner Day-a .jpg",
    gallery: [
      "/images/solitaire-plaza/Tavra Corner Day-a .jpg",
      "/images/solitaire-plaza/Tavra Foyer Entry_Cam-a.jpg",
      "/images/solitaire-plaza/Tavra Gate Night Cam-a.jpg",
      "/images/solitaire-plaza/Tavra Gazibo Sitting Cam-v01.jpg",
      "/images/solitaire-plaza/Tavra Multy Court Area-v01.jpg",
      "/images/solitaire-plaza/Tavra Path Entry Cam-v01.jpg",
      "/images/solitaire-plaza/Tavra Play Area-v01.jpg",
      "/images/solitaire-plaza/Tavra Rain Darnce Area-v01.jpg",
      "/images/solitaire-plaza/Tavra Shop Closeup Night_Cam-v01.jpg",
      "/images/solitaire-plaza/Tavra Tarrace Box Cricket Night-v01.jpg",
      "/images/solitaire-plaza/Tavra Tarrace Cafe-v01.jpg",
      "/images/solitaire-plaza/Tavra Tarrace Pickel Ball Area-v01.jpg",
      "/images/solitaire-plaza/Tavra Tarrace Sitting Cam-a.jpg",
      "/images/solitaire-plaza/Tavra Top 1st Cam-v01.jpg"
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
  },
  {
    id: "9",
    slug: "city-centre",
    name: "City Centre",
    tagline: "The Core of Trade and Entertainment",
    location: "College Road, Bharuch",
    city: "Bharuch",
    status: "Completed",
    type: "Commercial",
    units: 95,
    area: "500–5000 sq ft",
    priceRange: { min: 2800000, max: 15000000 },
    completionYear: 2024,
    image: "/images/city-centre.jpg",
    gallery: ["/images/city-centre.jpg"],
    highlights: ["High-street Retail Stores", "Premium Multiplex & Dining", "Grade-A Office Spaces", "Centrally Located"],
    description:
      "Bhumi City Centre is a landmark commercial and retail destination. Positioned at a high-footfall location, it boasts modern, flexible retail layouts and Grade-A office facilities, making it the perfect hub for both national brands and scaling enterprises.",
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
  },
];

// Returns the 4 featured projects for the homepage.
// As requested, this includes Central Square, Solitaire Pallazzo, City Centre,
// and a 4th "random" project from the remaining portfolio (e.g. Bhumi Royal Heights).
export const getFeaturedProjects = () => {
  const primarySlugs = ["central-square", "solitaire-pallazzo", "city-centre"];
  const primary = projects.filter((p) => primarySlugs.includes(p.slug));
  const others = projects.filter((p) => !primarySlugs.includes(p.slug));

  // Statically pick the 4th project so it remains stable during Next.js SSR and client-side hydration.
  // We can pick Bhumi Royal Heights as the "random" selection.
  const random4th = others[0]; // "Bhumi Royal Heights"

  return [...primary, random4th].slice(0, 4);
};

export const getProjectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
export const getProjectsByStatus = (status: ProjectStatus) =>
  projects.filter((p) => p.status === status);
