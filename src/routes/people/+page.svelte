<script>
  import Navbar from "$lib/components/navbar.svelte";
  import { onMount } from "svelte";
  import { fade, scale } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import peopleData from './people.json';
  
  // Search functionality variables
  let searchQuery = "";
  let searchResults = [];
  let selectedResult = null;
  let searchTimeout;
  let isLoading = true;
  
  // Filter people data once on load with safety checks
  $: filteredPeople = peopleData ? peopleData.filter(p => 
    !p.name.includes('Future') && 
    !p.name.includes('Community') && 
    !p.name.includes('Team') && 
    !p.name.includes('Collaborators')
  ) : [];
  
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
    const xBase = nodeSpacing * (Math.sqrt(3) * q + Math.sqrt(3)/2 * r);
    const yBase = nodeSpacing * (3/2 * r);
    
    const coords = {
      x: xBase * Math.cos(angle) - yBase * Math.sin(angle),
      y: xBase * Math.sin(angle) + yBase * Math.cos(angle)
    };
    
    memoizedNodes.set(key, coords);
    return coords;
  }
  
  // Optimize isPartOfAsterisk check
  function isPartOfAsterisk(q, r) {
    const s = -q-r;
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
        const s = -q-r;
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
      
      placeholderIndex = (placeholderIndex % 6) + 1;
      nodes.push({
        id: `${q},${r}`,
        q,
        r,
        x: coords.x,
        y: coords.y,
        person,
        isPlaceholder: !person,
        placeholderImage: !person ? `/img-ppl/placeholder_${placeholderIndex}.png` : null
      });
    }
    
    // Update global used people set
    usedPeople = new Set([...usedPeople, ...localUsedPeople]);
    return nodes;
  }

  function handleNodeClick(personId) {
    selectedPerson = personId;
  }

  // Function to close profile popup manually
  function closeProfile() {
    console.log("Close profile button clicked");
    selectedPerson = null;
    selectedResult = null;
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
        .filter(p => p.name.toLowerCase().includes(query))
        .slice(0, 10); // Limit results to improve performance
    }, 300); // Reduced debounce time
  }

  function selectSearchResult(result) {
    selectedResult = result;
    selectedPerson = result.id;
  }

  // Cleanup on component unmount
  onMount(() => {
    return () => {
      if (searchTimeout) clearTimeout(searchTimeout);
      memoizedNodes.clear();
      usedPeople.clear();
    };
  });
</script>

