<script>
  import Navbar from "$lib/components/navbar.svelte";
  import People from "$lib/components/people.svelte";
  import AboutImage1 from "$lib/images/about-1.1.png";
  import AboutImage2 from "$lib/images/about-1.2.png";
  import AboutImage3 from "$lib/images/about-1.3.png";
  import { slide } from "svelte/transition";

  let selectedTerm = "winter-2022";
  const timelineData = [
    {
      id: "winter-2022",
      term: "W22",
      leaders: "Adi Sharma, Aman Mathur",
      content: `In January 2022, amid Waterloo's post-pandemic return to campus, Adi Sharma and Aman Mathur identified a gap that students deeply felt—the lack of a dedicated environment for consistent exploration beyond academic and traditional career-oriented pursuits.

Dissatisfied with the status quo but energized to find a solution for future generations, they established Socratica's core model: Sunday morning gatherings that combined structured Pomodoro work sessions, social sharing of progress, and a welcoming community of inspiring makers.

With this vision as Aman and Adi's compass, they kicked off the first Socratica sessions in a cozy E5 classroom, attracting a small but mighty group of curious minds. Socratica instantly struck a chord with the community, transforming ordinary Sunday mornings into inspiring spaces for creativity.`,
    },
    {
      id: "summer-2022",
      term: "S22",
      leaders: "Jonathan Xu, Mathurah Ravigulan, Adriana Ceric",
      content: `Socratica continued to experiment under the leadership of Mathurah and Jonathan over the summer. Since turnover between terms is high at Waterloo, they were tasked with growing a community almost from scratch. Getting creative and bouncing around empty classrooms on campus allowed people to start integrating Socratica Sessions as part of their weekly ritual. 

Forward-thinking hosts put significant work into establishing Socratica as a Canadian Nonprofit. This allowed us to have a bank account, sign contracts, and get access to essential tools for our team later on. 

During this time, Joss hosted several dinners through UW Startups for  people interested in talking about big ideas (it was found that the term “founder” was a quite intimidating word and caused many awesome people to self-eliminate). 
      
      `,
    },
    {
      id: "fall-2022",
      term: "F22",
      leaders:
        "Joss Murphy, Anson Yu, Ananya Anupam, Daekun Kim, Krish Shah, Dhruv Patel, Dhvani Patel",
      content: `By the end of summer, the builder-bug had caught on – with dinners constantly filling up in <24 hours and “the host mindset” well established, UW Startups was faced with a decision: turn people away… or get creative. 

“The Kickoff” became a way to accommodate demand by welcoming students back to Waterloo with an evening of sharing ideas and excitement about the creative things they wanted to pursue in the term ahead. In fall 2022, The Host Pledge was born. 

Sunday Socratica coworking sessions remained a weekly staple, now with permanent space in the Accelerator Center. UW Startups partnered with Jesse Rodgers and Maryam to host several larger events that introduced students to alumni founders and institutions around the city that could support them should they choose to pursue entrepreneurship. 

Finally, the first ever Socratica Symposium was hosted at Catalyst Commons to round out the semester. Symposium aimed to inspire more curious students to begin projects of their own, and as such intentionally showcased the depth and breadth of projects and people that were part of the Socratica community.`,
    },
    {
      id: "winter-2023",
      term: "W23",
      leaders:
        "Jonathan Xu, Ananya Anupam, Jaclyn Chan, Maryam Rezakarimi, Daekun Kim",
      content: `Winter 2023 came with growing pains – expectations were high, but once again an entirely new audience of students were back on campus and the community would have to be built up again. Despite this, the enthusiasm remained high among regular attendees – with people repeatedly asking for the RSVP link to sessions. 

New communication infrastructure and artifacts were established so that previous hosts could support hosts from afar, much of which is crucial to Socratica’s operation to this day. 

Kickoff (attempt 1) was cancelled by a snowstorm. Hosts ate leftover pizza for weeks. Symposium was almost interrupted by a snowstorm – but ultimately saw droves of students trekking through the depths of Waterloo Winter to support their friends and get inspired. 

`,
    },
    {
      id: "summer-2023",
      term: "S23",
      leaders:
        "Aava Sapkota, Brayden Petersen, Jake Rudolph, Binalpreet Kalra, Christopher Oka",
      content: `Summer brought with it a new batch of hosts and a new infusion of energy and stability – Brayden, Jake, Aava, Binal, and Chris brought fresh ideas to sessions, Aileen and Anson solidified Socratica’s brand, and Brayden and Joss kept reaching new audiences with UW Startups.

For over a year, it had been an uphill battle to make Socratica sessions feel welcoming to non-engineering students, women, artists, musicians, and other underrepresented groups, and in Summer 2023 it became clear that our efforts were beginning to pay off. 

Attendeeship was consistent, project progress compounded, and young hosts built confidence as they contributed to Socratica’s core values and strategy. “Sparkle” became a word we used to define creative tactics that help attendees feel seen and welcomed in the spaces we host, and many helpers were pulled in from across the UW Startups and Socratica community to add their “Sparkle” ideas to the mix. 

`,
    },
    {
      id: "fall-2023",
      term: "F23",
      leaders:
        "Hudhayfa Nazoordeen, Anthea Tawiah, Bruce Wang, Aileen Luo, Jennifer Tsai, Eesah Ulhaq",
      eiu: "https://socratica.notion.site/F23-Emotional-Investor-Update-830f3d0f5e104e2797a690a07f164d67",
      content: `The team had big dreams in Fall 2023. 

We partnered significantly with Velocity, establishing a permanent location on campus where Socratica hosts (and the broader community) could host events, free of charge. To accommodate for increased demand, we began hosting both a morning and afternoon session every Sunday, and began experimenting with session format to better accommodate different types of projects. 

We grew a Twitter presence and released the Toolbox so that people outside of Waterloo could start nodes of their own, and the Symposium grew in size – for the first time, guests flew to Waterloo to attend. 
`,
    },
    {
      id: "winter-2024",
      term: "W24",
      leaders:
        "Dhriti Gabani, Soham Basu, Pavitar Saini, Lagan Bansal, Freeman Jiang, Shivam Sharma, Joseph Bagheri, Brooke Joseph, Jenn Dryden",
      eiu: "https://socratica.notion.site/W24-Socratica-Emotional-Investor-Update-e2c4eb08b4d14a7aa8a74ad1caf9dda9 ",
      content: "TBD",
    },
    {
      id: "summer-2024",
      term: "S24",
      leaders:
        "Jaryd Diamond, Rachel Scott, Eric Gao, Santiago Del Solar, Julia Fedorin, Nevedhaa Ayyappan, Gaurav Shah, Tiffany Trinh, Keyan Virani",
      eiu: "https://socratica.notion.site/S24-Socratica-Emotional-Investor-Update-175e034e1ad2493988c13be172697aa9 ",
      content: "TBD",
    },
    {
      id: "fall-2024",
      term: "F24",
      leaders:
        "Shahan Neda, Akira Yoshiyama, Suhani Trivedi, Victoria Feng, Nefise Akcakir, Giang Tran, Rishi Kothari",
      content: "TBD",
    },
    {
      id: "winter-2025",
      term: "W25",
      leaders:
        "Brennan Windsor, Cheryl Chong, Cindy Qiu, Faisal Sayed, Yash Karthik, Maisha Tahsin, Kenson Hui, Kaifee Haque, Angela Li",
      eiu: "https://socratica.notion.site/F24-Socratica-Emotional-Investor-Update-772655a649104b82854a0ebb642758a5 ",
      content: `Coming soon!`,
    },
  ];

  function selectTerm(id) {
    selectedTerm = id;
  }

  function formatLeaders(leaders) {
    return leaders
      .trim()
      .split(/\s*,\s*/)
      .map((name) => `<span class="name-wrap">${name.trim()}</span>`)
      .join(", ");
  }
