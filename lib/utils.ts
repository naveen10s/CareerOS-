import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple ClassValues into a single tailwind-merged className string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
