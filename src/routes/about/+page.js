/**
 * Server-side load function for about page
 * Pre-fetches image placeholders for better performance
 * @param {Object} params - Load parameters
 * @param {Function} params.fetch - Fetch function for HTTP requests
 * @returns {Promise<Object>} - Data for the page
 */
export async function load({ fetch }) {
  try {
    // Try to load image placeholders
    const response = await fetch('/img-about/placeholders.json');
    
    // Check if the file exists
    if (response.ok) {
      const imagePlaceholders = await response.json();
      return {
        imagePlaceholders
      };
    }
    
    // Return empty object if placeholders don't exist yet
    return {
      imagePlaceholders: {}
    };
  } catch (error) {
    console.error('Error loading image placeholders:', error);
    // Return empty object on error
    return {
      imagePlaceholders: {}
    };
  }
} 