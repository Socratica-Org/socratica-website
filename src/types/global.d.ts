/**
 * Global TypeScript declarations for the Socratica website
 */

// Extend the Window interface to include our custom properties
interface Window {
  socraticaPrefetchedImages?: Set<string>;
} 