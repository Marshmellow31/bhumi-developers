export type ProjectStatus = "Ongoing" | "Completed" | "Upcoming";
export type ProjectType = "Residential" | "Commercial" | "Mixed Use" | "Villa" | "Hotel" | "Township";

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
  units: number | string;
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
    tagline: "A Landmark Destination for Healthcare & Business",
    location: "Panchbatti, Bharuch",
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
    highlights: ["Health & Wellness Hub", "Clinics & Diagnostic Centres", "Vibrant Retail Plaza", "Ample Multi-level Parking", "State-of-the-art Design", "Prime Location"],
    description:
      "Located at Panchbatti, the heart of Bharuch, this project is designed to become the city's most preferred destination for healthcare and business.\n\nBringing together doctors, clinics, diagnostic centres, offices, and retail spaces under one roof, it offers unmatched convenience in one of Bharuch's most established commercial locations.\n\nBeing the only four-side-open commercial project, it enjoys accessibility and visibility, making it a truly landmark address.",
    amenities: [
      "Medical Clinics & OPDs",
      "Diagnostic & Pathology Labs",
      "Pharmacy Retail Spaces",
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
    video: "/videos/central-square-video.mp4",
    contact: {
      phones: [{ number: "+917283888893", label: "+91 72838 88893" }],
    },
  },
  {
    id: "8",
    slug: "solitaire-pallazzo",
    name: "Solitaire Pallazzo",
    tagline: "3-BHK Luxury Residence",
    location: "Tavra, Bharuch",
    city: "Tavra, Bharuch",
    status: "Ongoing",
    type: "Residential",
    units: 168,
    area: "Starting from 1011 sq.feet",
    priceRange: { min: 6000000, max: 24000000 },
    completionYear: 2027,
    image: "/images/solitaire-plaza/Tavra Corner Day-a.webp",
    gallery: [
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
      "/images/solitaire-plaza/Tavra Top 1st Cam-v01.webp",
      "/images/solitaire-plaza/Screenshot 2026-06-08 190622.png",
      "/images/solitaire-plaza/Screenshot 2026-06-08 190936.png"
    ],
    highlights: ["Exclusive Single-Apartment-Per-Floor", "Smart-Home Automation", "Private Elevators"],
    description:
      "Solitaire Palazzo is a premium G+14 residential development in the prime location of Tavra, offering spacious 3 BHK residences with beautiful views of the Narmada River. Designed for comfortable family living, the project combines well-planned homes, modern amenities, and a convenient location, creating a lifestyle that is both practical and enjoyable.",
    amenities: [
      "Gym",
      "Private Sky Deck",
      "Concierge Service",
      "Multi-tier Security System",
      "EV Charging Infrastructure",
      "Clubhouse & Indoor Theater",
      "Attractive Entrance Gate",
      "Weather Resistant Paint",
      "Attractive Building Design",
      "Drop-off Zone",
      "RCC / Paver Road",
      "Good Plantation",
      "Entry Foyer With Reception Desk",
      "Gated Community",
      "24/7 Security",
      "3 Tier Security",
      "Lightning Arrester",
      "Separate Entry & Exit Points",
      "All Area Covered with CCTV Surveillance",
      "24/7 Water Supply",
      "Caretaker Room",
      "Intercom System",
      "DG Backup For Common Area",
      "Allotted Car Parking",
      "AC Point In Living Room",
      "Wi-fi Point In Each Unit",
      "Underground Cabling",
      "Inverter Cabling Point",
      "Water Softener Plant",
      "Vaastu Friendly",
      "Sewage Treatment Plant",
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
    video: "/videos/solitaire-plaza-video.mp4",
  },
  {
    id: "9",
    slug: "city-center",
    name: "City Center",
    tagline: "The Core of Trade and Entertainment",
    location: "Station Road, Bharuch",
    city: "Bharuch",
    status: "Completed",
    type: "Commercial",
    units: 430,
    area: "6 Lakh sq ft",
    priceRange: { min: 2800000, max: 15000000 },
    completionYear: 2023,
    image: "/images/city-center/city-center-1.webp",
    brochure: "/documents/city-center-brochure.pdf",
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
      "One of Bharuch's biggest commercial destinations. Spread across 6 lakh sq ft, it has shops, offices, food courts, and parking — all under one roof.",
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
    location: "Maktampur, Bharuch",
    city: "Bharuch",
    status: "Completed",
    type: "Residential",
    units: 48,
    area: "1050–1800 sq ft",
    priceRange: { min: 3500000, max: 7200000 },
    completionYear: 2023,
    image: "/images/pritam-residency/pritam-residency-new.png",
    gallery: [
      "/images/pritam-residency/pritam-residency-new.png",
      "/images/pritam-residency/pritam-residency-2.webp"
    ],
    highlights: ["Spacious Residences", "Modern Architecture", "Prime Location", "24/7 Security"],
    description:
      "A warm, well-planned residential society in Bharuch. Spacious homes, a friendly community, and all the basic comforts you need.",
    amenities: [
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
    units: "300+",
    area: "Coming Soon",
    priceRange: { min: 3000000, max: 0 },
    completionYear: 2028,
    image: "/images/bkc2/bkc2-main.jpeg",
    gallery: [
      "/images/bkc2/bkc2-main.jpeg"
    ],
    highlights: ["17+ Lakh Sq Ft", "Major IT Hub", "Grade-A Corporate Offices", "Premium Retail Outlets", "Prime Location"],
    description: "An exciting new project coming to Mumbai. Spanning over 17 lakh square feet, it will be a landmark development with modern design and a prime location.",
    amenities: [
      "State-of-the-art Design",
      "Ample Parking",
      "24/7 Security",
      "Modern Infrastructure"
    ],
    featured: false,
  },
  {
    id: "12",
    slug: "the-resort",
    name: "The Resort",
    tagline: "Your Private Paradise",
    location: "Near Imagica, Mumbai",
    city: "Mumbai",
    status: "Upcoming",
    type: "Hotel",
    units: 0,
    area: "Coming Soon",
    priceRange: { min: 0, max: 0 },
    completionYear: 2028,
    image: "/images/resort/resort-main.jpeg",
    gallery: [
      "/images/resort/resort-main.jpeg"
    ],
    highlights: ["Private Lakefront Villas", "Natural Waterfalls", "Lush Tropical Environment", "Serene Lake Views", "Eco-friendly Architecture", "Luxury Resort Amenities"],
    description: "Located in the green landscapes of Khalapur, Mumbai, this ultra-luxury resort and wellness destination offers a perfect balance of nature and comfort. With a natural pond, a waterfall, and serene surroundings, the resort is designed to provide a peaceful and rejuvenating experience while delivering the highest standards of hospitality and luxury.",
    amenities: [
      "Clubhouse",
      "Swimming Pool",
      "Landscaped Gardens",
      "24/7 Security"
    ],
    featured: false,
  },
  {
    id: "13",
    slug: "gacl-colony",
    name: "GACL Colony",
    tagline: "108 Homes. 7.62 Acres. Since 1995.",
    location: "GACL Township Area, Bharuch",
    city: "Bharuch",
    status: "Completed",
    type: "Township",
    units: 108,
    area: "7.62 Acres",
    priceRange: { min: 0, max: 0 },
    completionYear: 1995,
    image: "/images/gacl-colony/1.webp",
    gallery: [
      "/images/gacl-colony/1.webp"
    ],
    highlights: ["108 Houses", "7.62 Acres of Land", "Full Infrastructure", "Outright Sale", "Est. 1995"],
    description: "1995 marked a significant milestone for our company with the successful completion of GACL Colony, one of the largest residential projects in Bharuch at the time, with a project value of ₹4 crore. The development set a benchmark for quality residential construction and showcased our ability to execute large-scale projects.\n\nMore than three decades later, GACL Colony continues to stand strong and remains well known for its quality construction, reflecting our commitment to building communities that last for generations.",
    amenities: [
      "Full Road Infrastructure",
      "Water & Drainage Lines",
      "Street Lighting",
      "Boundary Compound",
      "Open Green Spaces",
      "Outright Sale — Clear Title",
    ],
    featured: false,
  },
  {
    id: "14",
    slug: "eminence",
    name: "Eminence",
    tagline: "Elevated Living in the Heart of Vadodara",
    location: "Vadodara",
    city: "Vadodara",
    status: "Upcoming",
    type: "Residential",
    units: 0,
    area: "Coming Soon",
    priceRange: { min: 0, max: 0 },
    completionYear: 2027,
    image: "/images/eminence/Eminence Bliss_1 - Photo.jpg.jpeg",
    gallery: [
      "/images/eminence/Eminence Bliss_1 - Photo.jpg.jpeg",
      "/images/eminence/Eminence Bliss_2 - Photo.jpg.jpeg",
      "/images/eminence/Eminence Bliss_3 - Photo.jpg.jpeg",
      "/images/eminence/Eminence Bliss_4 - Photo.jpg.jpeg",
      "/images/eminence/Eminence Bliss_5 - Photo.jpg.jpeg",
      "/images/eminence/Eminence Bliss_6 - Photo.jpg.jpeg",
      "/images/eminence/Eminence Bliss_7 - Photo.jpg.jpeg",
      "/images/eminence/Eminence Bliss_8 - Photo.jpg.jpeg",
      "/images/eminence/Eminence Bliss_9 - Photo.jpg.jpeg",
      "/images/eminence/Eminence Bliss_10 - Photo.jpg.jpeg",
      "/images/eminence/Eminence Bliss_11 - Photo.jpg.jpeg"
    ],
    highlights: ["Premium Residences", "Vadodara Location", "Modern Architecture", "Upcoming Project"],
    description: "A premium residential building coming to Vadodara. Thoughtfully designed for modern living — more details will be shared soon.",
    amenities: [
      "Modern Architecture",
      "Ample Parking",
      "24/7 Security",
      "Landscaped Areas",
    ],
    featured: false,
  },
  {
    id: "15",
    slug: "fern-series",
    name: "The Fern Series by Marriott",
    tagline: "Premium Hospitality and Comfort",
    location: "Bharuch",
    city: "Bharuch",
    status: "Upcoming",
    type: "Hotel",
    units: 0,
    area: "Coming Soon",
    priceRange: { min: 0, max: 0 },
    completionYear: 2028,
    image: "/images/fern-series/WhatsApp Image 2026-06-11 at 4.20.56 PM.jpeg",
    gallery: [
      "/images/fern-series/WhatsApp Image 2026-06-11 at 4.20.56 PM.jpeg"
    ],
    highlights: ["Premium Hospitality", "World-class Amenities", "Strategic Location"],
    description: "An upcoming luxury hotel project bringing the renowned Fern Series by Marriott to Bharuch. Promising world-class hospitality, premium accommodations, and state-of-the-art facilities.",
    amenities: [
      "Luxury Rooms & Suites",
      "Fine Dining Restaurants",
      "Banquet & Conference Halls",
      "Swimming Pool & Spa",
      "24/7 Concierge Service"
    ],
    featured: false,
  },
];

// Featured projects for the homepage — primary slugs shown first, capped at 6.
export const getFeaturedProjects = () => {
  const primarySlugs = ["central-square", "solitaire-pallazzo", "city-center", "fern-series", "the-resort", "bkc2"];
  return projects.filter((p) => primarySlugs.includes(p.slug))
    .sort((a, b) => primarySlugs.indexOf(a.slug) - primarySlugs.indexOf(b.slug))
    .slice(0, 6);
};

export const getProjectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
export const getProjectsByStatus = (status: ProjectStatus) =>
  projects.filter((p) => p.status === status);
