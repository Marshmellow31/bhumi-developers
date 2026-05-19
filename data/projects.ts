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
    image: "/images/projects/royal-heights.jpg",
    gallery: [
      "/images/projects/royal-heights-1.jpg",
      "/images/projects/royal-heights-2.jpg",
      "/images/projects/royal-heights-3.jpg",
    ],
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
    featured: true,
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
    image: "/images/projects/serene-villas.jpg",
    gallery: [
      "/images/projects/serene-villas-1.jpg",
      "/images/projects/serene-villas-2.jpg",
    ],
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
    featured: true,
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
    image: "/images/projects/grand-square.jpg",
    gallery: [
      "/images/projects/grand-square-1.jpg",
      "/images/projects/grand-square-2.jpg",
    ],
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
    featured: true,
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
    image: "/images/projects/riverside-residency.jpg",
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
    image: "/images/projects/excel-park.jpg",
    gallery: [
      "/images/projects/excel-park-1.jpg",
    ],
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
    image: "/images/projects/one-ankleshwar.jpg",
    gallery: [
      "/images/projects/one-ankleshwar-1.jpg",
      "/images/projects/one-ankleshwar-2.jpg",
    ],
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
    featured: true,
  },
];

export const getFeaturedProjects = () => projects.filter((p) => p.featured);
export const getProjectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
export const getProjectsByStatus = (status: ProjectStatus) =>
  projects.filter((p) => p.status === status);
