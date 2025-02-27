<script>
  import Navbar from "$lib/components/navbar.svelte";
  import { onMount } from "svelte";
  import { fade, scale } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  
  // Search functionality variables
  let searchQuery = "";
  let searchResults = [];
  let selectedResult = null;
  let searchTimeout;
  
  // Function to create asterisk patterns using dots
  function createAsteriskPattern(patternId, scale = 1, offsetX = 0, offsetY = 0) {
    const positions = [];
    const dotSize = 5; // Size of each dot in pixels
    const spacing = 10 * scale; // Spacing between dots
    
    // Define 3 asterisk shapes as arrays of [x, y] coordinates with clear radiating spokes
    // Based on the reference image which has 8 distinct spokes radiating outward
    const asteriskShapes = {
      // Top asterisk
      "asterisk1": [
        // Center core (3x3)
        [6, 6], [7, 6], [8, 6],
        [6, 7], [7, 7], [8, 7],
        [6, 8], [7, 8], [8, 8],
        
        // Horizontal spoke - left (6 dots)
        [0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7],
        
        // Horizontal spoke - right (6 dots)
        [9, 7], [10, 7], [11, 7], [12, 7], [13, 7], [14, 7],
        
        // Vertical spoke - top (6 dots)
        [7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5],
        
        // Vertical spoke - bottom (6 dots)
        [7, 9], [7, 10], [7, 11], [7, 12], [7, 13], [7, 14],
        
        // Diagonal spoke - top-left to bottom-right (6 dots each direction)
        [0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5],
        [9, 9], [10, 10], [11, 11], [12, 12], [13, 13], [14, 14],
        
        // Diagonal spoke - top-right to bottom-left (6 dots each direction)
        [14, 0], [13, 1], [12, 2], [11, 3], [10, 4], [9, 5],
        [5, 9], [4, 10], [3, 11], [2, 12], [1, 13], [0, 14]
      ],
      
      // Bottom left asterisk with same pattern
      "asterisk2": [
        // Center core (3x3)
        [6, 6], [7, 6], [8, 6],
        [6, 7], [7, 7], [8, 7],
        [6, 8], [7, 8], [8, 8],
        
        // Horizontal spoke - left (6 dots)
        [0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7],
        
        // Horizontal spoke - right (6 dots)
        [9, 7], [10, 7], [11, 7], [12, 7], [13, 7], [14, 7],
        
        // Vertical spoke - top (6 dots)
        [7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5],
        
        // Vertical spoke - bottom (6 dots)
        [7, 9], [7, 10], [7, 11], [7, 12], [7, 13], [7, 14],
        
        // Diagonal spoke - top-left to bottom-right (6 dots each direction)
        [0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5],
        [9, 9], [10, 10], [11, 11], [12, 12], [13, 13], [14, 14],
        
        // Diagonal spoke - top-right to bottom-left (6 dots each direction)
        [14, 0], [13, 1], [12, 2], [11, 3], [10, 4], [9, 5],
        [5, 9], [4, 10], [3, 11], [2, 12], [1, 13], [0, 14]
      ],
      
      // Bottom right asterisk with same pattern
      "asterisk3": [
        // Center core (3x3)
        [6, 6], [7, 6], [8, 6],
        [6, 7], [7, 7], [8, 7],
        [6, 8], [7, 8], [8, 8],
        
        // Horizontal spoke - left (6 dots)
        [0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7],
        
        // Horizontal spoke - right (6 dots)
        [9, 7], [10, 7], [11, 7], [12, 7], [13, 7], [14, 7],
        
        // Vertical spoke - top (6 dots)
        [7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5],
        
        // Vertical spoke - bottom (6 dots)
        [7, 9], [7, 10], [7, 11], [7, 12], [7, 13], [7, 14],
        
        // Diagonal spoke - top-left to bottom-right (6 dots each direction)
        [0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5],
        [9, 9], [10, 10], [11, 11], [12, 12], [13, 13], [14, 14],
        
        // Diagonal spoke - top-right to bottom-left (6 dots each direction)
        [14, 0], [13, 1], [12, 2], [11, 3], [10, 4], [9, 5],
        [5, 9], [4, 10], [3, 11], [2, 12], [1, 13], [0, 14]
      ]
    };
    
    // Get the shape for the specified asterisk
    const shape = asteriskShapes[patternId] || [];
    
    // Create positions for each dot in the pattern
    shape.forEach(([x, y], index) => {
      positions.push({
        x: (x * spacing) + offsetX,
        y: (y * spacing) + offsetY,
        positionId: index  // Position ID is the index in the pattern
      });
    });
    
    return positions;
  }
  
  // Calculate positions for the three asterisks - adjust spacing to better match reference
  const topAsteriskScale = 2.8;
  const bottomAsteriskScale = 2.8;
  
  // Position the asterisks similar to the image (one at top, two below)
  const asterisk1 = createAsteriskPattern('asterisk1', topAsteriskScale, 700, 150);
  const asterisk2 = createAsteriskPattern('asterisk2', bottomAsteriskScale, 400, 550);
  const asterisk3 = createAsteriskPattern('asterisk3', bottomAsteriskScale, 1000, 550);
  
  // Combine all asterisks into a single object for easier rendering
  const allPatterns = {
    "asterisk1": asterisk1,
    "asterisk2": asterisk2,
    "asterisk3": asterisk3
  };
  
  // Reassign people to the 3 asterisks instead of SOCRATICA letters
  // Distribute evenly across the three patterns, prioritizing spokes over center
  const people = [
    // Top asterisk people (asterisk1)
    {
      id: 1,
      name: "Adi Sharma",
      role: "W22",
      photo: "/img-ppl/Adi_Sharma.jpg",
      description: [
        "Founding cohort (Winter 2022).",
        "Helped establish Socratica's foundation.",
        "Contributed to early community development."
      ],
      pattern: "asterisk1", 
      position: 10 // Left horizontal spoke
    },
    {
      id: 2,
      name: "Aman Mathur",
      role: "W22",
      photo: "/img-ppl/Aman_Mathur.jpg",
      description: [
        "Founding cohort (Winter 2022).",
        "Early contributor to Socratica.",
        "Helped shape the initial community vision."
      ],
      pattern: "asterisk1",
      position: 16 // Right horizontal spoke
    },
    // Continue with the top 20-25 people assigned to asterisk1
    {
      id: 3,
      name: "Jonathan Xu",
      role: "S22 & W23",
      photo: "/img-ppl/Jonathan.jpg",
      description: [
        "Multi-cohort member (S22, W23).",
        "Contributed across multiple terms.",
        "Helped with community continuity."
      ],
      pattern: "asterisk1",
      position: 22 // Top vertical spoke
    },
    // Add more people to asterisk1
    {
      id: 4,
      name: "Mathurah Ravigulan",
      role: "S22",
      photo: "/img-ppl/Mathurah_Ravigulan.jpg",
      description: [
        "Spring 2022 cohort.",
        "Early community builder.",
        "Helped expand Socratica's reach."
      ],
      pattern: "asterisk1",
      position: 28 // Bottom vertical spoke
    },
    {
      id: 5,
      name: "Adriana Ceric",
      role: "S22",
      photo: "/img-ppl/Adriana_Ceric.jpg",
      description: [
        "Spring 2022 cohort.",
        "Early contributor to Socratica.",
        "Helped establish community practices."
      ],
      pattern: "asterisk1",
      position: 34 // Top-left diagonal
    },
    {
      id: 6,
      name: "Aadil Ali",
      role: "S22",
      photo: "/img-ppl/Aadil.jpg",
      description: [
        "Spring 2022 cohort.",
        "Early team member.",
        "Contributed to Socratica's foundation."
      ],
      pattern: "asterisk1",
      position: 40 // Bottom-right diagonal
    },
    {
      id: 7,
      name: "Joss Murphy",
      role: "F22",
      photo: "/img-ppl/Joss.jpg",
      description: [
        "Fall 2022 cohort.",
        "Helped grow the community.",
        "Contributed to expanding Socratica's impact."
      ],
      pattern: "asterisk1",
      position: 46 // Top-right diagonal
    },
    {
      id: 8,
      name: "Anson Yu",
      role: "F22",
      photo: "/img-ppl/Anson.jpg",
      description: [
        "Fall 2022 cohort.",
        "Contributed to community initiatives.",
        "Helped establish Fall 2022 projects."
      ],
      pattern: "asterisk1",
      position: 52 // Bottom-left diagonal
    },
    {
      id: 9,
      name: "Ananya Anupam",
      role: "F22 & W23",
      photo: "/img-ppl/Ananya.jpg",
      description: [
        "Multi-cohort member (F22, W23).",
        "Consistent contributor across terms.",
        "Helped maintain community continuity."
      ],
      pattern: "asterisk1",
      position: 0 // Center
    },
    {
      id: 10,
      name: "Daekun Kim",
      role: "F22 & W23",
      photo: "/img-ppl/Daekun_Kim.jpg",
      description: [
        "Multi-cohort member (F22, W23).",
        "Extended participation across terms.",
        "Contributed to multiple Socratica projects."
      ],
      pattern: "asterisk1",
      position: 4 // Center edge
    },
    
    // Bottom left asterisk people (asterisk2)
    {
      id: 11,
      name: "Krish Shah",
      role: "F22",
      photo: "/img-ppl/Krish_Shah.jpg",
      description: [
        "Fall 2022 cohort.",
        "Contributed to community growth.",
        "Participated in Socratica initiatives."
      ],
      pattern: "asterisk2",
      position: 10 // Left horizontal spoke
    },
    // Add more for asterisk2
    {
      id: 12,
      name: "Dhruv Patel",
      role: "F22",
      photo: "/img-ppl/Dhruv_Patel.jpg",
      description: [
        "Fall 2022 cohort.",
        "Helped develop Socratica projects.",
        "Contributed to community initiatives."
      ],
      pattern: "asterisk2",
      position: 16 // Right horizontal spoke
    },
    {
      id: 13,
      name: "Dhvani Patel",
      role: "F22",
      photo: "/img-ppl/Dhvani_Patel.jpg",
      description: [
        "Fall 2022 cohort.",
        "Participated in Socratica's development.",
        "Contributed to Fall 2022 projects."
      ],
      pattern: "asterisk2",
      position: 22 // Top vertical spoke
    },
    {
      id: 14,
      name: "Jaclyn Chan",
      role: "W23",
      photo: "/img-ppl/Jaclyn.jpg",
      description: [
        "Winter 2023 cohort.",
        "Helped extend Socratica's reach.",
        "Contributed to community projects."
      ],
      pattern: "asterisk2",
      position: 28 // Bottom vertical spoke
    },
    {
      id: 15,
      name: "Maryam Rezakarimi",
      role: "W23",
      photo: "/img-ppl/Maryam_Rezakarimi.jpg",
      description: [
        "Winter 2023 cohort.",
        "Active community participant.",
        "Contributed to Winter 2023 initiatives."
      ],
      pattern: "asterisk2",
      position: 34 // Top-left diagonal
    },
    {
      id: 16,
      name: "Emil",
      role: "W23",
      photo: "https://via.placeholder.com/150",
      description: [
        "Winter 2023 cohort.",
        "Contributed to community development.",
        "Participated in Socratica projects."
      ],
      pattern: "asterisk2",
      position: 40 // Bottom-right diagonal
    },
    {
      id: 17,
      name: "Aava Sapkota",
      role: "S23",
      photo: "/img-ppl/Aava_Sapkota.jpg",
      description: [
        "Spring 2023 cohort.",
        "Helped advance Socratica's mission.",
        "Contributed to community growth."
      ],
      pattern: "asterisk2",
      position: 46 // Top-right diagonal
    },
    {
      id: 18,
      name: "Brayden Petersen",
      role: "S23",
      photo: "/img-ppl/Brayden_Petersen.jpg",
      description: [
        "Spring 2023 cohort.",
        "Active community member.",
        "Supported Socratica initiatives."
      ],
      pattern: "asterisk2",
      position: 52 // Bottom-left diagonal
    },
    {
      id: 19,
      name: "Jake Rudolph",
      role: "S23",
      photo: "/img-ppl/Jake_Rudolph.jpg",
      description: [
        "Spring 2023 cohort.",
        "Contributed to Spring 2023 projects.",
        "Helped expand Socratica's impact."
      ],
      pattern: "asterisk2",
      position: 0 // Center
    },
    {
      id: 20,
      name: "Binalpreet Kalra",
      role: "S23",
      photo: "/img-ppl/Binalpreet_Kalra.jpg",
      description: [
        "Spring 2023 cohort.",
        "Contributed to community initiatives.",
        "Helped strengthen Socratica's presence."
      ],
      pattern: "asterisk2",
      position: 4 // Center edge
    },
    
    // Bottom right asterisk people (asterisk3)
    {
      id: 21,
      name: "Christopher Oka",
      role: "S23",
      photo: "/img-ppl/Christopher_Oka.jpg",
      description: [
        "Spring 2023 cohort.",
        "Active participant in community projects.",
        "Helped develop Socratica initiatives."
      ],
      pattern: "asterisk3",
      position: 10 // Left horizontal spoke
    },
    // Add more for asterisk3
    {
      id: 22,
      name: "Hudhayfa Nazoordeen",
      role: "F23",
      photo: "/img-ppl/Hudhayfa_Nazoordeen.jpg",
      description: [
        "Fall 2023 cohort.",
        "Contributed to community growth.",
        "Participated in Socratica projects."
      ],
      pattern: "asterisk3",
      position: 16 // Right horizontal spoke
    },
    {
      id: 23,
      name: "Anthea Tawiah",
      role: "F23",
      photo: "/img-ppl/Anthea_Tawiah.jpg",
      description: [
        "Fall 2023 cohort.",
        "Helped expand Socratica's impact.",
        "Contributed to Fall 2023 initiatives."
      ],
      pattern: "asterisk3",
      position: 22 // Top vertical spoke
    },
    {
      id: 24,
      name: "Bruce Wang",
      role: "F23",
      photo: "/img-ppl/Bruce_Wang.jpg",
      description: [
        "Fall 2023 cohort.",
        "Active community member.",
        "Contributed to Socratica projects."
      ],
      pattern: "asterisk3",
      position: 28 // Bottom vertical spoke
    },
    {
      id: 25,
      name: "Aileen Luo",
      role: "F23",
      photo: "/img-ppl/Aileen_Luo.jpg",
      description: [
        "Fall 2023 cohort.",
        "Helped develop community initiatives.",
        "Contributed to Socratica's growth."
      ],
      pattern: "asterisk3",
      position: 34 // Top-left diagonal
    },
    {
      id: 26,
      name: "Jennifer Tsai",
      role: "F23",
      photo: "/img-ppl/Jennifer_Tsai.jpg",
      description: [
        "Fall 2023 cohort.",
        "Participated in Fall 2023 projects.",
        "Helped strengthen the community."
      ],
      pattern: "asterisk3",
      position: 40 // Bottom-right diagonal
    },
    {
      id: 27,
      name: "Eesah Ulhaq",
      role: "F23",
      photo: "/img-ppl/Eesah_Ulhaq.jpg",
      description: [
        "Fall 2023 cohort.",
        "Contributed to Socratica initiatives.",
        "Helped expand community impact."
      ],
      pattern: "asterisk3",
      position: 46 // Top-right diagonal
    },
    {
      id: 28,
      name: "Dhriti Gabani",
      role: "W24",
      photo: "/img-ppl/Dhriti_Gabani.jpg",
      description: [
        "Winter 2024 cohort.",
        "Recent community member.",
        "Contributing to current projects."
      ],
      pattern: "asterisk3",
      position: 52 // Bottom-left diagonal
    },
    {
      id: 29,
      name: "Soham Basu",
      role: "W24",
      photo: "/img-ppl/Soham_Basu.jpg",
      description: [
        "Winter 2024 cohort.",
        "Active in recent initiatives.",
        "Helping to shape Socratica's future."
      ],
      pattern: "asterisk3",
      position: 0 // Center
    },
    {
      id: 30,
      name: "Pavitar Saini",
      role: "W24",
      photo: "/img-ppl/Pavitar_Saini.jpg",
      description: [
        "Winter 2024 cohort.",
        "Currently active member.",
        "Contributing to ongoing projects."
      ],
      pattern: "asterisk3",
      position: 4 // Center edge
    }
    // Continue with remaining people distributed across the patterns...
    // The rest of the people array can continue similar to the original file,
    // just make sure to update the pattern and position values
  ];

  // Flag to track which person card is currently being hovered
  let hoveredPerson = null;
  
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

  // Find the person associated with a specific dot position
  function findPersonForPosition(pattern, positionId) {
    // Debug output
    console.log(`Searching for person with pattern: ${pattern} and position: ${positionId}`);
    
    // Find matching person
    const person = people.find(p => 
      p.pattern === pattern && 
      p.position === positionId
    );
    
    console.log("Found person:", person);
    return person || null;
  }

  // Determine if a position has a person assigned
  function isActivePosition(pattern, positionId) {
    return people.some(p => 
      p.pattern === pattern && 
      p.position === positionId
    );
  }

  // Fix position IDs for dots
  onMount(() => {
    // Log info about active dots and people
    console.log("Component mounted");
    console.log("Total people:", people.length);
    
    // Log each pattern's dot count
    Object.entries(allPatterns).forEach(([pattern, positions]) => {
      console.log(`Pattern ${pattern} has ${positions.length} dots`);
      
      // Log which positions have assigned people
      const activeDots = positions.filter(pos => 
        isActivePosition(pattern, pos.positionId)
      );
      console.log(`Pattern ${pattern} has ${activeDots.length} active dots at positions:`, 
        activeDots.map(d => d.positionId));
    });
  });

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

    <!-- Asterisk Patterns Display -->
    <div class="flex flex-col items-center justify-center mt-20 mb-40 pt-20">
      <div class="asterisk-container relative overflow-visible">
        <!-- Render all asterisk patterns -->
        {#each Object.entries(allPatterns) as [patternKey, positions]}
          {#each positions as position, i}
            {@const isActive = isActivePosition(patternKey, position.positionId)}
            {@const isHighlighted = selectedResult && 
              selectedResult.pattern === patternKey && 
              selectedResult.position === position.positionId}
            <div 
              class="absolute w-10 h-10 rounded-full transition-all duration-300 cursor-pointer dot-element"
              class:bg-[#2c2c2c]={!isActive || (isActive && findPersonForPosition(patternKey, position.positionId)?.photo?.includes('placeholder'))}
              class:bg-[#1e1e1e]={isActive && !isHighlighted && findPersonForPosition(patternKey, position.positionId)?.photo?.includes('placeholder')}
              class:bg-[#111]={isHighlighted && findPersonForPosition(patternKey, position.positionId)?.photo?.includes('placeholder')}
              class:hover:bg-[#111]={isActive && findPersonForPosition(patternKey, position.positionId)?.photo?.includes('placeholder')}
              class:opacity-90={!isActive && !isHighlighted}
              class:opacity-100={isActive || isHighlighted}
              class:scale-125={isHighlighted}
              class:hover:scale-125={isActive}
              class:active-dot={isActive}
              class:highlight-pulse={isHighlighted}
              style="left: {position.x}px; top: {position.y}px; transform: translate(-50%, -50%); 
                    {isActive && !findPersonForPosition(patternKey, position.positionId)?.photo?.includes('placeholder') ? 
                    `background-image: url('${findPersonForPosition(patternKey, position.positionId)?.photo}'); 
                     background-size: cover; 
                     background-position: center;
                     border: 2px solid #FBF8EF;` : ''}"
              on:mouseenter={() => {
                if (isActive) {
                  const person = findPersonForPosition(patternKey, position.positionId);
                  console.log(`Mouse entered dot at position [${patternKey}, ${position.positionId}]`);
                  console.log("Person found:", person);
                  handleHover(person?.id);
                }
              }}
              on:mouseleave={resetHover}
              role="button"
              aria-label={isActive ? `View profile for ${findPersonForPosition(patternKey, position.positionId)?.name || 'team member'}` : ''}
              tabindex={isActive ? 0 : -1}
            ></div>
          {/each}
        {/each}
        
        <!-- Profile card for hovered person or search result -->
        {#if hoveredPerson || (selectedResult && !hoveredPerson)}
          {@const personId = hoveredPerson || (selectedResult ? selectedResult.id : null)}
          {@const person = people.find(p => p.id === personId)}
          {#if person}
            <div 
              class="absolute person-card bg-white shadow-lg rounded-xl p-5 z-20"
              style="left: 600px; top: 120px; width: 340px; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);"
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
          {:else}
            <div class="absolute bg-white shadow-lg rounded-xl p-3 z-10"
                style="left: 600px; top: 120px; width: 200px;">
              <!-- Close button for error message -->
              <button 
                class="absolute top-1 right-2 w-6 h-6 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
                on:click={closeProfile}
                aria-label="Close message"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              Error: Person with ID {personId} not found
            </div>
          {/if}
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .asterisk-container {
    position: relative;
    width: 1400px;
    height: 900px; /* Increased height to fit both rows of asterisks with more spacing */
    margin: 0 auto;
    -webkit-overflow-scrolling: touch;
    padding-top: 20px;
    padding-bottom: 50px;
  }
  
  /* Card styling */
  .person-card {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    border: 1px solid rgba(0, 0, 0, 0.05);
  }
  
  /* Add a subtle gradient background to make dots pop */
  .asterisk-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0) 100%);
    pointer-events: none;
    border-radius: 20px;
  }
  
  /* Dot styling */
  .dot-element {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }
  
  .active-dot {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
  }
  
  .active-dot:not(.bg-\[\#2c2c2c\]):not(.bg-\[\#1e1e1e\]):not(.bg-\[\#111\]):hover {
    box-shadow: 0 0 0 2px #FBF8EF, 0 3px 10px rgba(0, 0, 0, 0.3);
    z-index: 10;
  }
  
  .highlight-pulse {
    animation: pulse 1.5s infinite;
    box-shadow: 0 0 0 rgba(0, 0, 0, 0.4);
    z-index: 5;
  }
  
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.4);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }
  }

  @media (max-width: 1400px) {
    .asterisk-container {
      width: 100%;
      min-width: 1100px;
      overflow-x: auto;
    }
  }

  .dot {
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #000;
    transform: translate(-50%, -50%);
    transition: all 0.3s ease;
    z-index: 1;
  }

  .dot.dot-has-image {
    background-size: cover;
    background-position: center;
    border: 1px solid rgba(255, 255, 255, 0.5);
    width: 10px;
    height: 10px;
  }

  .dot:hover, .dot.active {
    width: 14px;
    height: 14px;
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
    z-index: 2;
    cursor: pointer;
  }

  .dot.dot-has-image:hover, .dot.dot-has-image.active {
    border: 2px solid white;
    width: 16px;
    height: 16px;
  }
</style> 