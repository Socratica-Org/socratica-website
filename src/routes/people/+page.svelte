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
  
  // Function to create letter patterns using dots - moved up to calculate positions first
  function createLetterPattern(letter, scale = 1, offsetX = 0, offsetY = 0) {
    const positions = [];
    let positionIndex = 0;
    const dotSize = 5; // Size of each dot in pixels
    const spacing = 10 * scale; // Spacing between dots
    
    // Define letter shapes as arrays of [x, y] coordinates
    const letterShapes = {
      S: [
        [1, 0], [2, 0], [3, 0],
        [0, 1],
        [1, 2], [2, 2], [3, 2],
        [4, 3],
        [0, 4], [1, 4], [2, 4], [3, 4]
      ],
      O: [
        [1, 0], [2, 0], [3, 0],
        [0, 1], [4, 1],
        [0, 2], [4, 2],
        [0, 3], [4, 3],
        [1, 4], [2, 4], [3, 4]
      ],
      C: [
        [1, 0], [2, 0], [3, 0], [4, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [1, 4], [2, 4], [3, 4], [4, 4]
      ],
      R: [
        [0, 0], [1, 0], [2, 0], [3, 0],
        [0, 1], [4, 1],
        [0, 2], [1, 2], [2, 2], [3, 2],
        [0, 3], [2, 3], [3, 3],
        [0, 4], [4, 4]
      ],
      A: [
        [1, 0], [2, 0], [3, 0],
        [0, 1], [4, 1],
        [0, 2], [1, 2], [2, 2], [3, 2], [4, 2],
        [0, 3], [4, 3],
        [0, 4], [4, 4]
      ],
      T: [
        [0, 0], [1, 0], [2, 0], [3, 0], [4, 0],
        [2, 1],
        [2, 2],
        [2, 3],
        [2, 4]
      ],
      I: [
        [0, 0], [1, 0], [2, 0],
        [1, 1],
        [1, 2],
        [1, 3],
        [0, 4], [1, 4], [2, 4]
      ]
    };
    
    // Get the shape for the specified letter
    const shape = letterShapes[letter] || [];
    
    // Create positions for each dot in the letter
    shape.forEach(([x, y], index) => {
      positions.push({
        x: (x * spacing) + offsetX,
        y: (y * spacing) + offsetY + verticalOffset, // Add vertical offset to all dots
        positionId: index  // This is the key - position ID is the index in the letter pattern
      });
    });
    
    return positions;
  }
  
  // Adding a vertical offset to position letters more centered in the container
  const verticalOffset = 70; // Offset to push letters down from the top edge (increased from 50)
  
  // Calculate offsets for each letter to space them properly
  const letterSpacing = 160; // Reduced spacing to make full word visible without scrolling (was 200)
  const startX = 40; // Adjusted padding at the start
  const letterScale = 2.8; // Increased scale for better visibility (from 2.0)
  
  // Generate letter patterns
  const letterS = createLetterPattern('S', letterScale, startX, 0);
  const letterO = createLetterPattern('O', letterScale, startX + letterSpacing, 0);
  const letterC = createLetterPattern('C', letterScale, startX + letterSpacing * 2, 0);
  const letterR = createLetterPattern('R', letterScale, startX + letterSpacing * 3, 0);
  const letterA = createLetterPattern('A', letterScale, startX + letterSpacing * 4, 0);
  const letterT = createLetterPattern('T', letterScale, startX + letterSpacing * 5, 0);
  const letterI = createLetterPattern('I', letterScale, startX + letterSpacing * 6, 0);
  const letterC2 = createLetterPattern('C', letterScale, startX + letterSpacing * 7, 0);
  const letterA2 = createLetterPattern('A', letterScale, startX + letterSpacing * 8, 0);
  
  // Combine all letters into a single array for easier rendering
  const allLetters = {
    S: letterS,
    O: letterO,
    C: letterC,
    R: letterR,
    A: letterA,
    T: letterT,
    I: letterI,
    C2: letterC2,
    A2: letterA2
  };
  
  // Updated people data to match actual dot positions
  const people = [
    // S letter people - positions updated to match letter pattern
    {
      id: 1,
      name: "Brandon Leung",
      role: "Co-Founder",
      photo: "https://via.placeholder.com/150",
      description: [
        "Founded the initial concept.",
        "Established partnerships with local spaces.",
        "Built the community foundations."
      ],
      letter: "S", 
      position: 0 // Top of S (first dot)
    },
    {
      id: 2,
      name: "Alex Johnson",
      role: "Community Lead",
      photo: "https://via.placeholder.com/150",
      description: [
        "Organizes local meetups.",
        "Manages member engagement.",
        "Facilitates cross-team collaboration."
      ],
      letter: "S",
      position: 5 // Middle of S (center dot)
    },
    // O letter people
    {
      id: 9,
      name: "Sarah Chen",
      role: "UX/UI Designer",
      photo: "https://via.placeholder.com/150",
      description: [
        "Designed the website.",
        "Created the Socratica brand identity.",
        "Developed the user experience."
      ],
      letter: "O",
      position: 0 // Top of O
    },
    {
      id: 10,
      name: "David Park",
      role: "Content Creator",
      photo: "https://via.placeholder.com/150",
      description: [
        "Produces educational content.",
        "Manages the content library.",
        "Leads writing workshops."
      ],
      letter: "O",
      position: 6 // Bottom-right of O
    },
    // C letter people
    {
      id: 17,
      name: "Jamie Wong",
      role: "Tech Lead",
      photo: "https://via.placeholder.com/150",
      description: [
        "Manages technical infrastructure.",
        "Developed collaborative tools.",
        "Supports community events."
      ],
      letter: "C",
      position: 0 // Top of C
    },
    {
      id: 18,
      name: "Maya Rodriguez",
      role: "Artist-in-Residence",
      photo: "https://via.placeholder.com/150",
      description: [
        "Leads creative workshops.",
        "Produces community artwork.",
        "Mentors emerging artists."
      ],
      letter: "C",
      position: 8 // Bottom of C
    },
    // Add a few people for R letter
    {
      id: 20,
      name: "Michael Torres",
      role: "Education Director",
      photo: "https://via.placeholder.com/150",
      description: [
        "Develops learning curriculum.",
        "Leads educational workshops.",
        "Mentors new teachers."
      ],
      letter: "R",
      position: 0 // Top of R
    },
    {
      id: 21,
      name: "Emma Wilson",
      role: "Project Manager",
      photo: "https://via.placeholder.com/150",
      description: [
        "Coordinates team projects.",
        "Manages community initiatives.",
        "Develops strategic plans."
      ],
      letter: "R",
      position: 12 // Bottom-right of R (the dot we just added)
    }
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

  // Find the person associated with a specific dot position
  function findPersonForPosition(letter, positionId) {
    // Handle the second C and A
    const searchLetter = letter === 'C2' ? 'C' : letter === 'A2' ? 'A' : letter;
    
    // Debug output
    console.log(`Searching for person with letter: ${searchLetter} and position: ${positionId}`);
    
    // Find matching person
    const person = people.find(p => 
      p.letter === searchLetter && 
      p.position === positionId
    );
    
    console.log("Found person:", person);
    return person || null;
  }

  // Determine if a position has a person assigned
  function isActivePosition(letter, positionId) {
    // Handle the second C and A
    const searchLetter = letter === 'C2' ? 'C' : letter === 'A2' ? 'A' : letter;
    
    return people.some(p => 
      p.letter === searchLetter && 
      p.position === positionId
    );
  }

  // Fix position IDs for dots
  onMount(() => {
    // Log info about active dots and people
    console.log("Component mounted");
    console.log("Total people:", people.length);
    
    // Log each letter's dot count
    Object.entries(allLetters).forEach(([letter, positions]) => {
      console.log(`Letter ${letter} has ${positions.length} dots`);
      
      // Log which positions have assigned people
      const activeDots = positions.filter(pos => 
        isActivePosition(letter, pos.positionId)
      );
      console.log(`Letter ${letter} has ${activeDots.length} active dots at positions:`, 
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
      The <i>people</i> behind Socratica.
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

    <!-- SOCRATICA Letters Display -->
    <div class="flex flex-col items-center justify-center mt-20 mb-40 pt-20">
      <div class="socratica-container relative overflow-x-auto overflow-y-visible px-4">
        <!-- Render all letters -->
        {#each Object.entries(allLetters) as [letterKey, positions]}
          {#each positions as position, i}
            {@const isActive = isActivePosition(letterKey, position.positionId)}
            {@const isHighlighted = selectedResult && 
              selectedResult.letter === (letterKey === 'C2' ? 'C' : letterKey === 'A2' ? 'A' : letterKey) && 
              selectedResult.position === position.positionId}
            <div 
              class="absolute w-10 h-10 rounded-full transition-all duration-300 cursor-pointer dot-element"
              class:bg-[#2c2c2c]={!isActive}
              class:bg-[#1e1e1e]={isActive && !isHighlighted}
              class:bg-[#111]={isHighlighted}
              class:hover:bg-[#111]={isActive}
              class:opacity-90={!isActive && !isHighlighted}
              class:opacity-100={isActive || isHighlighted}
              class:scale-125={isHighlighted}
              class:hover:scale-125={isActive}
              class:active-dot={isActive}
              class:highlight-pulse={isHighlighted}
              style="left: {position.x}px; top: {position.y}px; transform: translate(-50%, -50%);"
              on:mouseenter={() => {
                if (isActive) {
                  const person = findPersonForPosition(letterKey, position.positionId);
                  console.log(`Mouse entered dot at position [${letterKey}, ${position.positionId}]`);
                  console.log("Person found:", person);
                  handleHover(person?.id);
                }
              }}
              on:mouseleave={resetHover}
              role="button"
              aria-label={isActive ? `View profile for ${findPersonForPosition(letterKey, position.positionId)?.name || 'team member'}` : ''}
              tabindex={isActive ? 0 : -1}
            ></div>
          {/each}
          
          <!-- Add letter labels below pattern -->
          {@const letterDisplay = letterKey.length === 1 ? letterKey : letterKey.charAt(0)}
          {@const letterPositionX = letterKey === 'S' ? startX + 40 : 
                                   letterKey === 'O' ? startX + letterSpacing + 40 :
                                   letterKey === 'C' ? startX + letterSpacing * 2 + 40 :
                                   letterKey === 'R' ? startX + letterSpacing * 3 + 40 :
                                   letterKey === 'A' ? startX + letterSpacing * 4 + 40 :
                                   letterKey === 'T' ? startX + letterSpacing * 5 + 40 :
                                   letterKey === 'I' ? startX + letterSpacing * 6 + 40 :
                                   letterKey === 'C2' ? startX + letterSpacing * 7 + 40 :
                                   startX + letterSpacing * 8 + 40}
          <div class="absolute text-[#444444] text-sm font-mono opacity-50"
               style="left: {letterPositionX}px; top: {verticalOffset + 200}px; transform: translateX(-50%);">
            {letterDisplay}
          </div>
        {/each}
        
        <!-- Profile card for hovered person or search result -->
        {#if hoveredPerson || (selectedResult && !hoveredPerson)}
          {@const personId = hoveredPerson || (selectedResult ? selectedResult.id : null)}
          {@const person = people.find(p => p.id === personId)}
          {#if person}
            <div 
              class="absolute person-card bg-white shadow-lg rounded-xl p-5 z-20"
              style="left: 650px; top: 120px; width: 340px; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);"
              in:scale={{duration: 150, delay: 0, start: 0.95, easing: cubicOut}}
              out:fade={{duration: 100}}
              role="dialog"
              aria-label="Team member profile"
            >
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
                style="left: 650px; top: 120px; width: 200px;">
              Error: Person with ID {personId} not found
            </div>
          {/if}
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .socratica-container {
    position: relative;
    width: 1600px; /* Adjusted width to match reduced letter spacing */
    height: 450px; /* Increased height to ensure all dots are visible */
    overflow-x: auto;
    overflow-y: visible;
    margin: 0 auto;
    -webkit-overflow-scrolling: touch;
    padding-top: 50px; /* Increased top padding to push content down */
    padding-bottom: 50px;
  }
  
  /* Card styling */
  .person-card {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    border: 1px solid rgba(0, 0, 0, 0.05);
  }
  
  /* Add a subtle gradient background to make dots pop */
  .socratica-container::before {
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
  }
  
  .active-dot {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
  }
  
  .highlight-pulse {
    animation: pulse 1.5s infinite;
    box-shadow: 0 0 0 rgba(0, 0, 0, 0.4);
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

  @media (max-width: 1600px) {
    .socratica-container {
      width: 100%;
      min-width: 1100px;
    }
  }
</style> 