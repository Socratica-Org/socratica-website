<script>
  import Navbar from "$lib/components/navbar.svelte";
  import { onMount } from "svelte";
  import { fade, slide } from "svelte/transition";
  import peopleData from "../people/people.json";
  // image imports
  import F22B from "$lib/images/f22-group.png";
  import F22C from "$lib/images/f22-kickoff.jpg";
  import F22A from "$lib/images/f22-pledge.png";
  import S22A from "$lib/images/s22-bubbles.png";
  import S22B from "$lib/images/s22-session.jpg";
  import S22C from "$lib/images/s22-workshop.jpg";
  import W22A from "$lib/images/w22-adi.png";
  import W22C from "$lib/images/w22-aman.png";
  import W22B from "$lib/images/w22-tweet.png";

  import F23A from "$lib/images/f23-kickoff.jpg";
  import F23B from "$lib/images/f23-painting.jpeg";
  import F23C from "$lib/images/f23-symposium-hudzah.jpg";
  import S23A from "$lib/images/s23-kickoff.jpg";
  import S23B from "$lib/images/s23-outside.jpeg";
  import S23C from "$lib/images/s23-symposium-stage.png";
  import W23A from "$lib/images/w23-retreat.jpg";
  import W23B from "$lib/images/w23-smiley.png";
  import W23C from "$lib/images/w23-symposium.jpg";

  import F24A from "$lib/images/f24-group.webp";
  import F24C from "$lib/images/f24-lattice.webp";
  import F24B from "$lib/images/f24-overview.webp";
  import S24A from "$lib/images/s24-assembly.webp";
  import S24B from "$lib/images/s24-kickoff.webp";
  import S24C from "$lib/images/s24-summer.webp";
  import W24A from "$lib/images/w24-kickoff.webp";
  import W24B from "$lib/images/w24-summary.webp";
  import W24C from "$lib/images/w24-wabi-sabi.webp";

  import Symposium_Hosts from "$lib/images/Socratica_Symposium_Hosts.png";

  // State for profile popup
  let highlightedPerson = null;
  let isPersonSelected = false;

  // Find a person by name in the people data
  function findPersonByName(name) {
    // Remove any whitespace from the search name
    const searchName = name.trim();

    // Find the person in peopleData
    return peopleData.find(
      (p) => p.name.toLowerCase() === searchName.toLowerCase()
    );
  }

  // Handle leader name click
  function handleLeaderClick(name) {
    const person = findPersonByName(name);
    if (person) {
      highlightedPerson = person;
      isPersonSelected = true;
    }
  }

  // Close profile popup
  function closeProfile() {
    highlightedPerson = null;
    isPersonSelected = false;
  }

  // Get optimized image URL based on size needs
  function getOptimizedImageUrl(photoUrl, size) {
    if (!photoUrl || photoUrl.includes("placeholder")) {
      return photoUrl;
    }

    const imgPath = photoUrl.startsWith("/") ? photoUrl.substring(1) : photoUrl;
    const parts = imgPath.split("/");
    const filename = parts[parts.length - 1].split(".")[0];

    // Check if we have WebP versions
    if (size === "tiny") return `/img-ppl/${filename}-32w.webp`;
    if (size === "small") return `/img-ppl/${filename}-64w.webp`;
    if (size === "medium") return `/img-ppl/${filename}-128w.webp`;
    if (size === "large") return `/img-ppl/${filename}-256w.webp`;

    // Fallback to original image
    return photoUrl;
  }

  let selectedTerm = "winter-2022";
  const timelineData = [
    {
      id: "winter-2022",
      term: "W22",
      leaders: "Adi Sharma, Aman Mathur",
      images: [W22A, W22B, W22C],
      content: `In January 2022, amid Waterloo's post-pandemic return to campus, Adi Sharma and Aman Mathur identified a gap that students deeply felt – a lack of a dedicated environment for consistent exploration beyond academic and traditional career-oriented pursuits.

Dissatisfied with the status quo but energized to find a solution for future generations, they established Socratica's core model: Sunday morning gatherings that combined structured Pomodoro work sessions, social sharing of progress, and a welcoming community of inspiring makers. 

With this vision as their compass, they  kicked off the first Socratica sessions in a cozy classroom, attracting a small but mighty group of curious minds. Socratica instantly struck a chord with the community, transforming ordinary Sunday mornings into inspiring spaces for creativity. 
`,
    },
    {
      id: "summer-2022",
      term: "S22",
      leaders: "Jonathan Xu, Mathurah Ravigulan, Adriana Ceric",
      images: [S22A, S22B, S22C],
      content: `Socratica's momentum continued to grow over the summer. For many, attending Sunday Socratica sessions became a part of their weekly ritual. 

The team got creative, bouncing between many classrooms on campus and hosting an end-of-term campfire. Forward-thinking hosts put significant work into establishing Socratica as a Nonprofit, allowing us to have a bank account, sign contracts, and get access to essential tools for our team later on. 

With many previous hosts and attendees graduating, Socratica began collaborating closely with UW Startups, paving the way for the eventual merging of the two organizations.`,
    },
    {
      id: "fall-2022",
      term: "F22",
      leaders:
        "Joss Murphy, Anson Yu, Ananya Anupam, Daekun Kim, Krish Shah, Dhruv Patel, Dhvani Patel",
      images: [F22A, F22B, F22C],

      content: `By the end of summer, the builder-bug had caught on – Socratica sessions were gaining steam and UW Startups events were selling out in <24 hours. 

Rather than turn people away, the team got creative: "The Kickoff" became a way to welcome students back to Waterloo to share their big ideas and excitement for the term ahead. The Host Pledge was born. 

Socratica sessions were hosted in their first permanent home at the Accelerator Center, and UW Startups partnered with Jesse Rodgers to host several larger events that introduced students to founders and Waterloo alumni. 

The first ever Socratica Symposium was born: with demos curated to showcase the diversity of projects and people in our community, Symposium invited curious students to gain inspiration from the work of their peers.
`,
    },
    {
      id: "winter-2023",
      term: "W23",
      leaders:
        "Jonathan Xu, Ananya Anupam, Jaclyn Chan, Maryam Rezakarimi, Daekun Kim",
      images: [W23A, W23B, W23C],
      content: `Winter 2023 marked Socratica's first full year. After witnessing Socratica's exciting growth during their co-op terms, newcomers jumped at the opportunity to continue building the community. 

Expectations were high, with highly anticipated kickoff and symposium events solidifying into termly traditions. Hosts had to get resourceful and adapt to road bumps and growing pains along the way — when a snowstorm cancelled kickoff, they ate leftover pizza for weeks. When a SECOND snowstorm threatened Symposium, attendees trekked through Waterloo's winter depths to show up anyway. 

Previous hosts supported hosts remotely, setting up organizational infrastructure and writing documentation that continues to support our operations and paved the way for new nodes around the world.
`,
    },
    {
      id: "summer-2023",
      term: "S23",
      leaders:
        "Aava Sapkota, Brayden Petersen, Jake Rudolph, Binalpreet Kalra, Christopher Oka",
      images: [S23A, S23B, S23C],

      content: `Summer 2023 brought with it a new batch of hosts and a new infusion of energy and stability. Attendeeship was consistent, project progress compounded, Socratica's brand was solidified, and our audience continued to grow through UW Startups. 

After many terms of initiatives to make our spaces feel friendly to beginners and underrepresented groups, it became clear that our efforts were paying off. Kickoff and Symposium were a blast. 

"Sparkle" became a word we used to define creative tactics that help attendees feel seen and welcomed in the spaces we host, and many helpers were pulled in from across the UW Startups and Socratica community to add their "Sparkle" ideas to the mix. 

`,
    },
    {
      id: "fall-2023",
      term: "F23",
      leaders:
        "Hudhayfa Nazoordeen, Anthea Tawiah, Bruce Wang, Aileen Luo, Jennifer Tsai, Eesah Ulhaq",
      images: [F23A, F23B, F23C],
      eiu: "https://socratica.notion.site/F23-Emotional-Investor-Update-830f3d0f5e104e2797a690a07f164d67",
      content: `In Fall 2023, we doubled our capacity by hosting morning and afternoon sessions, bringing us to 763 event attendees across all events. 

We partnered with Velocity, designing a cozy space on campus where Socratica hosts (and the broader community) could easily host events, free of charge. We hosted paint nights and potlucks. Symposium grew in size, and for the first time, guests flew to Waterloo to attend.

This was also a term of sharing our learnings with the public – we started a Twitter account and released a toolbox so that people outside of Waterloo could start nodes of their own. 
`,
    },
    {
      id: "winter-2024",
      term: "W24",
      leaders:
        "Dhriti Gabani, Soham Basu, Pavitar Saini, Lagan Bansal, Freeman Jiang, Shivam Sharma, Joseph Bagheri, Brooke Joseph, Jenn Dryden",
      images: [W24A, W24B, W24C],
      eiu: "https://socratica.notion.site/W24-Socratica-Emotional-Investor-Update-e2c4eb08b4d14a7aa8a74ad1caf9dda9 ",
      content: `Winter 2024 was a term of incredible growth. Across all sessions and events we had 1,713 unique attendees, 58% of which were attending for the first time. 

We hosted a 500 person dance party. We ran a low-pressure wabi-sabi-thon that wrapped up with a lettuce eating competition. We partnered with UW photography to host a creator retreat. We watched the blackberry movie. 

Our symposium saw over 1,000 registrations, with 450 tickets being claimed in less than 24 hours. 8 demoers took to the stage, with over 30 interactive booth demos filling classrooms and hallways surrounding the venue. 

International nodes sprouted up across the world, with over 30 onboarded and running sessions weekly in their hometowns.
`,
    },
    {
      id: "summer-2024",
      term: "S24",
      leaders:
        "Jaryd Diamond, Rachel Scott, Eric Gao, Santiago Del Solar, Julia Fedorin, Nevedhaa Ayyappan, Gaurav Shah, Tiffany Trinh, Keyan Virani",
      images: [S24A, S24B, S24C],
      eiu: "https://socratica.notion.site/S24-Socratica-Emotional-Investor-Update-175e034e1ad2493988c13be172697aa9 ",
      content: `Summer in Waterloo (or, as the locals call it, Summerloo) is always buzzing with energy. With fewer students on campus,  it was a term for experimentation – and we learned a lot. 

Over 400 unique attendees came to sessions, we reached all faculties at the university, and we organized a record 6 consecutive days of Socratica events. 

The term started with a classic rooftop kickoff, featured a powerpoint night, a Socraticamp, and weeknight sessions conducted in new formats (including a double-length session called Soooocratica). To end off the summer of experimentation, the Socratica Assembly showcased 8 interactive booth demos and 25 rapid-fire stage demos presented in 2 minutes or less.`,
    },
    {
      id: "fall-2024",
      term: "F24",
      leaders:
        "Shahan Neda, Akira Yoshiyama, Suhani Trivedi, Victoria Feng, Nefise Akcakir, Giang Tran, Rishi Kothari",
      images: [F24A, F24B, F24C],
      eiu: "https://socratica.notion.site/F24-Socratica-Emotional-Investor-Update-772655a649104b82854a0ebb642758a5 ",
      content: `Fall 2024 saw Sunday sessions averaging 75 signups per week, with a peak of 107 for a single session. 954 unique attendees made progress on 420 projects across 22 events. 

We hosted a kickoff on the roof, a Socratica skill swap, an inventor's workshop, a film festival, and wrapped up the term with A Night at the Socratica Museum: an evening that prioritized interactive booth demos instead of our traditional stage format. 

The lattice grew to over 30 nodes around the world, with 5 of them hosting large demo days of their own. 

AND, FINALLY, we got merch. 
`,
    },
    {
      id: "winter-2025",
      term: "W25",
      leaders:
        "Brennan Windsor, Cheryl Chong, Cindy Qiu, Faisal Sayed, Yash Karthik, Maisha Tahsin, Kenson Hui, Kaifee Haque, Angela Li",
      content: `Our 10th term of Socratica. Coming soon!`,
    },
  ];

  function selectTerm(id) {
    selectedTerm = id;
  }

  function formatLeaders(leaders) {
    // Use a standard span without special classes but add data attribute for click handling
    return leaders
      .split(", ")
      .map((name) => `<span data-name="${name}" class="leader">${name}</span>`)
      .join(", ");
  }

  // Add event listener for leader name clicks after component mounts
  onMount(() => {
    document.addEventListener("click", (e) => {
      // Check if clicked element has the leader class
      if (
        e.target.classList.contains("leader") ||
        e.target.closest(".leader")
      ) {
        const name =
          e.target.dataset.name || e.target.closest(".leader").dataset.name;
        if (name) {
          handleLeaderClick(name);
        }
      }
    });
  });
