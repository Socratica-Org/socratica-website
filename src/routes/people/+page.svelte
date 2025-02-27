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
        [0, 3], [2, 3],
        [0, 4], [3, 4]
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
  const baseLetterSpacing = 160; // Base spacing between letters
  const startX = 40; // Adjusted padding at the start
  const letterScale = 2.8; // Increased scale for better visibility
  
  // Width adjustment factors for visual consistency - some letters are naturally wider/narrower
  const letterWidthAdjustments = {
    S: 0,
    O: 0,
    C: -5,
    R: 0,
    A: 0,
    T: -5,
    I: -25, // I is very narrow and needs more adjustment
    C2: -5,
    A2: 0
  };
  
  // Calculate positions with adjusted spacing
  let currentX = startX;
  
  // Generate letter patterns
  const letterS = createLetterPattern('S', letterScale, currentX, 0);
  currentX += baseLetterSpacing + letterWidthAdjustments.S;
  
  const letterO = createLetterPattern('O', letterScale, currentX, 0);
  currentX += baseLetterSpacing + letterWidthAdjustments.O;
  
  const letterC = createLetterPattern('C', letterScale, currentX, 0);
  currentX += baseLetterSpacing + letterWidthAdjustments.C;
  
  const letterR = createLetterPattern('R', letterScale, currentX, 0);
  currentX += baseLetterSpacing + letterWidthAdjustments.R;
  
  const letterA = createLetterPattern('A', letterScale, currentX, 0);
  currentX += baseLetterSpacing + letterWidthAdjustments.A;
  
  const letterT = createLetterPattern('T', letterScale, currentX, 0);
  currentX += baseLetterSpacing + letterWidthAdjustments.T;
  
  const letterI = createLetterPattern('I', letterScale, currentX, 0);
  currentX += baseLetterSpacing + letterWidthAdjustments.I;
  
  const letterC2 = createLetterPattern('C', letterScale, currentX, 0);
  currentX += baseLetterSpacing + letterWidthAdjustments.C2;
  
  const letterA2 = createLetterPattern('A', letterScale, currentX, 0);
  
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
  
  // Updated people data with actual Socratica members
  const people = [
    // S letter people
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
      letter: "S", 
      position: 0
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
      letter: "S",
      position: 1
    },
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
      letter: "S",
      position: 2
    },
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
      letter: "S",
      position: 3
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
      letter: "S",
      position: 4
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
      letter: "S",
      position: 5
    },
    // O letter people
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
      letter: "O",
      position: 0
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
      letter: "O",
      position: 1
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
      letter: "O",
      position: 2
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
      letter: "O",
      position: 3
    },
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
      letter: "O",
      position: 4
    },
    // C letter people
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
      letter: "C",
      position: 0
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
      letter: "C",
      position: 1
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
      letter: "C",
      position: 2
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
      letter: "C",
      position: 3
    },
    // R letter people
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
      letter: "R",
      position: 0
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
      letter: "R",
      position: 1
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
      letter: "R",
      position: 2
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
      letter: "R",
      position: 3
    },
    // A letter people
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
      letter: "A",
      position: 0
    },
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
      letter: "A",
      position: 1
    },
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
      letter: "A",
      position: 2
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
      letter: "A",
      position: 3
    },
    // T letter people
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
      letter: "T",
      position: 0
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
      letter: "T",
      position: 1
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
      letter: "T",
      position: 2
    },
    // I letter people
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
      letter: "I",
      position: 0
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
      letter: "I",
      position: 1
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
      letter: "I",
      position: 2
    },
    // C2 letter people (second C in SOCRATICA)
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
      letter: "C",
      position: 4
    },
    {
      id: 31,
      name: "Lagan Bansal",
      role: "W24",
      photo: "/img-ppl/Lagan.jpg",
      description: [
        "Winter 2024 cohort.",
        "Participating in current initiatives.",
        "Helping expand Socratica's impact."
      ],
      letter: "C",
      position: 5
    },
    {
      id: 32,
      name: "Freeman Jiang",
      role: "W24",
      photo: "/img-ppl/Freeman_Jiang.jpg",
      description: [
        "Winter 2024 cohort.",
        "Active in current projects.",
        "Contributing to community growth."
      ],
      letter: "C",
      position: 6
    },
    {
      id: 33,
      name: "Shivam Sharma",
      role: "W24",
      photo: "/img-ppl/Shivam_Sharma.jpg",
      description: [
        "Winter 2024 cohort.",
        "Recently joined member.",
        "Working on current initiatives."
      ],
      letter: "C",
      position: 7
    },
    // A2 letter people (second A in SOCRATICA)
    {
      id: 34,
      name: "Joseph Bagheri",
      role: "W24",
      photo: "/img-ppl/Joseph.jpg",
      description: [
        "Winter 2024 cohort.",
        "Currently active participant.",
        "Contributing to recent projects."
      ],
      letter: "A",
      position: 4
    },
    {
      id: 35,
      name: "Brooke Joseph",
      role: "W24",
      photo: "/img-ppl/Brooke_Joseph.jpg",
      description: [
        "Winter 2024 cohort.",
        "Active community member.",
        "Helping shape ongoing initiatives."
      ],
      letter: "A",
      position: 5
    },
    {
      id: 36,
      name: "Jenn Dryden",
      role: "W24",
      photo: "/img-ppl/Jenn_Dryden.jpg",
      description: [
        "Winter 2024 cohort.",
        "Recently joined team member.",
        "Contributing to current projects."
      ],
      letter: "A",
      position: 6
    },
    {
      id: 37,
      name: "Jaryd Diamond",
      role: "S24",
      photo: "/img-ppl/Jaryd_Diamond.jpg",
      description: [
        "Spring 2024 cohort.",
        "New community member.",
        "Contributing to current initiatives."
      ],
      letter: "A",
      position: 7
    },
    {
      id: 38,
      name: "Rachel Scott",
      role: "S24",
      photo: "/img-ppl/Rachel_Scott.jpg",
      description: [
        "Spring 2024 cohort.",
        "Recently joined member.",
        "Participating in current projects."
      ],
      letter: "A",
      position: 8
    },
    {
      id: 39,
      name: "Eric Gao",
      role: "S24",
      photo: "/img-ppl/Eric_Gao.jpg",
      description: [
        "Spring 2024 cohort.",
        "New community participant.",
        "Contributing to recent initiatives."
      ],
      letter: "A",
      position: 9
    },
    // Add more people to any remaining positions
    {
      id: 40,
      name: "Santiago Del Solar",
      role: "S24",
      photo: "/img-ppl/Santiago_Del_Solar.jpg",
      description: [
        "Spring 2024 cohort.",
        "Recently joined Socratica.",
        "Working on current projects."
      ],
      letter: "S",
      position: 6
    },
    {
      id: 41,
      name: "Julia Fedorin",
      role: "S24",
      photo: "/img-ppl/Julia_Fedorin.jpg",
      description: [
        "Spring 2024 cohort.",
        "New community member.",
        "Participating in current initiatives."
      ],
      letter: "S",
      position: 7
    },
    {
      id: 42,
      name: "Nevedhaa Ayyappan",
      role: "S24",
      photo: "/img-ppl/Nevedhaa_Ayyappan.jpg",
      description: [
        "Spring 2024 cohort.",
        "Recently joined team.",
        "Contributing to current projects."
      ],
      letter: "O",
      position: 5
    },
    {
      id: 43,
      name: "Gaurav Shah",
      role: "S24",
      photo: "/img-ppl/Gaurav_Shah.jpg",
      description: [
        "Spring 2024 cohort.",
        "New Socratica member.",
        "Working on recent initiatives."
      ],
      letter: "O",
      position: 6
    },
    {
      id: 44,
      name: "Tiffany Trinh",
      role: "S24",
      photo: "/img-ppl/Tiffany_Trinh.jpg",
      description: [
        "Spring 2024 cohort.",
        "Recent addition to the community.",
        "Contributing to current projects."
      ],
      letter: "O",
      position: 7
    },
    {
      id: 45,
      name: "Keyan Virani",
      role: "S24",
      photo: "/img-ppl/Keyan_Virani.jpg",
      description: [
        "Spring 2024 cohort.",
        "New team member.",
        "Participating in ongoing initiatives."
      ],
      letter: "O",
      position: 8
    },
    {
      id: 46,
      name: "Shahan Neda",
      role: "F24",
      photo: "/img-ppl/Shahan_Neda.jpg",
      description: [
        "Fall 2024 cohort.",
        "Newest community member.",
        "Beginning to contribute to projects."
      ],
      letter: "R",
      position: 4
    },
    {
      id: 47,
      name: "Akira Yoshiyama",
      role: "F24",
      photo: "/img-ppl/Akira_Yoshiyama.jpg",
      description: [
        "Fall 2024 cohort.",
        "Recently joined Socratica.",
        "Starting work on new initiatives."
      ],
      letter: "R",
      position: 5
    },
    {
      id: 48,
      name: "Suhani Trivedi",
      role: "F24",
      photo: "/img-ppl/Suhani_Trivedi.jpg",
      description: [
        "Fall 2024 cohort.",
        "New community participant.",
        "Beginning to contribute to projects."
      ],
      letter: "R",
      position: 6
    },
    {
      id: 49,
      name: "Victoria Feng",
      role: "F24",
      photo: "/img-ppl/Victoria_Feng.jpg",
      description: [
        "Fall 2024 cohort.",
        "Recently joined member.",
        "Starting to work on initiatives."
      ],
      letter: "R",
      position: 7
    },
    {
      id: 50,
      name: "Nefise Akcakir",
      role: "F24",
      photo: "/img-ppl/Nefise.jpg",
      description: [
        "Fall 2024 cohort.",
        "New team member.",
        "Beginning to contribute to Socratica."
      ],
      letter: "R",
      position: 8
    },
    {
      id: 51,
      name: "Giang Tran",
      role: "F24",
      photo: "/img-ppl/Giang_Tran.jpg",
      description: [
        "Fall 2024 cohort.",
        "Recently joined Socratica.",
        "Starting to contribute to projects."
      ],
      letter: "R",
      position: 9
    },
    {
      id: 52,
      name: "Rishi Kothari",
      role: "F24",
      photo: "/img-ppl/Rishi_Kothari.jpg",
      description: [
        "Fall 2024 cohort.",
        "New community member.",
        "Beginning to work on initiatives."
      ],
      letter: "R",
      position: 10
    },
    {
      id: 53,
      name: "Brennan Windsor",
      role: "W25",
      photo: "/img-ppl/Brennan_Windsor.jpg",
      description: [
        "Winter 2025 cohort.",
        "Newest community member.",
        "Starting to engage with Socratica."
      ],
      letter: "T",
      position: 3
    },
    {
      id: 54,
      name: "Cheryl Chong",
      role: "W25",
      photo: "/img-ppl/Cheryl_Chong.jpg",
      description: [
        "Winter 2025 cohort.",
        "Recently joined the community.",
        "Beginning to contribute to projects."
      ],
      letter: "T",
      position: 4
    },
    {
      id: 55,
      name: "Cindy Qiu",
      role: "W25",
      photo: "/img-ppl/Cindy.jpg",
      description: [
        "Winter 2025 cohort.",
        "New Socratica member.",
        "Starting to work on initiatives."
      ],
      letter: "T",
      position: 5
    },
    {
      id: 56,
      name: "Faisal Sayed",
      role: "W25",
      photo: "/img-ppl/Faisal_Sayed.jpg",
      description: [
        "Winter 2025 cohort.",
        "Newest team member.",
        "Beginning to engage with the community."
      ],
      letter: "T",
      position: 6
    },
    {
      id: 57,
      name: "Yash Karthik",
      role: "W25",
      photo: "/img-ppl/Yash_Karthik.jpg",
      description: [
        "Winter 2025 cohort.",
        "Recently joined Socratica.",
        "Starting to contribute to initiatives."
      ],
      letter: "T",
      position: 7
    },
    {
      id: 58,
      name: "Maisha Tahsin",
      role: "W25",
      photo: "/img-ppl/Maisha_Tahsin.jpg",
      description: [
        "Winter 2025 cohort.",
        "New community member.",
        "Beginning to engage with projects."
      ],
      letter: "I",
      position: 3
    },
    {
      id: 59,
      name: "Kenson Hui",
      role: "W25",
      photo: "/img-ppl/Kenson_Hui.jpg",
      description: [
        "Winter 2025 cohort.",
        "Recently joined the team.",
        "Starting to work on initiatives."
      ],
      letter: "I",
      position: 4
    },
    {
      id: 60,
      name: "Kaifee Haque",
      role: "W25",
      photo: "/img-ppl/Kaifee_Haque.jpg",
      description: [
        "Winter 2025 cohort.",
        "Newest Socratica member.",
        "Beginning to contribute to the community."
      ],
      letter: "I",
      position: 5
    },
    {
      id: 61,
      name: "Angela Li",
      role: "W25",
      photo: "/img-ppl/Angela_Li.jpg",
      description: [
        "Winter 2025 cohort.",
        "Recently joined member.",
        "Starting to engage with Socratica projects."
      ],
      letter: "I",
      position: 6
    },
    {
      id: 62,
      name: "Socratica Team",
      role: "Community",
      photo: "/lib/images/socratica-people.webp",
      description: [
        "Represents all community members.",
        "Past, present, and future contributors.",
        "The collective spirit of Socratica."
      ],
      letter: "C",
      position: 8
    },
    {
      id: 63,
      name: "Socratica Collaborators",
      role: "Partners",
      photo: "/lib/images/socratica-people.webp",
      description: [
        "External partners and collaborators.",
        "Those who support Socratica's mission.",
        "Important allies in the community ecosystem."
      ],
      letter: "C",
      position: 9
    },
    {
      id: 64,
      name: "Audrey Wang",
      role: "S24",
      photo: "https://via.placeholder.com/150",
      description: [
        "Summer 2024 cohort.",
        "Contributing to Socratica projects.",
        "Passionate about community learning."
      ],
      letter: "A",
      position: 0
    },
    {
      id: 65,
      name: "Kavisha Shah",
      role: "S24",
      photo: "https://via.placeholder.com/150",
      description: [
        "Summer 2024 cohort.",
        "Working on Socratica initiatives.",
        "Dedicated to educational innovation."
      ],
      letter: "A",
      position: 1
    },
    {
      id: 66,
      name: "Michael Chen",
      role: "S24",
      photo: "https://via.placeholder.com/150",
      description: [
        "Summer 2024 cohort.",
        "Actively involved in Socratica.",
        "Committed to knowledge sharing."
      ],
      letter: "A",
      position: 2
    },
    {
      id: 67,
      name: "Neil Mehta",
      role: "S24",
      photo: "https://via.placeholder.com/150",
      description: [
        "Summer 2024 cohort.",
        "Contributor to Socratica projects.",
        "Focused on community growth."
      ],
      letter: "A",
      position: 3
    },
    {
      id: 68,
      name: "Luca Brown",
      role: "S24",
      photo: "https://via.placeholder.com/150",
      description: [
        "Summer 2024 cohort.",
        "Engaged in Socratica initiatives.",
        "Interested in collaborative learning."
      ],
      letter: "A",
      position: 4
    },
    {
      id: 69,
      name: "Sophia Kim",
      role: "S24",
      photo: "https://via.placeholder.com/150",
      description: [
        "Summer 2024 cohort.",
        "Active Socratica member.",
        "Dedicated to educational empowerment."
      ],
      letter: "A",
      position: 5
    },
    {
      id: 70,
      name: "Julian Park",
      role: "S24",
      photo: "https://via.placeholder.com/150",
      description: [
        "Summer 2024 cohort.",
        "Contributing to Socratica growth.",
        "Passionate about community building."
      ],
      letter: "A",
      position: 6
    },
    {
      id: 71,
      name: "Future Members",
      role: "Upcoming",
      photo: "https://via.placeholder.com/150",
      description: [
        "Representing future cohorts.",
        "The next generation of Socratica.",
        "Those who will continue the mission."
      ],
      letter: "A",
      position: 7
    },
    {
      id: 72,
      name: "Community Contributors",
      role: "Supporters",
      photo: "https://via.placeholder.com/150",
      description: [
        "All those who support Socratica.",
        "The wider community ecosystem.",
        "Everyone who believes in the mission."
      ],
      letter: "A",
      position: 8
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

  // Function to close profile popup manually
  function closeProfile() {
    console.log("Close profile button clicked");
    hoveredPerson = null;
    selectedResult = null;
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
              class:bg-[#2c2c2c]={!isActive || (isActive && findPersonForPosition(letterKey, position.positionId)?.photo?.includes('placeholder'))}
              class:bg-[#1e1e1e]={isActive && !isHighlighted && findPersonForPosition(letterKey, position.positionId)?.photo?.includes('placeholder')}
              class:bg-[#111]={isHighlighted && findPersonForPosition(letterKey, position.positionId)?.photo?.includes('placeholder')}
              class:hover:bg-[#111]={isActive && findPersonForPosition(letterKey, position.positionId)?.photo?.includes('placeholder')}
              class:opacity-90={!isActive && !isHighlighted}
              class:opacity-100={isActive || isHighlighted}
              class:scale-125={isHighlighted}
              class:hover:scale-125={isActive}
              class:active-dot={isActive}
              class:highlight-pulse={isHighlighted}
              style="left: {position.x}px; top: {position.y}px; transform: translate(-50%, -50%); 
                    {isActive && !findPersonForPosition(letterKey, position.positionId)?.photo?.includes('placeholder') ? 
                    `background-image: url('${findPersonForPosition(letterKey, position.positionId)?.photo}'); 
                     background-size: cover; 
                     background-position: center;
                     border: 2px solid #FBF8EF;` : ''}"
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
                                   letterKey === 'O' ? startX + baseLetterSpacing + letterWidthAdjustments.S + 40 :
                                   letterKey === 'C' ? startX + baseLetterSpacing * 2 + letterWidthAdjustments.S + letterWidthAdjustments.O + 40 :
                                   letterKey === 'R' ? startX + baseLetterSpacing * 3 + letterWidthAdjustments.S + letterWidthAdjustments.O + letterWidthAdjustments.C + 40 :
                                   letterKey === 'A' ? startX + baseLetterSpacing * 4 + letterWidthAdjustments.S + letterWidthAdjustments.O + letterWidthAdjustments.C + letterWidthAdjustments.R + 40 :
                                   letterKey === 'T' ? startX + baseLetterSpacing * 5 + letterWidthAdjustments.S + letterWidthAdjustments.O + letterWidthAdjustments.C + letterWidthAdjustments.R + letterWidthAdjustments.A + 40 :
                                   letterKey === 'I' ? startX + baseLetterSpacing * 6 + letterWidthAdjustments.S + letterWidthAdjustments.O + letterWidthAdjustments.C + letterWidthAdjustments.R + letterWidthAdjustments.A + letterWidthAdjustments.T + 40 :
                                   letterKey === 'C2' ? startX + baseLetterSpacing * 7 + letterWidthAdjustments.S + letterWidthAdjustments.O + letterWidthAdjustments.C + letterWidthAdjustments.R + letterWidthAdjustments.A + letterWidthAdjustments.T + letterWidthAdjustments.I + 40 :
                                   startX + baseLetterSpacing * 8 + letterWidthAdjustments.S + letterWidthAdjustments.O + letterWidthAdjustments.C + letterWidthAdjustments.R + letterWidthAdjustments.A + letterWidthAdjustments.T + letterWidthAdjustments.I + letterWidthAdjustments.C2 + 40}
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

  @media (max-width: 1600px) {
    .socratica-container {
      width: 100%;
      min-width: 1100px;
    }
  }
</style> 