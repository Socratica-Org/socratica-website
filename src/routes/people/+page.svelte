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
  let people = peopleData.filter(p => !p.name.includes('Future') && !p.name.includes('Community') && !p.name.includes('Team') && !p.name.includes('Collaborators'));
  
  // Flag to track which person card is currently being hovered
  let hoveredPerson = null;
  
  // Asterisk pattern configuration
  const nodeSize = 32; // Reduced size from 36px to 32px
  const nodeSpacing = nodeSize - 12; // Increased overlap from -8 to -12 to bring nodes even closer
  
  // Function to generate nodes in asterisk pattern
  function generateNodes() {
    const nodeMap = new Map();
    const gridRadius = 7;
    let personIndex = 0;
    
    // Function to add a node to the grid
    function addNode(q, r) {
      const key = `${q},${r}`;
      if (!nodeMap.has(key)) {
        // Convert hex coordinates to pixel coordinates
        // Using flat-topped hexagon orientation, rotated by 30 degrees
        const angle = Math.PI / 6; // 30 degrees in radians
        const xBase = nodeSpacing * (Math.sqrt(3) * q + Math.sqrt(3)/2 * r);
        const yBase = nodeSpacing * (3/2 * r);
        
        // Apply rotation
        const x = xBase * Math.cos(angle) - yBase * Math.sin(angle);
        const y = xBase * Math.sin(angle) + yBase * Math.cos(angle);
        
        const person = personIndex < people.length ? people[personIndex++] : null;
        
        nodeMap.set(key, {
          id: key,
          q,
          r,
          x,
          y,
          person,
          isPlaceholder: !person
        });
      }
    }
    
    // Function to determine if a position is part of the asterisk pattern
    function isPartOfAsterisk(q, r) {
      // Center point
      if (q === 0 && r === 0) return true;
      
      // Calculate distance from center in hex grid
      const s = -q-r; // Third hex coordinate (q+r+s=0)
      
      // Check if point lies approximately along one of the 6 arms
      // Arms rotated 30° from previous position
      const arm1 = Math.abs(q) <= 1 && Math.abs(r) <= gridRadius; // Vertical arm
      const arm2 = Math.abs(s + r) <= 1 && Math.abs(s) <= gridRadius; // 60° arm
      const arm3 = Math.abs(q + s) <= 1 && Math.abs(s) <= gridRadius; // 120° arm
      const arm4 = Math.abs(r) <= 1 && Math.abs(q) <= gridRadius; // 180° arm
      const arm5 = Math.abs(q + r) <= 1 && Math.abs(q) <= gridRadius; // 240° arm
      const arm6 = Math.abs(s) <= 1 && Math.abs(r) <= gridRadius; // 300° arm
      
      return arm1 || arm2 || arm3 || arm4 || arm5 || arm6;
    }
    
    // Generate the grid nodes
    for (let q = -gridRadius; q <= gridRadius; q++) {
      for (let r = -gridRadius; r <= gridRadius; r++) {
        const s = -q-r;
        if (Math.abs(s) <= gridRadius && isPartOfAsterisk(q, r)) {
          addNode(q, r);
        }
      }
    }
    
    return Array.from(nodeMap.values());
  }
  
  // Create the nodes
  const nodes = generateNodes();
  
  // Function to handle hover state
  function handleHover(personId) {
    console.log("Hover triggered with person ID:", personId);
    hoveredPerson = personId;
  }

  // Function to reset hover state
  function resetHover() {
    console.log("Hover reset called");
    hoveredPerson = null;
  }

  // Function to close profile popup manually
  function closeProfile() {
    console.log("Close profile button clicked");
    hoveredPerson = null;
    selectedResult = null;
  }

  // Search functionality
  function handleSearch(event) {
    searchQuery = event.target.value;
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    searchTimeout = setTimeout(() => {
      searchResults = people.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }, 500);
  }

  function selectSearchResult(result) {
    selectedResult = result;
    hoveredPerson = result.id;
  }
</script>

