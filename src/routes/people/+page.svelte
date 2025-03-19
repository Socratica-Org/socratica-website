<script>
  import Navbar from "$lib/components/navbar.svelte";
  import { onMount } from "svelte";
  import { cubicOut } from "svelte/easing";
  import { fade, scale } from "svelte/transition";
  import peopleData from "./people.json";
  import { browser } from '$app/environment';

  // Add the export for data prop from load function
  export let data = { imagePlaceholders: {} };
  
  // Access placeholders safely with default value
  const { imagePlaceholders = {} } = data;

  // Helper to check if code is running in browser 
  const isBrowser = typeof window !== 'undefined';

  // Performance monitoring (initialize only in browser)
  let pageLoadStartTime = isBrowser ? performance.now() : 0;
  let firstContentfulPaint = 0;
  
  // Search functionality variables
  let searchQuery = "";
  let searchResults = [];
  let selectedResult = null;
  let searchTimeout;
  let isLoading = true;

  // Flag to track which person card is currently being shown
  let selectedPerson = null;
  // Add this variable to track the highlighted person (from hover or click)
  let highlightedPerson = null;

  // Mobile detection
  let windowWidth = 1024; // Default to desktop size
  $: isMobile = windowWidth < 1024; // lg breakpoint in Tailwind

  // Track which images were prefetched from layout
  const imagesPrefetchedFromLayout = browser && isBrowser 
    ? (window.socraticaPrefetchedImages || new Set()) 
    : new Set();
  
  // Add prefetch support for important images
  // @ts-ignore - We need to convert to a regular Set for non-TS environments
  let prefetchedImages = new Set(Array.from(imagesPrefetchedFromLayout));
  
  // Add connection detection for adaptive loading
  let isSlowConnection = false;
  
  // Performance monitoring - start timing when component initializes
  const componentLoadStart = browser ? performance.now() : 0;

  // Add mouse position tracking for profile card positioning
  let mouseX = 0;
  let mouseY = 0;
  let screenWidth = 1024;  // Default; will be updated on mount
  let screenHeight = 768;  // Default; will be updated on mount
  let cardWidth = 480;     // Default profile card width
  let cardHeight = 300;    // Estimated card height (will vary)

  onMount(() => {
    if (browser) {
      // Detect connection type for adaptive loading
      const connection = navigator.connection || 
                        navigator.mozConnection || 
                        navigator.webkitConnection;
      
      if (connection) {
        // 4g is fast, 3g or slower is considered slow
        isSlowConnection = connection.effectiveType === '3g' || 
                          connection.effectiveType === '2g' || 
                          connection.effectiveType === 'slow-2g';
        
        console.log(`Connection type: ${connection.effectiveType}`);
      }
      
      // Log timing information for performance analysis
      const loadTime = performance.now() - componentLoadStart;
      console.log(`People page loaded in ${Math.round(loadTime)}ms`);
      console.log(`${prefetchedImages.size} images were prefetched from layout`);
      
      // If we're missing critical images, prefetch them now
      prefetchMissingCriticalImages();
      
      // Save the prefetched images on window for future use
      if (typeof window !== 'undefined') {
        window.socraticaPrefetchedImages = prefetchedImages;
      }
      
      // Record time for first contentful paint
      firstContentfulPaint = performance.now() - pageLoadStartTime;
      console.log(`First contentful paint: ${Math.round(firstContentfulPaint)}ms`);
      
      // Adjust loading strategy based on connection
      if (isSlowConnection) {
        console.log('Slow connection detected, adjusting loading strategy');
        // Load only what's visible first, delay other loads
        adjustLoadingForSlowConnection();
      } else {
        // On fast connections, we can be more aggressive
        console.log('Fast connection detected, standard loading strategy');
      }
    }

    // Only run browser-specific code in browser environment
    if (isBrowser) {
      // Record time for first contentful paint
      firstContentfulPaint = performance.now() - pageLoadStartTime;
      console.log(`First contentful paint: ${Math.round(firstContentfulPaint)}ms`);
      
      const updateWidth = () => {
        windowWidth = window.innerWidth;
      };

      window.addEventListener("resize", updateWidth);
      updateWidth();

      // Initialize Intersection Observer for lazy loading
      initIntersectionObserver();
      
      // Add resource hints for potentially critical resources
      addResourceHints();

      // Add WebP conversion helper
      createWebPVersions();

      // Add mouse move tracking
      window.addEventListener('mousemove', handleGlobalMouseMove);
      
      // Update screen dimensions on resize
      const updateDimensions = () => {
        screenWidth = window.innerWidth;
        screenHeight = window.innerHeight;
      };
      window.addEventListener('resize', updateDimensions);
      updateDimensions(); // Initial call
    }

    return () => {
      if (isBrowser) {
        window.removeEventListener("resize", updateWidth);
        if (searchTimeout) clearTimeout(searchTimeout);
        memoizedNodes.clear();
        usedPeople.clear();
        imageCache.clear(); // Clear the image cache
        // Disconnect observer when component is destroyed
        if (observer) observer.disconnect();
        window.removeEventListener('mousemove', handleGlobalMouseMove);
        window.removeEventListener('resize', updateDimensions);
      }
    };
  });
  
  // Add resource hints to preload/prefetch critical resources
  function addResourceHints() {
    // Only run in browser environment
    if (!isBrowser) return;
    
    // Function to create and append link elements for resource hints
    const addLinkHint = (rel, href, as = null, crossOrigin = null) => {
      const link = document.createElement('link');
      link.rel = rel;
      link.href = href;
      if (as) link.setAttribute('as', as);
      if (crossOrigin) link.setAttribute('crossorigin', crossOrigin);
      document.head.appendChild(link);
    };
    
    // Preload the tiny placeholder
    addLinkHint('preload', '/img-ppl/tiny-placeholder.svg', 'image');
    
    // Preload critical images (first few in the top asterisk)
    if (topNodes.length > 0) {
      // Preload first 5 images that aren't placeholders
      const preloadImages = topNodes
        .filter(node => node.person && !node.person.photo.includes('placeholder'))
        .slice(0, 5);
        
      preloadImages.forEach(node => {
        if (node.person?.photo) {
          addLinkHint('prefetch', node.person.photo, 'image');
        }
      });
    }
  }

  // Intersection Observer for lazy loading
  let observer = undefined;
  
  // Cache for keeping track of loaded images to prevent reload
  let imageCache = isBrowser ? new Set() : new Set();

  // Check if an image is already cached by the browser
  function isImageCached(src) {
    // If we've already loaded it during this session
    if (imageCache.has(src)) return true;
    
    // Create an image to test if it's in the browser cache
    return false; // Default to false to ensure proper loading
  }

  // Add staggered loading functionality after the observer initialization
  // Function to stagger image loading in visible area first
  function staggerLoading() {
    // Only run in browser environment
    if (!isBrowser) return;
    
    // Make sure nodes are initialized
    if (!topNodes.length || !leftNodes.length || !rightNodes.length) {
      console.log('Nodes not yet initialized, skipping staggered loading');
      return;
    }
    
    // First, check connection speed if available
    const connection = navigator.connection || 
                      navigator.mozConnection || 
                      navigator.webkitConnection;
    
    let isSlow = false;
    
    if (connection) {
      // 4g is fast, 3g or slower is considered slow
      isSlow = connection.effectiveType === '3g' || 
               connection.effectiveType === '2g' || 
               connection.effectiveType === 'slow-2g';
      
      console.log(`Connection type: ${connection.effectiveType}`);
    }
    
    // Adjust the number of immediately loaded images based on connection
    const topPriorityCount = isSlow ? 10 : 20;
    const secondaryCount = isSlow ? 10 : 15;
    
    // Top nodes are likely to be visible first
    const topPriorityNodes = [...topNodes.slice(0, topPriorityCount)];
    const secondaryNodes = [
      ...topNodes.slice(topPriorityCount),
      ...leftNodes.slice(0, Math.min(leftNodes.length, secondaryCount)), 
      ...rightNodes.slice(0, Math.min(rightNodes.length, secondaryCount))
    ];
    const remainingNodes = [
      ...leftNodes.slice(secondaryCount),
      ...rightNodes.slice(secondaryCount)
    ];

    // Get all image elements that have data-src attributes
    const getAllImageElements = () => {
      return Array.from(document.querySelectorAll('img[data-src]'));
    };

    // Observe high priority images immediately
    setTimeout(() => {
      const allImages = getAllImageElements();
      
      // Find images for top priority nodes
      allImages.forEach(img => {
        const src = img.getAttribute('data-src');
        const isTopPriority = topPriorityNodes.some(node => 
          node.person && node.person.photo === src
        );
        
        if (isTopPriority && observer) {
          observer.observe(img);
        }
      });
    }, 100);

    // Observe secondary priority images with a small delay
    setTimeout(() => {
      const allImages = getAllImageElements();
      
      // Find images for secondary priority nodes
      allImages.forEach(img => {
        const src = img.getAttribute('data-src');
        const isSecondaryPriority = secondaryNodes.some(node => 
          node.person && node.person.photo === src
        );
        
        if (isSecondaryPriority && observer) {
          observer.observe(img);
        }
      });
    }, 500);

    // Observe all remaining images after more delay
    setTimeout(() => {
      const allImages = getAllImageElements();
      allImages.forEach(img => {
        if (!img.hasAttribute('data-observed') && observer) {
          img.setAttribute('data-observed', 'true');
          observer.observe(img);
        }
      });
    }, 1000);
  }

  // Update initIntersectionObserver to call staggerLoading
  function initIntersectionObserver() {
    // Only run in browser environment
    if (!isBrowser || typeof window === 'undefined') return;
    
    try {
      if (typeof IntersectionObserver === 'undefined') {
        // Fallback for browsers that don't support IntersectionObserver
        console.log('IntersectionObserver not supported, using basic preloading');
        return;
      }
      
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const target = entry.target;
            const dataSrc = target.getAttribute('data-src');
            const dataFullSrc = target.getAttribute('data-full-src');
            
            if (dataSrc) {
              // Mark the image as observed to prevent re-observation
              target.setAttribute('data-observed', 'true');
              
              // If the image is already cached, load it immediately
              if (isImageCached(dataSrc)) {
                target.src = dataSrc;
                target.classList.add('loaded');
                target.classList.remove('opacity-0');
                observer.unobserve(target);
                
                // If this is a thumbnail and we have a full-size version,
                // load the full-size version in the background
                if (dataFullSrc && dataFullSrc !== dataSrc) {
                  const fullImg = new Image();
                  fullImg.src = dataFullSrc;
                  imageCache.add(dataFullSrc);
                }
                
                return;
              }
              
              // Create a new image to load in the background
              const img = new Image();
              
              // When the image is loaded, update the src and add animation
              img.onload = () => {
                target.src = dataSrc;
                target.classList.add('loaded');
                target.classList.remove('opacity-0');
                imageCache.add(dataSrc); // Add to our cache
                observer.unobserve(target);
                
                // If this is a thumbnail and we have a full-size version,
                // load the full-size version in the background
                if (dataFullSrc && dataFullSrc !== dataSrc) {
                  const fullImg = new Image();
                  fullImg.src = dataFullSrc;
                  imageCache.add(dataFullSrc);
                }
              };
              
              // If loading fails, show the placeholder instead
              img.onerror = () => {
                console.error(`Failed to load image: ${dataSrc}`);
                target.src = '/img-ppl/tiny-placeholder.svg';
                target.classList.remove('opacity-0');
                observer.unobserve(target);
              };
              
              // Start loading the image
              img.src = dataSrc;
            }
          }
        });
      }, {
        rootMargin: '300px', // Increased to 300px to load even earlier
        threshold: 0
      });
      
      // Start the staggered loading after a short delay, only if we're in the browser
      if (isBrowser) {
        setTimeout(() => {
          if (topNodes.length > 0) {
            staggerLoading();
          }
        }, 200);
      }
    } catch (error) {
      console.error('Error initializing IntersectionObserver:', error);
    }
  }

  // Update the observeImage function to prevent manual observation
  function observeImage(node) {
    // This directive will only run in browser
    if (isBrowser && observer) {
      // Wait a tick to ensure node is mounted
      setTimeout(() => {
        if (node.hasAttribute('data-src') && !node.hasAttribute('data-observed')) {
          node.setAttribute('data-observed', 'true');
        }
      }, 0);
    }
    
    return {
      destroy() {
        if (isBrowser && observer) {
          observer.unobserve(node);
        }
      }
    };
  }

  // Filter people data once on load with safety checks
  $: filteredPeople = peopleData
    ? peopleData.filter(
        (p) =>
          !p.name.includes("Future") &&
          !p.name.includes("Community") &&
          !p.name.includes("Team") &&
          !p.name.includes("Collaborators")
      )
    : [];

  // Initialize nodes after data is loaded
  $: {
    if (filteredPeople.length > 0 && isLoading) {
      initializeNodes();
      isLoading = false;
      // Only run browser-specific code in browser environment
      if (isBrowser) {
        preloadImages();
      }
    }
  }

  let topNodes = [];
  let leftNodes = [];
  let rightNodes = [];

  function initializeNodes() {
    // Instead of sequential assignment, interleave to distribute evenly
    usedPeople = new Set(); // Reset used people
    memoizedNodes.clear(); // Clear memoized calculations
    
    // Create all three asterisk node structures first
    const topAsteriskNodes = generateEmptyNodes("top");
    const leftAsteriskNodes = generateEmptyNodes("left");
    const rightAsteriskNodes = generateEmptyNodes("right");
    
    // Distribute people evenly across all asterisks
    distributePeopleAcrossNodes(topAsteriskNodes, leftAsteriskNodes, rightAsteriskNodes);
    
    // Assign the populated nodes
    topNodes = topAsteriskNodes;
    leftNodes = leftAsteriskNodes;
    rightNodes = rightAsteriskNodes;
  }

  // Create empty node structures for each asterisk
  function generateEmptyNodes(asteriskType) {
    const nodes = [];
    const gridRadius = 5;
    let placeholderIndex = 0;
    
    // Pre-calculate grid positions
    const positions = [];
    for (let q = -gridRadius; q <= gridRadius; q++) {
      for (let r = -gridRadius; r <= gridRadius; r++) {
        const s = -q - r;
        if (Math.abs(s) <= gridRadius && isPartOfAsterisk(q, r)) {
          positions.push([q, r]);
        }
      }
    }

    // Sort positions by distance from center for better visual distribution
    positions.sort((a, b) => {
      const [q1, r1] = a;
      const [q2, r2] = b;
      const dist1 = Math.abs(q1) + Math.abs(r1);
      const dist2 = Math.abs(q2) + Math.abs(r2);
      return dist1 - dist2;
    });
    
    // Generate empty nodes based on sorted positions
    for (const [q, r] of positions) {
      const coords = getNodeCoordinates(q, r);
      
      placeholderIndex = (placeholderIndex % 6) + 1;
      nodes.push({
        id: `${asteriskType}-${q},${r}`,
        q,
        r,
        x: coords.x,
        y: coords.y,
        person: null,
        isPlaceholder: true,
        placeholderImage: `/img-ppl/placeholder_${placeholderIndex}.png`,
        asteriskType,
        nodeIndex: nodes.length // Track position within this asterisk
      });
    }
    
    return nodes;
  }

  // Distribute people evenly across the three asterisks
  function distributePeopleAcrossNodes(topNodes, leftNodes, rightNodes) {
    if (!filteredPeople || filteredPeople.length === 0) return;
    
    // Create a copy of filtered people to work with
    let availablePeople = [...filteredPeople];
    
    // Get all empty nodes from each asterisk
    const allTopNodes = [...topNodes];
    const allLeftNodes = [...leftNodes];
    const allRightNodes = [...rightNodes];
    
    // Prioritize central nodes first (sort by distance from center)
    const sortNodesByPriority = (nodes) => {
      return nodes.sort((a, b) => {
        const distA = Math.abs(a.q) + Math.abs(a.r);
        const distB = Math.abs(b.q) + Math.abs(b.r);
        return distA - distB;
      });
    };
    
    // Sort nodes by priority (center-first)
    const topNodesSorted = sortNodesByPriority(allTopNodes);
    const leftNodesSorted = sortNodesByPriority(allLeftNodes);
    const rightNodesSorted = sortNodesByPriority(allRightNodes);
    
    // Remove any existing people assignments
    const clearNodes = (nodes) => {
      nodes.forEach(node => {
        node.person = null;
        node.isPlaceholder = true;
      });
    };
    
    clearNodes(topNodesSorted);
    clearNodes(leftNodesSorted);
    clearNodes(rightNodesSorted);
    
    // Assign people to nodes using round-robin
    let currentAsterisk = 0; // 0 = top, 1 = left, 2 = right
    
    while (availablePeople.length > 0) {
      // Get the current asterisk's nodes
      let currentNodes;
      switch (currentAsterisk) {
        case 0: currentNodes = topNodesSorted; break;
        case 1: currentNodes = leftNodesSorted; break;
        case 2: currentNodes = rightNodesSorted; break;
      }
      
      // Find the next available node (first one without a person)
      const nextNode = currentNodes.find(node => node.isPlaceholder);
      
      if (nextNode && availablePeople.length > 0) {
        // Get a person to assign
        const randomIndex = Math.floor(Math.random() * availablePeople.length);
        const person = availablePeople[randomIndex];
        
        // Assign the person to the node
        nextNode.person = person;
        nextNode.isPlaceholder = false;
        
        // Add optimized images for different sizes
        if (person && !person.photo.includes('placeholder')) {
          // Tiny thumbnail for initial load (32px)
          nextNode.tinyThumbnail = getOptimizedImageUrl(person.photo, 'tiny');
          
          // Small thumbnail for zoomed view (64px)
          nextNode.smallThumbnail = getOptimizedImageUrl(person.photo, 'small');
          
          // Regular photo for the profile card
          nextNode.optimizedPhoto = getOptimizedImageUrl(person.photo, 'large');
        }
        
        // Remove the person from available people
        availablePeople.splice(randomIndex, 1);
        
        // Add to used people
        usedPeople.add(person.id);
      }
      
      // Move to the next asterisk (round-robin)
      currentAsterisk = (currentAsterisk + 1) % 3;
    }
  }

  // Asterisk pattern configuration
  const nodeSize = 32; // Reduced size from 36px to 32px
  const nodeSpacing = nodeSize - 12; // Increased overlap from -8 to -12 to bring nodes even closer

  // Add this before the node generation
  let usedPeople = new Set();

  // Memoize the node calculations
  let memoizedNodes = new Map();

  // Optimize node generation by memoizing calculations
  function getNodeCoordinates(q, r) {
    const key = `${q},${r}`;
    if (memoizedNodes.has(key)) {
      return memoizedNodes.get(key);
    }

    const angle = Math.PI / 6;
    const xBase = nodeSpacing * (Math.sqrt(3) * q + (Math.sqrt(3) / 2) * r);
    const yBase = nodeSpacing * ((3 / 2) * r);

    const coords = {
      x: xBase * Math.cos(angle) - yBase * Math.sin(angle),
      y: xBase * Math.sin(angle) + yBase * Math.cos(angle),
    };

    memoizedNodes.set(key, coords);
    return coords;
  }

  // Optimize isPartOfAsterisk check
  function isPartOfAsterisk(q, r) {
    const s = -q - r;
    const gridRadius = 5;

    // Simplified arm checks using absolute values
    return (
      (q === 0 && r === 0) || // Center
      (Math.abs(q) <= 1 && Math.abs(r) <= gridRadius) || // Vertical
      (Math.abs(s + r) <= 1 && Math.abs(s) <= gridRadius) || // 60°
      (Math.abs(q + s) <= 1 && Math.abs(s) <= gridRadius) || // 120°
      (Math.abs(r) <= 1 && Math.abs(q) <= gridRadius) || // 180°
      (Math.abs(q + r) <= 1 && Math.abs(q) <= gridRadius) || // 240°
      (Math.abs(s) <= 1 && Math.abs(r) <= gridRadius) // 300°
    );
  }

  // Add hover state tracking
  let hoveredPerson = null;
  let hoverTimer = null;
  let hoverIntentDelay = 300; // ms to wait before showing person info
  
  // Track explicit selection vs. hover
  let isPersonSelected = false;
  
  // Update enhanced hover detection to also capture mouse position
  function handleMouseEnter(node, event) {
    // Update mouse position if event is provided
    if (event) {
      mouseX = event.clientX;
      mouseY = event.clientY;
    }
    
    // Clear any existing hover timer
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      hoverTimer = null;
    }
    
    // Set a timer to confirm intentional hover
    hoverTimer = setTimeout(() => {
      hoveredPerson = node.person;
      highlightedPerson = node.person;
    }, hoverIntentDelay);
  }
  
  // Track mouse position globally for better card positioning
  function handleGlobalMouseMove(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
  }
  
  // Calculate optimal card position based on mouse position
  function getCardPosition() {
    // Get window dimensions
    if (typeof window !== 'undefined') {
      screenWidth = window.innerWidth;
      screenHeight = window.innerHeight;
    }
    
    // Calculate card dimensions - use fixed values to avoid layout shifts
    cardWidth = 480;
    cardHeight = 350; // Estimate based on typical content
    
    // Base positions - place card to the right of cursor by default
    let left = mouseX + 20;
    let top = mouseY - 40; // Slightly above cursor to avoid blocking it
    
    // Available space calculations
    const rightSpace = screenWidth - mouseX - 20;
    const leftSpace = mouseX - 20;
    const bottomSpace = screenHeight - mouseY - 20;
    const topSpace = mouseY - 20;
    
    // Choose best position based on available space
    if (rightSpace >= cardWidth) {
      // Enough space to the right - keep it there
      left = mouseX + 20;
    } else if (leftSpace >= cardWidth) {
      // Not enough space right, but enough to the left
      left = mouseX - cardWidth - 20;
    } else {
      // Not enough space on either side - center horizontally
      left = Math.max(20, (screenWidth - cardWidth) / 2);
    }
    
    // Vertical positioning
    if (bottomSpace >= cardHeight) {
      // Enough space below - align top with cursor 
      top = mouseY - 20;
    } else if (topSpace >= cardHeight) {
      // Not enough space below, but enough above
      top = mouseY - cardHeight - 20;
    } else {
      // Not enough space above or below - center vertically
      top = Math.max(20, (screenHeight - cardHeight) / 2);
    }
    
    // Ensure the card stays within viewport bounds
    left = Math.max(20, Math.min(screenWidth - cardWidth - 20, left));
    top = Math.max(20, Math.min(screenHeight - cardHeight - 20, top));
    
    // Use absolute pixel values instead of percentages for more precise positioning
    return {
      left: `${left}px`,
      top: `${top}px`,
      transform: 'translate(0, 0)' // Override the default transform
    };
  }
  
  // Enhanced mouse leave handler with debouncing
  function handleMouseLeave() {
    // Clear hover timer if mouse leaves before delay completes
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      hoverTimer = null;
    }
    
    // Don't immediately remove highlighted person
    // This creates a small delay before hiding, preventing flicker
    setTimeout(() => {
      // Only clear if person hasn't been explicitly selected
      if (!isPersonSelected) {
        hoveredPerson = null;
        highlightedPerson = null;
      }
    }, 100);
  }
  
  // New click handler that explicitly selects a person
  function handleNodeClick(node) {
    isPersonSelected = true;
    highlightedPerson = node.person;
  }
  
  // Close profile explicitly via close button
  function closeProfile() {
    isPersonSelected = false;
    highlightedPerson = null;
    hoveredPerson = null;
  }

  // Optimize search functionality with debounce
  function handleSearch(event) {
    searchQuery = event.target.value;
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    if (searchQuery.length === 0) {
      searchResults = [];
      return;
    }

    searchTimeout = setTimeout(() => {
      const query = searchQuery.toLowerCase();
      searchResults = filteredPeople
        .filter((p) => p.name.toLowerCase().includes(query))
        .slice(0, 10); // Limit results to improve performance
    }, 300); // Reduced debounce time
  }

  function selectSearchResult(result) {
    selectedResult = result;
    selectedPerson = result.id;
  }

  // Preload visible images for the first screen
  function preloadImages() {
    // Only run in browser environment with a real window object
    if (!isBrowser || typeof window === 'undefined' || typeof Image === 'undefined') {
      return;
    }
    
    try {
      // Only preload if IntersectionObserver is not available
      if (typeof IntersectionObserver === 'undefined') {
        const visibleNodes = [...topNodes.slice(0, 15)];
        setTimeout(() => {
          visibleNodes.forEach(node => {
            if (node.person && node.person.photo && !node.person.photo.includes('placeholder')) {
              const img = new Image();
              img.src = node.person.photo;
            }
          });
        }, 100);
      }
    } catch (error) {
      console.error('Error in preloadImages:', error);
    }
  }

  // Add image loading state tracking
  let loadedImages = new Set();
  
  function handleImageLoad(id) {
    loadedImages.add(id);
  }

  function isImageLoaded(id) {
    return loadedImages.has(id);
  }

  // Add this function to create optimized image URLs based on size needs
  function getOptimizedImageUrl(photoUrl, size) {
    if (!photoUrl || photoUrl.includes('placeholder')) {
      return photoUrl;
    }
    
    const imgPath = photoUrl.startsWith('/') ? photoUrl.substring(1) : photoUrl;
    const parts = imgPath.split('/');
    const filename = parts[parts.length - 1].split('.')[0];
    
    // Check if we have WebP versions
    if (size === 'tiny') return `/img-ppl/${filename}-32w.webp`;
    if (size === 'small') return `/img-ppl/${filename}-64w.webp`;
    if (size === 'medium') return `/img-ppl/${filename}-128w.webp`;
    if (size === 'large') return `/img-ppl/${filename}-256w.webp`;
    
    // Fallback to original image
    return photoUrl;
  }

  // Add a script to create WebP versions of images on load if not already present
  function createWebPVersions() {
    if (!isBrowser || typeof document === 'undefined') return;
    
    // Check if browser supports WebP
    const webpSupported = document.createElement('canvas')
      .toDataURL('image/webp')
      .indexOf('data:image/webp') === 0;
      
    if (!webpSupported) return; // Skip if WebP is not supported
    
    // Only run in development mode to help create optimized assets
    if (import.meta.env.DEV) {
      console.log('Development mode: checking for WebP conversion opportunities');
      
      // Get all loaded images that aren't WebP
      setTimeout(() => {
        const nonWebPImages = Array.from(document.querySelectorAll('img[src*=".jpg"], img[src*=".png"]'));
        
        if (nonWebPImages.length > 0) {
          console.log(`Found ${nonWebPImages.length} images that could be converted to WebP`);
          
          nonWebPImages.forEach(img => {
            const src = img.getAttribute('src');
            if (!src) return;
            
            // Log suggestion for converting to WebP
            const basePath = src.substring(0, src.lastIndexOf('.'));
            const width = img.naturalWidth || img.width;
            console.log(`Consider creating: ${basePath}-${width}w.webp`);
          });
        }
      }, 3000);
    }
  }

  // Get image placeholder (if available)
  function getPlaceholder(photoUrl) {
    if (!photoUrl) return null;
    
    const parts = photoUrl.split('/');
    const filename = parts[parts.length - 1].split('.')[0];
    
    return imagePlaceholders[filename] || null;
  }

  // New function to adjust loading for slow connections
  function adjustLoadingForSlowConnection() {
    // Only visible nodes should load immediately
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          if (target.tagName === 'IMG' && target.hasAttribute('data-src')) {
            const src = target.getAttribute('data-src');
            target.src = src;
            observer.unobserve(target);
          }
        }
      });
    }, {
      rootMargin: '0px',
      threshold: 0.1
    });
    
    // Find all images with data-src that are not prefetched
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
      const src = img.getAttribute('data-src');
      if (src && !prefetchedImages.has(src)) {
        observer.observe(img);
      }
    });
  }

  // Enhance the prefetch strategy for missing images
  function prefetchMissingCriticalImages() {
    if (!browser) return;
    
    // Get the visible nodes based on current scroll position
    const getVisibleNodes = () => {
      const nodes = [];
      // Get nodes from all three asterisks
      const allNodes = [...topNodes, ...leftNodes, ...rightNodes];
      
      // Sort by distance from screen center
      allNodes.sort((a, b) => {
        // Simple approximation based on grid position
        const centerDistA = Math.abs(a.q) + Math.abs(a.r);
        const centerDistB = Math.abs(b.q) + Math.abs(b.r);
        return centerDistA - centerDistB;
      });
      
      // Take the top 15 closest to center nodes
      return allNodes.slice(0, 15);
    };
    
    // Get visually important nodes
    const visibleNodes = getVisibleNodes();
    
    // Check if their images were prefetched
    visibleNodes.forEach((node, index) => {
      if (node.person && node.tinyThumbnail && !prefetchedImages.has(node.tinyThumbnail)) {
        // Set decreasing priority based on index
        const priority = index < 5 ? 'high' : (index < 10 ? 'medium' : 'low');
        
        // Delay loading based on priority
        setTimeout(() => {
          // Create a link element for prefetching
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.as = 'image';
          link.href = node.tinyThumbnail;
          link.fetchpriority = priority;
          document.head.appendChild(link);
          
          // Also create an image object for browsers that don't support link prefetching
          const img = new Image();
          img.src = node.tinyThumbnail;
          img.fetchPriority = priority;
          
          // Mark as prefetched
          prefetchedImages.add(node.tinyThumbnail);
          
          // Clean up prefetch link after 10 seconds
          setTimeout(() => {
            if (document.head.contains(link)) {
              document.head.removeChild(link);
            }
          }, 10000);
        }, index * 100); // Stagger prefetching with 100ms interval
      }
    });
    
    // If on a good connection and we have bandwidth, prefetch high-quality images for visible nodes
    if (!isSlowConnection) {
      setTimeout(() => {
        visibleNodes.slice(0, 5).forEach(node => {
          if (node.person && node.person.photo && !prefetchedImages.has(node.person.photo)) {
            const img = new Image();
            img.src = node.person.photo;
            prefetchedImages.add(node.person.photo);
          }
        });
      }, 1000); // Delay high-quality prefetch until after essential content is loaded
    }
  }
