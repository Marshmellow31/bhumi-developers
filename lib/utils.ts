import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function formatPrice(price: number): string {
  if (price >= 10000000) {
    const crVal = price / 10000000;
    return `₹${crVal % 1 === 0 ? crVal.toFixed(0) : crVal.toFixed(1)} Cr`;
  }
  if (price >= 100000) {
    const lakhVal = price / 100000;
    return `₹${lakhVal % 1 === 0 ? lakhVal.toFixed(0) : lakhVal.toFixed(1)} L`;
  }
  return `₹${price.toLocaleString("en-IN")}`;
}
