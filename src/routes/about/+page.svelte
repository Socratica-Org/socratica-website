<script>
  import Navbar from "$lib/components/navbar.svelte";
  import { slide } from 'svelte/transition';
  import AboutImage1 from "$lib/images/about-1.1.png";
  import AboutImage2 from "$lib/images/about-1.2.png";
  import AboutImage3 from "$lib/images/about-1.3.png";

  // Change to selectedTerm instead of expandedSection
  let selectedTerm = "winter-2022";

  const timelineData = [
    {
      id: "winter-2022",
      term: "W22",
      leaders: "Adi Sharma, Aman Mathur",
      content: `In January 2022, amid Waterloo's post-pandemic return to campus, Adi Sharma and Aman Mathur identified a gap that students deeply felt—the lack of a dedicated environment for consistent exploration beyond academic and traditional career-oriented pursuits.

Dissatisfied with the status quo but energized to find a solution for future generations, they established Socratica's core model: Sunday morning gatherings that combined structured Pomodoro work sessions, social sharing of progress, and a welcoming community of inspiring makers.

With this vision as Aman and Adi's compass, they kicked off the first Socratica sessions in a cozy E5 classroom, attracting a small but mighty group of curious minds. Socratica instantly struck a chord with the community, transforming ordinary Sunday mornings into inspiring spaces for creativity.`
    },
    {
      id: "summer-2022",
      term: "S22",
      leaders: "Jonathan Xu, Mathurah Ravigulan, Adriana Ceric",
      content: "TBD"
    },
    {
      id: "fall-2022",
      term: "F22",
      leaders: "Joss Murphy, Anson Yu, Ananya Anupam, Daekun Kim, Krish Shah, Dhruv Patel, Dhvani Patel",
      content: "TBD"
    },
    {
      id: "winter-2023",
      term: "W23",
      leaders: "Jonathan Xu, Ananya Anupam, Jaclyn Chan, Maryam Rezakarimi, Daekun Kim",
      content: "TBD"
    },
    {
      id: "summer-2023",
      term: "S23",
      leaders: "Aava Sapkota, Brayden Petersen, Jake Rudolph, Binalpreet Kalra, Christopher Oka",
      content: "TBD"
    },
    {
      id: "fall-2023",
      term: "F23",
      leaders: "Hudhayfa Nazoordeen, Anthea Tawiah, Bruce Wang, Aileen Luo, Jennifer Tsai, Eesah Ulhaq",
      content: "TBD"
    },
    {
      id: "winter-2024",
      term: "W24",
      leaders: "Dhriti Gabani, Soham Basu, Pavitar Saini, Lagan Bansal, Freeman Jiang, Shivam Sharma, Joseph Bagheri, Brooke Joseph, Jenn Dryden",
      content: "TBD"
    },
    {
      id: "summer-2024",
      term: "S24",
      leaders: "Jaryd Diamond, Rachel Scott, Eric Gao, Santiago Del Solar, Julia Fedorin, Nevedhaa Ayyappan, Gaurav Shah, Tiffany Trinh, Keyan Virani",
      content: "TBD"
    },
    {
      id: "fall-2024",
      term: "F24",
      leaders: "Shahan Neda, Akira Yoshiyama, Suhani Trivedi, Victoria Feng, Nefise Akcakir, Giang Tran, Rishi Kothari",
      content: "TBD"
    },
    {
      id: "winter-2025",
      term: "W25",
      leaders: "Brennan Windsor, Cheryl Chong, Cindy Qiu, Faisal Sayed, Yash Karthik, Maisha Tahsin, Kenson Hui, Kaifee Haque, Angela Li",
      content: "TBD"
    }
  ];

  function selectTerm(id) {
    selectedTerm = id;
  }

  // Add a function to wrap each name in a span
  function formatLeaders(leaders) {
    // First trim any extra whitespace and then split on comma followed by optional space
    return leaders
      .trim()
      .split(/\s*,\s*/)
      .map(name => `<span class="name-wrap">${name.trim()}</span>`)
      .join(', ');
  }
</script>

<div class="block">
  <div class="flex flex-col h-[820px] justify-center bg-primary">
    <!-- <div
      class="absolute top-5 left-7 sm:left-10 w-10 h-10 bg-black rounded-full"
    /> -->
    <Navbar />

    <div class="absolute top-20 left-10 sm:left-20 transform ">
      <a href="/">
        <h1 class="text-2xl font-tiempos-headline">Socratica</h1>
      </a>
    </div>

    <div
      class="absolute w-9/10 md:w-9/10 lg:w-3/5 mt-96 sm:mt-96 md:mt-32 pb-60 md:pb-0"
      style="left: 10%;"
    >
      <h2
        class="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-tiempos-headline"
      >
        For the love of <i>making</i>.
      </h2>

      <div
        class="mt-8 md:mt-16"
        style="font-family: 'Untitled Sans', sans-serif; width: 80%;"
      >
        <p class="text-[11px] md:text-[17px] lg:text-lg leading-relaxed mb-4">
          Great creative work is historically done together, across backgrounds
          and disciplines, in small, high trust groups. This is the foundation
          of boundary pushing work - in engineering, science, art, and more.
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
      </div>
    </div>
  </div>
</div>

<!-- Replace the timeline section -->
<div class="block bg-primary py-20">
  <div class="w-[85%] md:w-9/10 lg:w-3/5 ml-[7.5%] md:ml-[10%]">
    <h2 class="text-2xl md:text-3xl font-tiempos-headline mb-10">Our story</h2>
    
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
        <div 
          transition:slide={{ duration: 300 }}
          class="content-section"
        >
          <!-- Leaders -->
          <div class="names-container max-w-[700px] mb-6" style="font-family: 'Untitled Sans', sans-serif;">
            <p class="text-gray-600 text-[11px] md:text-[17px] lg:text-lg">
              {@html formatLeaders(item.leaders)}
            </p>
          </div>

          <!-- Content -->
          <div class="prose max-w-none" style="font-family: 'Untitled Sans', sans-serif;">
            <p class="whitespace-pre-line text-gray-700 text-[11px] md:text-[17px] lg:text-lg leading-relaxed">
              {item.content}
            </p>
            
            {#if item.id === "winter-2022"}
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <img 
                  src={AboutImage3} 
                  alt="Socratica Winter 2022" 
                  class="w-full h-auto rounded-lg"
                />
                <img 
                  src={AboutImage1} 
                  alt="Socratica Winter 2022" 
                  class="w-full h-auto rounded-lg"
                />
                <img 
                  src={AboutImage2} 
                  alt="Socratica Winter 2022" 
                  class="w-full h-auto rounded-lg"
                />
              </div>
            {/if}
          </div>
        </div>
      {/if}
    {/each}
  </div>
</div>

<style>
  .pill-button {
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    font-family: 'Untitled Sans', sans-serif;
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
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  .prose {
    font-family: 'Untitled Sans', sans-serif;
  }
  
  .names-container {
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
  
  .name-wrap {
    display: inline;
    white-space: nowrap;
  }
</style>
