import { projects } from "../data/projects";
import { WHATSAPP_PHONE_NUMBER } from "./whatsapp";

export interface WhatsAppEnquiry { name: string; phone: string; project: string }

export function validateWhatsAppEnquiry(enquiry: WhatsAppEnquiry) {
  const errors: { name?: string; phone?: string } = {};
  if (!enquiry.name.trim() || enquiry.name.trim().length > 80) errors.name = "Enter your name (up to 80 characters).";
  const phone = enquiry.phone.replace(/[\s()-]/g, "");
  if (!/^(?:\+?91|0)?[6-9]\d{9}$/.test(phone)) errors.phone = "Enter a valid 10-digit Indian mobile number, optionally with +91.";
  return errors;
}

export function getWhatsAppEnquiryUrl(enquiry: WhatsAppEnquiry): string {
  if (Object.keys(validateWhatsAppEnquiry(enquiry)).length) throw new Error("Invalid enquiry details");
  const projectName = projects.find((item) => item.slug === enquiry.project)?.name
    ?? (enquiry.project === "commercial" ? "Commercial / Retail Spaces" : "General property enquiry");
  const message = [
    "Hi Bhumi Developers, I would like to enquire about a property.",
    `Name: ${enquiry.name.trim().replace(/\s+/g, " ")}`,
    `Mobile: +91 ${enquiry.phone.replace(/\D/g, "").slice(-10)}`,
    `Interested in: ${projectName}`,
    "Please share availability, pricing and site visit details.",
  ].join("\n");
  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}