<div class="block min-h-screen bg-primary">
  <Navbar />

  <div class="absolute top-20 left-10 sm:left-20 transform">
    <a href="/">
      <h1 class="text-2xl font-tiempos-headline">Socratica</h1>
    </a>
  </div>

  <div class="pt-32 px-8 md:px-16 lg:px-24">
    <h2 class="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-tiempos-headline mb-10">
      The <i>people</i> behind it all.
    </h2>
    
    <div class="mt-8 md:mt-16 mb-16 max-w-4xl">
      <p class="text-[11px] md:text-[17px] lg:text-lg leading-relaxed mb-4" style="font-family: 'Untitled Sans', sans-serif;">
        Socratica is built by a diverse community of creators, thinkers, and makers
        who share a passion for collaborative learning and building meaningful projects.
      </p>
      <p class="text-[11px] md:text-[17px] lg:text-lg leading-relaxed mb-4" style="font-family: 'Untitled Sans', sans-serif;">
        Hover over the profiles below to learn more about the individuals who contribute 
        to our community and help make Socratica what it is today.
      </p>
      
      <!-- Search Bar -->
      <div class="mb-10 max-w-md">
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
                  <div class="text-sm text-gray-500">{result.role}</div>
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

    <!-- Asterisk Pattern Display -->
    <div class="relative w-full overflow-hidden flex justify-center items-center py-20">
      <div class="relative" style="width: {nodeSize * 20}px; height: {nodeSize * 20}px;">
        <!-- All nodes (including placeholders) -->
        {#each nodes as node}
          {@const isHovered = node.person && hoveredPerson === node.person.id}
          <div
            class="absolute rounded-full overflow-hidden border-2 transition-all duration-300 {node.isPlaceholder ? 'border-[#e0e0e0] bg-[#f5f5f5]' : 'border-[#FBF8EF] cursor-pointer'}"
            style="
              width: {nodeSize}px;
              height: {nodeSize}px;
              left: 50%;
              top: 50%;
              margin-left: {node.x}px;
              margin-top: {node.y}px;
              transform: translate(-50%, -50%) {isHovered ? 'scale(1.1)' : 'scale(1)'};
              z-index: {isHovered ? 20 : 5};
              filter: brightness({isHovered ? 1.2 : 1});
              opacity: {node.isPlaceholder ? '0.5' : '1'};
            "
            on:mouseenter={() => node.person && handleHover(node.person.id)}
            on:mouseleave={resetHover}
            role={node.person ? "button" : "presentation"}
            aria-label={node.person ? `View profile for ${node.person.name}` : undefined}
            tabindex={node.person ? "0" : "-1"}
          >
            {#if node.person}
              <img
                src={node.person.photo}
                alt={node.person.name}
                class="w-full h-full object-cover"
              />
            {:else}
              <div class="w-full h-full bg-[#f5f5f5] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-[#ccc]" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                </svg>
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </div>
        
    <!-- Profile card for hovered person or search result -->
    {#if hoveredPerson || (selectedResult && !hoveredPerson)}
      {@const personId = hoveredPerson || (selectedResult ? selectedResult.id : null)}
      {@const person = people.find(p => p.id === personId)}
      {#if person}
        <div 
          class="fixed person-card bg-white shadow-lg rounded-xl p-5 z-40"
          style="right: 2rem; top: 8rem; width: 340px; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);"
          in:scale={{duration: 150, delay: 0, start: 0.95, easing: cubicOut}}
          out:fade={{duration: 100}}
          role="dialog"
          aria-label="Team member profile"
        >
          <!-- Close button -->
          <button 
            class="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
            on:click={closeProfile}
            aria-label="Close profile"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <div class="flex items-center">
            <img src={person.photo} alt={person.name} class="w-24 h-24 rounded-full mr-4 object-cover border-2 border-[#FBF8EF]" />
            <div>
              <h3 class="font-tiempos-headline text-xl font-bold">{person.name}</h3>
              <p class="text-sm text-gray-600 font-mono">{person.role}</p>
            </div>
          </div>
          <div class="mt-4">
            <ul class="list-disc pl-5 text-sm space-y-1" style="font-family: 'Untitled Sans', sans-serif;">
              {#each person.description as line}
                <li class="text-[13px]">{line}</li>
              {/each}
            </ul>
          </div>
        </div>
      {/if}
    {/if}
  </div>
</div>

<style>
  /* Card styling */
  .person-card {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    border: 1px solid rgba(0, 0, 0, 0.05);
  }
</style> 