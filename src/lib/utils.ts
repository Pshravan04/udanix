import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getURL = () => {
  // Use current production URL directly to ensure reliable redirects
  const url = 'https://udanix.vercel.app/';
  return url;
};