</script>

<div class="block">
  <div class="flex flex-col p-20 min-h-screen pb-32 bg-primary">
    <!-- <div
      class="absolute top-5 left-7 sm:left-10 w-10 h-10 bg-black rounded-full"
    /> -->
    <Navbar />

    <div class="absolute top-20 left-10 sm:left-20 transform">
      <a href="/">
        <h1 class="text-2xl font-tiempos-headline">Socratica</h1>
      </a>
    </div>

    <div class=" flex flex-col position-center" style="left: 10%;">
      <img
        class="pt-40"
        src="src/lib/images/Socratica_Symposium_Hosts.png"
        alt="Description"
      />
      <h2
        class="text-2xl pt-8 sm:text-3xl md:text-5xl lg:text-6xl font-tiempos-headline"
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

      <People />
      <h2
        class="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-tiempos-headline pt-28"
      >
        Our Story
      </h2>

      <!-- Timeline Component -->
      <div class="w-full mt-8">
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
              <!-- Leaders
              <div
                class="names-container max-w-[700px] mb-6"
                style="font-family: 'Untitled Sans', sans-serif;"
              >
                <p class="text-gray-600 text-[11px] md:text-[17px] lg:text-lg">
                  {@html formatLeaders(item.leaders)}
                </p>
              </div> -->

              <!-- Content -->
              <div
                class="prose max-w-none"
                style="font-family: 'Untitled Sans', sans-serif;"
              >
                <p
                  class="whitespace-pre-line text-gray-700 text-[11px] md:text-[17px] lg:text-lg leading-relaxed"
                >
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
  </div>
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
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
  .prose {
    font-family: "Untitled Sans", sans-serif;
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