<div class="block min-h-screen bg-primary">
  <Navbar />

  <div class="absolute top-20 left-10 sm:left-20 transform">
    <a href="/">
      <h1 class="text-2xl font-tiempos-headline">Socratica</h1>
    </a>
  </div>

  <div class="pt-32 px-8 md:px-16 lg:px-24">
    <div class="flex justify-between items-center mb-10">
      <h2 class="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-tiempos-headline">
        The <i>people</i> behind it all.
      </h2>

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
            <div class="absolute z-30 mt-1 w-full bg-white rounded-lg shadow-lg border border-[#e0e0e0] max-h-60 overflow-y-auto">
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
            <div class="absolute z-30 mt-1 w-full bg-white rounded-lg shadow-lg border border-[#e0e0e0] p-3">
              <div class="text-gray-500">No matching team members found</div>
            </div>
          {/if}
        </div>
      </div>
    </div>

    <!-- Description -->
    <div class="mb-16 max-w-4xl">
      <p class="text-[11px] md:text-[17px] lg:text-lg leading-relaxed" style="font-family: 'Untitled Sans', sans-serif;">
        Socratica is built by a diverse community of creators, thinkers, and makers.<br>Click to learn more about the individuals.
      </p>
    </div>

    <!-- Loading state -->
    {#if isLoading}
      <div class="flex justify-center items-center h-[60vh]">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-[#333] border-t-transparent"></div>
      </div>
    {:else}
      <!-- Asterisk Pattern Display -->
      <div class="relative w-full overflow-hidden flex flex-col items-center" style="height: {nodeSize * 24}px;">
        <!-- Top Asterism -->
        <div class="relative -mb-16 mt-8" style="width: {nodeSize * 20}px; height: {nodeSize * 13}px;">
          {#each topNodes as node (node.id)}
            {@const isSelected = node.person && selectedPerson === node.person.id}
            <div
              class="absolute rounded-full overflow-hidden border-2 transition-transform duration-200 {node.isPlaceholder ? 'border-[#e0e0e0] bg-[#f5f5f5]' : 'border-[#FBF8EF] cursor-pointer hover:scale-110'}"
              style="
                width: {nodeSize}px;
                height: {nodeSize}px;
                left: 50%;
                top: 50%;
                margin-left: {node.x}px;
                margin-top: {node.y}px;
                transform: translate(-50%, -50%) {isSelected ? 'scale(1.1)' : 'scale(1)'};
                z-index: {isSelected ? 20 : 5};
                {node.person ? '' : 'will-change: transform;'}
              "
              on:click={() => node.person && handleNodeClick(node.person.id)}
              role={node.person ? "button" : "presentation"}
              aria-label={node.person ? `View profile for ${node.person.name}` : undefined}
              tabindex={node.person ? "0" : "-1"}
            >
              {#if node.person}
                {#if node.person.photo === "https://via.placeholder.com/150"}
                  <div class="w-full h-full bg-[#404040] flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-[#CCCCCC]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                {:else}
                  <img
                    src={node.person.photo}
                    alt={node.person.name}
                    class="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
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
        <div class="flex justify-center gap-24 mt-8">
          <!-- Left Asterism -->
          <div class="relative" style="width: {nodeSize * 20}px; height: {nodeSize * 13}px;">
            {#each leftNodes as node}
              {@const isSelected = node.person && selectedPerson === node.person.id}
              <div
                class="absolute rounded-full overflow-hidden border-2 transition-all duration-300 {node.isPlaceholder ? 'border-[#e0e0e0] bg-[#f5f5f5]' : 'border-[#FBF8EF] cursor-pointer hover:scale-110'}"
                style="
                  width: {nodeSize}px;
                  height: {nodeSize}px;
                  left: 50%;
                  top: 50%;
                  margin-left: {node.x}px;
                  margin-top: {node.y}px;
                  transform: translate(-50%, -50%) {isSelected ? 'scale(1.1)' : 'scale(1)'};
                  z-index: {isSelected ? 20 : 5};
                  filter: brightness({isSelected ? 1.2 : 1});
                  opacity: {node.isPlaceholder ? '1' : '1'};
                "
                on:click={() => node.person && handleNodeClick(node.person.id)}
                role={node.person ? "button" : "presentation"}
                aria-label={node.person ? `View profile for ${node.person.name}` : undefined}
                tabindex={node.person ? "0" : "-1"}
              >
                {#if node.person}
                  {#if node.person.photo === "https://via.placeholder.com/150"}
                    <div class="w-full h-full bg-[#404040] flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-[#CCCCCC]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
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

          <!-- Right Asterism -->
          <div class="relative" style="width: {nodeSize * 20}px; height: {nodeSize * 13}px;">
            {#each rightNodes as node}
              {@const isSelected = node.person && selectedPerson === node.person.id}
              <div
                class="absolute rounded-full overflow-hidden border-2 transition-all duration-300 {node.isPlaceholder ? 'border-[#e0e0e0] bg-[#f5f5f5]' : 'border-[#FBF8EF] cursor-pointer hover:scale-110'}"
                style="
                  width: {nodeSize}px;
                  height: {nodeSize}px;
                  left: 50%;
                  top: 50%;
                  margin-left: {node.x}px;
                  margin-top: {node.y}px;
                  transform: translate(-50%, -50%) {isSelected ? 'scale(1.1)' : 'scale(1)'};
                  z-index: {isSelected ? 20 : 5};
                  filter: brightness({isSelected ? 1.2 : 1});
                  opacity: {node.isPlaceholder ? '1' : '1'};
                "
                on:click={() => node.person && handleNodeClick(node.person.id)}
                role={node.person ? "button" : "presentation"}
                aria-label={node.person ? `View profile for ${node.person.name}` : undefined}
                tabindex={node.person ? "0" : "-1"}
              >
                {#if node.person}
                  {#if node.person.photo === "https://via.placeholder.com/150"}
                    <div class="w-full h-full bg-[#404040] flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-[#CCCCCC]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
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
      {@const personId = selectedPerson || (selectedResult ? selectedResult.id : null)}
      {@const person = filteredPeople.find(p => p.id === personId)}
      {#if person}
        <div class="fixed inset-0 z-30 flex items-center justify-center">
          <!-- Semi-transparent overlay -->
          <div class="absolute inset-0 bg-black/5 backdrop-blur-[2px]" on:click={closeProfile}></div>
          
          <!-- Card content -->
          <div 
            class="person-card bg-white shadow-lg rounded-xl p-8 z-40 relative"
            style="width: 480px;"
            in:scale={{duration: 200, delay: 0, start: 0.95, easing: cubicOut}}
            out:fade={{duration: 150}}
            role="dialog"
            aria-label="Team member profile"
          >
            <!-- Close button -->
            <button 
              class="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
              on:click={closeProfile}
              aria-label="Close profile"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <div class="flex items-center">
              {#if person.photo === "https://via.placeholder.com/150"}
                <div class="w-32 h-32 rounded-full mr-6 bg-[#404040] flex items-center justify-center border-2 border-[#FBF8EF]">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-[#CCCCCC]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              {:else}
                <img src={person.photo} alt={person.name} class="w-32 h-32 rounded-full mr-6 object-cover border-2 border-[#FBF8EF]" />
              {/if}
              <div>
                <h3 class="font-tiempos-headline text-2xl font-bold mb-1">{person.name}</h3>
                <p class="text-base text-gray-600 font-mono">{person.location}</p>
                <p class="text-sm text-gray-500 mt-1 font-mono">{person.role}</p>
              </div>
            </div>
            <div class="mt-6">
              <ul class="list-disc pl-6 space-y-2" style="font-family: 'Untitled Sans', sans-serif;">
                {#each person.facts as fact}
                  <li class="text-[15px] leading-relaxed text-gray-700">{fact}</li>
                {/each}
              </ul>
            </div>
          </div>
        </div>
      {/if}
    {/if}
  </div>
</div>

<style>
  /* Card styling */
  .person-card {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
    border: 1px solid rgba(0, 0, 0, 0.08);
  }
</style> 