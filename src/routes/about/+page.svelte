<script>
  import Navbar from "$lib/components/navbar.svelte";
  import People from "$lib/components/people.svelte";
</script>

<div class="block">
  <div class="flex flex-col p-20 h-[3000px] bg-primary">
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
      <div
        class="mt-8 md:mt-16"
        style="font-family: 'Untitled Sans', sans-serif; width: 80%;"
      >
        <p
          class="text-[11px] md:text-[17px] lg:text-lg leading-relaxed mb-4 font-bold"
        >
          * insert pill stuff here* In January 2022, amid Waterloo’s
          post-pandemic return to campus, Adi Sharma and Aman Mathur identified
          a gap that students deeply felt – a lack of a dedicated environment
          for consistent exploration beyond academic and traditional
          career-oriented pursuits.
        </p>
        <p
          class="text-[11px] md:text-[17px] lg:text-lg leading-relaxed mb-4 font-bold"
        >
          Dissatisfied with the status quo but energized to find a solution for
          future generations, they established Socratica’s core model: Sunday
          morning gatherings that combined structured Pomodoro work sessions,
          social sharing of progress, and a welcoming community of inspiring
          makers.
        </p>
        <p
          class="text-[11px] md:text-[17px] lg:text-lg leading-relaxed mb-4 font-bold"
        >
          With this vision as their compass, Adi and Aman kicked off the first
          Socratica sessions in a cozy classroom, attracting a small but mighty
          group of curious minds. Socratica instantly struck a chord with the
          community, transforming ordinary Sunday mornings into inspiring spaces
          for creativity.
        </p>
      </div>
    </div>
  </div>
</div>
