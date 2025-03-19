import { dev } from '$app/environment';

export const prerender = true;

/**
 * This function loads optimized image placeholders if available
 * to speed up initial rendering of the people page
 */
export async function load() {
  let imagePlaceholders = {};
  
  // Only attempt to load placeholders in browser environment
  if (typeof window !== 'undefined') {
    try {
      // Try to load the placeholders JSON file
      const response = await fetch('/img-ppl/placeholders.json');
      if (response.ok) {
        imagePlaceholders = await response.json();
      }
    } catch (e) {
      // Silently fail if unable to load placeholders
      console.warn('Unable to load image placeholders:', e);
    }
  }
  
  return {
    imagePlaceholders
  };
} 