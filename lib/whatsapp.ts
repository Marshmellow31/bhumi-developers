import { projects } from "../data/projects";

/**
 * Official Bhumi Developers Sales WhatsApp number.
 * International format without symbols for WhatsApp universal links.
 */
export const WHATSAPP_PHONE_NUMBER = "919998016244";
export const WHATSAPP_DISPLAY_NUMBER = "+91 99980 16244";

/**
 * Default pre-filled message for general website pages.
 */
export const GENERAL_WHATSAPP_MESSAGE =
  "Hi, I’m interested in exploring a property with Bhumi Developers. Please share more details.";

/**
 * Explicit project-specific pre-filled enquiry messages.
 * Matches official specifications from project requirements.
 */
export const PROJECT_WHATSAPP_MESSAGES: Record<string, string> = {
  "central-square": "Hi, I’m interested in Central Square. Please share more details.",
  "solitaire-pallazzo": "Hi, I’m interested in Solitaire Palazzo. Please share more details.",
  "city-center": "Hi, I’m interested in City Center. Please share more details.",
  "fern-series": "Hi, I’m interested in The Fern Series by Marriott. Please share more details.",
  "pritam-residency": "Hi, I’m interested in Pritam Residency. Please share more details.",
  "bkc2": "Hi, I’m interested in BKC 2. Please share more details.",
  "the-resort": "Hi, I’m interested in The Resort. Please share more details.",
  "gacl-colony": "Hi, I’m interested in GACL Colony. Please share more details.",
  "eminence": "Hi, I’m interested in Eminence. Please share more details.",
};

/**
 * Resolves the appropriate pre-filled WhatsApp message based on the current page route.
 *
 * Rules:
 * 1. Individual project pages (/projects/[slug]) -> Project-specific enquiry message.
 * 2. Dedicated project routes (e.g. /gacl-colony) -> Project-specific enquiry message.
 * 3. General pages (/projects listing, /, /about, /contact, /downloads, /hotels, etc.) -> General enquiry message.
 */
export function getWhatsAppMessage(pathname?: string | null): string {
  if (!pathname) return GENERAL_WHATSAPP_MESSAGE;

  // Clean trailing slashes
  const cleanPath = pathname.replace(/\/+$/, "") || "/";

  // Dedicated project route for GACL Colony
  if (cleanPath === "/gacl-colony") {
    return PROJECT_WHATSAPP_MESSAGES["gacl-colony"];
  }

  // Match /projects/[slug] - ensure it is an individual project page, not the /projects listing page
  const projectMatch = cleanPath.match(/^\/projects\/([^/]+)$/);
  if (projectMatch) {
    const slug = projectMatch[1];

    // Check exact mapped messages
    if (PROJECT_WHATSAPP_MESSAGES[slug]) {
      return PROJECT_WHATSAPP_MESSAGES[slug];
    }

    // Dynamic fallback for any additional project found in projects data
    const matchedProject = projects.find((p) => p.slug === slug);
    if (matchedProject) {
      return `Hi, I’m interested in ${matchedProject.name}. Please share more details.`;
    }
  }

  // Default to general enquiry message for all other pages
  return GENERAL_WHATSAPP_MESSAGE;
}

/**
 * Builds the official WhatsApp Universal URL with pre-filled message text.
 * Universal links (https://wa.me/...) automatically open the WhatsApp application on mobile/tablet
 * and WhatsApp Web / Desktop on desktop devices.
 */
export function getWhatsAppUrl(pathname?: string | null): string {
  const message = getWhatsAppMessage(pathname);
  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}