</script>

<div class="block">
  <div class="flex flex-col p-10 min-h-screen pb-32 bg-primary">
    <!-- <div
      class="absolute top-5 left-7 sm:left-10 w-10 h-10 bg-black rounded-full"
    /> -->
    <Navbar />

    <div class="absolute top-20 transform">
      <a href="/">
        <h1 class="text-2xl font-tiempos-headline">Socratica</h1>
      </a>
    </div>

    <div class="flex m-auto lg:max-w-7xl">
      <div class="flex flex-col" style="left: 10%; ">
        <img
          class="pt-20 w-[100%]"
          src={Symposium_Hosts}
          alt="Socratica Symposium Hosts"
        />
        <h2
          class="text-2xl pt-8 sm:text-3xl md:text-5xl lg:text-6xl font-tiempos-headline"
        >
          For the love of <i>making</i>.
        </h2>

        <div
          class="mt-4 md:mt-8"
          style="font-family: 'Untitled Sans', sans-serif;"
        >
          <p class="text-[11px] md:text-[17px] lg:text-lg leading-relaxed mb-4">
            Great creative work is historically done together, across
            backgrounds and disciplines, in small, high trust groups. This is
            the foundation of boundary pushing work - in engineering, science,
            art, and more.
          </p>
          <p class="text-[11px] md:text-[17px] lg:text-lg leading-relaxed mb-4">
            On top of that... there are increasingly few, low stakes ways for
            people to make interest, values aligned friends IRL. This is made
            worse by an endless stream of catered consumption.
          </p>
          <p
            class="text-[11px] md:text-[17px] lg:text-lg leading-relaxed mb-4 font-bold"
          >
            It becomes pretty clear that we should do two things: gather and
            create. Socratica aims to help people do both.
          </p>
          <button
            class="px-4 py-2 mt-2 hover:bg-black hover:text-white rounded-full font-sans text-sm transition-all duration-200 border border-black bg-transparent"
          >
            <a href="/people">Meet our team</a>
          </button>
        </div>
        <h2
          class="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-tiempos-headline pt-28"
        >
          Our Story
        </h2>

        <!-- Timeline Component -->
        <div class="w-full mt-8 lg:max-w-7xl">
          <!-- Pills navigation -->
          <div class="flex flex-wrap gap-2 mb-8">
            {#each timelineData as item}
              <button
                class="pill-button {selectedTerm === item.id ? 'active' : ''}"
                on:click={() => selectTerm(item.id)}
              >
                {item.term}
              </button>
            {/each}
          </div>

          <!-- Content section -->
          {#each timelineData as item}
            {#if selectedTerm === item.id}
              <div transition:slide={{ duration: 300 }} class="content-section">
                <!-- Content -->
                <div
                  class="prose max-w-none"
                  style="font-family: 'Untitled Sans', sans-serif;"
                >
                  {#if item.id !== "winter-2025"}
                    <!-- Image grid with improved responsive handling -->
                    <div
                      class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-4"
                    >
                      {#if item.images && item.images.length > 0}
                        {#each item.images as image, index}
                          <div
                            class="aspect-ratio-container rounded-lg overflow-hidden bg-gray-100"
                          >
                            <img
                              src={image}
                              alt={`Session ${index + 1}`}
                              class="image-fit"
                              loading="lazy"
                            />
                          </div>
                        {/each}
                      {/if}
                    </div>
                  {/if}
                  <p
                    class="whitespace-pre-line text-gray-700 text-[11px] md:text-[17px] lg:text-lg leading-relaxed mt-6"
                  >
                    {item.content}
                  </p>
                </div>
              </div>
            {/if}
          {/each}
        </div>
      </div>
    </div>
  </div>

  <!-- Profile popup - Copy the same component from people page -->
  {#if highlightedPerson}
    <div class="profile-card" transition:fade={{ duration: 200 }}>
      <!-- Vertical layout -->
      <div class="flex flex-col items-center text-center mb-4">
        {#if !highlightedPerson.photo.includes("placeholder")}
          <img
            src={getOptimizedImageUrl(highlightedPerson.photo, "large")}
            alt={highlightedPerson.name}
            class="w-32 h-32 rounded-full mb-4 object-cover border-2 border-[#FBF8EF]"
            loading="lazy"
            fetchpriority="high"
            height="128"
            width="128"
          />
        {:else}
          <div
            class="w-32 h-32 rounded-full mb-4 bg-[#404040] flex items-center justify-center border-2 border-[#FBF8EF]"
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
        <div class="mt-2">
          <ul
            class="list-disc pl-6 space-y-2"
            style="font-family: 'Untitled Sans', sans-serif;"
          >
            {#each highlightedPerson.facts as fact}
              <li class="text-[15px] leading-relaxed text-gray-700 text-left">
                {fact}
              </li>
            {/each}
          </ul>
        </div>
      {:else if highlightedPerson.description}
        <div class="mt-2">
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

<style>
  .pill-button {
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    font-family: "Untitled Sans", sans-serif;
    font-size: 14px;
    transition: all 0.2s;
    border: 1px solid #000;
    background: transparent;
  }
  .pill-button:hover {
    background: rgba(0, 0, 0, 0.05);
  }
  .pill-button.active {
    background: #000;
    color: #fff;
  }
  .content-section {
    padding-top: 2rem;
    margin-top: 1rem;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
  .prose {
    font-family: "Untitled Sans", sans-serif;
  }

  .names-container {
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .leader {
    cursor: pointer;
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 2px;
    transition: color 0.2s;
  }

  .leader:hover {
    color: #000;
  }

  /* Profile card styles */
  .profile-card {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border-radius: 1rem;
    padding: 1.5rem;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    z-index: 100;
    max-width: 90%;
    width: 480px;
    backface-visibility: hidden;
    will-change: transform, opacity;
  }

  /* Aspect ratio container for responsive images */
  .aspect-ratio-container {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 75%; /* 4:3 aspect ratio */
    overflow: hidden;
  }

  .image-fit {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain; /* Ensure entire image is visible */
    background-color: #f5f5f5;
  }

  /* Add media query for larger screens */
  @media (min-width: 768px) {
    .aspect-ratio-container {
      padding-bottom: 66.67%; /* 3:2 aspect ratio on larger screens */
    }
  }
</style>
