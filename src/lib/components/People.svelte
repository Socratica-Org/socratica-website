<script>
  import { onMount } from "svelte";
  import { cubicOut } from "svelte/easing";
  import { fade, scale } from "svelte/transition";
  import peopleData from "./people.json";

  // Search functionality variables
  let searchQuery = "";
  let searchResults = [];
  let selectedResult = null;
  let searchTimeout;
  let isLoading = true;

  // Add hover state tracking
  let hoveredPerson = null;
  let highlightedPerson = null;
  let hoverTimer = null;
  let isPersonSelected = false;
  let hoverIntentDelay = 300; // ms to wait before showing person info

  // Track which images were already prefetched globally
  const isBrowser = typeof window !== 'undefined';
  const prefetchedImages = isBrowser && window.socraticaPrefetchedImages
    ? window.socraticaPrefetchedImages
    : new Set();
    
  // Log prefetched images for debugging
  if (isBrowser && prefetchedImages.size > 0) {
    console.log(`People component using ${prefetchedImages.size} prefetched images`);
  }

  // Mobile detection
  let windowWidth;
  $: isMobile = windowWidth < 1024; // lg breakpoint in Tailwind

  onMount(() => {
    const updateWidth = () => {
      windowWidth = window.innerWidth;
    };

    window.addEventListener("resize", updateWidth);
    updateWidth();

    return () => {
      window.removeEventListener("resize", updateWidth);
      if (searchTimeout) clearTimeout(searchTimeout);
      memoizedNodes.clear();
      usedPeople.clear();
    };
  });

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
    }
  }

  let topNodes = [];
  let leftNodes = [];
  let rightNodes = [];

  function initializeNodes() {
    const nodesPerAsterism = Math.ceil(filteredPeople.length / 3);
    usedPeople = new Set(); // Reset used people
    memoizedNodes.clear(); // Clear memoized calculations

    topNodes = generateNodes(0);
    leftNodes = generateNodes(nodesPerAsterism);
    rightNodes = generateNodes(nodesPerAsterism * 2);
  }

  // Flag to track which person card is currently being shown
  let selectedPerson = null;

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

  // Optimize node generation
  function generateNodes(startIndex) {
    if (!filteredPeople || filteredPeople.length === 0) return [];

    const nodes = [];
    const gridRadius = 5;
    let personIndex = startIndex;
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

    // Pre-calculate used people set
    const localUsedPeople = new Set(usedPeople);

    // Generate nodes based on sorted positions
    for (const [q, r] of positions) {
      const coords = getNodeCoordinates(q, r);

      let person = null;
      if (personIndex < filteredPeople.length) {
        const candidate = filteredPeople[personIndex++];
        if (!localUsedPeople.has(candidate.id)) {
          localUsedPeople.add(candidate.id);
          person = candidate;
        }
      }
      
      // Check for prefetched image data
      let tinyThumbnail = null;
      let smallThumbnail = null;
      
      if (person && person.photo && !person.photo.includes('placeholder')) {
        // Extract filename for optimized versions
        const parts = person.photo.split('/');
        const filename = parts[parts.length - 1].split('.')[0];
        
        // Create optimized image paths
        tinyThumbnail = `/img-ppl/${filename}-32w.webp`;
        smallThumbnail = `/img-ppl/${filename}-64w.webp`;
        
        // Check if they're already prefetched
        const isTinyPrefetched = prefetchedImages.has(tinyThumbnail);
        const isSmallPrefetched = prefetchedImages.has(smallThumbnail);
        
        if (isBrowser && (isTinyPrefetched || isSmallPrefetched)) {
          console.log(`Using prefetched image for ${person.name}`);
        }
      }

      placeholderIndex = (placeholderIndex % 6) + 1;
      nodes.push({
        id: `${q},${r}`,
        q,
        r,
        x: coords.x,
        y: coords.y,
        person,
        isPlaceholder: !person,
        placeholderImage: !person
          ? `/img-ppl/placeholder_${placeholderIndex}.png`
          : null,
        tinyThumbnail, // Add optimized thumbnail path
        smallThumbnail, // Add small thumbnail path
        isPrefetched: tinyThumbnail && prefetchedImages.has(tinyThumbnail)
      });
    }

    // Update global used people set
    usedPeople = new Set([...usedPeople, ...localUsedPeople]);
    return nodes;
  }

  // Replace handleNodeClick function with enhanced hover detection
  function handleMouseEnter(node) {
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

  // Handle keyboard events for accessibility
  function handleKeydown(event, personId) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleNodeClick(personId);
    }
  }