</script>

<!-- Add a hint for browsers to preconnect to the image domain if needed -->
<svelte:head>
  {#if browser}
    <link rel="preconnect" href={window.location.origin} />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    
    <!-- Explicitly preload any non-prefetched critical images -->
    {#if topNodes?.length > 0 && topNodes[0]?.tinyThumbnail}
      <link rel="preload" 
        href={topNodes[0].tinyThumbnail} 
        as="image" 
        type="image/webp" 
        fetchpriority="high" />
    {/if}
  {/if}
</svelte:head>

<div class="block min-h-screen bg-primary">
  <Navbar />

  <div class="absolute top-20 left-10 sm:left-20 transform">
    <a href="/">
      <h1 class="text-2xl font-tiempos-headline">Socratica</h1>
    </a>
  </div>

  <div class="pt-32 px-8 md:px-16 lg:px-24">
    <!-- Title and Search Section -->
    <div
      class="flex flex-col md:flex-row md:justify-between md:items-center mb-10"
    >
      <h2
        class="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-tiempos-headline mb-6 md:mb-0"
      >
        The <i>people</i> behind it all.
    </h2>
    
      <!-- Description visible only on md and above -->
      <div class="hidden md:block">
        <!-- Search Bar -->
        <div class="w-64 md:w-80">
          <div class="relative">
            <input
              type="text"
              placeholder="Search team members..."
              bind:value={searchQuery}
              on:input={handleSearch}
              class="w-full px-4 py-2 rounded-lg bg-[#f5f5f5] border border-[#e0e0e0] focus:ring-2 focus:ring-[#333] focus:outline-none transition-all"
            />
            {#if searchQuery && searchResults.length > 0}
              <div
                class="absolute z-30 mt-1 w-full bg-white rounded-lg shadow-lg border border-[#e0e0e0] max-h-60 overflow-y-auto"
              >
                {#each searchResults as result}
                  <div
                    class="px-4 py-2 hover:bg-[#f5f5f5] cursor-pointer transition-colors"
                    on:click={() => selectSearchResult(result)}
                  >
                    <div class="font-medium">{result.name}</div>
                  </div>
                {/each}
              </div>
            {:else if searchQuery && searchResults.length === 0}
              <div
                class="absolute z-30 mt-1 w-full bg-white rounded-lg shadow-lg border border-[#e0e0e0] p-3"
              >
                <div class="text-gray-500">No matching team members found</div>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>

    <!-- Description -->
    <div class="mb-8 md:mb-16 max-w-4xl">
      <p
        class="text-[11px] md:text-[17px] lg:text-lg leading-relaxed"
        style="font-family: 'Untitled Sans', sans-serif;"
      >
        Socratica is built by a diverse community of creators, thinkers, and
        makers.<br />Click to learn more about the individuals.
      </p>
    </div>

    <!-- Search Bar for mobile (visible only below md) -->
    <div class="block md:hidden mb-16">
      <div class="w-full">
        <div class="relative">
          <input
            type="text"
            placeholder="Search team members..."
            bind:value={searchQuery}
            on:input={handleSearch}
            class="w-full px-4 py-2 rounded-lg bg-[#f5f5f5] border border-[#e0e0e0] focus:ring-2 focus:ring-[#333] focus:outline-none transition-all"
          />
          {#if searchQuery && searchResults.length > 0}
            <div
              class="absolute z-30 mt-1 w-full bg-white rounded-lg shadow-lg border border-[#e0e0e0] max-h-60 overflow-y-auto"
            >
              {#each searchResults as result}
                <div
                  class="px-4 py-2 hover:bg-[#f5f5f5] cursor-pointer transition-colors"
                  on:click={() => selectSearchResult(result)}
                >
                  <div class="font-medium">{result.name}</div>
              </div>
                {/each}
            </div>
          {:else if searchQuery && searchResults.length === 0}
            <div
              class="absolute z-30 mt-1 w-full bg-white rounded-lg shadow-lg border border-[#e0e0e0] p-3"
            >
              <div class="text-gray-500">No matching team members found</div>
          </div>
        {/if}
        </div>
      </div>
      </div>
      
    <!-- Loading state -->
    {#if isLoading}
      <div class="flex justify-center items-center h-[60vh]">
        <div
          class="animate-spin rounded-full h-12 w-12 border-4 border-[#333] border-t-transparent"
        />
      </div>
    {:else}
      <!-- Asterisk Pattern Display -->
      <div
        class="relative w-full flex flex-col items-center"
        style="height: {nodeSize * (isMobile ? 72 : 24)}px;"
      >
        <!-- Top Asterism -->
        <div
          class="relative {isMobile ? 'mb-8' : '-mb-16'} mt-8"
          style="width: {nodeSize * 20}px; height: {nodeSize * 13}px;"
        >
          {#each topNodes as node (node.id)}
            {@const isSelected = node.person && highlightedPerson && node.person.id === highlightedPerson.id}
            <div
              class="absolute rounded-full overflow-hidden border-2 transition-transform duration-200 {node.isPlaceholder
                ? 'border-[#e0e0e0] bg-[#f5f5f5]'
                : 'border-[#FBF8EF] cursor-pointer hover:scale-110'}"
              style="
                width: {nodeSize}px;
                height: {nodeSize}px;
                left: 50%;
                top: 50%;
                margin-left: {node.x}px;
                margin-top: {node.y}px;
                transform: translate(-50%, -50%) {isSelected
                ? 'scale(1.1)'
                : 'scale(1)'};
                z-index: {isSelected ? 20 : 5};
              "
              on:mouseenter={(e) => handleMouseEnter(node, e)}
              on:mouseleave={handleMouseLeave}
              on:click={() => node.person && handleNodeClick(node)}
              role={node.person ? "button" : "presentation"}
              aria-label={node.person
                ? `View profile for ${node.person.name}`
                : undefined}
              tabindex={node.person ? "0" : "-1"}
            >
              {#if node.person}
                {#if node.person.photo === "https://via.placeholder.com/150"}
                  <div
                    class="w-full h-full bg-[#404040] flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-4 h-4 text-[#CCCCCC]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                {:else}
                  <div class="w-full h-full bg-[#f5f5f5] bg-loading-shimmer">
                    <img
                      src="/img-ppl/tiny-placeholder.svg"
                      data-src={node.tinyThumbnail || node.person.photo}
                      data-full-src={node.person.photo}
                      alt={node.person.name}
                      class="w-full h-full object-cover transition-opacity duration-300 opacity-0"
                      loading="lazy"
                      decoding="async"
                      fetchpriority={Math.abs(node.q) + Math.abs(node.r) < 3 ? "high" : "low"}
                      height="32"
                      width="32"
                      use:observeImage
                    />
                  </div>
                {/if}
              {:else}
                <div class="w-full h-full bg-[#f5f5f5]">
                  <img
                    src={node.placeholderImage}
                    alt="Empty node"
                    class="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              {/if}
            </div>
          {/each}
        </div>

        <!-- Bottom Row Asterisms -->
        <div
          class="flex {isMobile ? 'flex-col gap-8' : 'flex-row gap-24'} mt-8"
        >
          <!-- Left Asterism -->
          <div
            class="relative"
            style="width: {nodeSize * 20}px; height: {nodeSize * 13}px;"
          >
            {#each leftNodes as node}
              {@const isSelected =
                node.person && highlightedPerson && node.person.id === highlightedPerson.id}
              <div
                class="absolute rounded-full overflow-hidden border-2 transition-all duration-300 {node.isPlaceholder
                  ? 'border-[#e0e0e0] bg-[#f5f5f5]'
                  : 'border-[#FBF8EF] cursor-pointer hover:scale-110'}"
                style="
                  width: {nodeSize}px;
                  height: {nodeSize}px;
                  left: 50%;
                  top: 50%;
                  margin-left: {node.x}px;
                  margin-top: {node.y}px;
                  transform: translate(-50%, -50%) {isSelected
                  ? 'scale(1.1)'
                  : 'scale(1)'};
                  z-index: {isSelected ? 20 : 5};
                  filter: brightness({isSelected ? 1.2 : 1});
                "
                on:mouseenter={(e) => handleMouseEnter(node, e)}
                on:mouseleave={handleMouseLeave}
                on:click={() => node.person && handleNodeClick(node)}
                role={node.person ? "button" : "presentation"}
                aria-label={node.person
                  ? `View profile for ${node.person.name}`
                  : undefined}
                tabindex={node.person ? "0" : "-1"}
              >
                {#if node.person}
                  {#if node.person.photo === "https://via.placeholder.com/150"}
                    <div
                      class="w-full h-full bg-[#404040] flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-4 h-4 text-[#CCCCCC]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                </div>
                  {:else}
                    <div class="w-full h-full bg-[#f5f5f5] bg-loading-shimmer">
                      <img
                        src="/img-ppl/tiny-placeholder.svg"
                        data-src={node.tinyThumbnail || node.person.photo}
                        data-full-src={node.person.photo}
                        alt={node.person.name}
                        class="w-full h-full object-cover transition-opacity duration-300 opacity-0"
                        loading="lazy"
                        decoding="async"
                        fetchpriority={Math.abs(node.q) + Math.abs(node.r) < 3 ? "high" : "low"}
                        height="32"
                        width="32"
                        use:observeImage
                      />
              </div>
                  {/if}
                {:else}
                  <div class="w-full h-full bg-[#f5f5f5]">
                    <img
                      src={node.placeholderImage}
                      alt="Empty node"
                      class="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                {/if}
              </div>
                  {/each}
              </div>

          <!-- Right Asterism -->
          <div
            class="relative"
            style="width: {nodeSize * 20}px; height: {nodeSize * 13}px;"
          >
            {#each rightNodes as node}
              {@const isSelected =
                node.person && highlightedPerson && node.person.id === highlightedPerson.id}
              <div
                class="absolute rounded-full overflow-hidden border-2 transition-all duration-300 {node.isPlaceholder
                  ? 'border-[#e0e0e0] bg-[#f5f5f5]'
                  : 'border-[#FBF8EF] cursor-pointer hover:scale-110'}"
                style="
                  width: {nodeSize}px;
                  height: {nodeSize}px;
                  left: 50%;
                  top: 50%;
                  margin-left: {node.x}px;
                  margin-top: {node.y}px;
                  transform: translate(-50%, -50%) {isSelected
                  ? 'scale(1.1)'
                  : 'scale(1)'};
                  z-index: {isSelected ? 20 : 5};
                  filter: brightness({isSelected ? 1.2 : 1});
                "
                on:mouseenter={(e) => handleMouseEnter(node, e)}
                on:mouseleave={handleMouseLeave}
                on:click={() => node.person && handleNodeClick(node)}
                role={node.person ? "button" : "presentation"}
                aria-label={node.person
                  ? `View profile for ${node.person.name}`
                  : undefined}
                tabindex={node.person ? "0" : "-1"}
              >
                {#if node.person}
                  {#if node.person.photo === "https://via.placeholder.com/150"}
                    <div
                      class="w-full h-full bg-[#404040] flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-4 h-4 text-[#CCCCCC]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  {:else}
                    <div class="w-full h-full bg-[#f5f5f5] bg-loading-shimmer">
                      <img
                        src="/img-ppl/tiny-placeholder.svg"
                        data-src={node.tinyThumbnail || node.person.photo}
                        data-full-src={node.person.photo}
                        alt={node.person.name}
                        class="w-full h-full object-cover transition-opacity duration-300 opacity-0"
                        loading="lazy"
                        decoding="async"
                        fetchpriority={Math.abs(node.q) + Math.abs(node.r) < 3 ? "high" : "low"}
                        height="32"
                        width="32"
                        use:observeImage
                      />
            </div>
          {/if}
                {:else}
                  <div class="w-full h-full bg-[#f5f5f5]">
                    <img
                      src={node.placeholderImage}
                      alt="Empty node"
                      class="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
        </div>
                {/if}
              </div>
            {/each}
          </div>
        </div>
      </div>
    {/if}

    <!-- Profile card for selected person or search result -->
    {#if highlightedPerson}
      {@const cardPosition = getCardPosition()}
      <div 
        class="profile-card" 
        class:hover-card={!isPersonSelected} 
        transition:fade={{duration: 200}}
        style="
          position: fixed;
          left: {cardPosition.left};
          top: {cardPosition.top};
          transform: {cardPosition.transform};
        "
      >
        <div class="flex items-center mb-4">
          {#if !highlightedPerson.photo.includes('placeholder')}
            <img 
              src={getOptimizedImageUrl(highlightedPerson.photo, 'large')} 
              alt={highlightedPerson.name} 
              class="w-32 h-32 rounded-full mr-6 object-cover border-2 border-[#FBF8EF]"
              loading="lazy"
              fetchpriority="high"
              height="128"
              width="128"
            />
          {:else}
            <div
              class="w-32 h-32 rounded-full mr-6 bg-[#404040] flex items-center justify-center border-2 border-[#FBF8EF]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-12 h-12 text-[#CCCCCC]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          {/if}
          
          <div>
            <h3 class="font-tiempos-headline text-2xl font-bold mb-1">
              {highlightedPerson.name}
            </h3>
            {#if highlightedPerson.location}
              <p class="text-base text-gray-600 font-mono">
                {highlightedPerson.location}
              </p>
            {/if}
            <p class="text-sm text-gray-500 mt-1 font-mono">
              {highlightedPerson.role || ""}
            </p>
          </div>
        </div>
        
        {#if highlightedPerson.facts && highlightedPerson.facts.length > 0}
          <div class="mt-6">
            <ul
              class="list-disc pl-6 space-y-2"
              style="font-family: 'Untitled Sans', sans-serif;"
            >
              {#each highlightedPerson.facts as fact}
                <li class="text-[15px] leading-relaxed text-gray-700">
                  {fact}
                </li>
              {/each}
            </ul>
          </div>
        {:else if highlightedPerson.description}
          <div class="mt-6">
            <p 
              class="text-[15px] leading-relaxed text-gray-700"
              style="font-family: 'Untitled Sans', sans-serif;"
            >
              {highlightedPerson.description}
            </p>
          </div>
        {/if}
        
        <!-- Close button -->
        <button 
          class="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
          on:click={closeProfile}
          aria-label="Close profile"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    {/if}
  </div>
</div>

<style>
  /* Card styling */
  .person-card {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
    border: 1px solid rgba(0, 0, 0, 0.08);
  }
  
  /* Add shimmer loading animation for image placeholders */
  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
  
  .bg-loading-shimmer {
    background: linear-gradient(90deg, #f0f0f0 25%, #f8f8f8 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }
  
  /* Animation for loaded images */
  img.loaded {
    animation: fadeIn 0.3s ease-in-out;
    opacity: 1 !important;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  /* Optimize paint performance */
  .absolute {
    will-change: transform;
  }
  
  /* Force hardware acceleration for smoother animations */
  .transition-all {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
  
  /* Add fade-in animation for profile image */
  .profile-image {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }
  
  .profile-image.loaded {
    opacity: 1;
  }
  
  /* Placeholder for profile image */
  .placeholder-image {
    background-color: #f0f0f0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  
  /* Enhanced hover effects for dot-container */
  .dot-container {
    will-change: transform;
    transition: transform 0.3s cubic-bezier(0.2, 0, 0.2, 1);
    backface-visibility: hidden;
  }
  
  .dot-container:hover {
    z-index: 10;
  }
  
  .dot-container:hover .dot {
    transform: scale(1.2);
    border-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
  
  /* Enhanced profile card */
  .profile-card {
    /* Remove positioning that will now be inline */
    /*
    position: fixed;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    */
    background: white;
    border-radius: 1rem;
    padding: 1.5rem;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    z-index: 50;
    max-width: 90%;
    width: 480px;
    backface-visibility: hidden;
    will-change: transform, opacity;
  }
  
  /* Update hover card style */
  .profile-card.hover-card {
    padding: 1.5rem;
    width: 480px;
  }
  
  .profile-card-inner {
    display: flex;
    gap: 1rem;
  }
  
  .profile-image-container {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
  }
  
  .profile-info {
    flex: 1;
  }
  
  .profile-info h3 {
    margin: 0 0 0.5rem;
    font-size: 1.25rem;
    font-weight: 600;
  }
  
  .profile-info .role {
    color: #666;
    font-size: 0.875rem;
    margin: 0 0 0.5rem;
  }
  
  .profile-info .description {
    font-size: 0.875rem;
    line-height: 1.4;
    margin: 0;
  }
</style> 

<script context="module">
  // Lazy load full-size images
  if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
      // Create WebP versions of images if they don't exist
      const checkWebPSupport = () => {
        const canvas = document.createElement('canvas');
        if (canvas.getContext && canvas.getContext('2d')) {
          return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
        }
        return false;
      };
      
      const webpSupported = checkWebPSupport();
      
      // Report non-WebP images that could be optimized
      const reportNonOptimizedImages = () => {
        if (webpSupported) {
          const dots = document.querySelectorAll('.dot[style*="background-image"]');
          const nonWebPImages = [];
          
          dots.forEach(dot => {
            const url = dot.style.backgroundImage.replace(/url\(['"](.+)['"]\)/, '$1');
            if (!url.endsWith('.webp')) {
              nonWebPImages.push(url);
            }
          });
          
          if (nonWebPImages.length > 0) {
            console.log('Images that could be optimized to WebP:', [...new Set(nonWebPImages)]);
            console.log('Run: node scripts/optimize-images.js to convert these images');
          }
        }
      };
      
      // Setup intersection observer for lazy loading
      const observeImages = () => {
        if ('IntersectionObserver' in window) {
          const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const dot = entry.target;
                const fullSrc = dot.dataset.src;
                
                if (fullSrc && !dot.style.backgroundImage.includes(fullSrc)) {
                  // Load higher quality image
                  const img = new Image();
                  img.onload = () => {
                    dot.style.backgroundImage = `url('${fullSrc}')`;
                  };
                  img.src = fullSrc;
                  
                  // Also preload the full-size image for the profile card
                  if (dot.dataset.fullSrc) {
                    const fullImg = new Image();
                    fullImg.src = dot.dataset.fullSrc;
                  }
                }
                
                // Stop observing after loading
                observer.unobserve(dot);
              }
            });
          }, { rootMargin: '100px' });
          
          // Observe all dots with images
          document.querySelectorAll('.dot[style*="background-image"]').forEach(dot => {
            imageObserver.observe(dot);
          });
        }
      };
      
      // Run optimizations
      setTimeout(() => {
        observeImages();
        reportNonOptimizedImages();
      }, 1000);
    });
  }
</script>

<!-- Track mouse position for cursor-based card positioning -->
<svelte:window on:mousemove={handleGlobalMouseMove} />
