#!/usr/bin/env node

/**
 * Image Optimization Script for Socratica
 * 
 * This script optimizes images for the people directory by:
 * 1. Creating multiple sizes of each image (32px, 64px, 128px, 256px)
 * 2. Converting them to WebP format for better compression
 * 3. Generating low-quality placeholders
 * 
 * Usage:
 *   node scripts/optimize-images.js
 * 
 * Requirements:
 *   - Sharp: npm install sharp
 *   - Glob: npm install glob
 */

import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import required packages
let sharp, glob;

try {
  sharp = await import('sharp');
  glob = await import('glob');
  
  // Extracting the default export for compatibility
  sharp = sharp.default;
  glob = glob.glob;
} catch (e) {
  console.error('Missing required dependencies. Please run:');
  console.error('npm install sharp glob');
  process.exit(1);
}

// Configuration
const SIZES = {
  tiny: 32,    // For asterisk nodes
  small: 64,   // For small thumbnails
  medium: 128, // For medium displays
  large: 256   // For profile card
};

const SOURCE_DIR = 'static/img-ppl';
const OUTPUT_QUALITY = 80; // WebP quality (0-100)

// Create output directories if they don't exist
const createDirs = () => {
  Object.values(SIZES).forEach(size => {
    const dir = path.join(SOURCE_DIR, `${size}w`);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created directory: ${dir}`);
    }
  });
};

// Process a single image
const processImage = async (imagePath) => {
  const parsedPath = path.parse(imagePath);
  const filename = parsedPath.name;
  const ext = parsedPath.ext.toLowerCase();
  
  // Only process supported image types
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
    console.log(`Skipping unsupported image format: ${imagePath}`);
    return;
  }
  
  console.log(`Processing: ${imagePath}`);
  
  // Get original image dimensions
  const metadata = await sharp(imagePath).metadata();
  
  // Generate optimized versions for each size
  for (const [sizeKey, width] of Object.entries(SIZES)) {
    // Skip if the output is larger than the input
    if (width > metadata.width) {
      console.log(`Skipping ${sizeKey} (${width}px) for ${filename} - original is smaller (${metadata.width}px)`);
      continue;
    }
    
    // Calculate height while maintaining aspect ratio
    const height = Math.round(width * (metadata.height / metadata.width));
    
    // Output paths
    const webpOutput = path.join(SOURCE_DIR, `${filename}-${width}w.webp`);
    
    // Skip if already exists
    if (fs.existsSync(webpOutput)) {
      console.log(`Skipping existing: ${webpOutput}`);
      continue;
    }
    
    try {
      // Create WebP version (better compression)
      await sharp(imagePath)
        .resize(width, height, { fit: 'cover' })
        .webp({ quality: OUTPUT_QUALITY })
        .toFile(webpOutput);
      
      console.log(`Created: ${webpOutput}`);
    } catch (error) {
      console.error(`Error processing ${imagePath} at size ${width}:`, error);
    }
  }
  
  // Create a tiny placeholder version (10px wide, base64 encoded)
  const placeholderWidth = 10;
  const placeholderHeight = Math.round(placeholderWidth * (metadata.height / metadata.width));
  
  try {
    // Create a very small, low quality placeholder
    const placeholderBuffer = await sharp(imagePath)
      .resize(placeholderWidth, placeholderHeight, { fit: 'cover' })
      .webp({ quality: 20 })
      .toBuffer();
    
    const base64Placeholder = `data:image/webp;base64,${placeholderBuffer.toString('base64')}`;
    
    // Save this placeholder data to a JSON file that can be imported
    // This will be used for immediate rendering while full images load
    const placeholdersFile = path.join(SOURCE_DIR, 'placeholders.json');
    let placeholders = {};
    
    if (fs.existsSync(placeholdersFile)) {
      placeholders = JSON.parse(fs.readFileSync(placeholdersFile, 'utf8'));
    }
    
    placeholders[filename] = base64Placeholder;
    
    fs.writeFileSync(placeholdersFile, JSON.stringify(placeholders, null, 2));
    console.log(`Updated placeholder for: ${filename}`);
  } catch (error) {
    console.error(`Error creating placeholder for ${imagePath}:`, error);
  }
};

// Main function
const main = async () => {
  // Create output directories
  createDirs();
  
  // Get all images in the source directory
  const images = await glob(`${SOURCE_DIR}/*.{jpg,jpeg,png,webp}`);
  
  console.log(`Found ${images.length} images to process`);
  
  // Process each image
  for (const image of images) {
    await processImage(image);
  }
  
  console.log('Image optimization complete!');
  console.log(`Optimized ${images.length} images to WebP format in various sizes`);
  console.log('The optimized images will be used automatically by the app');
};

// Run the main function
main().catch(error => {
  console.error('Error in optimization process:', error);
  process.exit(1);
}); 