</script>

<div class="block min-h-screen bg-primary">
  <div class="pt-32">
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
        class="relative w-full flex flex-col items-center overflow-hidden"
        style="height: {nodeSize * (isMobile ? 72 : 24)}px;"
      >
        <!-- Top Asterism -->
        <div
          class="relative {isMobile ? 'mb-8' : '-mb-16'} mt-8"
          style="width: {nodeSize * 20}px; height: {nodeSize * 13}px;"
        >
          {#each topNodes as node (node.id)}
            {@const isSelected =
              node.person && highlightedPerson && node.person.id === highlightedPerson.id}
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
              on:mouseenter={() => handleMouseEnter(node)}
              on:mouseleave={handleMouseLeave}
              on:click={() => node.person && handleNodeClick(node)}
              role={node.person ? "button" : "presentation"}
              aria-label={node.person
                ? `View profile for ${node.person.name}`
                : undefined}
              tabindex={node.person ? "0" : undefined}
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
                  <div class="w-full h-full bg-[#f5f5f5]{node.isPrefetched ? '' : ' bg-loading-shimmer'}">
                    <img
                      src={node.isPrefetched ? node.tinyThumbnail : "/img-ppl/tiny-placeholder.svg"}
                      data-src={node.tinyThumbnail || node.person.photo}
                      data-full-src={node.person.photo}
                      alt={node.person.name}
                      class="w-full h-full object-cover transition-opacity duration-300{node.isPrefetched ? '' : ' opacity-0'}"
                      loading="lazy"
                      decoding="async"
                      fetchpriority={node.isPrefetched ? "low" : (Math.abs(node.q) + Math.abs(node.r) < 3 ? "high" : "low")}
                      height="32"
                      width="32"
                    />
                  </div>
                {/if}
              {:else}
                <img
                  src={node.placeholderImage}
                  alt="Empty node"
                  class="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
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
                    opacity: {node.isPlaceholder ? '1' : '1'};
                  "
                on:mouseenter={() => handleMouseEnter(node)}
                on:mouseleave={handleMouseLeave}
                on:click={() => node.person && handleNodeClick(node)}
                role={node.person ? "button" : "presentation"}
                aria-label={node.person
                  ? `View profile for ${node.person.name}`
                  : undefined}
                tabindex={node.person ? "0" : undefined}
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
                    <div class="w-full h-full bg-[#f5f5f5]{node.isPrefetched ? '' : ' bg-loading-shimmer'}">
                      <img
                        src={node.isPrefetched ? node.tinyThumbnail : "/img-ppl/tiny-placeholder.svg"}
                        data-src={node.tinyThumbnail || node.person.photo}
                        data-full-src={node.person.photo}
                        alt={node.person.name}
                        class="w-full h-full object-cover transition-opacity duration-300{node.isPrefetched ? '' : ' opacity-0'}"
                        loading="lazy"
                        decoding="async"
                        fetchpriority={node.isPrefetched ? "low" : (Math.abs(node.q) + Math.abs(node.r) < 3 ? "high" : "low")}
                        height="32"
                        width="32"
                      />
                    </div>
                  {/if}
                {:else}
                  <img
                    src={node.placeholderImage}
                    alt="Empty node"
                    class="w-full h-full object-cover"
                  />
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
                    opacity: {node.isPlaceholder ? '1' : '1'};
                  "
                on:mouseenter={() => handleMouseEnter(node)}
                on:mouseleave={handleMouseLeave}
                on:click={() => node.person && handleNodeClick(node)}
                role={node.person ? "button" : "presentation"}
                aria-label={node.person
                  ? `View profile for ${node.person.name}`
                  : undefined}
                tabindex={node.person ? "0" : undefined}
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
                    <img
                      src={node.person.photo}
                      alt={node.person.name}
                      class="w-full h-full object-cover"
                    />
                  {/if}
                {:else}
                  <img
                    src={node.placeholderImage}
                    alt="Empty node"
                    class="w-full h-full object-cover"
                  />
                {/if}
              </div>
            {/each}
          </div>
        </div>
      </div>
    {/if}

    <!-- Profile card for selected person or search result -->
    {#if selectedPerson || (selectedResult && !selectedPerson)}
      {@const personId =
        selectedPerson || (selectedResult ? selectedResult.id : null)}
      {@const person = filteredPeople.find((p) => p.id === personId)}
      {#if person}
        <div class="fixed inset-0 z-30 flex items-center justify-center">
          <!-- Semi-transparent overlay -->
          <div
            class="absolute inset-0 bg-black/5 backdrop-blur-[2px]"
            on:click={closeProfile}
            on:keydown={(e) => e.key === 'Escape' && closeProfile()}
            role="button"
            tabindex="0"
            aria-label="Close profile"
          />

          <!-- Card content -->
          <div
            class="person-card bg-white shadow-lg rounded-xl p-8 z-40 relative"
            style="width: 480px;"
            in:scale={{
              duration: 200,
              delay: 0,
              start: 0.95,
              easing: cubicOut,
            }}
            out:fade={{ duration: 150 }}
            role="dialog"
            aria-label="Team member profile"
          >
            <!-- Close button -->
            <button
              class="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600"
              on:click={closeProfile}
              aria-label="Close profile"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <!-- Profile image & info container -->
            <div class="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <div
                class="overflow-hidden rounded-full w-32 h-32 shrink-0 border-4 border-[#f8f8f8]"
              >
                <img
                  src={person.photo}
                  alt={person.name}
                  class="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div>
                <h3 class="text-xl font-medium text-gray-900">{person.name}</h3>
                <p class="text-sm text-gray-500 mt-1">{person.role}</p>

                <div class="mt-4 text-sm text-gray-700 space-y-2">
                  <p>{person.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/if}
    {/if}

    <!-- Add profile card for hover functionality -->
    {#if highlightedPerson}
      <div class="profile-card" class:hover-card={!isPersonSelected} transition:fade={{duration: 200}}>
        <div class="profile-card-inner">
          <div class="profile-image-container">
            {#if highlightedPerson.photo && !highlightedPerson.photo.includes('placeholder')}
              <img 
                src={highlightedPerson.photo} 
                alt={highlightedPerson.name} 
                loading="lazy"
                class="profile-image"
              />
            {:else}
              <div class="placeholder-image"></div>
            {/if}
          </div>
          <div class="profile-info">
            <h3>{highlightedPerson.name}</h3>
            <p class="role">{highlightedPerson.role || ""}</p>
            <p class="description">{highlightedPerson.description || ""}</p>
          </div>
        </div>
        
        <!-- Close button only shown when explicitly selected -->
        {#if isPersonSelected}
          <button 
            class="close-button" 
            on:click={closeProfile}
            aria-label="Close profile"
          >
            ×
          </button>
        {/if}
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

  /* Enhanced hover effects for dot-container */
  .absolute {
    will-change: transform;
    transition: transform 0.3s cubic-bezier(0.2, 0, 0.2, 1);
    backface-visibility: hidden;
  }
  
  .absolute:hover {
    z-index: 10;
  }
  
  /* Enhanced profile card */
  .profile-card {
    position: fixed;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    background: white;
    border-radius: 1rem;
    padding: 1.5rem;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    z-index: 50;
    max-width: 90%;
    width: 400px;
    backface-visibility: hidden;
    will-change: transform, opacity;
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
  
  /* Styling for hover-only cards vs explicitly selected */
  .profile-card.hover-card {
    padding: 1rem;
    width: 350px;
    bottom: 2rem;
    opacity: 0.95;
  }
  
  /* Close button */
  .close-button {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.05);
    border: none;
    font-size: 1.5rem;
    line-height: 1;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
  }
  
  .close-button:hover {
    background: rgba(0, 0, 0, 0.1);
  }
  
  .profile-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }
  
  .profile-image.loaded {
    opacity: 1;
  }
  
  /* Placeholder image */
  .placeholder-image {
    background-color: #f0f0f0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
</style>
