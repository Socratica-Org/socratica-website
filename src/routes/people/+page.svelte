<script>
  import Navbar from "$lib/components/navbar.svelte";
  import { onMount } from "svelte";
  import { fade, scale } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  
  // Expanded sample data for people - now with letter positions
  const people = [
    // S letter people
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
      position: 10
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
      position: 25
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
      position: 10
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
      position: 25
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
      position: 10
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
      position: 25
    }
  ];

  // Flag to track which person card is currently being hovered
  let hoveredPerson = null;
  
  // Function to handle hover state
  function handleHover(personId) {
    hoveredPerson = personId;
  }

  // Function to reset hover state
  function resetHover() {
    hoveredPerson = null;
  }

  // Adding a vertical offset to position letters more centered in the container
  // Move this outside the function so it's accessible in the template
  const verticalOffset = 50; // Offset to push letters down from the top edge

  // Function to create letter patterns using dots
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
        positionId: positionIndex++
      });
    });
    
    return positions;
  }
  
  // Calculate offsets for each letter to space them properly
  const letterSpacing = 110; // Increased space between letters
  const startX = 20; // Add some padding at the start
  const letterScale = 2.0; // Increased scale for better visibility
  
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

  // Find the person associated with a specific dot position
  function findPersonForPosition(letter, positionId) {
    // Handle the second C and A
    const searchLetter = letter === 'C2' ? 'C' : letter === 'A2' ? 'A' : letter;
    
    const person = people.find(p => 
      p.letter === searchLetter && 
      p.position === positionId
    );
    
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
    </div>

    <!-- SOCRATICA Letters Display -->
    <div class="flex flex-col items-center justify-center mt-20 mb-40 pt-20">
      <div class="socratica-container relative overflow-x-auto overflow-y-visible px-4">
        <!-- Render all letters -->
        {#each Object.entries(allLetters) as [letterKey, positions]}
          {#each positions as position, i}
            {@const isActive = isActivePosition(letterKey, position.positionId)}
            <div 
              class="absolute w-7 h-7 rounded-full transition-all duration-300 cursor-pointer dot-element"
              class:bg-[#2c2c2c]={!isActive}
              class:bg-[#1e1e1e]={isActive}
              class:hover:bg-[#111]={isActive}
              class:opacity-90={!isActive}
              class:opacity-100={isActive}
              class:hover:scale-125={isActive}
              class:active-dot={isActive}
              style="left: {position.x}px; top: {position.y}px; transform: translate(-50%, -50%);"
              on:mouseenter={() => isActive && handleHover(findPersonForPosition(letterKey, position.positionId)?.id)}
              on:mouseleave={resetHover}
              role="button"
              aria-label={isActive ? `View profile for ${findPersonForPosition(letterKey, position.positionId)?.name || 'team member'}` : ''}
              tabindex={isActive ? 0 : -1}
            ></div>
          {/each}
          
          <!-- Add letter labels below pattern -->
          {@const letterDisplay = letterKey.length === 1 ? letterKey : letterKey.charAt(0)}
          {@const letterPositionX = letterKey === 'S' ? startX + 30 : 
                                   letterKey === 'O' ? startX + letterSpacing + 30 :
                                   letterKey === 'C' ? startX + letterSpacing * 2 + 30 :
                                   letterKey === 'R' ? startX + letterSpacing * 3 + 30 :
                                   letterKey === 'A' ? startX + letterSpacing * 4 + 30 :
                                   letterKey === 'T' ? startX + letterSpacing * 5 + 30 :
                                   letterKey === 'I' ? startX + letterSpacing * 6 + 30 :
                                   letterKey === 'C2' ? startX + letterSpacing * 7 + 30 :
                                   startX + letterSpacing * 8 + 30}
          <div class="absolute text-[#444444] text-xs font-mono opacity-50"
               style="left: {letterPositionX}px; top: {verticalOffset + 150}px; transform: translateX(-50%);">
            {letterDisplay}
          </div>
        {/each}
        
        <!-- Profile card for hovered person -->
        {#if hoveredPerson}
          {@const person = people.find(p => p.id === hoveredPerson)}
          <div 
            class="absolute person-card bg-white shadow-lg rounded-xl p-5 z-10"
            style="left: 550px; top: -20px; width: 320px; transform: translate(-50%, -100%);"
            transition:scale={{duration: 200, delay: 50, opacity: 0.5, start: 0.95, easing: cubicOut}}
            role="dialog"
            aria-label="Team member profile"
          >
            <div class="flex items-center">
              <img src={person.photo} alt={person.name} class="w-20 h-20 rounded-full mr-4 object-cover border-2 border-[#FBF8EF]" />
              <div>
                <h3 class="font-tiempos-headline text-lg font-bold">{person.name}</h3>
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
      </div>
    </div>
  </div>
</div>

<style>
  .socratica-container {
    position: relative;
    width: 1400px; /* Increased width to accommodate wider spacing */
    height: 350px; /* Increased height to ensure top dots are visible */
    overflow-x: auto;
    overflow-y: visible;
    margin: 0 auto;
    -webkit-overflow-scrolling: touch;
    padding-top: 40px; /* Increased top padding to push content down */
    padding-bottom: 40px;
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

  @media (max-width: 1400px) {
    .socratica-container {
      width: 100%;
      min-width: 900px;
    }
  }
</style> 